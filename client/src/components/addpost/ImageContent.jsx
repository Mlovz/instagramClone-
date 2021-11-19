import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import EndContent from './EndContent'
import ReactPlayer from 'react-player'
import VideoSrc from '../VideoSrc'

const ImageContent = ({images}) => {
    const [onFile, setOnFile] = useState(false)
    const [newImages, setNewImages] = useState(images)
    const [currIndex, setCurrIndex] = useState(0)
    const dispatch = useDispatch()
    
    const handleChangeImage = (e) => {
        const files = [...e.target.files]
        let newImagesArr = []
        let err = ''

        if (files.length > 4) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Максимум 4 фото!' } })

        files.forEach(file => {
            if (!file) return err = "Вы не выбрали файла!"

            if (file.size > 1024 * 1024 * 10) // 1mb
                return err = "Объем файла больше чем 10mb!"

            return newImagesArr.push(file)
        })

        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
        
        setNewImages([...newImages, ...newImagesArr])
    }
    
    return (
        <div className='img__content'>
            <div className="img__content__images">
                {
                    newImages[currIndex].type.match(/video/i)
                    ? <VideoSrc src={URL.createObjectURL(newImages[currIndex])} width='100%' height='100%' volume={1} playing={true}/>
                    :<img src={URL.createObjectURL(newImages[currIndex])} alt="" />
                }
                
                <div className='add__files'>
                    <div onClick={() => setOnFile(!onFile)}>
                        <i className="fal fa-clone"></i>
                        {
                            onFile && <div className='add__files__modal' onClick={(e) => e.stopPropagation()}>
                                

                                <div className='add__files__modal__images'>
                                    {
                                        newImages.map((img, index) => (
                                            <div key={index} onMouseEnter={() => setCurrIndex(index)} onMouseLeave={() => setCurrIndex(index)}>
                                                {
                                                    img.type.match(/video/i)
                                                    ? <ReactPlayer url={URL.createObjectURL(img)} width='100px' height='80px'/>
                                                    : <img src={URL.createObjectURL(img)} alt="" />
                                                }
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className='add__files__modal__icon'>
                                    <i className="fal fa-plus"></i>
                                    <input type="file" id="file__up__modal" accept="image/*,video/*" multiple onChange={handleChangeImage} />
                                </div>
                                
                            </div>
                        }
                    </div>
                </div>
            </div>
            
            <EndContent images={newImages}/>
        </div>
    )
}

export default ImageContent
