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
import { ReactNode } from "react";

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

type ChoicesTypes = {
  value: string
  label: string
  _id: string
}

export type NewCellProps = {
  address?: string
  appendedText?: string
  choices: any
  classes: string
  currency: string
  dataType: string
  decimalPlace: number
  forcedValue: number | string
  format: string
  formula: string
  icon: string
  isDisabled: boolean
  isProcess: boolean
  label: string
  prefilled: string
  rightSection: string
  sliderType: string
  text: string
  title: string
  toggle: boolean
  tooltip: string
  value: number
  _id: string
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
  cells: NewCellProps[];
  dependant?: NewCellProps[];
  dependencies?: NewCellProps[];
  update: (cells: NewCellProps) => void;
  addItems: (cells: NewCellProps[]) => void
  getLastCellAddress: () => string
};

export type CalculatorStore = {
  cells: NewCellProps[];
  update: (cells: NewCellProps) => void;
};


// const data = transformData(state.cells);



// const data = state.cells.filter(c => {
//   const col = c.address.charCodeAt(0) - 65;
//   const row = parseInt(c.address.substring(1)) - 1;
//   return row >= startCellCoord.row.index && row <= endCellCoord.row.index && col >= startCellCoord.column.index && col <= endCellCoord.column.index;
// }).map(c => [c.value]);

// var fragment = [];

// for (var row = startCellCoord.row.index; row <= endCellCoord.row.index; row++) {
//   var rowData = data[row];
//   var colFragment = [];

//   for (var col = startCellCoord.column.index; col <= endCellCoord.column.index; col++) {
//     colFragment.push(rowData[col]);
//   }
//   fragment.push(colFragment);
// }

// if (fragment) {
//   done(fragment);
// }

