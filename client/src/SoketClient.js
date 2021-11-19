import React, {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { AUTH_TYPES } from './redux/actions/authAction'
import { NOTIFY_TYPES } from './redux/actions/notifyAction'
import { POST_TYPES } from './redux/actions/postAction'
import audioSms from './audio/novosti-ding-dong-iphone-napominayut-zvukovoy-material-39603.mp3'


const SoketClient = () => {
    const dispatch = useDispatch()
    const {auth, socket} = useSelector(state => state)
    const audioRef = useRef(null)
    
    useEffect(() => {
        socket.emit('joinUser', auth.user._id)
    },[socket, auth.user._id])

    useEffect(() => {
        socket.on('likePostClient', newPost => {
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })
        return () => socket.off('likePostClient')
    },[dispatch, socket])

    useEffect(() => {
        socket.on('unlikePostClient', newPost => {
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })
        return () => socket.off('unlikePostClient')
    },[dispatch, socket])

    useEffect(() => {
        socket.on('createCommentClient', newPost => {
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })
        return () => socket.off('createCommentClient')
    },[dispatch, socket])

    useEffect(() => {
        socket.on('followClient', newUser => {
            dispatch({type: AUTH_TYPES.AUTH, payload: {...auth, user: newUser}})
        })
        return () => socket.off('followClient')
    },[dispatch, socket, auth])
    
    useEffect(() => {
        socket.on('unfollowClient', newUser => {
            dispatch({type: AUTH_TYPES.AUTH, payload: {...auth, user: newUser}})
        })
        return () => socket.off('unfollowClient')
    },[dispatch, socket, auth])

    useEffect(() => {
        socket.on('createNotifytClient', newData => {
            if(newData){
                audioRef.current.play()
                dispatch({type: NOTIFY_TYPES.CREATE_NOTIFY, payload: newData})
            }
        })
        return () => socket.off('createNotifytClient')
    },[dispatch, socket])
    
    useEffect(() => {
        socket.on('removeNotifytClient', msg => {
            dispatch({type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg})
        })
        return () => socket.off('removeNotifytClient')
    },[socket, dispatch])
    
    return (
        <>
            <audio style={{display: 'none'}} controls ref={audioRef}>
                <source src={audioSms} type='audio/mp3'/>
            </audio>
        </>
    )
}

export default SoketClient
