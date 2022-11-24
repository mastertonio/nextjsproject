import { setegid } from "process";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useTitleStore = create((set) => ({
  title: "",
}));

//   value={titleValue}
//               onChange={setTitle}
//               // onBlur={() => setDescChange(false)}
type HeaderState = {
  value: boolean;
  open: () => void;
  close: () => void;
};

export const useHeaderStore = create<HeaderState>((set) => ({
  value: false,
  open: () => set(() => ({ value: true })),
  close: () => set(() => ({ value: false })),
}));

type VarState = {
  id: string;
  var_name: string;
  type: "INPUT" | "OUTPUT" | "FIXED";
  value: number;
};

interface CalcState {
  variables: VarState[];
  add: (var_name: string, type: "INPUT" | "OUTPUT" | "FIXED", value: number) => void;
  remove: (var_name: string) => void;
  update: (obj: VarState) => void
}

export const useCalcStore = create<CalcState>((set) => ({
  variables: [],
  add: (var_name: string, type: "INPUT" | "OUTPUT" | "FIXED", value: number) =>
    set((state) => ({
      variables: [{ id: Math.random() * 100 + '', var_name, type, value }, ...state.variables],
    })),
  remove: (id) =>
    set((state) => ({
      variables: state.variables.filter((vars) => vars.id !== id),
    })),
  update: variable =>
    set(state => ({
      variables: state.variables.map(vars => {
        if (vars.id === variable.id) {
          return {
            ...vars,
            var_name: variable.var_name,
            type: variable.type,
            value: variable.value
          };
        } else {
          return vars;
        }
      })
    }))
}));
