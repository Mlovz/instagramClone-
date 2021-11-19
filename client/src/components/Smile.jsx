import React from 'react'
import {smiles} from '../utils/Smile'

const Smile = ({change, content}) => {

    
    return (
        <div className='smile'>
            {
                smiles.map((smile, index) => (
                    <div onClick={() => change(content + smile)} className='smile__item' key={index}>
                        {smile}
                    </div>
                ))
            }
        </div>
    )
}

export default Smile
