import {combineReducers} from "redux";
import GetCoursesReducer from "./GetCoursesReducer";
import LoaderReducer from "./LoaderReducer";
import GetCourseInfoReducer from "./GetCourseInfoReducer";

export default combineReducers({
    courses: GetCoursesReducer,
    loading: LoaderReducer,
    course: GetCourseInfoReducer,
})