import { EXPLORE_TYPES } from "../actions/exploreAction";

const initialState = {
  loading: false,
  posts: [],
  firstload: false,
};

const exploreReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPLORE_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case EXPLORE_TYPES.GET_EXPLORE_POSTS:
      return {
        ...state,
        posts: action.payload,
        firstload: action.payload.length === 0 ? false : true
      };
    default:
      return state;
  }
};

export default exploreReducer;
