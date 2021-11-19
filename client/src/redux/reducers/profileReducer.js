import { POST_TYPES } from "../actions/postAction";
import { PROFILE_TYPES } from "../actions/profileAction";

const initialState = {
  loading: false,
  users: [],
  user_posts: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case PROFILE_TYPES.GET_USER:
      return {
        ...state,
        users: [...state.users, action.payload.user],
      };
    case PROFILE_TYPES.FOLLOW:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case PROFILE_TYPES.UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };

    case PROFILE_TYPES.GET_POSTS:
      return {
        ...state,
        user_posts: action.payload
      };
    case POST_TYPES.UPDATE_POST:
      return {
        ...state,
        user_posts: state.user_posts.map(post => (
          post._id === action.payload._id ? action.payload : post
        )),
      };
    default:
      return state;
  }
};

export default profileReducer;
