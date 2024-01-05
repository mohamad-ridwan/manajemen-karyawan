import { ChangeEvent, KeyboardEvent, useContext, useEffect, useState } from "react"
import { useLazyQuery } from "@apollo/client"
import { MdMailOutline } from "react-icons/md";
import regex from "@/utils/regex"
import { usersSchemas } from "@/lib/graphql/schemas/users"
import { NavigateContext } from "@/utils/context/NavigateContext"
import { ClassModalIconT, DataNotifAlert, DataPopupModalT } from "@/utils/types"
import { Button, CustomFlowbiteTheme } from "flowbite-react";
import { useRouter } from "next/navigation";
import { queryEmailjs } from "@/lib/emailjs/querys";
import sendMail from "@/lib/emailjs/sendMail";
import { EmailJSResponseStatus } from "@emailjs/browser";

type InputValueT = {
    email: string
}

const {
    reqLupaPassword
} = usersSchemas

type Props = {
    classModalIcon: ClassModalIconT
    customAlertFailure: CustomFlowbiteTheme['alert']
    customAlertSuccess: CustomFlowbiteTheme['alert']
    customButtonDefault: CustomFlowbiteTheme['button']
}

export default function UseLupaPassword({
    classModalIcon,
    customAlertFailure,
    customAlertSuccess,
    customButtonDefault
}:Props) {
    const [inputValue, setInputValue] = useState<InputValueT>({
        email: ''
    })
    const [submitValue, setSubmitValue] = useState<string>('')
    const [errForm, setErrForm] = useState({} as InputValueT)

    const router = useRouter()
    const navigateContext = useContext(NavigateContext)

    const {
        verifikasi
    } = queryEmailjs

    const [
        reqLupaPasswordResolver,
        { data, loading, error }
    ] = useLazyQuery(
        reqLupaPassword([
            'jwt',
            'kode',
            'message'
        ]),
        {
            variables: {
                email: submitValue
            }
        }
    )

    const { mailRegex } = regex()

    useEffect(()=>{
        if(error?.message.toLowerCase() == 'akun tidak terdaftar'){
            setErrForm({email: error.message})
        }else if(error){
            navigateContext?.setOnNotifAlert({
                errMsg: 'Terjadi kesalahan server. Mohon coba lagi',
                color: 'failure',
                onDissmiss: ()=>navigateContext.setOnNotifAlert({} as DataNotifAlert),
                customTheme: customAlertFailure
            })

            if(error?.networkError){
                navigateContext?.setOnNotifConnection(true)
            }
        }
    }, [error])

    useEffect(() => {
        if (data?.reqLupaPassword?.jwt && !data?.reqLupaPassword?.message) {
            sendToEmail(
                data.reqLupaPassword.jwt,
                data.reqLupaPassword.kode
            )
        } else if (data?.reqLupaPassword?.message == 'Akun perlu diverifikasi') {
            notifNeedToVerifyFirst()
        }
    }, [data, submitValue])

    async function sendToEmail(jwt: string, kode: string):Promise<void>{
        const dataSend = {
            kode,
            to_email: submitValue,
            linkUrl: `${window.location.origin}/lupa-password/ganti-password/${jwt}`
        }

        const resultSendMail = await sendMail(
            verifikasi.serviceID,
            verifikasi.templateID,
            dataSend,
            verifikasi.publicKey
        )
        if((resultSendMail as EmailJSResponseStatus)?.status !== 200){
            navigateContext?.setOnNotifAlert({
                errMsg: 'Terjadi kesalahan saat mengirim verifikasi ke email. Silahkan coba lagi',
                color: 'failure',
                onDissmiss: ()=>navigateContext.setOnNotifAlert({} as DataNotifAlert),
                customTheme: customAlertFailure
            })
        }else{
            navigateContext?.setOnNotifAlert({
                errMsg: <>Berhasil mengirim kode verifikasi untuk Anda. Silahkan cek <strong>Email</strong> Anda.</>,
                color: 'success',
                onDissmiss: ()=>navigateContext.setOnNotifAlert({} as DataNotifAlert),
                customTheme: customAlertSuccess
            })
            router.push(`/lupa-password/ganti-password/${jwt}`)
        }
    }

    function notifNeedToVerifyFirst(): void {
        navigateContext?.setOnNotifAlert({
            errMsg: <>
                Akun perlu diverifikasi, silahkan cek email Anda untuk memasukan kode untuk verifikasi.
                <br />
                Silahkan Klik dibawah untuk verifikasi.
                <br />
                <div className="flex justify-end mt-2">
                    <Button onClick={() => clickToVerifikasi(data?.reqLupaPassword?.jwt)} size="sm" color="info" theme={customButtonDefault}>
                        Lanjut Verifikasi
                    </Button>
                </div>
            </>,
            color: 'failure',
            onDissmiss: () => navigateContext.setOnNotifAlert({} as DataNotifAlert),
            customTheme: customAlertFailure
        })
    }

    useEffect(() => {
        if (submitValue.trim()) {
            reqLupaPasswordResolver()
        }
        return () => {
            navigateContext?.setOnNotifAlert({} as DataNotifAlert)
            navigateContext?.setOnNotifConnection(false)
        }
    }, [submitValue])

    function clickToVerifikasi(jwt: string): void {
        router.push(`lupa-password/ganti-password/${jwt}`)
    }

    function changeInput(e: ChangeEvent<HTMLInputElement>): void {
        setInputValue({
            email: e.target.value
        })
    }

    function pressEnter(e: KeyboardEvent<HTMLInputElement>): void {
        if (e.key == 'Enter') {
            clickSubmit()
        }
    }

    function clickSubmit(): void {
        if (!loading && validateForm()) {
            navigateContext?.setOnPopupModal({
                show: true,
                clickClose: () => navigateContext.setOnPopupModal({} as DataPopupModalT),
                icon: <MdMailOutline className={classModalIcon} />,
                txtAsk: 'Anda akan mendapatkan verifikasi untuk mereset password Anda. Lanjutkan?',
                colorBtnSubmit: 'info',
                nameBtnSubmit: 'Ya',
                clickNext: clickNext,
                clickCancel: () => navigateContext.setOnPopupModal({} as DataPopupModalT)
            })
        }
    }

    function clickNext(): void {
        setSubmitValue(inputValue.email)
        navigateContext?.setOnPopupModal({} as DataPopupModalT)
    }

    function validateForm(): 'success' | undefined {
        let err = {} as InputValueT
        if (!mailRegex.test(inputValue.email)) {
            err.email = 'alamat email tidak valid'
        }
        setErrForm(err)
        if (Object.keys(err).length > 0) {
            return
        }
        return 'success'
    }

    return {
        changeInput,
        inputValue,
        clickSubmit,
        errForm,
        pressEnter,
        loading
    }
}