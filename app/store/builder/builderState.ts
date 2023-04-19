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
import axios from "axios";

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
  addSectionParam: (cont: IBuilderSubState) => void;
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
          symbol: "A" + Math.floor(Math.random() * 100),
          sectionName: "New Section",
          //uniqueNamesGenerator(customConfig),
          sectionWriteUp: "",
          sectionFormula: "",
          sectionVideo: "",
        },
      ],
    })),
  addSectionParam: (cont: IBuilderSubState) =>
    set((state) => ({
      content: [
        ...state.content,
        {
          id: Date.now(),
          symbol: "A" + Math.floor(Math.random() * 100),
          sectionName: cont.sectionName,
          //uniqueNamesGenerator(customConfig),
          sectionWriteUp: cont.sectionWriteUp,
          sectionFormula: cont.sectionFormula,
          sectionVideo: cont.sectionVideo,
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

// New Update by Joemari 04-12-2023
interface QuestionProps {
  id: number;
  title: string;
  type: string;
  format: string;
  decimalPlace: string;
  currency: string;
  tooltip: string;
  appendedText: string;
  prefilled: string;
  formula: string;
  address: string;
  sections: string;
}

interface SecionQuestionProps {
  questions: QuestionProps[];
  addQuestions: ({ values }: any) => void;
  updateQuestions: ({ id, values }: any) => void;
}

export const useQuestionPropsStore = create<SecionQuestionProps>((set) => ({
  questions: [],
  addQuestions: ({ values }: any) => {
    console.log("values state", values?.formEntry[0].title);
    const state = useQuestionPropsStore.getState();
    const newQuestion = {
      id: Math.floor(Math.random() * 100),
      title: values?.formEntry[0].title,
      type: values?.formEntry[0].type,
      format: values?.formEntry[0].format,
      decimalPlace: values?.formEntry[0].decimalPlace,
      currency: values?.formEntry[0].currency,
      tooltip: values?.formEntry[0].tooltip,
      prefilled: values?.formEntry[0].prefilled,
      appendedText: values?.formEntry[0].appendedText,
      formula: values?.formEntry[0].formula,
      address: values?.formEntry[0].address,
      sections: values?.formEntry[0].sections,
    };

    set({
      questions: [...state.questions, newQuestion],
    });
  },
  updateQuestions: ({ values }: any) => {
    const state = useQuestionPropsStore.getState();
    const updatedQuestions = state.questions.map((question) => {
      if (question.id === values?.formEntry[0].id) {
        return {
          ...question,
          ...values.formEntry[0],
        };
      }
      return question;
    });

    set({
      questions: updatedQuestions,
    });
  },
}));
// End Question

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
  // Choice
  newChoice: boolean;
  updateChoice: boolean;
  choiceValue: string;
  setChoiceValue: (char: string) => void;
  setUpdateChoice: (b: boolean) => void;
  setOpenChoice: (b: boolean) => void;

  // Format
  formatChoice: string;
  setFormatValue: (char: string) => void;
}

export const useNewStore = create<NewChoice>((set) => ({
  newChoice: false,
  updateChoice: false,
  choiceValue: "",
  setChoiceValue: (state) => set(() => ({ choiceValue: state })),
  setUpdateChoice: (state) => set(() => ({ updateChoice: state })),
  setOpenChoice: (state) => set(() => ({ newChoice: state })),
  // format
  formatChoice: "",
  setFormatValue: (state) => set(() => ({ formatChoice: state })),
}));

// richtext

interface ICalculatorState {
  val: number;
}

export const useCalculationStore = create<ICalculatorState>((set) => ({
  val: 0,
}));

// Types for section builder

// set token
interface TokenProps {
  tokenChar: string;
  setTokenChar: (char: string) => void;
}

export const useTokenStore = create<TokenProps>((set) => ({
  tokenChar: "",
  setTokenChar: (state) => set(() => ({ tokenChar: state })),
}));

interface Quote {
  text: string;
  author: string;
}

interface ContentElement {
  type: string;
  span: string;
  text: string;
}

interface HeaderTitle {
  dataType: string;
  mainTitle: {
    dataType: string;
    style: string;
    text: string;
  };
  subTitle: {
    dataType: string;
    text: string;
  };
  description: string;
  quotes: {
    dataType: string;
    position: string;
    elements: {
      dataType: string;
      quote: Quote;
    }[];
  };
  // content: {
  //   dataType: string;
  //   elements: any[];
  // };
}

interface Slider {
  type: string;
  classes: string;
  title: string;
  sliderType: string;
  money: number;
  label: string;
  value: number;
  step: number;
  id: string;
}

interface GrayContent {
  dataType: string;
  classes: string;
  elements: any[];
}

interface Section {
  address: string;
  sectionTitle: string;
  order: number;
  headers: HeaderTitle;
  grayContent: GrayContent;
}

interface FinalData {
  sections: Section[];
  valueBucketName: string;
  addSection: () => void;
  setValueBucketName: (name: string) => void;
}

export const useSectionBuilderStore = create<FinalData>((set) => ({
  sections: [],
  valueBucketName: "",
  setValueBucketName: (bucketName) => set({ valueBucketName: bucketName }),
  addSection: async () => {
    const state = useSectionBuilderStore.getState();
    const tokenState = useTokenStore.getState();
    const newGrayContent = {
      dataType: "card",
      label: "",
      classes: "col-lg-4",
      title: state.valueBucketName,
      sliderType: "stacked",
      value: 0,
      address: "CON1940",
    };

    const data = {
      sections: [
        {
          address: "3c681809-0e2d-45fd-8603-124d6cde3cb2",
          sectionTitle: "test title entry",
          order: 1,
          headers: {
            dataType: "element",
            mainTitle: {
              dataType: "text",
              style: "",
              text: '<h1 class="text-left text-[green] text-[26px] sm:text-[2em]">ROI DASHBOARD | 2 Year Projection <span class="float-right">$0</span></h1>',
            },
            subTitle: {
              dataType: "text",
              text: '<hr><h3 class="text-[22px] font-bold">Select a section below to review your ROI</h3>',
            },
            description: "",
            quotes: {
              dataType: "",
              position: "",
              elements: [],
            },
          },
          grayContent: {
            dataType: "sliders",
            classes: "row border-bottom gray-bg dashboard-header",
            elements: [newGrayContent],
          },
        },
        ...state.sections,
      ],
    };

    const config = {
      headers: {
        Authorization: `Bearer ${tokenState.tokenChar}`,
      },
    };

    console.log("token", tokenState.tokenChar);
    console.log("Value Bukcet", state.valueBucketName);

    try {
      const res = await axios.put(
        "/v1/company/62b2a6f9061ed2a095b55555/template/6287791836bddb586c11082a/version/64368eebd9ff1b8e24aa6323/adminTool",
        data,
        config
      );
      console.log("PUT response", res);
      set({ sections: res.data });
    } catch (error) {
      console.log("PUT ERROR", error);
    }

    // set({
    //   sections: [
    //     {
    //       address: "3c681809-0e2d-45fd-8603-124d6cde3cb2",
    //       sectionTitle: "test title entry",
    //       order: 1,
    //       headers: {
    //         dataType: "element",
    //         mainTitle: {
    //           dataType: "text",
    //           style: "",
    //           text: '<h1 class="text-left text-[green] text-[26px] sm:text-[2em]">ROI DASHBOARD | 2 Year Projection <span class="float-right">$0</span></h1>',
    //         },
    //         subTitle: {
    //           dataType: "text",
    //           text: '<hr><h3 class="text-[22px] font-bold">Select a section below to review your ROI</h3>',
    //         },
    //         description: "",
    //         quotes: {
    //           dataType: "",
    //           position: "",
    //           elements: [],
    //         },
    //       },
    //       grayContent: {
    //         dataType: "sliders",
    //         classes: "row border-bottom gray-bg dashboard-header",
    //         elements: [newGrayContent],
    //       },
    //     },
    //     ...state.sections,
    //   ],
    // });
  },
}));
