import { AnyObject } from "chart.js/types/basic";
import React, { FC, useMemo } from "react";

interface State {
    user: AnyObject,
    tokens: AnyObject,
}

const initialState = {
    user: {},
    tokens: {}
};

type Action =
  | {
      type: "LOAD_TOKEN";
      token: string;
    }
  | {
      type: "UPDATE_TOKEN";
      token: string;
    };

export const UserContext = React.createContext<State | AnyObject>(initialState);

UserContext.displayName = "UserContext";

function userReducer(state: State | AnyObject, action: Action) {
  switch (action.type) {
    case "LOAD_TOKEN": {
      return {
        ...state,
      };
    }
    case "UPDATE_TOKEN": {
      return {
        ...state,
        token: action.token,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

export const UserProvider: FC<any> = ({children}) => {
  const [state, dispatch] = React.useReducer(userReducer, initialState);
  const setToken = (token: string) => {
    dispatch({ type: "UPDATE_TOKEN", token });
  };

  const loadToken = async (token: string) => {
    dispatch({ type: "LOAD_TOKEN", token });
  };
  const value = useMemo(
    () => ({
      ...state,
      setToken,
      loadToken,
    }),
    [state]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
};
