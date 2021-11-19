import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard'
import CommentModal from './CommentModal'

const Comments = ({post}) => {
    const [next] = useState(2)
    const [comments, setComments] = useState([])
    const [open, setOpen] = useState(false) 


    useEffect(() => {
        const newCom = post.comments.filter(cm => !cm.reply)
        setComments(newCom.slice(newCom.length - next))
    },[post.comments, next])

    

    
    return (
        <div className='comments'>
            {
                post.comments.filter(cm => !cm.reply).length > 2 && <div className='comments__length' onClick={() => setOpen(true)}>
                Посмотреть все комментарий({post.comments.length})
            </div>
            }
            {
                comments.map(comment => {
                    return(
                        <CommentCard key={comment._id} comment={comment} post={post}  displayLike={false}>
                        
                        </CommentCard>
                    )
                })
            }

            {
                open && <CommentModal setOpen={setOpen} post={post} />
            }

            
            
        </div>
    )
}

export default Comments
