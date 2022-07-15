import { Router, useRouter } from "next/router";
import React, { useCallback, useReducer } from "react";
import { useLocalStorage } from "@mantine/hooks";
import dayjs from "dayjs";

interface State {
  isProcessing: boolean;
  isAuthenticated: boolean;
  user: object;
  avatar: string;
  token: string;
}

const initialState = {
  isProcessing: false,
  isAuthenticated: false,
  user: null,
  avatar: "",
  tokens: ''
};

export const UserContext = React.createContext<State | any>({});

const UserReducer = (state: any, action: { type: any; payload?: any }) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_USER":
      if (payload) {
        return {
          ...state,
          user: payload.user,
          token: payload.token,
          authenticated: true,
        };
      }
      return {
        ...state,
        authenticated: false,
      };
    case "REGISTER_USER":
      return {
        authenticated: false,
        error: payload.error,
      };
    case "LOGIN_USER":
      return {
        ...state,
        user: payload,
        authenticated: true,
      };
    default:
      return state;
  }
};

const UserContextProvider = (props: {
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
  const [userState, dispatch] = useReducer(UserReducer, initialState);
  const [localUser, setLocalUser] = useLocalStorage({
    key: "selectedCustomer",
  });

  const fetchUser = (data: any) => {
    dispatch({ type: "FETCH_USER", payload: data });
  };

  const registerUser = (data: string) => {
    dispatch({ type: "REGISTER_USER", payload: data });
  };

  const loginUser = (data: any) => {
    dispatch({ type: "LOGIN_USER", payload: data });
    router.push({ query: { page: 0 } });
  };

  return (
    <UserContext.Provider
      value={{
        token: userState.token,

        fetchUser,
        registerUser,
        loginUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
