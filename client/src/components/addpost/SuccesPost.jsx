import React from 'react'
import {motion} from 'framer-motion'

const SuccesPost = () => {
    return (
        <div className='succes__post'>
            <motion.div 
            initial={{y: '-300px'}}
            animate={{y: '0'}}
            exit={{y: '-300px'}}
            className="succes__post__box">
                <i className="fal fa-check-circle"></i>
                <h3>Публикация размещена.</h3>
            </motion.div>
        </div>
    )
}

export default SuccesPost
