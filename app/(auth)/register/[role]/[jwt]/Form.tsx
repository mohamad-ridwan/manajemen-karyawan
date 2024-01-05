'use client'

import { ReactNode } from "react"
import Verifikasi from "@/app/(auth)/lupa-password/ganti-password/[jwt]/Verifikasi"
import UseVerifikasi from "./UseVerifikasi"
import { CustomFlowbiteTheme } from "flowbite-react"
import { ClassModalIconT } from "@/utils/types"

type Props = {
    data: { email: string, id: string } | 'exp' | 'network error'
    jwt: string
    headerVerifikasi: ReactNode
    loadingBtnVerify: ReactNode
    btnBackVerify: ReactNode
    customInput: CustomFlowbiteTheme['textInput']
    customSpinnerInfo: CustomFlowbiteTheme['spinner']
    customBtnDefault: CustomFlowbiteTheme['button']
    skeletonVerify: ReactNode
    isSuccessVerify: ReactNode
    classModalIcon: ClassModalIconT
    customAlertFailure: CustomFlowbiteTheme['alert']
    customAlertSuccess: CustomFlowbiteTheme['alert']
}

export default function Form({
    data,
    jwt,
    headerVerifikasi,
    loadingBtnVerify,
    btnBackVerify,
    customInput,
    customSpinnerInfo,
    customBtnDefault,
    skeletonVerify,
    isSuccessVerify,
    customAlertFailure,
    customAlertSuccess,
    classModalIcon
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
    } = UseVerifikasi({ 
        data, 
        jwt,
        classModalIcon,
        customAlertFailure,
        customAlertSuccess,
        customButtonDefault: customBtnDefault
    })
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
                            loadingBtnVerify={loadingBtnVerify}
                            btnBackVerify={btnBackVerify}
                            customInput={customInput}
                            customSpinnerInfo={customSpinnerInfo}
                            customBtnDefault={customBtnDefault}
                        />
                    </> : <>{skeletonVerify}</>
                }
            </> : <>{isSuccessVerify}</>
            }
        </>
    )
}