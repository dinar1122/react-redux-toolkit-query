import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice'
import { postAPI } from "../services/PostService";
import {thunk} from 'redux-thunk'
const rootReducer = combineReducers({
  userReducer,
  [postAPI.reducerPath]: postAPI.reducer
})

export const setupStore = () => {
  return configureStore({reducer: rootReducer, middleware: (thunk) => thunk().concat(postAPI.middleware)})
} 
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']