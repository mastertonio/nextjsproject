import { State, UserContextTypes, UserDataProp } from "@app/context/user.context";
import { setegid } from "process";
import { StateCreator, create } from "zustand";
import { createJSONStorage, devtools, persist, PersistOptions } from "zustand/middleware";


interface TokenTypes {
  tokens: {
    access: {
      token: string,
      expires: string
    },
    refresh: {
      token: string,
      expires: string
    }
  }
}
export interface UserState {
  user: UserDataProp | null;
  login: (user: UserDataProp) => void;
}

type MyPersist = (
  config: StateCreator<UserState>,
  options: PersistOptions<UserState>
) => StateCreator<UserState>;




export const useUserStore = create<UserState>((set) => ({
  user: null,
  login: (user: UserDataProp) => {
    set((state) => ({ ...state, user }))
  },
})
);

useUserStore.subscribe((state) => {
  console.log(state.user?.tokens, "state from subscribe")
})

type VarState = {
  id: string;
  var_name: string;
  type: "INPUT" | "OUTPUT" | "FIXED";
  value: number;
};

interface CalcState {
  variables: VarState[];
  add: (
    var_name: string,
    type: "INPUT" | "OUTPUT" | "FIXED",
    value: number
  ) => void;
  remove: (var_name: string) => void;
  update: (obj: VarState) => void;
}

export const useCalcStore = create<CalcState>((set) => ({
  variables: [],
  add: (var_name: string, type: "INPUT" | "OUTPUT" | "FIXED", value: number) =>
    set((state) => ({
      variables: [
        { id: Math.random() * 100 + "", var_name, type, value },
        ...state.variables,
      ],
    })),
  remove: (id) =>
    set((state) => ({
      variables: state.variables.filter((vars) => vars.id !== id),
    })),
  update: (variable) =>
    set((state) => ({
      variables: state.variables.map((vars) => {
        if (vars.id === variable.id) {
          return {
            ...vars,
            var_name: variable.var_name,
            type: variable.type,
            value: variable.value,
          };
        } else {
          return vars;
        }
      }),
    })),
}));
