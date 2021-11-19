import React, { useEffect, useState } from 'react'
import UserCard from '../UserCard'
import {motion} from 'framer-motion'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { useDispatch, useSelector } from 'react-redux'
import { getDataApi } from '../../utils/fetchData'
import { addUser } from '../../redux/actions/messageAction'
import { useHistory } from 'react-router'

const MessageModal = ({setModalMessage}) => {
    const dispatch = useDispatch()
    const {auth, message} = useSelector(state => state)
    const [search, setSearch] = useState('')
    // const [load, setLoad] = useState(false)
    const [users, setUsers] = useState([])
    const history = useHistory()
    
    useEffect(() => {
        if(search){
            // setLoad(true)
            getDataApi(`search?username=${search}`, auth.token)
            .then(res => {
                setUsers(res.data.users)
                // setLoad(false)
            })
            .catch(err => {
                dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
            })
        }else{
            setUsers([])
        }
    },[search, dispatch, auth.token])
    
    const handleAddUser = (user) => {
        if(message.users.every(item => item._id !== user._id)){
            dispatch(addUser(user))
            setModalMessage(false)
            return history.push(`/direct/${user._id}`)
        }
    }
    
    
    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className='message__modal'>
            <motion.div 
            initial={{scale: 1.5}}
            animate={{scale: 1}}
            exit={{scale: 1.5}}
            className="message__modal__box">
                <div className="message__modal__box__header">
                    <i onClick={() => setModalMessage(false)} className="fal fa-times"></i>
                    <span>Новое сообщение</span>
                </div>
                <form className="message__modal__box__form">
                    <label htmlFor="">Кому:</label>
                    <input type="text" value={search} placeholder='Поиск...' onChange={(e) => setSearch(e.target.value)}/>
                </form>

                <h6 className='message__modal__box__title'>Рекомендуемые</h6>
                
                <div className='message__modal__box__users'>
                    {
                        users.map(user => (
                            <div onClick={() => handleAddUser(user)}>
                                <UserCard key={user._id} user={user} block={true}/>
                            </div>
                        ))
                    }
                    {
                        !search && message.users && message.users.map(user => (
                            <div onClick={() => handleAddUser(user)}>
                                <UserCard key={user._id} user={user} block={true}/>
                            </div>
                        ))
                    }
                </div>
                
            </motion.div>
        </motion.div>
    )
}

export default MessageModal
