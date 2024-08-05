import {AxiosInstance} from "../../Network/AxiosInstance";

export const GetCourseInfo = (data) => (dispatch) => {
    return AxiosInstance.get("courses/" + data.id).then(
        (res) => dispatch({
            type: 'GET_COURSE_INFO',
            payload: res.data
        }),
    ).catch((error) => console.error(error.message));
}