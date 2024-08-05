const INITIAL_VALUE = {
    course: {}
}

export default function GetCourseInfoReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "GET_COURSE_INFO":
            return {
                ...state,
                course: action.payload
            }
        default:
            return state
    }
}