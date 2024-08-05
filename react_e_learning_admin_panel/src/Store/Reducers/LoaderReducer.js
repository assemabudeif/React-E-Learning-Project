const INITIAL_VALUE = {
    loading: true
}

export default function LoaderReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "LOADER":
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}