import { POST_TYPES } from "../actions/postAction";

const initialState = {
  loading: false,
  get_load: false,
  posts: [],
  result: 0,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case POST_TYPES.ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case POST_TYPES.GET_LOADING:
      return {
        ...state,
        get_load: action.payload,
      };
    case POST_TYPES.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
      };
    case POST_TYPES.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case POST_TYPES.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(item => item._id !== action.payload._id)
      };
    default:
      return state;
  }
};

export default postReducer;
