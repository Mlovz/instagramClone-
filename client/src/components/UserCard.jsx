import React from 'react'
import {Link} from 'react-router-dom'
import Avatar from './Avatar'

const UserCard = ({user, children, ava, block}) => {
    return (
        <div className='usercard'>
            <div className='usercard__box'>
                {
                    block 
                    ?<div className='usercard__link'>
                        <Avatar src={user.avatar} size={`small__avatar ${ava}`}/>
                        <div className='usercard__link__user'>
                            <h5>{user.username}</h5>
                            <h6>{user.fullname}</h6>
                        </div>
                    </div>
                    :<Link to={`/profile/${user._id}`} className='usercard__link'>
                        <Avatar src={user.avatar} size={`small__avatar ${ava}`}/>
                        <div className='usercard__link__user'>
                            <h5>{user.username}</h5>
                            <h6>{user.fullname}</h6>
                        </div>
                    </Link>
                }
                {children}
            </div>
        </div>
    )
}

export default UserCard
