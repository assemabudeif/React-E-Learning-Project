import {AxiosInstance} from "../../Network/AxiosInstance";

export const GetCoursesList = (data) => (dispatch) => {
    return AxiosInstance.get("courses", {
        params: {
            _sort: 'name',
            _order: 'asc',
            ...data
        }
    }).then(
        (res) => dispatch({
            type: 'GET_COURSES',
            payload: res.data
        }),
    ).catch((error) => console.error(error.message));
}