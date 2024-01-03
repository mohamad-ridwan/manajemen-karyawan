import React, { ChangeEvent, useContext, useEffect, useState } from "react"
import { DataKaryawanT, DataNotifAlert, DataPopupModalT, SelectOptT, UsersT } from "@/utils/types"
import { useRouter } from "next/navigation"
import { NavigateContext } from "@/utils/context/NavigateContext"
import { classModalIcon, customAlertFailure, customAlertSuccess, customButtonDefault } from "@/components/CustomTheme"
import regex from "@/utils/regex"
import { TiUserAdd } from "react-icons/ti";
import { useLazyQuery } from "@apollo/client"
import { usersSchemas } from "@/lib/graphql/schemas/users"
import { Button } from "flowbite-react"
import sendMail from "@/lib/emailjs/sendMail"
import { queryEmailjs } from "@/lib/emailjs/querys"
import { EmailJSResponseStatus } from "@emailjs/browser"
import { FaUserTie } from "react-icons/fa6"
import { karyawanSchemas } from "@/lib/graphql/schemas/karyawan"
import dateFormat from "@/utils/format/dateFormat"

type Props = {
    params: { role: string }
}

const {
    postUser: postUserQuery
} = usersSchemas

const {
    postKaryawan
} = karyawanSchemas

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
    const [submitDaftarAkun, setSubmitDaftarAkun] = useState({} as UsersT & {
        confirmPassword: string
    })
    const [errFormDaftarAkun, setErrFormDaftarAkun] = useState({} as UsersT & {
        confirmPassword: string
        dataKaryawan: string
    })
    const [showPw, setShowPw] = useState<boolean>(false)
    const [showConfirmPw, setShowConfirmPw] = useState<boolean>(false)
    const [loadingSubmitPostUser, setLoadingSubmitPostUser] = useState<boolean>(false)
    const [onFormDataKaryawan, setOnFormDataKaryawan] = useState<boolean>(false)

    const {
        setDateFormat
    } = dateFormat

    const [formValue, setFormValue] = useState<DataKaryawanT>({
        id: '',
        jabatan: 'Front End Developer',
        NIK: '',
        alamat: '',
        noTelp: '',
        tglLahir: `${new Date()}`,
        divisi: 'IT Developer',
        gaji: '',
        tglBergabung: `${new Date()}`,
        statusKaryawan: 'Aktif'
    })
    const [submitFormValue, setSubmitFormValue] = useState({} as DataKaryawanT)
    const [errForm, setErrForm] = useState({} as DataKaryawanT)

    const router = useRouter()
    const navigateContext = useContext(NavigateContext)
    const {
        mailRegex,
        numberRegex
    } = regex()
    const {
        verifikasi
    } = queryEmailjs

    const [
        postUser,
        { data: resultPostUser, loading: loadingPostUser, error: errPostUser }
    ] = useLazyQuery(
        postUserQuery(
            params?.role == 'Admin' ? ['email', 'id', 'jwt', 'kode'] : ['email', 'nama']
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
                isVerification: params?.role == 'Admin' ? 'false' : 'true'
            }
        }
    )

    const [
        postKaryawanResolver,
        { data: dataPostKaryawan, loading: loadingPostKaryawan, error: errPostKaryawan }
    ] = useLazyQuery(
        postKaryawan(['statusKaryawan']),
        {
            variables: {
                postKaryawanId: submitFormValue?.id,
                jabatan: submitFormValue?.jabatan,
                nik: submitFormValue?.NIK,
                alamat: submitFormValue?.alamat,
                noTelp: submitFormValue?.noTelp,
                tglLahir: submitFormValue?.tglLahir,
                divisi: submitFormValue?.divisi,
                gaji: submitFormValue?.gaji,
                tglBergabung: submitFormValue?.tglBergabung,
                statusKaryawan: submitFormValue?.statusKaryawan
            }
        }
    )

    const dataSelectInput: { [key: string]: SelectOptT[] } = {
        jabatan: [
            {
                name: 'Front End Developer',
                value: 'Front End Developer'
            },
            {
                name: 'Back End Developer',
                value: 'Back End Developer'
            },
        ],
        divisi: [
            {
                name: 'IT Developer',
                value: 'IT Developer',
            },
            {
                name: 'Marketing',
                value: 'Marketing',
            },
        ],
        statusKaryawan: [
            {
                name: 'Aktif',
                value: 'Aktif'
            },
            {
                name: 'Tidak',
                value: 'Tidak'
            }
        ]
    }

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

    function changeNumberInput(
        e: ChangeEvent<HTMLInputElement>,
    ): void {
        if (numberRegex.test(e.target.value)) {
            if (e.target.name == 'NIK') {
                if (e.target.value.length <= 16) {
                    setFormValue({
                        ...formValue,
                        [e.target.name]: e.target.value
                    })
                    e.target.setCustomValidity('')
                } else {
                    e.target.setCustomValidity('Maksimal NIK 16 digit')
                    e.target.reportValidity()
                }
            } else {
                setFormValue({
                    ...formValue,
                    [e.target.name]: e.target.value
                })
                e.target.setCustomValidity('')
            }
        } else {
            e.target.setCustomValidity('Harus berupa angka')
            e.target.reportValidity()
        }
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
        if (type == 'Admin' && !loadingSubmitPostUser && validateFormAkun()) {
            onModalAddAdmin()
        } else if (type == 'Karyawan' && !loadingSubmitPostUser && validateFormAkun() && validateFormKaryawan()) {
            onModalAddKaryawan()
        }
    }

    useEffect(() => {
        if (validateFormKaryawan() === undefined) {
            setErrFormDaftarAkun({
                ...errFormDaftarAkun,
                dataKaryawan: 'Data Karyawan belum lengkap'
            })
        } else {
            setErrFormDaftarAkun({
                ...errFormDaftarAkun,
                dataKaryawan: ''
            })
        }
    }, [daftarAkunValue, formValue])

    function validateFormAkun(): 'success' | undefined {
        let err = {} as UsersT & {
            confirmPassword: string
            dataKaryawan: string
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
        if (params?.role == 'Karyawan' && validateFormKaryawan() == undefined) {
            err.dataKaryawan = 'Data Karyawan belum lengkap'
        }
        setErrFormDaftarAkun(err)
        if (Object.keys(err).length > 0) {
            return
        }

        return 'success'
    }

    function validateFormKaryawan(): 'success' | undefined {
        let err = {} as DataKaryawanT
        if (formValue.NIK.length !== 16) {
            err.NIK = 'Maksimal NIK 16 digit'
        }
        if (!formValue.alamat.trim()) {
            err.alamat = 'Mohon diisi'
        }
        if (formValue.noTelp.length < 8) {
            err.noTelp = 'Nomor telepon tidak valid'
        }
        if (!formValue.gaji.trim()) {
            err.gaji = 'Mohon diisi'
        }
        setErrForm(err)
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

    function onModalAddKaryawan(): void {
        navigateContext?.setOnPopupModal({
            show: true,
            clickClose: () => navigateContext.setOnPopupModal({} as DataPopupModalT),
            icon: <FaUserTie className={classModalIcon} />,
            txtAsk: 'Daftarkan Karyawan?',
            colorBtnSubmit: 'info',
            nameBtnSubmit: 'Ya',
            clickNext: clickNextAddKaryawan,
            clickCancel: () => navigateContext.setOnPopupModal({} as DataPopupModalT)
        })
    }

    function clickNextAddKaryawan(): void {
        navigateContext?.setOnPopupModal({} as DataPopupModalT)
        const generateId = `${new Date().getTime()}`
        const newData = daftarAkunValue
        newData.id = generateId
        setSubmitDaftarAkun(newData)
        // data karyawan
        const newDataKaryawan = formValue
        newDataKaryawan.id = generateId
        newDataKaryawan.tglLahir = setDateFormat(formValue.tglLahir)
        newDataKaryawan.tglBergabung = setDateFormat(formValue.tglBergabung)
        setSubmitFormValue(formValue)
        setLoadingSubmitPostUser(true)
    }

    useEffect(() => {
        if (submitDaftarAkun?.email?.trim()) {
            postUser()
        }
    }, [submitDaftarAkun])

    useEffect(() => {
        if (params?.role == 'Admin' && resultPostUser?.postUsers) {
            const {
                email,
                jwt,
                kode
            } = resultPostUser.postUsers
            pushSendtoEmail(email, jwt, kode)
        } else if (params?.role == 'Karyawan' && resultPostUser?.postUsers) {
            postKaryawanResolver()
        }
    }, [resultPostUser])

    useEffect(() => {
        if (dataPostKaryawan) {
            navigateContext?.setOnNotifAlert({
                errMsg: <>
                    Karyawan baru beranma <strong>
                        {daftarAkunValue.nama}
                    </strong> berhasil ditambahkan. <strong>Semoga harimu lancar selalu {':)'}</strong>
                </>,
                color: 'success',
                onDissmiss: () => navigateContext.setOnNotifAlert({} as DataNotifAlert),
                customTheme: customAlertSuccess
            })
            setLoadingSubmitPostUser(false)

            setTimeout(() => {
                navigateContext?.setOnNotifAlert({} as DataNotifAlert)
            }, 5000);
            setFormValue({
                id: '',
                jabatan: 'Front End Developer',
                NIK: '',
                alamat: '',
                noTelp: '',
                tglLahir: `${new Date()}`,
                divisi: 'IT Developer',
                gaji: '',
                tglBergabung: `${new Date()}`,
                statusKaryawan: 'Aktif'
            })
            setSubmitFormValue({} as DataKaryawanT)
            setDaftarAkunValue({
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
            setSubmitDaftarAkun({} as UsersT & {
                confirmPassword: string
            })
        }
    }, [dataPostKaryawan])

    // err post karyawan
    useEffect(() => {
        if (errPostKaryawan?.networkError) {
            navigateContext?.setOnNotifConnection(true)
            setLoadingSubmitPostUser(false)
        } else if ((errPostKaryawan?.clientErrors as []).length > 0) {
            navigateContext?.setOnNotifAlert({
                errMsg: 'Terjadi kesalahan server. Mohon coba lagi',
                color: 'failure',
                onDissmiss: () => navigateContext.setOnNotifAlert({} as DataNotifAlert),
                customTheme: customAlertFailure
            })
            setLoadingSubmitPostUser(false)
        }
    }, [errPostKaryawan])

    async function pushSendtoEmail(
        email: string,
        jwt: string,
        kode: string
    ): Promise<void> {
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
        if ((emailResult as EmailJSResponseStatus)?.status !== 200) {
            navigateContext?.setOnNotifAlert({
                errMsg: 'Terjadi kesalahan saat mengirim verifikasi. Mohon coba lagi',
                color: 'failure',
                onDissmiss: () => navigateContext.setOnNotifAlert({} as DataNotifAlert),
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
        } else if (errPostUser?.message?.split('#')[0] == 'Akun perlu diverifikasi') {
            const jwt = errPostUser.message.split('#')[1]
            const route = `/register/Admin/${jwt}`
            navigateContext?.setOnNotifAlert({
                errMsg: <>
                    Akun perlu diverifikasi. Silahkan klik dibawah ini untuk verifikasi akun Anda.
                    <div className="flex justify-end mt-2">
                        <Button size="sm" theme={customButtonDefault} onClick={() => router.push(route)}>
                            Klik disini
                        </Button>
                    </div>
                </>,
                color: 'failure',
                onDissmiss: () => router.push(route),
                customTheme: customAlertFailure
            })
            setLoadingSubmitPostUser(false)
        } else if (errPostUser) {
            navigateContext?.setOnNotifAlert({
                errMsg: 'Terjadi kesalahan server. Mohon coba lagi',
                color: 'failure',
                onDissmiss: () => navigateContext.setOnNotifAlert({} as DataNotifAlert),
                customTheme: customAlertFailure
            })
            setLoadingSubmitPostUser(false)
        }
    }, [errPostUser])

    useEffect(() => {
        return () => navigateContext?.setOnNotifAlert({} as DataNotifAlert)
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

    function clickFormDataKaryawan(): void {
        setOnFormDataKaryawan(!onFormDataKaryawan)
    }

    function changeSelect(e: ChangeEvent<HTMLSelectElement>): void {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })
    }

    function changeInputDataKaryawan(e: ChangeEvent<HTMLInputElement>): void {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })
    }

    function onSelectedDateChanged(
        e: Date,
        nameInput: 'tglLahir' | 'tglBergabung'
    ): void {
        setFormValue({
            ...formValue,
            [nameInput]: `${e}`
        })
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
        clickSubmitFormAkun,
        clickFormDataKaryawan,
        onFormDataKaryawan,
        dataSelectInput,
        changeSelect,
        changeInputDataKaryawan,
        formValue,
        errForm,
        changeNumberInput,
        onSelectedDateChanged
    }
}