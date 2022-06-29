import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from './reducers/counter/counterSlice'
import userReducer from './reducers/user/userSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const makeStore = () => {
  return configureStore({
    reducer: { 
      counter: counterReducer,
      user: userReducer
     },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export default store