export default (state, action) => {
  switch (action.type) {
    case "ADD_ANIME_TO_WATCHLIST":
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };
    case "DELETE_ANIME_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: [
          ...state.watchlist.filter((anime) => anime.mal_id !== action.payload),
        ],
      };
  }
};
