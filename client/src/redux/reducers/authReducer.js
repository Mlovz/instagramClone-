import { AUTH_TYPES } from "../actions/authAction";

const initialState = {
  loading: false,
  refresh_load: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case AUTH_TYPES.REFRESH_LOAD:
      return {
        ...state,
        refresh_load: action.payload,
      };
    case AUTH_TYPES.AUTH:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
