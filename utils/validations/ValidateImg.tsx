import CompressImg from "./CompressImg"
import ConvertImg from "./ConvertImg"

type Result = {
    imgURL: string
    files: File
}

export default async function ValidateImg(file: FileList): Promise<Result> {
    return await new Promise((resolve, reject) => {
        const getTypeFile = file[0].type.split('/')[1]
        if (!getTypeFile || getTypeFile.length === 0) {
            reject({message: 'File Harus berupa .jpg /.jpeg /.png'})
            return
        }
        if (
            getTypeFile.toLowerCase() === 'jpg' ||
            getTypeFile.toLowerCase() === 'jpeg' ||
            getTypeFile.toLowerCase() === 'png'
        ) {
            ConvertImg(file[0], 'image/webp')
                .then(async res => ({
                    result: res.result,
                    compressed: await CompressImg(res.file)
                }))
                .then(res =>resolve({
                    imgURL: res.result,
                    files: res.compressed
                }))
                .catch(err => {
                    reject({message: 'Terjadi kesalahan saat mengambil gambar. Mungkin terdapat ukuran file yang terlalu besar. Mohon coba lagi!'})
                    console.log(err)
                })
        }else{
            reject({message: 'File Harus berupa .jpg /.jpeg /.png'})
        }
    })
}