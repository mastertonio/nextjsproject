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
import { iSectionData } from "@app/admin/components/Sections";

export interface UserState {
  user: UserContextTypes | null;
  token: string;
  refresh: string;
  login: (user: UserContextTypes) => void;
  setToken: (token: string) => void;
  setRefresh: (refresh: string) => void;
}

export interface IBuilderSubState {
  id: number;
  symbol: string;
  sectionName: string;

  sectionWriteUp: string;
  sectionVideo: string;
  sectionFormula: string;
}

interface IBuilderState {
  content: IBuilderSubState[];
  addSection: () => void;
  reorder: (state: IBuilderSubState[]) => void;
  remove: (id: number) => void;
  update: (variable: IBuilderSubState) => void
}

type MyPersist = (
  config: StateCreator<IBuilderState>,
  options: PersistOptions<IBuilderState>
) => StateCreator<IBuilderState>;

export const customConfig: Config = {
  dictionaries: [adjectives, colors, animals],
  separator: " ",
  length: 3,
};

export const useBuilderStore = create<IBuilderState>((set) => ({
  content: [],
  addSection: () =>
    set((state) => ({
      content: [
        ...state.content,
        {
          id: Date.now(),
          symbol: "1" + Math.floor(Math.random() * 100),
          sectionName: "", 
          //uniqueNamesGenerator(customConfig),
          sectionWriteUp: "",
          sectionFormula: "",
          sectionVideo: "",
        },
      ],
    })),
  reorder: (order: IBuilderSubState[]) =>
    set({
      content: order,
    }),
  remove: (id: number) =>
    set((state) => ({
      content: state.content.filter((vars) => vars.id !== id),
    })),
  update: (variable: IBuilderSubState) =>
    set((state) => ({
      content: state.content.map((vars) => {
        if (vars.id === variable.id) {
          return {
            ...vars,
            sectionName: variable.sectionName,
            sectionVideo: variable.sectionVideo,
            sectionFormula: variable.sectionFormula,
          };
        } else {
          return vars;
        }
      }),
    })),
}));



export type iSectionSubState = {
  id: number;
  symbol: string;
  sectionName: string;
  sectionWriteUp: string;
  sectionVideo: string;
  sectionFormula: string;
}



interface ISectionState {
  section: iSectionData[];
  addSection: () => void;
  reorder: (state: iSectionData[]) => void;
  remove: (id: number) => void;
}

export const useSectionsStore = create<ISectionState>((set) => ({
  section: [],
  addSection: () =>
    set((state) => ({
      section: [
        ...state.section,
      ],
    })),
  reorder: (order: iSectionData[]) =>
    set({
      section: order,
    }),
  remove: (id: number) =>
    set((state) => ({
      section: state.section.filter((vars) => vars.id !== id),
    })),
}));
