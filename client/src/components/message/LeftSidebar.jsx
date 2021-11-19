import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import UserCard from '../UserCard'
import MessageModal from './MessageModal'

const LeftSidebar = () => {
    const [modalMessage, setModalMessage] = useState(false)
    const {id} = useParams()
    const {auth, message} = useSelector(state => state)
    
    const history = useHistory()
    
    const isActive = (user) => {
        if(id === user._id) return 'active'
    }
    
    return (
        <div className='left'>
            <div className="left__header">
                <span>{auth.user?.username}</span>
                <i onClick={() => setModalMessage(true)} className="fal fa-edit"></i>
            </div>

            <div className="left__users">
                {
                    message.users?.map(user => (
                        <div onClick={() => history.push(`/direct/${user._id}`)} className={`left__users__user ${isActive(user)}`}>
                            <UserCard user={user} block={true}/>
                        </div>
                    ))
                }
            </div>

            {
                modalMessage && <MessageModal auth={auth} setModalMessage={setModalMessage}/>
            }
            
        </div>
    )
}

export default LeftSidebar
