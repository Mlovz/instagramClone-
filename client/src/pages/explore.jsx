import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getExplorePosts} from '../redux/actions/exploreAction'
import PostThumb from '../components/PostThumb'

const Explore = () => {
    const {auth, explore} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!explore.firstload){
            dispatch(getExplorePosts(auth.token))
        }
    },[dispatch, auth.token,explore.firstload])
    
    return (
        <div className='explore'>
            {
                explore.loading 
                ? <div className="w-100 d-flex justify-content-center mt-3">
                    <div className="spinner-border" role="status"></div>
                  </div>
                : explore.posts.map(post => (
                    <PostThumb key={post._id} post={post}/>
                ))
            }
           
            
        </div>
    )
}

export default Explore
