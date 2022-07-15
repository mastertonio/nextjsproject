import { Router, useRouter } from "next/router";
import React, { useCallback, useReducer } from "react";
import { useLocalStorage } from "@mantine/hooks";
import dayjs from "dayjs";

interface State {
  welcome: object;
  admin_list: object[];
  template_list: object[];
  roi_list: object[];
  viewcount: object[];
  ranking: object[];
  barGraph: object;
  searchTitle: object;
}

const initialState = {
  welcome: {},
  admin_list: [],
  template_list: [],
  roi_list: [],
  viewcount: [],
  ranking: [],
  barGraph: {},
  searchTitle: {},
};

export const DashboardContext = React.createContext<State | any>({});

const dashboardReducer = (state: any, action: { type: any; payload?: any }) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_WELCOME":
      return {
        ...state,
        welcome: payload,
      };
    case "GET_ADMIN_LIST":
      return {
        ...state,
        admin_list: payload,
      };
    case "GET_TEMPLATE_LIST":
      return {
        ...state,
        template_list: payload,
      };
    case "GET_ROI_LIST":
      return {
        ...state,
        roi_list: payload,
      };
    case "GET_VIEWCOUNT":
      return {
        ...state,
        viewcount: payload,
      };
    case "GET_RANKING":
      return {
        ...state,
        ranking: payload,
      };
    case "GET_BAR_GRAPH":
      return {
        ...state,
        barGraph: payload,
      };
    case "GET_SEARCH_TITLE":
      return {
        ...state,
        searchTitle: payload,
      };
    default:
      return state;
  }
};

const DashboardContextProvider = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const router = useRouter();
  const [dashboardState, dispatch] = useReducer(dashboardReducer, initialState);
  const [localUser, setLocalUser] = useLocalStorage({
    key: "current-user",
  });

  const getWelcome = (data: any) => {
    dispatch({ type: "GET_WELCOME", payload: data });
  };
  const getAdminList = (data: any) => {
    dispatch({ type: "GET_ADMIN_LIST", payload: data });
  };
  const getTemplateList = (data: any) => {
    dispatch({ type: "GET_TEMPLATE_LIST", payload: data });
  };
  const getRoiList = (data: any) => {
    dispatch({ type: "GET_ROI_LIST", payload: data });
  };

  const getViewCount = (data: any) => {
    dispatch({ type: "GET_VIEWCOUNT", payload: data });
  };
  const getRanking = (data: any) => {
    dispatch({ type: "GET_RANKING", payload: data });
  };
  const getBarGraph = (data: any) => {
    dispatch({ type: "GET_BAR_GRAPH", payload: data });
  };
  const getSearchTitle = (data: any) => {
    dispatch({ type: "GET_SEARCH_TITLE", payload: data });
  };


  return (
    <DashboardContext.Provider
      value={{
        localUser,
        setLocalUser,
        getAdminList,
        getBarGraph,
        getRanking,
        getRoiList,
        getSearchTitle,
        getViewCount,
        getWelcome,
        getTemplateList,

        welcome: dashboardState.welcome,
        admin_list: dashboardState.admin_list,
        template_list: dashboardState.template_list,
        roi_list: dashboardState.roi_list,
        viewcount: dashboardState.viewcount,
        ranking: dashboardState.ranking,
        barGraph: dashboardState.barGraph,
        searchTitle: dashboardState.searchTitle,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
