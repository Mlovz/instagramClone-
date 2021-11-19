import React, { useRef } from 'react'

const Storis = ({auth}) => {
    const storisSlide = useRef(null)

    let position = 0;
    
    const nextHandler = () => {
        position -= 100 
        storisSlide.current.childNodes.forEach(el => {
            el.style = `transform: translateX(${position}px)`
        })
    }

    const prevHandler = () => {
        position += 100 
        storisSlide.current.childNodes.forEach(el => {
            el.style = `transform: translateX(${position}px)`
        })
    }
    
    return (
        <div className='storis'>
            <div className="storis__tracks" ref={storisSlide}>
                {
                    auth.user.following.map((user, index) => (
                        <div key={index} className="storis__tracks__track">
                            <img src={user.avatar} alt="" />
                            <div>
                                {user.username}
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='storis__icon storis__icon__next' onClick={nextHandler}>
                <i className="far fa-chevron-right"></i>
            </div>

            <div className='storis__icon storis__icon__prev' onClick={prevHandler}>
                <i className="far fa-chevron-left"></i>
            </div>
            
        </div>
    )
}

export default Storis
