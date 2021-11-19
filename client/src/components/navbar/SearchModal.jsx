import React from 'react'
import UserCard from '../UserCard'

const SearchModal = ({users, setSearch, load}) => {
    return (
        <div className='search__modal'>
            {
                users.length === 0 && !load
                ? <h1>С таким именем никого нет</h1>
                :users.map(user => (
                    <div className='w-100' key={user._id} onClick={() => setSearch('')}>
                        <UserCard user={user}/>
                    </div>
                ))
            }
        </div>
    )
}

export default SearchModal
