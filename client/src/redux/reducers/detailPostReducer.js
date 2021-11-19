import { POST_TYPES } from "../actions/postAction";

const initialState = {
  loading: false,
  posts: [],
  result: 0
};

const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPES.GET_POST_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case POST_TYPES.GET_POST:
      return {
        ...state,
        posts: [action.payload],
        result: [action.payload].length
      };
    case POST_TYPES.UPDATE_POST:
        return {
          ...state,
          posts: state.posts.map(post => (
              post._id === action.payload._id ? action.payload : post
          )),
        };
    default:
      return state;
  }
};

export default detailReducer;