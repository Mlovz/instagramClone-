import { SUGGES_TYPES } from "../actions/suggesAction";

const initialState = {
  loading: false,
  users: [],
  firstLoad: false
};

const suggesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUGGES_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SUGGES_TYPES.GET_SUGGES_USERS:
      return {
        ...state,
        users: action.payload,
        firstLoad: action.payload.length === 0 ? false : true,
      };
    default:
      return state;
  }
};

export default suggesReducer;
