import { ImageUpload } from "../../utils/imageUpload";
import { GLOBALTYPES } from "./globalTypes";
import {deleteDataApi, getDataApi, patchDataApi, postDataApi} from '../../utils/fetchData'
import { createNotify, removeNotify } from "./notifyAction";


export const POST_TYPES = {
    LOADING: 'LOADING',
    ADD_POST: 'ADD_POST',
    GET_LOADING: 'GET_LOADING',
    GET_POSTS: 'GET_POSTS',
    GET_POST: 'GET_POST',
    UPDATE_POST: 'UPDATE_POST',
    GET_POST_LOADING: 'GET_POST_LOADING' ,
    DELETE_POST: 'DELETE_POST'
}

export const createPost = ({images, content, auth, socket}) => async(dispatch) => {
    console.log(images);
    
    let media =[]
    try {
        dispatch({type: POST_TYPES.LOADING, payload: true})
        if(images.length > 0) media = await ImageUpload(images)
        
        const res = await postDataApi('posts', {content, images: media}, auth.token)

        dispatch({type: POST_TYPES.ADD_POST, payload: res.data.newPost})
        
        dispatch({type: POST_TYPES.LOADING, payload: false})
        
        const msg = {
            id: res.data.newPost._id,
            text: 'Добавил новый пост',
            recipients: res.data.newPost.user.followers,
            url: `/post/${res.data.newPost._id}`,
            content,
            user: res.data.newPost.user,
            image: media[0].url
        }

        dispatch(createNotify({msg, auth, socket}))
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg },
        });
    }
}

export const deletePost = ({post, auth, socket}) => async(dispatch) => {
    dispatch({type: POST_TYPES.DELETE_POST, payload: post})

    try {
         await deleteDataApi(`post/${post._id}`, auth.token)


         const msg = {
            id: post._id,
            text: 'Добавил новый пост',
            recipients: post.user.followers,
            url: `/post/${post._id}`,
        }
         
         dispatch(removeNotify({msg, auth, socket}))
         
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg },
        });
    }

}

export const getPosts = (token) => async(dispatch) => {
    try {
        dispatch({type: POST_TYPES.GET_LOADING, payload: true})

        const res = await getDataApi('posts', token)

        dispatch({type: POST_TYPES.GET_POSTS, payload: res.data})
        
        dispatch({type: POST_TYPES.GET_LOADING, payload: false})
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg },
        });
    }
    
}

export const likePost = ({post, auth, socket}) =>  async(dispatch) => {
    const newPost = {...post, likes: [...post.likes, auth.user]}
    
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    
    socket.emit('likePost', newPost)
    
    try {
        await patchDataApi(`post/${post._id}/like`, null, auth.token)
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const unlikePost = ({post, auth, socket}) =>  async(dispatch) => {
    const newPost = {...post, likes: post.likes.filter(like => like._id !== auth.user._id)}
    
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    socket.emit('unlikePost', newPost)
    try {
        await patchDataApi(`post/${post._id}/unlike`, null, auth.token)
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const getPost = ({id, auth}) =>  async(dispatch) => {
    try {
        dispatch({type: POST_TYPES.GET_POST_LOADING, payload: true})

        const res = await getDataApi(`post/${id}`, auth.token)
        dispatch({type: POST_TYPES.GET_POST, payload: res.data.post})


        dispatch({type: POST_TYPES.GET_POST_LOADING, payload: false})
        
    } catch (err) {
        
    }
}