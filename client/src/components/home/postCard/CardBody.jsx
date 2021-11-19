import React, { useState } from 'react'
import VideoSrc from '../../VideoSrc'

const CardBody = ({post}) => {
    const [currIndex, setCurrIndex] = useState(0)

    
    return (
        <div className='card__body'>
            <div className="card__body__images">
                {
                    post.images[currIndex].url.match(/video/i)
                    ? <VideoSrc src={post.images[currIndex].url} width='100%' height='100%' volume={1} playing={true} controls={false}/>
                    : <img src={post.images[currIndex].url} alt="" />
                }
            </div>
            <div className="card__body__dots">
                {
                    post.images.map((img, index) => (
                        <div key={img.public_id} className={`card__body__dots__item ${index === currIndex && 'active'}`}></div>
                    ))
                }
            </div>

            <div onClick={() => setCurrIndex((c) => c + 1)} 
            className={`card__body__arrow card__body__next ${currIndex + 1 === post.images.length && 'disabled'}`}>
                <i className="fal fa-angle-right"></i>
            </div>
            <div onClick={() => setCurrIndex((c) => c - 1)} 
            className={`card__body__arrow card__body__prev ${currIndex + 1 === 1 && 'disabled'}`}>
                <i className="fal fa-angle-left"></i>
            </div>
        </div>
    )
}

export default CardBody