export const useCalculatorStore = create<Cell>((set, get) => ({
  cells: [],
  addItems: (newCells: NewCellProps[]) => {
    console.log("newCells", newCells)
    set({ cells: newCells })
  },
  getLastCellAddress: () => {
    const cells = get().cells
    if (cells?.length > 0) {
      const lastValue = cells.reduce((acc, curr) => {
        if (!acc || !acc.address || (curr.address && curr.address > acc.address)) {
          return curr;
        }
        return acc;
      })?.address;
      if (lastValue) {
        return lastValue
      } else {
        return "NULL"
      }
    } else {
      return "NULL"
    }
  },
  update: (cells: NewCellProps) => {
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



function parseFormula(formula: string, cellObject?: any): number | null {
  const parser = new FormulaParser.Parser();

  parser.on("callCellValue", function (cellCoord: { column: { index: number; }; row: { index: number; }; }, done: (arg0: number) => void) {
    const address = `${String.fromCharCode(65 + cellCoord.column.index)}${cellCoord.row.index + 1}`;

    if (cellObject && cellObject.address === address) {
      done(cellObject.value);
    } else {
      done(0);
    }
  });

  parser.on("callRangeValue", function (startCellCoord: { row: { index: any; }; column: { index: any; }; }, endCellCoord: { row: { index: number; }; column: { index: number; }; }, done: (arg0: number[][]) => void) {
    const data = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
    ];

    const fragment = [];

    for (let row = startCellCoord.row.index; row <= endCellCoord.row.index; row++) {
      const rowData = data[row];
      const colFragment = [];

      for (let col = startCellCoord.column.index; col <= endCellCoord.column.index; col++) {
        colFragment.push(rowData[col]);
      }

      fragment.push(colFragment);
    }

    if (fragment) {
      done(fragment);
    }
  });

  try {
    const result = parser.parse(formula);
    return typeof result === "number" ? result : null;
  } catch (error) {
    console.error(`Error in formula: ${formula} - ${error}`);
    return null;
  }
}

type CellObject = {
  address: string;
  forcedValue: string;
  formTags: string;
  format: string;
  formula: string | null;
  label: string;
  value: number;
}

function cellObjectsTo2DArray(cellObjects: CellProps[], numRows: number, numCols: number): number[][] {
  const data: number[][] = [];
  let index = 0;

  for (let i = 0; i < numRows; i++) {
    const row: number[] = [];
    for (let j = 0; j < numCols; j++) {
      const cellObject = cellObjects[index];
      row.push(cellObject ? cellObject.value : 0);
      index++;
    }
    data.push(row);
  }

  return data;
}


export function transformData(data: NewCellProps[]) {
  const result = [];

  for (const obj of data) {
    const row = [
      obj.address,
      obj._id,
      obj.appendedText,
      obj.choices,
      obj.classes,
      obj.currency,
      obj.dataType,
      obj.decimalPlace,
      obj.forcedValue,
      obj.format,
      obj.formula,
      obj.icon,
      obj.isDisabled,
      obj.isProcess,
      obj.label,
      obj.prefilled,
      obj.rightSection,
      obj.sliderType,
      obj.text,
      obj.title,
      obj.toggle,
      obj.tooltip,
      obj.value,
    ];

    result.push(row);
  }

  return result;
}

interface DataRow {
  [index: number]: string | null | number;
}


function calculateFormula(
  cell: NewCellProps,
  state: CalculatorStore
): NewCellProps | null {
  // console.log(cell.formula, "im the formula", formulas);
  const formulaRegex = new RegExp(`\\b(${formulas.join("|")})\\b`);
  const parser = new FormulaParser.Parser();

  //   parser.on('callFunction', function (name: string, params: any, done: (arg0: number) => void) {
  //     if (name === 'VLOOKUP') {
  //         const data = transformData(state.cells)
  //         const vlookupvalue = params[0];
  //         const vlookupcolumn: number | null = params[2]
  //         console.log(params, 'pararara')

  //         let fragment: any;

  //         const matches = params[1].split(":")
  //         let start, end;
  //         if (matches) {
  //             start = matches[0]
  //             end = matches[1]
  //         }

  //         let startIndex = -1;
  //         let endIndex = -1;

  //         for (let i = 0; i < data.length; i++) {
  //             if (data[i][0] === start) {
  //                 startIndex = i;
  //             }
  //             if (data[i][0] === end) {
  //                 endIndex = i;
  //             }
  //         }

  //         if (startIndex !== -1 && endIndex !== -1) {
  //             const result = data.slice(Math.min(startIndex, endIndex), Math.max(startIndex, endIndex) + 1).find(a => a[0] === vlookupvalue);
  //             fragment = result;
  //         }
  //         if (fragment && vlookupcolumn) {
  //             done(fragment[vlookupcolumn - 1])
  //         }
  //     }
  // });

  const numCols = 5;
  const numRows = Math.ceil(state.cells.length / numCols);

  //cellrange area

  parser.on('callRangeValue', function (
    startCellCoord: {
      row: { index: number; };
      column: { index: number; };
      label: string
    },
    endCellCoord: {
      row: { index: number; };
      column: { index: number; };
      label: string
    }, done: (arg0: number[][]) => void) {
    const data = transformData(state.cells);

    const start = startCellCoord.label;
    const end = endCellCoord.label;

    let startIndex = -1;
    let endIndex = -1;
    let fragment: (string | number | null)[][] = [];

    // Find the indices of the start and end elements
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === start) {
        startIndex = i;
      }
      if (data[i][0] === end) {
        endIndex = i;
      }
    }

    if (startIndex !== -1 && endIndex !== -1) {
      const result = data.slice(Math.min(startIndex, endIndex), Math.max(startIndex, endIndex) + 1).map(a => a[6]);
      fragment.push(result); // Output: [3, 4, 2]
    }

    if (fragment) {
      // Use type assertion to convert null/undefined to 0
      const result = fragment.map(row => row.map(val => (val === null || val === undefined ? 0 : +val)));
      done(result);
    }
  });


  if (cell.formula) {
    if (formulaRegex.test(cell.formula)) {


      //can still be optimized @jr @js
      if (cell.formula.includes(":")) {
        try {
          // eslint-disable-next-line no-eval
          const result = parser.parse(cell.formula).result;
          // console.log(result, "cal");
          return { ...cell, value: result };
        } catch (error) {
          console.error(`Error in formula: ${cell.formula} - ${error}`);
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
        const result = parser.parse(formula).result;
        console.log(result, "cal");
        return { ...cell, value: result };
      } catch (error) {
        console.error(`Error in formula: ${formula} - ${error}`);
        return null;
      }
    } else if (cell.formula.includes('VLOOK')) {
      try {
        // eslint-disable-next-line no-eval
        const result = parser.parse('VLOOKUP("B2", "A2:VL7", 7, false)').result;
        return { ...cell, value: result };
      } catch (error) {
        console.error(`Error in formula: - ${error}`);
        return null;
      }
    } else {

      const formula = cell.formula.replace(/([A-Z][0-9]+)/g, (match) => {
        const dependentCell = state.cells.find((c) => c.address === match);
        if (dependentCell) {
          console.log(
            "from dependentcell check",
            dependentCell.value,
            dependentCell.formula
          );
          return dependentCell.value + "";
        } else {
          return "0";
        }
      });

      try {
        // eslint-disable-next-line no-eval
        console.log(formula, 'form')
        console.log(formula, "fromula from try");
        const result = eval(formula);
        console.log(result, "cal");
        return { ...cell, value: result };
      } catch (error) {
        console.error(`Error in formula: ${formula} - ${error}`);
        return null;
      }
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
  console.log("sheesh", state)
  const parser = new FormulaParser.Parser();
  parser.on('callFunction', function (name: string, params: any, done: (arg0: number) => void) {
    if (name === 'VLOOKUP') {
      const data = transformData(state.cells)
      const vlookupvalue = params[0];
      const vlookupcolumn: number | null = params[2]
      // console.log(params)

      let fragment: any;

      const matches = params[1].split(":")
      let start, end;
      if (matches) {
        start = matches[0]
        end = matches[1]
      }

      let startIndex = -1;
      let endIndex = -1;

      for (let i = 0; i < data.length; i++) {
        if (data[i][0] === start) {
          startIndex = i;
        }
        if (data[i][0] === end) {
          endIndex = i;
        }
      }

      if (startIndex !== -1 && endIndex !== -1) {
        const result = data.slice(Math.min(startIndex, endIndex), Math.max(startIndex, endIndex) + 1).find(a => a[0] === vlookupvalue);
        fragment = result;
      }
      if (fragment && vlookupcolumn) {
        done(fragment[vlookupcolumn - 1])
      }
    }
  });

  console.log(parser.parse('VLOOKUP("B2", "A2:C6", 7, "false")').result, "vlook that reads inputs");
});

let previousState = useCalculatorStore.getState();
// useCalculatorStore.subscribe((state) => {
//   const updatedElements = state.cells.filter(
//     (element, index) => element !== previousState.cells[index]
//   );

//   // Handle the updated elements
//   console.log('Updated elements:', updatedElements);

//   // Update the previous state
//   previousState = state;

// });
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
