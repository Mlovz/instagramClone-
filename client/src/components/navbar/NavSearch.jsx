import React, { useEffect, useState } from 'react'
import {getDataApi} from '../../utils/fetchData'
import {useDispatch, useSelector} from 'react-redux'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'
import LoadImg from '../../images/123.gif'
import SearchModal from './SearchModal'

const NavSearch = () => {
    const [users, setUsers] = useState([])
    const [load, setLoad] = useState(false)
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const {auth} = useSelector(state => state)
    
    useEffect(() => {
        if(search){
            setLoad(true)
            getDataApi(`search?username=${search}`, auth.token)
            .then(res => {
                setUsers(res.data.users)
                setLoad(false)
            })
            .catch(err => {
                dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
            })
        }
    },[search, dispatch, auth.token])
    
    return (
        <form className='nav__search__form'>
            <input type="text" value={search}  id='user__search' name='search' onChange={(e) => setSearch(e.target.value)}/>
            {
                !search && <span>
                <i className="fal fa-search"></i>
                Поиск
            </span>
            }

            {
                search && load && <div className='nav__search__form__load'>
                <img src={LoadImg} alt="" />
            </div>
            }
            
            {
                search && <SearchModal users={users} setSearch={setSearch} load={load}/>
            }
            
        </form>
    )
}

export default NavSearch
