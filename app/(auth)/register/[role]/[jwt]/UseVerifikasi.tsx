import React, { ChangeEvent, useContext, useEffect, useState } from "react"
import { queryEmailjs } from "@/lib/emailjs/querys"
import sendMail from "@/lib/emailjs/sendMail"
import { verifySchemas } from "@/lib/graphql/schemas/verify"
import { NavigateContext } from "@/utils/context/NavigateContext"
import { ClassModalIconT, DataNotifAlert, DataPopupModalT } from "@/utils/types"
import { useLazyQuery } from "@apollo/client"
import { EmailJSResponseStatus } from "@emailjs/browser"
import { Button, CustomFlowbiteTheme } from "flowbite-react"
import { useRouter } from "next/navigation"
import { MdOutlineMail } from "react-icons/md"

type Props = {
    data: { email: string, id: string } | 'exp' | 'network error'
    jwt: string
    classModalIcon: ClassModalIconT
    customAlertFailure: CustomFlowbiteTheme['alert']
    customAlertSuccess: CustomFlowbiteTheme['alert']
    customButtonDefault: CustomFlowbiteTheme['button']
}

const {
    resendToken: resendTokenQuery,
    verifyLupaPassword
} = verifySchemas

export default function UseVerifikasi({
    data,
    jwt,
    classModalIcon,
    customAlertFailure,
    customAlertSuccess,
    customButtonDefault
}: Props){
    const [kodeValue, setKodeValue] = useState<string>('')
    const [errForm, setErrForm] = useState<string>('')
    const [loadingResendMail, setLoadingResendMail] = useState<boolean>(false)
    const [submitKode, setSubmitKode] = useState<string>('')
    const [successVerify, setSuccessVerify] = useState<boolean>(false)

    const navigateContext = useContext(NavigateContext)
    const router = useRouter()

    const {
        verifikasi
    } = queryEmailjs

    const [
        resendTokenResolver,
        { data: dataResendToken, loading: loadingResendToken, error: errResendToken }
    ] = useLazyQuery(
        resendTokenQuery(
            'DataVerify',
            ['kode', 'jwt']
        ),
        {
            variables: {
                role: 'register-admin',
                resendTokenId: (data as {id: string})?.id,
                jwt
            }
        }
    )

    const [
        verifyRegisterResolver,
        { loading: loadingVerify, data: dataVerify, error: errVerify }
    ] = useLazyQuery(
        verifyLupaPassword(
            'ResultVerifyRegister',
            `data{
                message
                status
            }`
        ),
        {
            variables: {
                role: 'register-admin',
                kode: submitKode,
                jwt,
                verifyRegisterId: (data as {id: string })?.id
            }
        }
    )

    async function sendResenKodeToEmail(dataResendToken: { resendToken: { jwt: string, kode: string } }): Promise<void> {
        const dataSend = {
            kode: dataResendToken.resendToken.kode,
            to_email: (data as { email: string})?.email,
            linkUrl: `${window.location.origin}/register/Admin/${dataResendToken.resendToken.jwt}`
        }
        const emailData = await sendMail(
            verifikasi.serviceID,
            verifikasi.templateID,
            dataSend,
            verifikasi.publicKey
        )
        if ((emailData as EmailJSResponseStatus)?.status !== 200) {
            navigateContext?.setOnNotifAlert({
                errMsg: 'Terjadi kesalahan saat mengirim ulang kode. Mohon coba lagi.',
                color: 'failure',
                onDissmiss: () => navigateContext?.setOnNotifAlert({} as DataNotifAlert),
                customTheme: customAlertFailure
            })
        } else {
            const jwt = dataResendToken.resendToken.jwt
            router.replace(`/register/Admin/${jwt}`)
            navigateContext?.setOnNotifAlert({
                errMsg: 'Kode verifikasi telah berhasil di kirim. Silahkan cek email anda.',
                color: 'success',
                onDissmiss: () => navigateContext.setOnNotifAlert({} as DataNotifAlert),
                customTheme: customAlertSuccess
            })
            setTimeout(() => {
                navigateContext?.setOnNotifAlert({} as DataNotifAlert)
            }, 5000);
        }

        setLoadingResendMail(false)
    }

    useEffect(() => {
        if (dataVerify?.verifyRegister?.data?.status == '201') {
            setSuccessVerify(true)
        }
    }, [dataVerify])

    useEffect(() => {
        if (errVerify?.message?.toLowerCase() == 'token tidak valid atau sudah kedaluarsa') {
            setErrForm(errVerify.message)
        } else if (errVerify?.networkError) {
            navigateContext?.setOnNotifAlert({
                errMsg: <>
                    Terjadi kesalahan server. Mohon coba lagi.
                    <div className="mt-2 flex justify-end">
                        <Button theme={customButtonDefault} onClick={() => window.location.reload()}>
                            Muat Ulang
                        </Button>
                    </div>
                </>,
                color: 'failure',
                onDissmiss: () => window.location.reload(),
                customTheme: customAlertFailure
            })
            navigateContext?.setOnNotifConnection(true)
        } else if (errVerify) {
            navigateContext?.setOnNotifAlert({
                errMsg: 'Terjadi kesalahan server. Mohon coba lagi.',
                color: 'failure',
                onDissmiss: () => navigateContext?.setOnNotifAlert({} as DataNotifAlert),
                customTheme: customAlertFailure
            })
        }
    }, [errVerify])

    useEffect(() => {
        if (dataResendToken) {
            sendResenKodeToEmail(dataResendToken)
        }
    }, [dataResendToken])

    useEffect(() => {
        if (errResendToken?.networkError) {
            navigateContext?.setOnNotifAlert({
                errMsg: <>
                    Terjadi kesalahan server. Mohon coba lagi.
                    <div className="mt-2 flex justify-end">
                        <Button theme={customButtonDefault} onClick={() => window.location.reload()}>
                            Muat Ulang
                        </Button>
                    </div>
                </>,
                color: 'failure',
                onDissmiss: () => window.location.reload(),
                customTheme: customAlertFailure
            })
            navigateContext?.setOnNotifConnection(true)
            setLoadingResendMail(false)
        } else if (errResendToken) {
            navigateContext?.setOnNotifAlert({
                errMsg: 'Terjadi kesalahan server. Mohon coba lagi.',
                color: 'failure',
                onDissmiss: () => navigateContext?.setOnNotifAlert({} as DataNotifAlert),
                customTheme: customAlertFailure
            })
            setLoadingResendMail(false)
        }
    }, [errResendToken])

    useEffect(() => {
        if (data == 'exp') {
            setTimeout(() => {
                navigateContext?.setOnNotifAlert({
                    errMsg: <>
                        Token tidak valid atau sudah kedaluarsa. Silahkan kirim ulang verifikasi untuk melanjutkan.
                        <div className="mt-2 flex justify-end">
                            <Button theme={customButtonDefault} onClick={() => {
                                navigateContext.setOnNotifAlert({} as DataNotifAlert)
                                router.push('/')
                            }}>
                                Kembali
                            </Button>
                        </div>
                    </>,
                    color: 'failure',
                    onDissmiss: () => {
                        navigateContext.setOnNotifAlert({} as DataNotifAlert)
                        router.push('/')
                    },
                    customTheme: customAlertFailure
                })
            }, 1500);
        } else if (data == 'network error') {
            navigateContext?.setOnNotifAlert({
                errMsg: <>
                    Terjadi kesalahan server. Mohon coba lagi.
                    <div className="mt-2 flex justify-end">
                        <Button theme={customButtonDefault} onClick={() => window.location.reload()}>
                            Muat Ulang
                        </Button>
                    </div>
                </>,
                color: 'failure',
                onDissmiss: () => window.location.reload(),
                customTheme: customAlertFailure
            })
            navigateContext?.setOnNotifConnection(true)
        }
    }, [data])

    function changeInput(e: ChangeEvent<HTMLInputElement>):void{
        setKodeValue(e.target.value)
    }

    function resendToken(): void {
        if (
            !loadingResendMail
        ) {
            navigateContext?.setOnPopupModal({
                show: true,
                clickClose: () => navigateContext.setOnPopupModal({} as DataPopupModalT),
                icon: <MdOutlineMail className={classModalIcon} />,
                txtAsk: 'Kirim ulang kode verifikasi?',
                colorBtnSubmit: 'info',
                nameBtnSubmit: 'Ya',
                clickNext: clickNextResendToken,
                clickCancel: () => navigateContext.setOnPopupModal({} as DataPopupModalT)
            })
        }
    }

    function clickNextResendToken():void{
        navigateContext?.setOnPopupModal({} as DataPopupModalT)
        navigateContext?.setOnNotifAlert({} as DataNotifAlert)
        navigateContext?.setOnNotifConnection(false)
        resendTokenResolver()
        setLoadingResendMail(true)
    }

    useEffect(()=>{
        if(submitKode){
            verifyRegisterResolver()
        }
    }, [submitKode])

    function clickSubmit():void{
        if (
            !loadingResendMail &&
            !loadingVerify &&
            validateFormVerify()
        ) {
            setSubmitKode(kodeValue)
        }
    }

    function validateFormVerify(): 'success' | undefined {
        let err = ''
        if (kodeValue.length !== 4) {
            err = 'Maksimal kode 4 digit'
        }
        setErrForm(err)
        if (err.length > 0) {
            return
        }
        return 'success'
    }

    function pressEnter(e: React.KeyboardEvent<HTMLInputElement>):void{
        if(e.key == 'Enter'){
            clickSubmit()
        }
    }

    return {
        kodeValue,
        changeInput,
        errForm,
        resendToken,
        clickSubmit,
        pressEnter,
        loadingResendMail,
        successVerify,
        loadingVerify
    }
}