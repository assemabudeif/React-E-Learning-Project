const INITIAL_VALUE = {
    favorites: JSON.parse(localStorage.getItem("favorites")) || []
}
export default function FavoritesReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "SET_FAVORITE":
            return {
                ...state,
                favorites: action.payload
            }
        default:
            return state
    }
}