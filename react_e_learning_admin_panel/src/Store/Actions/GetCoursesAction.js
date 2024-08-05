import {AxiosInstance} from "../../Network/AxiosInstance";

export const GetCoursesList = (data) => (dispatch) => {
    return AxiosInstance.get("courses").then(
        (res) => dispatch({
            type: 'GET_COURSES',
            payload: res.data
        }),
    ).catch((error) => console.error(error.message));
}