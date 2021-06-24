import { createContext, useContext, useReducer } from "react";
import { reducer,initialState } from "./Reducers/userReducer";
export const MediaContext = createContext();

export function MediaProvider({ children }) {

    const[state,dispatch]=useReducer(reducer,initialState);
  return <MediaContext.Provider value={{state,dispatch}}>
      {children}
      </MediaContext.Provider>;
}

export function useMedia() {
  return useContext(MediaContext);
}
