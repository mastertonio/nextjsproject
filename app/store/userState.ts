import { State, UserContextTypes } from "@app/context/user.context";
import { setegid } from "process";
import { StateCreator, create } from "zustand";
import { createJSONStorage, devtools, persist, PersistOptions } from "zustand/middleware";

export interface UserState {
  user: UserContextTypes | null;
  token: string;
  refresh: string;
  expires: string;
  login: (user: UserContextTypes) => void;
  setToken: (token: string) => void;
  setExpires: (expires: string) => void;
  setRefresh: (refresh: string) => void;
}

type MyPersist = (
  config: StateCreator<UserState>,
  options: PersistOptions<UserState>
) => StateCreator<UserState>;

export const useUserStore = create<UserState>(
  (persist as MyPersist)(
    (set, get) => ({
      user: null
      // {
      //   verification_code: "",
      //   company_id: "",
      //   avatar: "",
      //   created_by: "",
      //   currency: "",
      //   email: "",
      //   email_verified_at: "",
      //   first_name: "",
      //   id: "",
      //   isEmailVerified: true,
      //   last_name: "",
      //   manager: "",
      //   name: "",
      //   phone: "",
      //   remember_token: "",
      //   role: "",
      //   status: 1
      // }
      ,
      token: "",
      refresh: "",
      expires: "",
      login: (user: UserContextTypes) =>
      set((state) => ({ ...state, user })),
      setToken: (token: string) => set({ token }),
      setExpires: (expires: string) => set({ expires }),
      setRefresh: (refresh: string) => set({ refresh }),
    }),
    {
      name: "user-storage", // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default the 'localStorage' is used
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
