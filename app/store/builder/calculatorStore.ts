import { State, UserContextTypes } from "@app/context/user.context";
import { setegid } from "process";
import { StateCreator, create } from "zustand";
import {
  createJSONStorage,
  devtools,
  persist,
  PersistOptions,
} from "zustand/middleware";

import { data } from "@app/core/components/dragdrop/data";
import shortUUID from "short-uuid";
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { parse as mathparse, compile, evaluate } from "mathjs"

const FormulaParser = require("hot-formula-parser");
const formulas = FormulaParser.SUPPORTED_FORMULAS;
export interface UserState {
  user: UserContextTypes | null;
  token: string;
  refresh: string;
  login: (user: UserContextTypes) => void;
  setToken: (token: string) => void;
  setRefresh: (refresh: string) => void;
}

export type CellProps = {
  address: string;
  affected?: boolean;
  computedValue?: number | null;
  forcedValue: string;
  formTags: "input" | "select" | "textarea" | "button" | "output";
  format: string;
  formattedValue?: string;
  formula: string | null;
  label: string;
  processed?: boolean;
  value: number;
};

export type Cell = {
  cells: CellProps[];
  dependant?: CellProps[];
  dependencies?: CellProps[];
  update: (cells: CellProps) => void;
};

export type CalculatorStore = {
  cells: CellProps[];
  update: (cells: CellProps) => void;
};

export const useCalculatorStore = create<Cell>((set) => ({
  cells: [
    {
      address: "A1",
      forcedValue: "",
      formTags: "input",
      format: "0,0",
      formula: null,
      label: "A1",
      value: 0,
    },
    {
      address: "A2",
      forcedValue: "",
      format: "0,0%",
      formula: null,
      formTags: "input",
      label: "A2",
      value: 0,
    },
    {
      address: "A3",
      forcedValue: "",
      format: "$0,0",
      formula: "",
      formTags: "input",
      label: "A3",
      value: 0,
    },
    {
      address: "A4",
      forcedValue: "",
      format: "",
      formula: "SUM(A1:A3)-2",
      formTags: "output",
      label: "SUM(A1:A3)-2",
      value: 0,
    },
  ],
  update: (cells: CellProps) => {
    set((state) => {
      const updatedCells = state.cells.map((cell) => {
        if (cell.address === cells.address) {
          return { ...cell, value: cells.value };
        } else {
          return cell;
        }
      });

      const updatedState: CalculatorStore = { ...state, cells: updatedCells };

      updatedCells.forEach((cell) => {
        if (cell.formula) {
          const updatedCell = calculateFormula(cell, updatedState);
          if (updatedCell) {
            updatedState.cells = updatedState.cells.map((c) => {
              if (c.address === updatedCell.address) {
                return updatedCell;
              } else {
                return c;
              }
            });
          }
        }
      });

      return updatedState;
    });
  },
}));

