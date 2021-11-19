import React from 'react'

const Button = ({txt, bg, color, onClick}) => {
    const style = {
        background: bg && bg,
        color: color && color
    }
    return (
        <button onClick={onClick} style={style} className='global__btn'>
            {txt}
        </button>
    )
}

export default Button
