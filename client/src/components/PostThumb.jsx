import React from 'react'
import { Link } from 'react-router-dom'

const PostThumb = ({post}) => {
    return (
        <div className='post__thumb'>
            <Link to={`/post/${post._id}`}>
                <img src={post && post.images && post.images[0].url} alt="" />
                <div className='post__thumb__content'>
                    <span>
                        <i className="fal fa-heart"></i>
                        {post.likes && post.likes.length}
                    </span>
                    <span>
                        <i className="fal fa-comment"></i>
                        {post.comments && post.comments.length}
                    </span>
                </div>
            </Link>
        </div>
    )
}

export default PostThumb
