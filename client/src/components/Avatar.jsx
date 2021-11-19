import React from 'react'

const Avatar = ({src, size, border}) => {
    const style={
        border: border && '2px solid #fc4b1f',
        padding: border && '2px'
    }
    return (
        <div style={style} className={`avatar ${size}`}>
            <img src={src} alt="" />
        </div>
    )
}

export default Avatar
