'use client'

import { ReactNode } from "react"
import Verifikasi from "./Verifikasi"
import UseGantiPassword from "./UseGantiPassword"
import FormGantiPassword from "./FormGantiPassword"

type DataT = { email: string, id: string } | 'exp' | 'network error'

type Props = {
    children?: ReactNode
    data: DataT
    header: ReactNode
    isSuccessResetPw?: ReactNode
}

export default function WrapVerifikasi({
    children,
    header,
    data,
    isSuccessResetPw
}: Props) {
    const {
        kodeValue,
        changeInput,
        errForm,
        resendToken,
        clickSubmit,
        loadingResendMail,
        loadingVerify,
        successVerify,
        showNewPw,
        formGantiPassword,
        changeInputGantiPw,
        errFormGantiPw,
        showConfirmPw,
        clickShowPw,
        clickSubmitGantiPw,
        loadingResetPw,
        successResetPw,
        pressEnter
    } = UseGantiPassword(data)

    return (
        <>
            {!successResetPw ? <>
                {!successVerify ? <>
                    {header}
                    {(data as { email: string })?.email ?
                        <Verifikasi
                            kodeValue={kodeValue}
                            changeInput={changeInput}
                            errForm={errForm}
                            resendToken={resendToken}
                            clickSubmit={clickSubmit}
                            loadingResendMail={loadingResendMail}
                            loadingVerify={loadingVerify}
                            pressEnter={(e)=>pressEnter(e, 'VERIFY')}
                        /> :
                        <div role="status" className="max-w-sm animate-pulse">
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
                </> : <FormGantiPassword
                    showNewPw={showNewPw}
                    formGantiPassword={formGantiPassword}
                    changeInputGantiPw={changeInputGantiPw}
                    errFormGantiPw={errFormGantiPw}
                    showConfirmPw={showConfirmPw}
                    clickShowPw={clickShowPw}
                    loadingSubmitGantiPw={loadingResetPw}
                    clickSubmitGantiPw={clickSubmitGantiPw}
                    pressEnter={(e)=>pressEnter(e, 'RESET-PW')}
                />}
            </> :
                <>{isSuccessResetPw}</>}
        </>
    )
}