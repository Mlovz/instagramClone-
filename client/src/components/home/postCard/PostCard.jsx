import React from 'react'
import CardHeader from './CardHeader'
import CardBody from './CardBody'
import CardFooter from './CardFooter'
import Comments from '../comments/Comments'
import InputComment from '../comments/InputComment'

const PostCard = ({post}) => {
    return (
        <div className='post__card'>
            <CardHeader post={post}/>
            <CardBody post={post}/>
            <CardFooter post={post} contentText={true}/>

            <Comments post={post}/>

            <InputComment post={post}/>
                
        </div>
    )
}

export default PostCard
