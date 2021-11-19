import React from 'react'
import Avatar from '../../Avatar'
import {useSelector,useDispatch} from 'react-redux'
import {deletePost} from '../../../redux/actions/postAction'

const CardHeader = ({post}) => {
    const dispatch = useDispatch()
    const {auth, socket} = useSelector(state => state)
    
    const DeletePost = () => {
        dispatch(deletePost({post, auth, socket}))
    }
    
    return (
        <div className='card__header'>
            <div className='card__header__avatar'>
                <Avatar src={post.user.avatar} size='middle__avatar' border={true}/>
                <span>{post.user.username}</span>
            </div>
            <div className='card__header__dropdown'>
            <div className="dropdown">
                <i data-bs-toggle="dropdown" className="fas fa-ellipsis-h"></i>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {
                        auth.user._id === post.user._id 
                        ? <>
                            <li className="dropdown-item" onClick={DeletePost}>Удалить</li>
                            <li className="dropdown-item">Пожаловаться</li>
                          </>
                        : <li className="dropdown-item">Пожаловаться</li>
                    }
                </ul>
            </div>
                
            </div>
        </div>
    )
}

export default CardHeader
