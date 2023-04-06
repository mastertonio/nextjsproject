import { useLocalStorage } from "@mantine/hooks";
import { createContext, useEffect, useMemo, useReducer, useState } from "react";

export interface UserContextTypes {
  verification_code?: string | null | undefined;
  phone?: string | null | undefined;
  manager?: string | null | undefined;
  first_name?: string | null | undefined;
  last_name?: string | null | undefined;
  currency?: string | null | undefined;
  email_verified_at?: string | null | undefined;
  remember_token?: string | null | undefined;
  role?: string | null | undefined;
  isEmailVerified?: boolean | null | undefined;
  avatar?: string | null | undefined;
  status?: number | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  company_id?: string | null | undefined;
  created_by?: string | null | undefined;
  id?: string | null | undefined;
  exp?: number | null | undefined;
  iat?: number | null | undefined;
  jti?: string | null | undefined;
  sub?: string | null | undefined;
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
