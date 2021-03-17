import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
};
export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
  }, [state]);

  const addAnimeToWatchList = (anime) => {
    dispatch({ type: "ADD_ANIME_TO_WATCHLIST", payload: anime });
  };
  const deleteAnimeFromWatchList = (id) => {
    dispatch({ type: "DELETE_ANIME_FROM_WATCHLIST", payload: id });
  };
  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        addAnimeToWatchList,
        deleteAnimeFromWatchList,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
