import React, { ChangeEvent, useContext, useEffect, useState } from "react"
import { queryEmailjs } from "@/lib/emailjs/querys"
import sendMail from "@/lib/emailjs/sendMail"
import { verifySchemas } from "@/lib/graphql/schemas/verify"
import { NavigateContext } from "@/utils/context/NavigateContext"
import { ClassModalIconT, DataNotifAlert, DataPopupModalT } from "@/utils/types"
import { useLazyQuery } from "@apollo/client"
import { EmailJSResponseStatus } from "@emailjs/browser"
import { Button, CustomFlowbiteTheme } from "flowbite-react"
import { useParams, useRouter } from "next/navigation"
import { MdOutlineMail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { usersSchemas } from "@/lib/graphql/schemas/users"

type Props = {
    classModalIcon: ClassModalIconT
    customAlertFailure: CustomFlowbiteTheme['alert']
    customAlertSuccess: CustomFlowbiteTheme['alert']
    customButtonDefault: CustomFlowbiteTheme['button']
    data?: DataT
}

type DataT = { email: string, id: string } | 'exp' | 'network error'

const {
    resendToken: resendTokenQuery,
    verifyLupaPassword,
} = verifySchemas

const {
    resetPassword: resetPasswordQuery
} = usersSchemas

type NewPasswordT = {
    newPassword: string
    confirmPassword: string
}

export default function UseGantiPassword({
    classModalIcon,
    customAlertFailure,
    customAlertSuccess,
    customButtonDefault,
    data
}:Props) {
    const [kodeValue, setKodeValue] = useState<string>('')
    const [errForm, setErrForm] = useState<string>('')
    const [loadingResendMail, setLoadingResendMail] = useState<boolean>(false)
    const [submitKode, setSubmitKode] = useState<string>('')
    const [successVerify, setSuccessVerify] = useState<boolean>(false)
    const [showNewPw, setShowNewPw] = useState<boolean>(false)
    const [showConfirmPw, setShowConfirmPw] = useState<boolean>(false)
    const [formGantiPassword, setFormGantiPassword] = useState<NewPasswordT>({
        newPassword: '',
        confirmPassword: ''
    })
    const [resultFormGantiPw, setResultFormGantiPw] = useState<string>('')
    const [errFormGantiPw, setErrFormGantiPw] = useState({} as NewPasswordT)
    const [successResetPw, setSuccessResetPw] = useState<boolean>(false)

    const router = useRouter()
    const params = useParams()
    const navigateContext = useContext(NavigateContext)

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
                role: 'lupa-password',
                resendTokenId: (data as { email: string, id: string })?.id,
                jwt: params?.jwt
            }
        }
    )

    const [
        verifyLupaPasswordResolver,
        { loading: loadingVerify, data: dataVerify, error: errVerify }
    ] = useLazyQuery(
        verifyLupaPassword(
            'ResultVerifyLupaPassword',
            `data{
                message
                status
            }`
        ),
        {
            variables: {
                role: 'lupa-password',
                kode: submitKode,
                jwt: params?.jwt,
                verifyRegisterId: (data as { email: string, id: string })?.id
            }
        }
    )

    const [
        resetPasswordResolver,
        { loading: loadingResetPw, data: dataResetPassword, error: errResetPw }
    ] = useLazyQuery(
        resetPasswordQuery([
            'message',
            'status'
        ]),
        {
            variables: {
                resetPasswordId: (data as { email: string, id: string })?.id,
                email: (data as { email: string, id: string })?.email,
                newPassword: resultFormGantiPw
            }
        }
    )

    useEffect(() => {
        if (dataResetPassword?.resetPassword?.status == '201') {
            setSuccessResetPw(true)
        }
    }, [dataResetPassword])

    useEffect(() => {
        if (errResetPw?.networkError) {
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
        }else if(errResetPw){
            navigateContext?.setOnNotifAlert({
                errMsg: 'Terjadi kesalahan server. Mohon coba lagi.',
                color: 'failure',
                onDissmiss: () => navigateContext?.setOnNotifAlert({} as DataNotifAlert),
                customTheme: customAlertFailure
            })
        }
    }, [errResetPw])

    useEffect(() => {
        return () => {
            navigateContext?.setOnNotifAlert({} as DataNotifAlert)
            navigateContext?.setOnNotifConnection(false)
        }
    }, [])

    useEffect(() => {
        if (dataVerify?.verifyRegister?.data?.status == '200') {
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

    const {
        verifikasi
    } = queryEmailjs

    async function sendResenKodeToEmail(dataResendToken: { resendToken: { jwt: string, kode: string } }): Promise<void> {
        const dataSend = {
            kode: dataResendToken.resendToken.kode,
            jwt: dataResendToken.resendToken.jwt,
            to_email: (data as { email: string, id: string })?.email,
            linkUrl: `${window.location.origin}/lupa-password/ganti-password/${dataResendToken.resendToken.jwt}`
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
            router.replace(`/lupa-password/ganti-password/${jwt}`)
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

    function changeInput(e: ChangeEvent<HTMLInputElement>): void {
        setKodeValue(e.target.value)
    }

    function resendToken(): void {
        if (
            !loadingResendMail &&
            !loadingVerify
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

    function clickNextResendToken(): void {
        navigateContext?.setOnPopupModal({} as DataPopupModalT)
        navigateContext?.setOnNotifAlert({} as DataNotifAlert)
        navigateContext?.setOnNotifConnection(false)
        resendTokenResolver()
        setLoadingResendMail(true)
    }

    function clickSubmit(): void {
        if (
            !loadingResendMail &&
            !loadingVerify &&
            validateFormVerify()
        ) {
            navigateContext?.setOnPopupModal({
                show: true,
                clickClose: () => navigateContext.setOnPopupModal({} as DataPopupModalT),
                icon: <IoKeyOutline className={classModalIcon} />,
                txtAsk: 'Verifikasi untuk melanjutkan?',
                colorBtnSubmit: 'info',
                nameBtnSubmit: 'Ya',
                clickNext: clickNextVerify,
                clickCancel: () => navigateContext.setOnPopupModal({} as DataPopupModalT)
            })
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

    useEffect(() => {
        if (submitKode.length === 4) {
            navigateContext?.setOnPopupModal({} as DataPopupModalT)
            navigateContext?.setOnNotifAlert({} as DataNotifAlert)
            navigateContext?.setOnNotifConnection(false)
            verifyLupaPasswordResolver()
        }
    }, [submitKode])

    function clickNextVerify(): void {
        setSubmitKode(kodeValue)
    }

    function changeInputGantiPw(e: ChangeEvent<HTMLInputElement>): void {
        setFormGantiPassword({
            ...formGantiPassword,
            [e.target.name]: e.target.value
        })
    }

    function clickShowPw(type: 'NEW-PASSWORD' | 'CONFIRM-PASSWORD'): void {
        if (type == 'NEW-PASSWORD') {
            setShowNewPw(!showNewPw)
        } else {
            setShowConfirmPw(!showConfirmPw)
        }
    }

    function clickSubmitGantiPw(): void {
        if (
            !loadingResetPw &&
            validateSubmitGantiPw()
        ) {
            navigateContext?.setOnPopupModal({
                show: true,
                clickClose: () => navigateContext.setOnPopupModal({} as DataPopupModalT),
                icon: <IoKeyOutline className={classModalIcon} />,
                txtAsk: 'Reset password Anda?',
                colorBtnSubmit: 'info',
                nameBtnSubmit: 'Ya',
                clickNext: clickNextGantiPw,
                clickCancel: () => navigateContext.setOnPopupModal({} as DataPopupModalT)
            })
        }
    }

    function validateSubmitGantiPw(): 'success' | undefined {
        let err = {} as NewPasswordT
        if (!formGantiPassword.newPassword.trim()) {
            err.newPassword = 'Mohon di isi'
        } else if (
            formGantiPassword.confirmPassword !== formGantiPassword.newPassword
        ) {
            err.confirmPassword = 'Konfirmasi password tidak valid'
        }
        setErrFormGantiPw(err)
        if (Object.keys(err).length > 0) {
            return
        }
        return 'success'
    }

    useEffect(() => {
        if (resultFormGantiPw.length > 0) {
            resetPasswordResolver()
        }
    }, [resultFormGantiPw])

    function clickNextGantiPw(): void {
        navigateContext?.setOnPopupModal({} as DataPopupModalT)
        navigateContext?.setOnNotifAlert({} as DataNotifAlert)
        navigateContext?.setOnNotifConnection(false)
        setResultFormGantiPw(formGantiPassword.confirmPassword)
    }

    function pressEnter(e: React.KeyboardEvent<HTMLInputElement>, type: 'VERIFY' | 'RESET-PW'):void{
        if(e.key == 'Enter' && type == 'VERIFY'){
            clickSubmit()
        }else if(e.key == 'Enter' && type == 'RESET-PW') {
            clickSubmitGantiPw()
        }
    }

    return {
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
    }
}