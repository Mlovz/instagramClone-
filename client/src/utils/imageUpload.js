
export const checkImage = (file) => {
    let err = ""
    if (file.size > 1024 * 1024) // 1mb
        err = "Размер фото слишком большой (1mb)"

    if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        err = "Формат изображении не (jpeg, png)!"
    return err;
}


export const ImageUpload = async(images) => {
    let newImages=[];

    for(const img of images){
        const formData = new FormData()

        if(img.camera){
            formData.append('file', img.camera)
        }else{
            formData.append('file', img)
        }

        formData.append('cloud_name', "daggokgzh")
        formData.append('upload_preset', "kh6vjxolInst")
        
        const res = await fetch('https://api.cloudinary.com/v1_1/daggokgzh/upload',{
            method: "POST",
            body: formData
        })
        const data = await res.json()
        newImages.push({
            public_id: data.public_id,
            url: data.secure_url
        })
    }
    return newImages
}