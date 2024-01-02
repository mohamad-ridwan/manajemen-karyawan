'use client'

import Verifikasi from "@/app/(auth)/lupa-password/ganti-password/[jwt]/Verifikasi"
import UseVerifikasi from "./UseVerifikasi"
import Success from "@/app/(auth)/lupa-password/ganti-password/[jwt]/Success"
import { ReactNode } from "react"

type Props = {
    data: { email: string, id: string } | 'exp' | 'network error'
    jwt: string
    headerVerifikasi: ReactNode
}

export default function Form({
    data,
    jwt,
    headerVerifikasi
}: Props) {
    const {
        kodeValue,
        changeInput,
        errForm,
        resendToken,
        clickSubmit,
        pressEnter,
        loadingResendMail,
        successVerify,
        loadingVerify
    } = UseVerifikasi({ data, jwt })
    return (
        <>
            {!successVerify ? <>
                {(data as { email: string })?.email ?
                    <>
                    {headerVerifikasi}
                    <Verifikasi
                        kodeValue={kodeValue}
                        changeInput={changeInput}
                        errForm={errForm}
                        resendToken={resendToken}
                        clickSubmit={clickSubmit}
                        loadingResendMail={loadingResendMail}
                        loadingVerify={loadingVerify}
                        pressEnter={pressEnter}
                    />
                    </> : <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <br />
                        <div className="flex justify-end">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4"></div>
                        </div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="flex justify-end">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                        </div>
                    </div>
                }
            </> : <Success
                title="Akun berhasil di verifikasi."
                href="/"
                btnName="Kembali ke Beranda"
            />
            }
        </>
    )
}