import { getDataApi, patchDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
import {AUTH_TYPES} from './authAction'
import {ImageUpload} from '../../utils/imageUpload'
import { createNotify, removeNotify } from "./notifyAction";

export const PROFILE_TYPES = {
    LOADING: 'LOADING',
    GET_USER: 'GET_USER',
    GET_POSTS: 'GET_PROFILE_POSTS',
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UNFOLLOW',
    UPDATE_LOAD: 'UPDATE_LOAD'
}


export const getProfileUser = (id, token) => async(dispatch) => {
    try {
        dispatch({type: PROFILE_TYPES.LOADING, payload: true})

        const res = await getDataApi(`user/${id}`, token)
        // const res1 = await getDataApi(`user_posts/${id}`, token)

        
        dispatch({type: PROFILE_TYPES.GET_USER, payload: res.data})
        // dispatch({type: PROFILE_TYPES.GET_POSTS, payload: {...res1.data, _id: id}})

        
        dispatch({type: PROFILE_TYPES.LOADING, payload: false})
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg },
          });
    }
}
export const follow = ({users, user, auth,socket}) => async(dispatch) => {
    let newUser;
    
    if(users.every(item => item._id !== user._id)){
        newUser = {...user, followers: [...user.followers, auth.user]}
    }else{
        users.forEach(item => {
            if(item._id === user._id){
                newUser = {...item, followers: [...item.followers, auth.user]}
            }
        })
    }

    dispatch({ type: PROFILE_TYPES.FOLLOW, payload: newUser })

    dispatch({
        type: AUTH_TYPES.AUTH, 
        payload: {
            ...auth,
            user: {...auth.user, following: [...auth.user.following, newUser]}
        }
    })

    socket.emit('follow', newUser)

    const msg = {
        id: auth.user._id,
        text: 'подписался на ваши обновления',
        recipients: [newUser._id],
        url: `/profile/${auth.user._id}`,
        user: auth.user
    }

    dispatch(createNotify({msg, auth, socket}))
    
    try {
        await patchDataApi(`user/${user._id}/follow`, null, auth.token)
    } catch (err) {
        
    }
    
}

export const unFollow = ({users, user, auth, socket}) => async(dispatch) => {
    let newUser;

    if(users.every(item => item._id !== user._id)){
        newUser = {...user, followers: user.followers.filter(item => item._id !== auth.user._id)}
    }else{
        users.forEach(item => {
            if(item._id === user._id){
                newUser = {...item, followers: user.followers.filter(item => item._id !== auth.user._id)}
            }
        })
    }

    dispatch({ type: PROFILE_TYPES.UNFOLLOW, payload: newUser })

    dispatch({
        type: AUTH_TYPES.AUTH, 
        payload: {
            ...auth,
            user: { 
                ...auth.user, 
                following: auth.user.following.filter(item => item._id !== newUser._id)
            }
        }
    })
    socket.emit('unfollow', newUser)
    const msg = {
        id: auth.user._id,
        text: 'подписался на ваши обновления',
        recipients: [newUser._id],
        url: `/profile/${auth.user._id}`,
        user: auth.user
    }

    dispatch(removeNotify({msg, auth, socket}))
    try {
        await patchDataApi(`user/${user._id}/unfollow`, null, auth.token)
    } catch (err) {
        
    }
}

export const updateUser = ({userData, avatar, auth}) => async(dispatch) => {
    

    try {
        let media = []

        if(avatar) media = await ImageUpload([avatar])

        const res = await patchDataApi(`user`, {...userData, avatar: media[0].url}, auth.token)
        console.log(res);
    
        dispatch({
            type: AUTH_TYPES.AUTH,
            payload: {
                ...auth,
                user: {
                    ...auth.user, ...userData, avatar: avatar ? media[0].url : auth.user.avatar
                }
            }
        })
    } catch (err) {
        
    }
}

export const getProfilePost = ({id, auth}) => async(dispatch) => {
    try {
        
        const res = await getDataApi(`user_posts/${id}`, auth.token)
        
        dispatch({type: PROFILE_TYPES.GET_POSTS, payload: res.data.posts})
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg },
          });
    }
}