import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { follow, unFollow } from '../redux/actions/profileAction'

const FollowBtn = ({user, bg, color}) => {
    const [onFollow, setOnFollow] = useState(false)
    const dispatch = useDispatch()
    const {auth, socket, profile} = useSelector(state => state)

    useEffect(() => {
        if(auth.user.following.find(item => item._id === user._id)){
            setOnFollow(true)
        }
        return () => setOnFollow(false)
    },[auth.user.following, user._id])
    
    const handleFollow = () => {
        setOnFollow(true)
        dispatch(follow({users: profile.users, user, auth, socket}))
    }

    const handleUnFollow = () => {
        setOnFollow(false)
        dispatch(unFollow({users: profile.users, user, auth, socket}))
    }
    

    
    
    return (
        <>
            {
                onFollow
                ? <button className='follow__btn follow__btn__unfollow' onClick={handleUnFollow}>Отпписаться</button>
                : <button className='follow__btn follow__btn__follow' onClick={handleFollow}>Подписаться</button>
            }
        </>
    )
}

export default FollowBtn
