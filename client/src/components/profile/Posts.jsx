import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostThumb from '../PostThumb'
import LoadImg from '../../images/123.gif'
import { getDataApi } from '../../utils/fetchData'
import { PROFILE_TYPES } from '../../redux/actions/profileAction'

const Posts = ({id}) => {
    const dispatch = useDispatch()
    const {profile, auth } = useSelector(state => state)

    useEffect(() => {
        const getPosts = async() => {
            const res = await getDataApi(`user_posts/${id}`, auth.token)
            dispatch({type: PROFILE_TYPES.GET_POSTS, payload: res.data.posts})
        }
        getPosts()
    },[dispatch, auth.token, id])
    
 
    
    return (
        <div className='profile__posts'>
        {
            profile.loading
            ? <div className='w-100 d-flex justify-content-center'>
                <img src={LoadImg} alt="" />
            </div>
            : 
            profile.user_posts?.map(post => (
                <PostThumb key={post._id} post={post}/>
            ))
            
        }
    </div>
    )
}

export default Posts
