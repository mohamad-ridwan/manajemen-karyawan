'use client'

import { ReactNode } from "react"
import Verifikasi from "./Verifikasi"
import UseGantiPassword from "./UseGantiPassword"
import FormGantiPassword from "./FormGantiPassword"
import { CustomFlowbiteTheme } from "flowbite-react"
import { ClassModalIconT } from "@/utils/types"

type DataT = { email: string, id: string } | 'exp' | 'network error'

type Props = {
    children?: ReactNode
    data: DataT
    header: ReactNode
    isSuccessResetPw?: ReactNode
    loadingBtnVerify: ReactNode
    skeletonVerify: ReactNode
    btnBackVerify: ReactNode
    btnBackGantiPw: ReactNode
    customInput: CustomFlowbiteTheme['textInput']
    customBtnDefault: CustomFlowbiteTheme['button']
    customSpinnerInfo: CustomFlowbiteTheme['spinner']
    classModalIcon: ClassModalIconT
    customAlertFailure: CustomFlowbiteTheme['alert']
    customAlertSuccess: CustomFlowbiteTheme['alert']
}

export default function WrapVerifikasi({
    children,
    header,
    data,
    isSuccessResetPw,
    loadingBtnVerify,
    skeletonVerify,
    btnBackVerify,
    btnBackGantiPw,
    customInput,
    customBtnDefault,
    customSpinnerInfo,
    classModalIcon,
    customAlertFailure,
    customAlertSuccess
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
    } = UseGantiPassword({
        classModalIcon,
        customAlertFailure,
        customAlertSuccess,
        customButtonDefault: customBtnDefault,
        data
    })

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
                            pressEnter={(e) => pressEnter(e, 'VERIFY')}
                            loadingBtnVerify={loadingBtnVerify}
                            btnBackVerify={btnBackVerify}
                            customInput={customInput}
                            customBtnDefault={customBtnDefault}
                            customSpinnerInfo={customSpinnerInfo}
                        /> :
                        <>{skeletonVerify}</>
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
                    pressEnter={(e) => pressEnter(e, 'RESET-PW')}
                    loadingBtnGantiPw={loadingBtnVerify}
                    btnBackGantiPw={btnBackGantiPw}
                    customBtnDefault={customBtnDefault}
                    customInput={customInput}
                />}
            </> :
                <>{isSuccessResetPw}</>
            }
        </>
    )
}