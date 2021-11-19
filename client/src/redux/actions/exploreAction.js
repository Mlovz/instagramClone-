import {GLOBALTYPES} from './globalTypes'
import {getDataApi} from '../../utils/fetchData'

export const EXPLORE_TYPES = {
  LOADING: "EXPLORE_LOADING",
  GET_EXPLORE_POSTS: "GET_EXPLORE_POSTS",
};

export const getExplorePosts = (token) => async (dispatch) => {
  try {
    dispatch({type: EXPLORE_TYPES.LOADING, payload: true})
    const res = await getDataApi('post_discover', token)

    console.log(res);

    dispatch({type: EXPLORE_TYPES.GET_EXPLORE_POSTS, payload: res.data.posts})
    
    dispatch({type: EXPLORE_TYPES.LOADING, payload: false})
      
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};
