type Result = {
    file: File
    result: string
}

export default async function ConvertImg(
    file: File | Blob, 
    imgType: 'image/webp' | 'image/jpeg' | 'image/png'
    ):Promise<Result>{
    let src = URL.createObjectURL(file)

    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')

    let newImg = new Image()
    newImg.src = src

    return await new Promise((resolve, reject)=>{
        newImg.onload = ()=>{
            canvas.width = newImg.width
            canvas.height = newImg.height
            ctx?.drawImage(newImg, 0, 0)
            // convert canvas
            let imgDataURL = canvas.toDataURL(imgType, 1.0)
            let img = new Image()
            img.src = imgDataURL

            const fetchImage = fetch(img.src)
            fetchImage.then(res => res.blob())
                .then(blob => {
                    const fileImg = new File([blob], `${new Date().getTime()}`, blob)
                    resolve({ file: fileImg, result: imgDataURL })
                })
                .catch(err => reject(err))
        }
    })
}