function calculateFormula(
  cell: CellProps,
  state: CalculatorStore
): CellProps | null {
  // console.log(cell.formula, "im the formula", formulas);
  const formulaRegex = new RegExp(`\\b(${formulas.join("|")})\\b`);
  const parser = new FormulaParser.Parser();

  parser.on('callRangeValue', function (startCellCoord: { row: { index: number; }; column: { index: number; }; }, endCellCoord: { row: { index: number; }; column: { index: number; }; }, done: (arg0: number[][]) => void) {
    const data = state.cells.filter(c => {
      const col = c.address.charCodeAt(0) - 65;
      const row = parseInt(c.address.substring(1)) - 1;
      return row >= startCellCoord.row.index && row <= endCellCoord.row.index && col >= startCellCoord.column.index && col <= endCellCoord.column.index;
    }).map(c => [c.value]);
    var fragment = [];

    for (var row = startCellCoord.row.index; row <= endCellCoord.row.index; row++) {
      var rowData = data[row];
      var colFragment = [];

      for (var col = startCellCoord.column.index; col <= endCellCoord.column.index; col++) {
        colFragment.push(rowData[col]);
      }
      fragment.push(colFragment);
    }

    if (fragment) {
      done(fragment);
    }
  });

  if (cell.formula) {
    if (formulaRegex.test(cell.formula)) {
      //can still be optimized @jr @js
      if (cell.formula.includes(":")) {
        const matches = cell.formula.match(/([A-Z]\d+):([A-Z]\d+)/);
        if (matches) {
          const [startAddress, endAddress] = matches.slice(1);
          const startCol = startAddress.charCodeAt(0) - 65;
          const endCol = endAddress.charCodeAt(0) - 65;
          const startRow = parseInt(startAddress.substring(1)) - 1;
          const endRow = parseInt(endAddress.substring(1)) - 1;
          const data = state.cells.filter(c => {
            const col = c.address.charCodeAt(0) - 65;
            const row = parseInt(c.address.substring(1)) - 1;
            return row >= startRow && row <= endRow && col >= startCol && col <= endCol && c.value !== null && c.value !== undefined;
          }).map(c => [c.value]);
          var fragment = [];
          for (var row = startRow; row <= endRow; row++) {
            var rowData = data[row - startRow];
            var colFragment = [];
            for (var col = startCol; col <= endCol; col++) {
              colFragment.push(rowData[col - startCol]);
            }
            fragment.push(colFragment);
          }
          if (fragment) {
            try {
              const result = parser.parse('SUM(' + startAddress + ':' + endAddress + ')').evaluate({ A1: fragment });
              return { ...cell, value: result - 2 };
            } catch (error) {
              console.error(`Error in formula: ${cell.formula} - ${error}`);
              return null;
            }
          }
        }
        // try {
        //   // eslint-disable-next-line no-eval
        //   const result = parser.parse(cell.formula).result;
        //   // console.log(result, "cal");
        //   return { ...cell, value: result };
        // } catch (error) {
        //   console.error(`Error in formula: ${cell.formula} - ${error}`);
        //   return null;
        // }
      }

      const formula = cell.formula.replace(/([A-Z][0-9]+)/g, (match) => {
        const dependentCell = state.cells.find((c) => c.address === match);
        if (dependentCell) {
          console.log(
            "from dependentcell check",
            dependentCell.value.toString(),
            dependentCell.formula
          );
          return dependentCell.value.toString();
        } else {
          return "0";
        }
      });

      try {
        // eslint-disable-next-line no-eval
        const result = parser.parse(formula).result;
        console.log(result, "cal");
        return { ...cell, value: result };
      } catch (error) {
        console.error(`Error in formula: ${formula} - ${error}`);
        return null;
      }
    }

    const formula = cell.formula.replace(/([A-Z][0-9]+)/g, (match) => {
      const dependentCell = state.cells.find((c) => c.address === match);
      if (dependentCell) {
        console.log(
          "from dependentcell check",
          dependentCell.value.toString(),
          dependentCell.formula
        );
        return dependentCell.value.toString();
      } else {
        return "0";
      }
    });

    try {
      // eslint-disable-next-line no-eval
      console.log(formula, "fromula from try");
      const result = eval(formula);
      console.log(result, "cal");
      return { ...cell, value: result };
    } catch (error) {
      console.error(`Error in formula: ${formula} - ${error}`);
      return null;
    }
  }

  return null;

  // console.log(formula,'formula')
}

export interface Sheet {
  affectedCells: string[];
  cells: Cell[];
  elements: Cell[];
  elementsToHide?: string[];
  elementsToShow?: string[];
  comparator: {
    equal: (a: number, b: number) => boolean;
    greater: (a: number, b: number) => boolean;
    greaterEqual: (a: number, b: number) => boolean;
    less: (a: number, b: number) => boolean;
    lessEqual: (a: number, b: number) => boolean;
    notEqual: (a: number, b: number) => boolean;
  };
  lang?: string;
  visibilities?: [];
}

export const useCalculatorSheetStore = create<Sheet>((set) => ({
  affectedCells: [],
  cells: [],
  elements: [],
  elementsToHide: [],
  elementsToShow: [],
  comparator: {
    equal: (a: number, b: number) => a == b,
    greater: (a: number, b: number) => a > b,
    greaterEqual: (a: number, b: number) => a < b,
    less: (a: number, b: number) => a <= b,
    lessEqual: (a: number, b: number) => a >= b,
    notEqual: (a: number, b: number) => a != b,
  },
  lang: "",
  visibilities: [],
}));

useCalculatorStore.subscribe((state) => {
  const sheetStore = useCalculatorSheetStore.getState();
  console.log(state);
  console.log(sheetStore);
});
// useCalculatorStore.subscribe((state) => {
//   const sheetStore = useCalculatorSheetStore.getState();
//   const regex = /\(|\)/
//   console.log(state)
//     state.cells.forEach(cell => {
//       if (cell.formula && !regex.test(cell.formula)) {
//         const celltest = state.cells.filter(element => element.address == cell.address)
//         const addresses = celltest[0].formula?.match(/A\d+/g)
//         // console.log(addresses)
//         if (addresses) {
//             console.log(addresses)
//             // replaceValues(addresses)

//         }
//     }
//     })

// })

useCalculatorSheetStore.subscribe((state) => {
  console.log("triggered");
});
