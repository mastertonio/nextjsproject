import { setegid } from "process";
import { StateCreator, create } from "zustand";
import {
  createJSONStorage,
  devtools,
  persist,
  PersistOptions,
} from "zustand/middleware";

export const useTitleStore = create((set) => ({
  title: "",
}));

//   value={titleValue}
//               onChange={setTitle}
//               // onBlur={() => setDescChange(false)}
type ModalState = {
  value: boolean;
  show: () => void;
  hide: () => void;
};

export const useModalEntryStore = create<ModalState>((set) => ({
  value: false,
  show: () => set(() => ({ value: true })),
  hide: () => set(() => ({ value: false })),
}));

type AddModalEntryState = {
  value: boolean;
  show: () => void;
  hide: () => void;
};

export const useModalAddEntryStore = create<AddModalEntryState>((set) => ({
  value: false,
  show: () => set(() => ({ value: true })),
  hide: () => set(() => ({ value: false })),
}));

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

// Hamburger
type NavShowState = {
  value: boolean;
  show: () => void;
  hide: () => void;
};

export const useNavShowStore = create<NavShowState>((set) => ({
  value: false,
  show: () => set(() => ({ value: true })),
  hide: () => set(() => ({ value: false })),
}));

//
type TargetRefType = {
  targetRef: any;
  scrollableRef: any;
  setTargetRef: (ref: any) => void;
  setScrollableRef: (ref: any) => void;
};

export const useTargetRefStore = create<TargetRefType>((set) => ({
  targetRef: null,
  scrollableRef: null,
  setTargetRef: (ref: any) => {
    set({ targetRef: ref });
  },
  setScrollableRef: (ref: any) => {
    set({ scrollableRef: ref });
  },
}));

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

type MyPersist = (
  config: StateCreator<CalcState>,
  options: PersistOptions<CalcState>
) => StateCreator<CalcState>;

export const useCalcStore = create<CalcState>(
  (persist as MyPersist)(
    (set) => ({
      variables: [],
      add: (
        var_name: string,
        type: "INPUT" | "OUTPUT" | "FIXED",
        value: number
      ) =>
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
    }),
    {
      name: "builder-storage", // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default the 'localStorage' is used
    }
  )
);
