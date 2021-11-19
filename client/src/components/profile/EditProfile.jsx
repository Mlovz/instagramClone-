import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar'
import {motion} from 'framer-motion'
import { editProfAnim } from '../animations/EditProfileAnimation'
import {useDispatch} from 'react-redux'
import { updateUser } from '../../redux/actions/profileAction'


const EditProfile = ({setIsEdit, auth}) => {
    const initialState = {
        fullname: '',
        mobile: '',
        address: '',
        story: '',
        website: '',
        gender: ''

    }

    const dispatch = useDispatch()
    
    const [avatar, setAvatar] = useState()
    const [userData, setUserData] = useState(initialState)
    const {fullname,mobile,address,story,website} = userData

    useEffect(() => {
        setUserData(auth.user)
    },[auth.user])
    
    const handleImage = (e) => {
        const file = e.target.files[0]
        setAvatar(file)
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setUserData({...userData, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser({userData, avatar, auth}))
    }
    
    
    return (
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        className='edit__profile' onClick={() => setIsEdit(false)}>
            <motion.div 
            variants={editProfAnim}
            initial='initial'
            animate='animate'
            className="edit__profile__box" onClick={(e) => e.stopPropagation()}>

                <div className="edit__profile__header">
                    <h3>Редактировать профиль</h3>
                </div>
                
                <div className='edit__profile__ava'>
                    <div>
                        <Avatar src={auth.user.avatar} size='super__avatar'/>
                        <input type="file" name='avatar'  onChange={handleImage} />
                        <i className="fas fa-camera"></i>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className='edit__profile__form'>
                    <div className="form__group">
                        <label htmlFor="Fullname">Full name</label>
                        <input type="text" name='fullname' value={fullname} onChange={handleChange}/>
                    </div>

                    <div className="form__group">
                        <label htmlFor="mobile">Mobile</label>
                        <input type="text" name='mobile' value={mobile} onChange={handleChange}/>
                    </div>

                    <div className="form__group">
                        <label htmlFor="address">Address</label>
                        <input type="text" name='address' value={address} onChange={handleChange}/>
                    </div>

                    <div className="form__group">
                        <label htmlFor="website">Website</label>
                        <input type="text" name='website' value={website} onChange={handleChange}/>
                    </div>

                    <div className="form__group">
                        <label htmlFor="story">Story</label>
                        <textarea  name='story' value={story} onChange={handleChange}/>
                    </div>
                    
                    <button type='submit' className='edit__profile__form__btn'>Сохранить</button>
                </form>
            </motion.div>
        </motion.div>
    )
}

export default EditProfile
