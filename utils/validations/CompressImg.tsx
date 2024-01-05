import imageCompression from 'browser-image-compression'

export default async function CompressImg(file: File):Promise<File>{
    return await new Promise((resolve, reject)=>{
        const controller = new AbortController()

        const options = {
            maxSizeMB: 1,
            signal: controller.signal,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }

        imageCompression(file, options)
        .then(compressedFile=>resolve(compressedFile))
        .catch(err=>reject(err))
        
        // setTimeout(() => {
        //     controller.abort(new Error('I just want to stop Load Img'))
        // }, 1500);
    })
}