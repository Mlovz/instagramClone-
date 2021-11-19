import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import LoadImg from '../images/123.gif'

import Info from '../components/profile/Info'
import { getProfileUser } from '../redux/actions/profileAction'
import Posts from '../components/profile/Posts'

const Profile = () => {
    const [isSave, setIsSave] = useState(false)
    const dispatch = useDispatch()
    const {auth, profile} = useSelector(state => state)
    const {id} = useParams()

    useEffect(() => {
        if(profile.users?.every(item => item._id !== id)){
            dispatch(getProfileUser(id, auth.token))
        }
    },[profile.users, id, auth.token, dispatch])
    
    
    return (
        <div className='profile'>
            
            {
                
                profile.loading 
                ? <div className='w-100 d-flex justify-content-center'>
                    <img src={LoadImg} alt="" />
                </div>
                :<Info id={id} auth={auth} dispatch={dispatch} profile={profile}/>
            }

            {

                <div className='profile__tabs'>
                    <div onClick={() => setIsSave(false)} className={`profile__tabs__tab ${!isSave ? 'active' : ''}`}>
                        <i className="fab fa-buromobelexperte"></i>
                        <span>Посты</span>
                    </div>
                    <div onClick={() => setIsSave(true)} className={`profile__tabs__tab ${isSave ? 'active' : ''}`}>
                        <i className="far fa-bookmark"></i>
                        <span>Сохранненое</span>
                    </div>
                </div>
            }

            {
                isSave 
                ? <div>save</div>
                : <Posts id={id}/>
            }
            
        </div>
    )
}

export default Profile
