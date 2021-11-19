import { POST_TYPES } from "./postAction";
import { GLOBALTYPES } from "./globalTypes";
import { patchDataApi, postDataApi } from "../../utils/fetchData";
import { createNotify } from "./notifyAction";

export const createComment =
  ({ post, newComment, auth,socket }) =>
  async (dispatch) => {

    const newPost = { ...post, comments: [...post.comments, newComment] };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    
    try {
      const data = {
        ...newComment,
        postId: post._id,
        postUserId: post.user._id,
      };

      const res = await postDataApi("comment", data, auth.token);
      const newData = { ...res.data.newComment, user: auth.user };
      const newPost = { ...post, comments: [...post.comments, newData] };

      socket.emit('createComment', newPost)

      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

      const msg = {
        id: res.data.newComment._id,
        text: newComment.reply ? 'ответил на ваш комментарий': 'прокомментировал ваш пост',
        recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        user: auth.user,
        image: post.images[0].url
    }

    dispatch(createNotify({msg, auth, socket}))
      
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const likeComment =({ comment, post, auth }) => async (dispatch) => {
  const newComment = {...comment, likes: [...comment.likes, auth.user]}
  const newComments = post.comments.map(item => (
    item._id === comment._id ? newComment : item
  ));

  const newPost = {...post, comments: newComments}

  dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})

  try {
    const res = await patchDataApi(`/comment/${comment._id}/like`, null, auth.token)
    console.log(res);
    
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }

  
};

export const unlikeComment = ({ comment, post, auth }) => async (dispatch) => {
  const newComment = {...comment, likes: comment.likes.filter(item => item._id !== auth.user._id)}
  const newComments = post.comments.map(item => (
    item._id === comment._id ? newComment : item
  ));

  const newPost = {...post, comments: newComments}

  dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
  try {
    const res = await patchDataApi(`/comment/${comment._id}/unlike`, null, auth.token)
    console.log(res);
    
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
  
};
