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

const FormulaParser = require("hot-formula-parser").Parser;

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

export const useCalculatorStore = create<Cell>((set) => ({
  cells: [
    {
      address: "A1",
      forcedValue: "",
      formTags: "input",
      format: "0,0",
      formula: null,
      label: "A",
      value: 10,
    },
    {
      address: "A2",
      forcedValue: "",
      format: "0,0%",
      formula: null,
      formTags: "input",
      label: "B",
      value: 30,
    },
    {
      address: "A3",
      forcedValue: "",
      format: "$0,0",
      formula: "A1 * A2 * 45.8",
      formTags: "output",
      label: "Total1",
      value: 0,
    },
    {
      address: "A4",
      forcedValue: "",
      format: "",
      formula: "SUM(45,56,23,11)",
      formTags: "input",
      label: "C",
      value: 10,
    },
    {
      address: "A5",
      forcedValue: "",
      format: "",
      formula: "SUM(A1, A3, A4)",
      label: "Total2 = Total1 + C",
      formTags: "output",
      value: 0,
    },
    {
      address: "A6",
      forcedValue: "",
      format: "",
      formula: "A5 * 10",
      formTags: "output",
      label: "Total 3 = Total1 + total2",
      value: 0,
    },
    {
        address: "A7",
        forcedValue: "",
        format: "",
        formula: "A5 * 10",
        formTags: "input",
        label: "Total 4",
        value: 0,
    },
  ],
  update: (cells: CellProps) =>
    set((state) => ({
      cells: state.cells.map((vars) => {
        if (vars.address === cells.address) {
          return {
            ...vars,
            value: cells.value,
          };
        } else {
          return vars;
        }
      }),
    })),
  eval: (cells: CellProps) =>
    set((state) => ({
      cells: state.cells.map((vars) => {
        if (vars.address === cells.address) {
          return {
            ...vars,
            value: cells.value,
          };
        } else {
          return vars;
        }
      }),
    })),
  registerCell: (cells: CellProps) =>
    set((state) => ({
      cells: state.cells.map((vars) => {
        if (vars.address === cells.address) {
          return {
            ...vars,
            value: cells.value,
          };
        } else {
          return vars;
        }
      }),
    })),
}));

export interface Sheet {
    affectedCells: string[];
    cells: Cell[];
    elements: Cell[];
    elementsToHide?: string[];
    elementsToShow?: string[];
    comparator?: {
      equal: (a: number, b: number) => number;
      greater: (a: number, b: number) => number;
      greaterEqual: (a: number, b: number) => number;
      less: (a: number, b: number) => number;
      lessEqual: (a: number, b: number) => number;
      notEqual: (a: number, b: number) => number;
    };
    lang?: string;
    visibilities?: [];
  }
  
  interface ISheetProps {
    sheet: Sheet | null;
    //   addSection: () => void;
    //   reorder: (state: iSectionData[]) => void;
    //   remove: (id: number) => void;
  }


// export const useCalculatorSheetStore = create<Sheet>((set) => ({
//     affectedCells: ,
//     cells: ,
//     elements: ,
    
//   }));

const unsub1 = useCalculatorStore.subscribe(console.log);
unsub1();
