import { useLocalStorage } from "@mantine/hooks";
import { createContext, useEffect, useMemo, useReducer, useState } from "react";

interface State {
  sections: object[];
  totalSections: number;
  addSection: (id: string) => void;
}

const initialState = {
  sections:[],
  totalSections: 0,
};

const BuilderContext = createContext<State | any>({});

const builderReducer = (state: any, action: { type: any; payload?: any }) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_SECTION":
      return {
        ...state,
        sections: [ ...state.sections, payload],
        totalSections: payload.length,
      };
    case "RE_ARRANGE":
        return {
            ...state,
            sections: payload
        }
    default:
      return state;
  }
};

export function BuilderContextProvider(props: any) {
  const [builderState, dispatch] = useReducer(builderReducer, initialState);

  const addSection = (sections: object) => {
    dispatch({ type: "ADD_SECTION", payload: sections });
  };

  const reArrangeSection = (sections: object) => {
    console.log(sections,"secs")
    dispatch({ type: "RE_ARRANGE", payload: sections });
  };

  const context = useMemo(
    () => ({
      sections: builderState.sections,
      totalSections: builderState.totalSections,
      addSection,
      reArrangeSection
    }),
    [
      builderState.sections,
      builderState.totalSections
    ]
  );

  return (
    <BuilderContext.Provider value={context}>
      {props.children}
    </BuilderContext.Provider>
  );
}

export default BuilderContext;
