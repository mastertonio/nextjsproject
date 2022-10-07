import { useLocalStorage } from "@mantine/hooks";
import { createContext, useEffect, useMemo, useReducer, useState } from "react";

interface UserContextTypes {
  verification_code: string | null;
  phone: string;
  manager: string;
  first_name: string;
  last_name: string;
  currency: string;
  email_verified_at: string | null;
  remember_token: string | null;
  role: string;
  isEmailVerified: boolean;
  avatar: string;
  status: number;
  name: string;
  email: string;
  company_id: string;
  created_by: string;
  id: string;
}

export interface State {
  user: UserContextTypes;
  token: string;
  refresh: string;
}

const initialState = {
  user: {},
  token: "",
  refresh: "",
};

const UserContext = createContext<State | any>({});

const builderReducer = (state: any, action: { type: any; payload?: any }) => {
  const { type, payload } = action;
  switch (type) {
    case "USER_SIGNIN":
      return {
        ...state,
        user: payload.user,
        token: payload.tokens.access.token,
        refresh: payload.tokens.refresh.token,
      };
    case "GET_USER":
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        refresh: payload.refresh,
      };
    default:
      return state;
  }
};

export function UserContextProvider(props: any) {
  const [userState, dispatch] = useReducer(builderReducer, initialState);

  const login = (user: object) => {
    dispatch({ type: "USER_SIGNIN", payload: user });
  };

  const getToken = (user: object) => {
    dispatch({ type: "GET_USER", payload: user });
  };

  const context = useMemo(
    () => ({
      user: userState.user,
      token: userState.token,
      login,
      getToken
    }),
    [userState.token, userState.user]
  );

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
