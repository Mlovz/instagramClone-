import React, { useEffect, useState } from 'react'
import signIn from '../images/sign-in.png'
import logoInst from '../images/instagram.png'
import {useDispatch, useSelector} from 'react-redux'
import { register } from '../redux/actions/authAction'
import LoadImg from '../images/123.gif'
import {Link, useHistory} from 'react-router-dom'

const Register = () => {
    const initialState = {
        fullname: '',
        username: '',
        email: '',
        password: ''
    }
    const [userData, setUserData] = useState(initialState)
    const {fullname,username, email, password} = userData
    const dispatch = useDispatch()
    const {auth} = useSelector(state => state)
    const history = useHistory()

    const handleChange = (e) => {
        const {name, value} = e.target
        setUserData({...userData, [name]: value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(register({userData}))
    }

    useEffect(() => {
        if(auth.token) history.push('/')
    },[auth.token, history])
    
    return (
        <div className='auth'>
            <div className="auth__body">
                <div className='auth__body__image'>
                    <img src={signIn} alt="" />
                </div>
                <div className='auth__body__form'>
                    <img src={logoInst} alt="" />
                    <form onSubmit={handleSubmit}>
                     <div className="form_group">
                            <input type="text" name='fullname' value={fullname} placeholder='введите полное имя' onChange={handleChange}/>
                        </div>
                        <div className="form_group">
                            <input type="text" name='username' value={username} placeholder='введите имя пользователя' onChange={handleChange}/>
                        </div>
                        <div className="form_group">
                            <input type="text" name='email' value={email} placeholder='введите почту' onChange={handleChange}/>
                        </div>
                        <div className="form_group">
                            <input type="password" name='password' value={password} placeholder='введите пароль' onChange={handleChange}/>
                        </div>

                        <div className="form_group">
                            <Link to='/' className='text-primary'>
                                Войти?
                            </Link>
                        </div>
                        {
                            auth.loading 
                            ? <div className='load_img'>
                                <img src={LoadImg} alt="" />
                            </div>
                            :<button>Создать</button>

                        }
                       
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
