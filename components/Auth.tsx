import { ReactNode } from 'react'
import logo from '@/images/logo.png'
import Image from 'next/image'

type Props = {
    title?: String,
    children: ReactNode
}

export default function Auth({
    title,
    children
}: Props) {
    return (
        <section className="dark:bg-gray-900 min-h-screen items-center justify-center flex py-4">
            <div className="flex flex-col items-center justify-center min-h-[600px] max-w-[468px] w-full sm:w-[468px] px-6 mx-auto lg:py-0">
                <Image
                src={logo}
                alt='Manajemen Karyawan'
                className='mb-4'
                height={150}
                width={150}
                />
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        {title && (
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-text md:text-2xl dark:text-white">
                                {title}
                            </h1>
                        )}
                        <div className="space-y-4 md:space-y-6">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}