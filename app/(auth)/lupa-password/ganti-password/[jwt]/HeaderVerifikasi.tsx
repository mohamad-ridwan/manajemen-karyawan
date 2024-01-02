type Props = {
    email: string
    title?: string
}

export default function HeaderVerifikasi({
    email,
    title = 'Verifikasi Untuk Melanjutkan Ganti Password'
}: Props) {
    return (
        <>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-text md:text-2xl dark:text-white">
                {title}
            </h1>
            {!email ? <div role="status" className="max-w-sm animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            </div> : <>
                <p className='text-gray-text text-sm'>Cek Kode verifikasi pada Email <strong>{email}</strong> dan masukkan kode verifikasi dibawah.</p>
            </>}
        </>
    )
}