import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Smile from '../../Smile'
import {createComment} from '../../../redux/actions/commentAction'

const InputComment = ({children, post, onReply, setOnReply}) => {
    const [content, setContent] = useState('')
    const [openSmile, setOpenSmile] = useState(false)
    const dispatch = useDispatch()
    const {auth, socket} = useSelector(state => state)
    
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!content.trim()){
            if(setOnReply) return setOnReply(false);
            return;
        }

        setContent('')
        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString(),
            reply: onReply && onReply.commentId,
            tag: onReply && onReply.user,
        }
        
        dispatch(createComment({post, newComment, auth, socket}))
        
        if(setOnReply) return setOnReply(false);
    } 
    
    
    
    return (
        <form onSubmit={handleSubmit} className='input__post'>
            <i onClick={() => setOpenSmile(!openSmile)} className="fal fa-smile"></i>
            <div className='input__post__content'>
                {children}
                <input type="text" value={content} placeholder='Добавьте комментарий...' onChange={(e) => setContent(e.target.value)}/>
            </div>
            <button type='submit' disabled={!content}>Опубликовать</button>

            {
                openSmile && <div className='comment__smile'>
                    <Smile change={setContent} content={content}/>
                </div>
            }
            
        </form>
    )
}

export default InputComment
