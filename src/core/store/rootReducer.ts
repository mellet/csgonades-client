import { combineReducers } from "redux";
import { AuthReducer } from "../authentication/AuthSlice";
import { FavoriteReducer } from "../../favorites/data/FavoriteSlice";

const rootReducer = combineReducers({
  authStore: AuthReducer,
  favoriteStore: FavoriteReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
