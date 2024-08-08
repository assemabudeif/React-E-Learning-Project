import {combineReducers} from "redux";
import FavoritesReducer from "./FavoriteReducer";
import LoaderReducer from "./LoaderReducer";
import handleCart from "./handlecart";

export default combineReducers({
    favorites: FavoritesReducer,
    loader: LoaderReducer,
    cart: handleCart,
})