import {applyMiddleware, createStore} from "redux";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import CombineReducers from "./Reducers/CombineReducers";

const AppStore = createStore(CombineReducers, composeWithDevTools(applyMiddleware(thunk)))

export default AppStore;