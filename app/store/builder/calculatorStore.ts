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

const FormulaParser = require("hot-formula-parser");
const formulas = FormulaParser.SUPPORTED_FORMULAS

import { iSectionData } from "@app/admin/components/Sections";

export interface UserState {
  user: UserContextTypes | null;
  token: string;
  refresh: string;
  login: (user: UserContextTypes) => void;
  setToken: (token: string) => void;
  setRefresh: (refresh: string) => void;
}

// export interface IBuilderSubState {
//   id: number;
//   symbol: string;
//   sectionName: string;

//   sectionWriteUp: string;
//   sectionVideo: string;
//   sectionFormula: string;
// }

// interface IBuilderState {
//   content: IBuilderSubState[];
//   addSection: () => void;
//   reorder: (state: IBuilderSubState[]) => void;
//   remove: (id: number) => void;
//   update: (variable: IBuilderSubState) => void
// }

// type MyPersist = (
//   config: StateCreator<IBuilderState>,
//   options: PersistOptions<IBuilderState>
// ) => StateCreator<IBuilderState>;

// {
//   address: "A4",
//   forcedValue: "",
//   format: "",
//   formula: "SUM(45,56,23,11)",
//   formTags: "input",
//   label: "C",
//   value: 0,
// },
// {
//   address: "A5",
//   forcedValue: "",
//   format: "",
//   formula: "SUM(A1, A3, A4)",
//   label: "Total2 = Total1 + C",
//   formTags: "output",
//   value: 0,
// },
// {
//   address: "A6",
//   forcedValue: "",
//   format: "",
//   formula: "A5 * 10",
//   formTags: "output",
//   label: "Total 3 = Total1 + total2",
//   value: 0,
// },
// {
//   address: "A7",
//   forcedValue: "",
//   format: "",
//   formula: "A5 * 10",
//   formTags: "input",
//   label: "Total 4",
//   value: 0,
// },

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

// ((A2+A1)*A1)-A3

export const useCalculatorStore = create<Cell>((set) => ({
  cells: [
    {
      address: "A1",
      forcedValue: "",
      formTags: "input",
      format: "0,0",
      formula: null,
      label: "A",
      value: 0,
    },
    {
      address: "A2",
      forcedValue: "",
      format: "0,0%",
      formula: null,
      formTags: "input",
      label: "B",
      value: 0,
    },
    {
      address: "A3",
      forcedValue: "",
      format: "$0,0",
      formula: "A1*A2*10",
      formTags: "output",
      label: "Total1 - A1*A2*10",
      value: 0,
    },
    {
      address: "A4",
      forcedValue: "",
      format: "",
      formula: "SUM([[1, 2 , 3, 4], [5, 6, 7, 8]])",
      formTags: "output",
      label: "SUM([[1, 2 , 3, 4], [5, 6, 7, 8]])",
      value: 0,
    },
    {
      address: "A5",
      forcedValue: "",
      format: "",
      formula: "A3+A4",
      label: "Total2 = Total1 + C",
      formTags: "output",
      value: 0,
    },
    {
      address: "A6",
      forcedValue: "",
      format: "",
      formula: "A3+A5",
      formTags: "output",
      label: "Total 3 = Total1 + total2 (A3+A5)",
      value: 0,
    },
    // {
    //   address: "A7",
    //   forcedValue: "",
    //   format: "",
    //   formula: "A3+A5+A6",
    //   formTags: "input",
    //   label: "Total 4 - A3+A5+A6",
    //   value: 0,
    // },
    // {
    //   address: "A8",
    //   forcedValue: "",
    //   format: "",
    //   formula: "((A2+A1)*A1)+A3",
    //   formTags: "input",
    //   label: "Total 5 - Total1*Total1",
    //   value: 0,
    // },
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
  }
}));

function calculateFormula(cell: CellProps, state: CalculatorStore): CellProps | null {
  console.log(cell.formula, 'im the formula', formulas)
  const formulaRegex = new RegExp(`\\b(${formulas.join('|')})\\b`)
  const parser = new FormulaParser.Parser()
  
  if (cell.formula) {
    if(formulaRegex.test(cell.formula)){
      const formula = cell.formula.replace(/([A-Z][0-9]+)/g, (match) => {
        const dependentCell = state.cells.find((c) => c.address === match);
        if (dependentCell) {
          console.log('from dependentcell check', dependentCell.value.toString(), dependentCell.formula)
          return dependentCell.value.toString();
        } else {
          return "0";
        }
      });

      try {
        // eslint-disable-next-line no-eval
        const result = parser.parse(formula).result;
        console.log(result, 'cal')
        return { ...cell, value: result };
      } catch (error) {
        console.error(`Error in formula: ${formula} - ${error}`);
        return null;
      }
    }

    const formula = cell.formula.replace(/([A-Z][0-9]+)/g, (match) => {
      const dependentCell = state.cells.find((c) => c.address === match);
      if (dependentCell) {
        console.log('from dependentcell check', dependentCell.value.toString(), dependentCell.formula)
        return dependentCell.value.toString();
      } else {
        return "0";
      }
    });


    try {
      // eslint-disable-next-line no-eval
      console.log(formula, 'fromula from try')
      const result = eval(formula);
      console.log(result, 'cal')
      return { ...cell, value: result };
    } catch (error) {
      console.error(`Error in formula: ${formula} - ${error}`);
      return null;
    }
  }

  return null

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
  console.log(state)
  console.log(sheetStore)
})
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
  console.log("triggered")
})
