import React from 'react'
import Avatar from '../Avatar'

const MessageDisplay = ({user}) => {
    return (
        <div className='message__text'>
            <div>
                <Avatar src={user.avatar} size='small__avatar'/>
                <p>Lorem ipsum dolor, sit ame!</p>
            </div>
            <span>22:00</span>
        </div>
    )
}

export default MessageDisplay
