import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { createPost } from '../../redux/actions/postAction'
import Avatar from '../Avatar'
import Smile from '../Smile'

const EndContent = ({images}) => {
    const [content, setContent] = useState('')
    const [onSmile, setOnSmile] = useState(false)
    
    const dispatch = useDispatch()
    const {auth,homePosts,socket} = useSelector(state => state)
    
    const handleChange = (e) => {
        setContent(e.target.value)
    }

    const handleSubmit = () => {
        if(!content) {
            return dispatch({type: GLOBALTYPES.ALERT, payload: {error: 'Придумайте подпись!'}})
        }
        dispatch(createPost({images, content, auth, socket}))
    }
    
    return (
        <div className='end__content'>
            <div className="end__content__header">
                <Avatar src={auth.user.avatar} size='small__avatar'/>
                <span>{auth.user.username}</span>
            </div>
            <div className='end__content__text'>
                <textarea name="content" placeholder='Придумайте подпись' value={content} onChange={handleChange}  rows="6"></textarea>
                <button onClick={handleSubmit} type='button' className='end__content__btn'>
                      {
                          homePosts.loading ? <div style={{width: '20px', height: '20px'}} className="spinner-border" role="status">
                        </div> : 'Поделиться'
                      }
                  
                  </button>
                  
                
            </div>
            <div className='end__content__footer'>
                <i onClick={() => setOnSmile(!onSmile)} className="fal fa-smile"></i>
                <span>{content.length} / 200</span>
                {
                    onSmile && <Smile change={setContent} content={content}/>
                }
            </div>
        </div>
    )
}

export default EndContent
