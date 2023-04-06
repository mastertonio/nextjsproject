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

// Type for sections

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
  type: string;
  mainTitle: {
    type: string;
    style: string;
    text: string;
  };
  subTitle: {
    type: string;
    text: string;
  };
  description: string;
  quotes: {
    type: string;
    position: string;
    elements: {
      type: string;
      quote: Quote;
    }[];
  };
  content: {
    type: string;
    elements: any[];
  };
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
  type: string;
  classes: string;
  elements: any[];
}

interface Section {
  id: string;
  order: number;
  headers: {
    title: HeaderTitle;
  };
  GrayContent: GrayContent;
}

interface FinalData {
  sections: Section[];
  valueBucketName: string;
  sectionWriteUp: string;
  setSectionWriteUp: (id: string, writeup: string) => void;
  setVideoLink: (id: string, link: string) => void;
  setValueBucketName: (name: string) => void;
  setQuestions: (id: string, questions: string) => void;
  setSections: (section: Section[]) => void;
  addSection: () => void;
}

export const useSectionContentStore = create<FinalData>((set) => ({
  sections: [],
  valueBucketName: "",
  sectionWriteUp: "",
  setValueBucketName: (bucketName) => set({ valueBucketName: bucketName }),
  setSections: (sections) => set({ sections }),
  addSection: () => {
    const state = useSectionContentStore.getState();
    const newSection = {
      id: Date.now().toString(),
      type: "card",
      classes: "col-lg-4",
      title: state.valueBucketName,
      sliderType: "stacked",
      money: 0,
      label: "",
      value: 0,
      step: 0,
    };

    set({
      sections: [
        {
          id: Date.now().toString(),
          order: Math.floor(Math.random() * 100) + 1,
          headers: {
            title: {
              type: "element",
              mainTitle: {
                type: "text",
                style: "",
                text: `<h1 class="text-left text-[#676a6c] text-[26px] sm:text-[30px] font-medium">ROI DASHBOARD | 2 Year Projection <span class="float-right text-[#216C2A] font-bold">$0</span></h1>`,
              },
              subTitle: {
                type: "text",
                text: `<hr><h3 class="text-[22px] font-bold">Select a section below to review your ROI</h3>`,
              },
              description: `<p class="text-[16px]">To calculate your return on investment, begin with the first section below. The information entered therein will automatically populate corresponding fields in the other sections. You will be able to move from section to section to add and/or adjust values to best reflect your organization and process. To return to this screen, click the ROI Dashboard button to the left. <br><br></p>`,
              quotes: {
                type: "revolver",
                position: "bottom", //top , bottom of writeup, outside = outside entire section header
                elements: [
                  // {
                  //   type: "",
                  //   quote: {
                  //     text: "",
                  //     author: "",
                  //   },
                  // },
                ],
              },
              content: {
                type: "",
                elements: [],
              },
            },
          },
          GrayContent: {
            type: "sliders",
            classes: "row border-bottom gray-bg dashboard-header",
            elements: [newSection],
          },
        },
        ...state.sections,
      ],
    });

    localStorage.setItem(
      "valueBucket",
      JSON.stringify([
        {
          id: Date.now().toString(),
          order: Math.floor(Math.random() * 100) + 1,
          headers: {
            title: {
              type: "element",
              mainTitle: {
                type: "text",
                style: "",
                text: `<h1 class="text-left text-[#676a6c] text-[26px] sm:text-[30px] font-medium">ROI DASHBOARD | 2 Year Projection <span class="float-right text-[#216C2A] font-bold">$0</span></h1>`,
              },
              subTitle: {
                type: "text",
                text: `<hr><h3 class="text-[22px] font-bold">Select a section below to review your ROI</h3>`,
              },
              description: `<p class="text-[16px]">To calculate your return on investment, begin with the first section below. The information entered therein will automatically populate corresponding fields in the other sections. You will be able to move from section to section to add and/or adjust values to best reflect your organization and process. To return to this screen, click the ROI Dashboard button to the left. <br><br></p>`,
              quotes: {
                type: "revolver",
                position: "bottom", //top , bottom of writeup, outside = outside entire section header
                elements: [
                  // {
                  //   type: "",
                  //   quote: {
                  //     text: "",
                  //     author: "",
                  //   },
                  // },
                ],
              },
              content: {
                type: "",
                elements: [],
              },
            },
          },
          GrayContent: {
            type: "sliders",
            classes: "row border-bottom gray-bg dashboard-header",
            elements: [newSection],
          },
        },
        ...state.sections,
      ])
    );
  },
  setSectionWriteUp: (id, writeup) => {
    const state = useSectionContentStore.getState();
    // const updatedSections = state.sections.map((section) => {
    //   if (section.id === id) {
    //     return {
    //       type: "description",
    //       span: "auto",
    //       text: writeup,
    //     };
    //   } else {
    //     return section;
    //   }
    // });

    const updatedContentElements =
      state.sections.find((section) => section.id === id)?.headers?.title
        ?.content?.elements || [];

    const updatedSections = {
      type: "description",
      span: "auto",
      text: writeup,
    };

    updatedContentElements.push(updatedSections);

    set((prev) => {
      const updatedSections = prev.sections.map((section) => {
        if (section.id === id) {
          return {
            ...section,
            headers: {
              ...section.headers,
              content: {
                ...section.headers.title.content,
                elements: updatedContentElements,
              },
            },
          };
        } else {
          return section;
        }
      });

      localStorage.setItem("valueBucket", JSON.stringify(updatedSections));

      return {
        ...prev,
        sections: updatedSections,
      };
    });
  },
  setVideoLink: (id, link) => {
    const state = useSectionContentStore.getState();
    // const updateLink = state.sections.map((section) => {
    //   if (section.id === id) {
    //     return {
    //       type: "media",
    //       class: "col-lg-5",
    //       span: "auto",
    //       mediaOrigin: "video",
    //       link: link,
    //     };
    //   } else {
    //     return section;
    //   }
    // });

    const updatedContentLink =
      state.sections.find((section) => section.id === id)?.headers?.title
        ?.content?.elements || [];

    const updateLink = {
      type: "media",
      class: "col-lg-5",
      span: "auto",
      mediaOrigin: "video",
      link: link,
    };

    updatedContentLink.push(updateLink);

    set((prev) => {
      const updatedVidSections = prev.sections.map((section) => {
        if (section.id === id) {
          return {
            ...section,
            headers: {
              ...section.headers,
              content: {
                ...section.headers.title.content,
                elements: updatedContentLink,
              },
            },
          };
        } else {
          return section;
        }
      });

      localStorage.setItem("valueBucket", JSON.stringify(updatedVidSections));

      return {
        ...prev,
        sections: updatedVidSections,
      };
    });
  },
  setQuestions: (id) => {
    const state = useSectionContentStore.getState();

    const updatedQuestions: any =
      state.sections.find((section) => section.id === id)?.GrayContent || [];

    const questionsObj = {
      id: Date.now().toString(),
      type: "text",
      text: "<h4>Please tell us a little about your sales organization</h4>",
      toggle: true,
      elements: [],
    };

    updatedQuestions.push(questionsObj);

    set((prev) => {
      const updatedQuesSections: any = prev.sections.map((section) => {
        if (section.id === id) {
          return {
            ...section,
            headers: {
              ...section.headers,
              content: {
                ...section.headers.title.content,
              },
            },
            GrayContent: updatedQuestions,
          };
        } else {
          return section;
        }
      });

      return {
        ...prev,
        sections: updatedQuesSections,
      };
    });
  },
}));

// End of Definitions

interface CardSection {
  id: string;
  sectionName: string;
  sectionWriteUp: string;
  sectionVideoLink: string;
  type: string;
}

interface CardsProps {
  cards: CardSection[];
  newCardName: string;
  sectionWriteUp: string;
  sectionVideoLink: string;
  type: string;
  setCards: (cards: CardSection[]) => void;
  setNewCardName: (sectioName: string) => void;
  addCard: () => void;
  removeCard: (id: string) => void;
  setSectionWriteup: (writeup: string) => void;
  setSectionVideoLink: (videoLink: string) => void;
  setType: (typeChar: string) => void;
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
  type: "",
  setSectionWriteup: (writeup) => set({ sectionWriteUp: writeup }),
  setSectionVideoLink: (videoLink) => set({ sectionVideoLink: videoLink }),
  setType: (typeChar) => set({ type: typeChar }),
  addCard: () => {
    const state = useCardStore.getState();
    const newCard = {
      id: Date.now().toString(),
      sectionName: state.newCardName,
      sectionWriteUp: "",
      sectionVideoLink: "",
      type: "media",
    };
    set({
      cards: [...state.cards, newCard],
      newCardName: "",
      sectionWriteUp: "",
      sectionVideoLink: "",
      type: "media",
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
