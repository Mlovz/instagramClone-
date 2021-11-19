import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Avatar from '../Avatar'
import Button from '../Button'
import FollowBtn from '../FollowBtn'
import EditProfile from './EditProfile'
import GlobalModal from './GlobalModal'

const Info = ({id, auth ,dispatch, profile}) => {
    const [users, setUsers] = useState([])
    const [followers, setFollowers] = useState(false)
    const [following, setFollowing] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    
    useEffect(() => {
        if(id === auth.user?._id){
            setUsers([auth.user])
        }else{
            const newUser = profile.users.filter(user => user._id === id)
            setUsers(newUser) 
        }
    },[auth.user, id, profile.users])
    
    return (
        <div className='info'>
            {
                users.map(user => (
                    <div className='info__wrap' key={user._id}>
                        <div className='info__logo'>
                            <Avatar src={user.avatar} size='big__avatar'/>
                        </div>

                        <div className='info__body'>
                            <div className='info__body__header'>
                                <h3>{user.username}</h3>
                                {
                                    auth.user?._id === id ? <Button onClick={() => setIsEdit(true)} txt='Редактировать профиль'/> : <div>
                                        <Link className='mx-3' to='/send'>
                                            <Button txt='Отправить сообщение'/> 
                                        </Link>
                                        <FollowBtn user={user}/>
                                    </div>
                                }
                            </div>
                            <div className='info__body__publish'>
                                <div className='info__body__publish__item'>
                                    <strong>{profile.user_posts.length}</strong>
                                    <span>публикаций</span>
                                </div>
                                <div onClick={() => setFollowers(true)} className='info__body__publish__item'>
                                    <strong>{user.followers.length}</strong>
                                    <span>подписчиков</span>
                                </div>
                                <div onClick={() => setFollowing(true)} className='info__body__publish__item'>
                                    <strong>{user.following.length}</strong>
                                    <span>подписки</span>
                                </div>
                            </div>
                            <div className='info__body__information'>
                                <h3>{user.fullname}</h3>
                                <p>
                                    {user.story}
                                </p>
                                <a href={user.website} target='_blank' rel="noreferrer">{user.website}</a>
                                <span>{user.mobile}</span>
                            </div>
                        </div>

                        {
                            following && <GlobalModal title='Ваши подписки' data={user.following} setState={setFollowing} onUser={true}/>
                        }

                        {
                            followers && <GlobalModal title='Подписчики' data={user.followers} setState={setFollowers}  onUser={true}/>
                        }
                        
                    </div>
                ))
            }

            {
                isEdit && <EditProfile setIsEdit={setIsEdit} auth={auth}/>
            }
        </div>
    )
}

export default Info
