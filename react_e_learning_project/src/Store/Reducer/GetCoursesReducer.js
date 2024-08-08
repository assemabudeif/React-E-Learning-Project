const INITIAL_VALUE = {
    courses: [],
}

export default function GetCoursesReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "GET_COURSES":
            return {
                ...state,
                courses: action.payload
            }
        default:
            return state
    }
}