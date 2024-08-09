import {combineReducers} from "redux";
import FavoritesReducer from "./FavoriteReducer";
import LoaderReducer from "./LoaderReducer";
import handleCart from "./handlecart";
import GetCoursesReducer from "./GetCoursesReducer";
import ISLoggedInReducer from "./ISLoggedInReducer";

export default combineReducers({
    favorites: FavoritesReducer,
    loader: LoaderReducer,
    cart: handleCart,
    courses: GetCoursesReducer,
    isLoggedIn: ISLoggedInReducer,
})