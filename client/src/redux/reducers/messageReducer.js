import { MESSAGE_TYPES } from "../actions/messageAction";

const initialState = {
    loading: false,
    users: [],
    data: [],
}

const messageReducer = (state = initialState, action) => {
    switch(action.type) {
        case MESSAGE_TYPES.ADD_USER:
            return {
                ...state,
                users:[action.payload, ...state.users]
            }
        default:
            return state
    }
}

export default messageReducer