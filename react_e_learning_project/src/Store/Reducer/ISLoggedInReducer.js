const INITIAL_VALUE = {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
}

export default function ISLoggedInReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "SET_IS_LOGGED_IN":
            return {
                ...state,
                isLoggedIn: action.payload
            }
        default:
            return state
    }
}