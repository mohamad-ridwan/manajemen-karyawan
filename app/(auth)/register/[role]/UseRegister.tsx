import React, { ChangeEvent, useContext, useEffect, useState } from "react"
import { DataNotifAlert, DataPopupModalT, UsersT } from "@/utils/types"
import { useRouter } from "next/navigation"
import { NavigateContext } from "@/utils/context/NavigateContext"
import { classModalIcon, customAlertFailure, customAlertSuccess, customButtonDefault } from "@/components/CustomTheme"
import regex from "@/utils/regex"
import { TiUserAdd } from "react-icons/ti";
import {useLazyQuery } from "@apollo/client"
import { usersSchemas } from "@/lib/graphql/schemas/users"
import { Button } from "flowbite-react"
import sendMail from "@/lib/emailjs/sendMail"
import { queryEmailjs } from "@/lib/emailjs/querys"
import { EmailJSResponseStatus } from "@emailjs/browser"

type Props = {
    params: { role: string }
}

const {
    postUser: postUserQuery
} = usersSchemas

export default function UseRegister({
    params
}: Props) {
    const [daftarAkunValue, setDaftarAkunValue] = useState<UsersT & {
        confirmPassword: string
    }>({
        id: '',
        role: 'Admin',
        nama: '',
        email: '',
        fotoProfil: '',
        password: '',
        isVerification: '',
        isDefaultAdmin: '',
        confirmPassword: ''
    })
    const [submitDaftarAkun, setSubmitDaftarAkun] = useState<UsersT & {
        confirmPassword: string
    }>({
        id: '',
        role: 'Admin',
        nama: '',
        email: '',
        fotoProfil: '',
        password: '',
        isVerification: '',
        isDefaultAdmin: '',
        confirmPassword: ''
    })
    const [errFormDaftarAkun, setErrFormDaftarAkun] = useState({} as UsersT & {
        confirmPassword: string
    })
    const [showPw, setShowPw] = useState<boolean>(false)
    const [showConfirmPw, setShowConfirmPw] = useState<boolean>(false)
    const [loadingSubmitPostUser, setLoadingSubmitPostUser] = useState<boolean>(false)

    const router = useRouter()
    const navigateContext = useContext(NavigateContext)
    const {
        mailRegex
    } = regex()
    const {
        verifikasi
    } = queryEmailjs

    const [
        postUser,
        { data: resultPostUser, loading: loadingPostUser, error: errPostUser }
    ] = useLazyQuery(
        postUserQuery(
            ['email', 'id', 'jwt', 'kode']
        ),
        {
            variables: {
                postUsersId: submitDaftarAkun.id,
                role: params?.role == 'Admin' ? 'Admin' : 'User',
                isDefaultAdmin: 'false',
                nama: submitDaftarAkun.nama,
                email: submitDaftarAkun.email,
                fotoProfil: submitDaftarAkun.fotoProfil,
                password: submitDaftarAkun.password,
                isVerification: 'false'
            }
        }
    )

    useEffect(() => {
        if (
            params?.role !== 'Admin' &&
            params?.role !== 'Karyawan'
        ) {
            router.push('/')
            setTimeout(() => {
                navigateContext?.setOnNotifAlert({
                    errMsg: <>
                        Tidak dapat menemukan url <strong>/{params.role.length > 20 ? params.role.substr(0, 20) + '...' : params.role}</strong>
                    </>,
                    color: 'failure',
                    onDissmiss: () => navigateContext.setOnNotifAlert({} as DataNotifAlert),
                    customTheme: customAlertFailure
                })
            }, 1500);
        }
    }, [params])

    function changeInput(e: ChangeEvent<HTMLInputElement>): void {
        setDaftarAkunValue({
            ...daftarAkunValue,
            [e.target.name]: e.target.value
        })
    }

    function pressEnter(
        e: React.KeyboardEvent<HTMLInputElement>,
        type: 'Admin' | 'Karyawan'
    ): void {
        if (e.key == 'Enter') {
            clickSubmitFormAkun(type)
        }
    }

    function clickSubmitFormAkun(type: 'Admin' | 'Karyawan'): void {
        if (!loadingSubmitPostUser && validateFormAkun()) {
            if (type == 'Admin') {
                onModalAddAdmin()
            }
        }
    }

    function validateFormAkun(): 'success' | undefined {
        let err = {} as UsersT & {
            confirmPassword: string
        }

        if (!daftarAkunValue.nama.trim()) {
            err.nama = 'Mohon diisi'
        }
        if (!mailRegex.test(daftarAkunValue.email)) {
            err.email = 'Alamat email tidak valid'
        }
        if (!daftarAkunValue.password.trim()) {
            err.password = 'Mohon diisi'
        } else if (daftarAkunValue.confirmPassword !== daftarAkunValue.password) {
            err.confirmPassword = 'Konfirmasi password tidak valid'
        }
        setErrFormDaftarAkun(err)
        if (Object.keys(err).length > 0) {
            return
        }

        return 'success'
    }

    function onModalAddAdmin(): void {
        navigateContext?.setOnPopupModal({
            show: true,
            clickClose: () => navigateContext.setOnPopupModal({} as DataPopupModalT),
            icon: <TiUserAdd className={classModalIcon} />,
            txtAsk: 'Daftarkan Admin?',
            colorBtnSubmit: 'info',
            nameBtnSubmit: 'Ya',
            clickNext: clickNextAddAdmin,
            clickCancel: () => navigateContext.setOnPopupModal({} as DataPopupModalT)
        })
    }

    useEffect(() => {
        if (submitDaftarAkun.email.trim()) {
            postUser()
        }
    }, [submitDaftarAkun])

    useEffect(() => {
        if (resultPostUser?.postUsers) {
            const {
                email,
                jwt,
                kode
            } = resultPostUser.postUsers
            pushSendtoEmail(email, jwt, kode)
        }
    }, [resultPostUser])

    async function pushSendtoEmail(
        email: string,
        jwt: string,
        kode: string
    ):Promise<void>{
        const data = {
            kode,
            to_email: email,
            linkUrl: `${window.location.origin}/register/Admin/${jwt}`
        }
        const emailResult = await sendMail(
            verifikasi.serviceID,
            verifikasi.templateID,
            data,
            verifikasi.publicKey
        )
        if((emailResult as EmailJSResponseStatus)?.status !== 200){
            navigateContext?.setOnNotifAlert({
                errMsg: 'Terjadi kesalahan saat mengirim verifikasi. Mohon coba lagi',
                color: 'failure',
                onDissmiss:()=>navigateContext.setOnNotifAlert({} as DataNotifAlert),
                customTheme: customAlertFailure
            })
            setLoadingSubmitPostUser(false)
            return
        }
        router.push(`/register/Admin/${jwt}`)
    }

    useEffect(() => {
        if (errPostUser?.networkError) {
            navigateContext?.setOnNotifConnection(true)
            setLoadingSubmitPostUser(false)
        } else if (errPostUser?.message?.toLowerCase() == 'akun telah digunakan') {
            setErrFormDaftarAkun({
                ...errFormDaftarAkun,
                confirmPassword: errPostUser.message
            })
            setLoadingSubmitPostUser(false)
        }else if(errPostUser?.message?.split('#')[0] == 'Akun perlu diverifikasi'){
            const jwt = errPostUser.message.split('#')[1]
            const route = `/register/Admin/${jwt}`
            navigateContext?.setOnNotifAlert({
                errMsg: <>
                Akun perlu diverifikasi. Silahkan klik dibawah ini untuk verifikasi akun Anda.
                <div className="flex justify-end mt-2">
                    <Button size="sm" theme={customButtonDefault} onClick={()=>router.push(route)}>
                        Klik disini
                    </Button>
                </div>
                </>,
                color: 'failure',
                onDissmiss: ()=>router.push(route),
                customTheme: customAlertFailure
            })
            setLoadingSubmitPostUser(false)
        }else if(errPostUser){
            navigateContext?.setOnNotifAlert({
                errMsg: 'Terjadi kesalahan server. Mohon coba lagi',
                color: 'failure',
                onDissmiss: () => navigateContext.setOnNotifAlert({} as DataNotifAlert),
                customTheme: customAlertFailure
            })
            setLoadingSubmitPostUser(false)
        }
    }, [errPostUser])

    useEffect(()=>{
        return ()=>navigateContext?.setOnNotifAlert({} as DataNotifAlert)
    }, [])

    function clickNextAddAdmin(): void {
        const newData = daftarAkunValue
        newData.id = `${new Date().getTime()}`
        setSubmitDaftarAkun(newData)
        navigateContext?.setOnPopupModal({} as DataPopupModalT)
        setLoadingSubmitPostUser(true)
    }

    function clickShowPw(type: 'PASSWORD' | 'CONFIRM-PASSWORD'): void {
        if (type == 'PASSWORD') {
            setShowPw(!showPw)
        } else if (type == 'CONFIRM-PASSWORD') {
            setShowConfirmPw(!showConfirmPw)
        }
    }

    return {
        daftarAkunValue,
        errFormDaftarAkun,
        changeInput,
        showPw,
        pressEnter,
        clickShowPw,
        showConfirmPw,
        loadingSubmitPostUser,
        clickSubmitFormAkun
    }
}