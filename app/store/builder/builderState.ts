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
const parser = new FormulaParser();

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
  update: (variable: IBuilderSubState) => void;
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
          sectionName: "New Section",
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
};

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
      section: [...state.section],
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

// Section Writeup
interface SectionWriteup {
  sectionWriteUp: string;
  setSectionWriteup: (writeup: string) => void;
}

export const useSectionWriteupStore = create<SectionWriteup>((set) => ({
  sectionWriteUp: "",
  setSectionWriteup: (writeup: string) => set({ sectionWriteUp: writeup }),
}));

interface CardSection {
  id: string;
  sectionName: string;
  sectionWriteUp: string;
  sectionVideoLink: string;
}

interface CardsProps {
  cards: CardSection[];
  newCardName: string;
  sectionWriteUp: string;
  sectionVideoLink: string;
  setCards: (cards: CardSection[]) => void;
  setNewCardName: (sectioName: string) => void;
  addCard: () => void;
  removeCard: (id: string) => void;
  setSectionWriteup: (writeup: string) => void;
  setSectionVideoLink: (videoLink: string) => void;
  updateSectionWriteUp: (id: string, writeup: string) => void;
  updateSectionVideoLink: (id: string, videoLink: string) => void;
}

export const useCardStore = create<CardsProps>((set) => ({
  cards: [],
  newCardName: "",
  setCards: (cards) => set({ cards }),
  setNewCardName: (sectioName) => set({ newCardName: sectioName }),
  sectionWriteUp: "",
  sectionVideoLink: "",
  setSectionWriteup: (writeup) => set({ sectionWriteUp: writeup }),
  setSectionVideoLink: (videoLink) => set({ sectionVideoLink: videoLink }),
  addCard: () => {
    const state = useCardStore.getState();
    const newCard = {
      id: Date.now().toString(),
      sectionName: state.newCardName,
      sectionWriteUp: "",
      sectionVideoLink: "",
    };
    set({
      cards: [...state.cards, newCard],
      newCardName: "",
      sectionWriteUp: "",
      sectionVideoLink: "",
    });
    localStorage.setItem(
      "valueBucket",
      JSON.stringify([...state.cards, newCard])
    );
  },
  updateSectionWriteUp: (id, writeup) => {
    const state = useCardStore.getState();
    const updatedCards = state.cards.map((card) => {
      console.log("card id", card.id);
      console.log("id", id);
      console.log("writeup", writeup);
      if (card.id === id) {
        return { ...card, sectionWriteUp: writeup };
      } else {
        return card;
      }
    });
    set({ cards: updatedCards });
    localStorage.setItem("valueBucket", JSON.stringify(updatedCards));
  },
  updateSectionVideoLink: (id, videoLink) => {
    const state = useCardStore.getState();
    const updatedCards = state.cards.map((card) => {
      console.log("card id", card.id);
      console.log("id", id);
      console.log("writeup", videoLink);
      if (card.id === id) {
        return { ...card, sectionVideoLink: videoLink };
      } else {
        return card;
      }
    });
    set({ cards: updatedCards });
    localStorage.setItem("valueBucket", JSON.stringify(updatedCards));
  },
  removeCard: (id: string) => {
    const state = useCardStore.getState();
    const updatedCards = state.cards.filter((card) => card.id !== id);
    set({ cards: updatedCards });
    localStorage.setItem("valueBucket", JSON.stringify(updatedCards));
  },
}));

// useSectionWriteupStore.subscribe((state: SectionWriteup) => {
//   useCardStore.setState((prev) => ({
//     ...prev,
//     sectionWriteUp: state.sectionWriteUp,
//   }));
// });

interface NewChoice {
  newChoice: boolean;
  updateChoice: boolean;
  choiceValue: string;
  setChoiceValue: (char: string) => void;
  setUpdateChoice: (b: boolean) => void;
  setOpenChoice: (b: boolean) => void;
}

export const useNewStore = create<NewChoice>((set) => ({
  newChoice: false,
  updateChoice: false,
  choiceValue: "",
  setChoiceValue: (state) => set(() => ({ choiceValue: state })),
  setUpdateChoice: (state) => set(() => ({ updateChoice: state })),
  setOpenChoice: (state) => set(() => ({ newChoice: state })),
}));

// richtext

interface ICalculatorState {
  val: number;
}

export const useCalculationStore = create<ICalculatorState>((set) => ({
  val: 0,
}));
