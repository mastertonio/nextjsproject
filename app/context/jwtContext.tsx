import { AnyObject } from 'chart.js/types/basic'
import * as React from 'react'

type Action =
  | {
      type: "LOAD_TOKEN";
      token: string;
    }
  | {
      type: "UPDATE_TOKEN";
      token: string;
    };

type Dispatch = (action: Action) => void

type State = {
    token: string
}
type CountProviderProps = {children: React.ReactNode}

const CountStateContext = React.createContext<
  {state: State; dispatch: Dispatch} | undefined
>(undefined)

function userReducer(state: State , action: Action) {
    switch (action.type) {
      case "LOAD_TOKEN": {
        return {
          ...state,
          token: action.token
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

function UserProvider({children}: CountProviderProps) {
  const [state, dispatch] = React.useReducer(userReducer, { token: ''})
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = {state, dispatch}
  return (
    <CountStateContext.Provider value={value}>
      {children}
    </CountStateContext.Provider>
  )
}

function useUser() {
  const context = React.useContext(CountStateContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

export {UserProvider, useUser}