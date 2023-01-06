import { State, UserContextTypes } from "@app/context/user.context";
import { setegid } from "process";
import create, { StateCreator } from "zustand";
import { devtools, persist, PersistOptions } from "zustand/middleware";

export interface UserState {
  user: UserContextTypes | null;
  token: string;
  refresh: string;
  login: (user: UserContextTypes) => void;
  setToken: (token: string) => void;
  setRefresh: (refresh: string) => void;
}

type MyPersist = (
  config: StateCreator<UserState>,
  options: PersistOptions<UserState>
) => StateCreator<UserState>;

// export const useUserStore = create<UserState>((set) => ({
//   user: null,
//   token: "",
//   refresh: "",
//   login: (user: UserContextTypes) => set((state) => ({ ...state, user })),
//   setToken: (token: string) => set({ token }),
//   setRefresh: (refresh: string) => set({ refresh }),
// }));

export const useUserStore = create<UserState>(
  (persist as MyPersist)(
    (set, get) => ({
      user: null,
      token: "",
      refresh: "",
      login: (user: UserContextTypes) =>
        set((state) => ({ ...state, user })),
      setToken: (token: string) => set({ token }),
      setRefresh: (refresh: string) => set({ refresh }),
    }),
    {
      name: "user-storage", // unique name
      getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
    }
  )
);

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
