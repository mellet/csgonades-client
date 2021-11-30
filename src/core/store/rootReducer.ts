import { combineReducers } from "redux";
import { FavoriteReducer } from "../../favorites/data/FavoriteSlice";

const rootReducer = combineReducers({
  favoriteStore: FavoriteReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
