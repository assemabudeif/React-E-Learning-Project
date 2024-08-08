import {combineReducers} from "redux";
import FavoritesReducer from "./FavoriteReducer";
import LoaderReducer from "./LoaderReducer";
import handleCart from "./handlecart";
import GetCoursesReducer from "./GetCoursesReducer";

export default combineReducers({
    favorites: FavoritesReducer,
    loader: LoaderReducer,
    cart: handleCart,
    courses: GetCoursesReducer,
})