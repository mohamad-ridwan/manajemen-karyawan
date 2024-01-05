import { ChangeEvent, useContext, useEffect, useState } from "react";
import { ClassModalIconT, DataNotifAlert, DataPopupModalT, UpdateInfoProfilT } from "@/utils/types";
import ValidateImg from "@/utils/validations/ValidateImg";
import { NavigateContext } from "@/utils/context/NavigateContext";
import { CustomFlowbiteTheme } from "flowbite-react";
import { UsersContext } from "@/utils/context/UsersContext";
import { CgArrowsExchange } from "react-icons/cg";

type Props = {
    customAlertFailure: CustomFlowbiteTheme['alert']
    classModalIcon: ClassModalIconT
}

export default function UseProfil({
    customAlertFailure,
    classModalIcon
}: Props) {
    // informasi profil
    const [updateInfoProfilValue, setUpdateInfoProfilValue] = useState<UpdateInfoProfilT>({
        fotoProfil: '',
        nama: '',
        email: '',
    })
    const [errUpdateInfoProfilValue, setErrUpdateInfoProfilValue] = useState({} as UpdateInfoProfilT)
    const [fileFotoProfil, setFileFotoProfil] = useState<File | null>(null)
    const [onLoadCompressImg, setOnLoadCompressImg] = useState<boolean>(false)
    const [disabledEmail, setDisabledEmail] = useState<boolean>(true)
    const [saveBtnProfil, setSaveBtnProfil] = useState<'Simpan' | 'Kirim Kode'>('Simpan')
    const [onVerifyChangeEmail, setOnVerifyChangeEmail] = useState<boolean>(false)
    const [kodeVerifyValue, setKodeVerifyValue] = useState<string>('')
    const [loadingVerify, setLoadingVerify] = useState<boolean>(false)
    const [isSuccessVerify, setIsSuccessVerify] = useState<boolean>(false)
    const [loadingSaveProfil, setLoadingSaveProfil] = useState<boolean>(false)
    // end informasi profil

    const navigateContext = useContext(NavigateContext)
    const usersContext = useContext(UsersContext)
    const user = usersContext?.users

    useEffect(()=>{
        if(user?.id){
            setUpdateInfoProfilValue({
                fotoProfil: user.fotoProfil,
                nama: user.nama,
                email: user.email
            })
        }
    }, [user])

    function deleteFotoProfil(): void {
        setUpdateInfoProfilValue({
            ...updateInfoProfilValue,
            fotoProfil: ''
        })
        setFileFotoProfil(null)
    }

    function clickImg(): void {
        document.getElementById('inputFotoProfil')?.click()
    }

    function changeInputImg(e: ChangeEvent<HTMLInputElement>): void {
        const files = e.target.files
        if (files && files.length > 0) {
            setOnLoadCompressImg(true)
            ValidateImg(files)
                .then(res => {
                    setUpdateInfoProfilValue({
                        ...updateInfoProfilValue,
                        fotoProfil: res.imgURL
                    })
                    setFileFotoProfil(res.files)
                    setTimeout(() => {
                        setOnLoadCompressImg(false)
                    }, 500)
                })
                .catch(err => {
                    setOnLoadCompressImg(false)
                    navigateContext?.setOnNotifAlert({
                        errMsg: err?.message,
                        color: 'failure',
                        onDissmiss: () => navigateContext.setOnNotifAlert({} as DataNotifAlert),
                        customTheme: customAlertFailure
                    })
                    setTimeout(() => {
                        navigateContext?.setOnNotifAlert({} as DataNotifAlert)
                    }, 10000);
                })
        }
    }

    function changeInputProfilInfo(e: ChangeEvent<HTMLInputElement>): void {
        setUpdateInfoProfilValue({
            ...updateInfoProfilValue,
            [e.target.name]: e.target.value
        })
    }

    function changeDisabledEmail(): void {
        setDisabledEmail(!disabledEmail)
        if (disabledEmail === false) {
            setUpdateInfoProfilValue({
                ...updateInfoProfilValue,
                email: user?.email as string
            })
            setSaveBtnProfil('Simpan')
        } else {
            setSaveBtnProfil('Kirim Kode')
        }
    }

    function changeInputKodeVerify(e: ChangeEvent<HTMLInputElement>): void {
        setKodeVerifyValue(e.target.value)
    }

    function clickResendkode():void{

    }

    function clickSaveUbahProfil(): void {
        if (loadingSaveProfil === false && validateProfil()) {
            setErrUpdateInfoProfilValue({} as UpdateInfoProfilT)
            navigateContext?.setOnPopupModal({
                show: true,
                clickClose:()=>navigateContext.setOnPopupModal({} as DataPopupModalT),
                icon: <CgArrowsExchange className={classModalIcon} />,
                txtAsk: <>Ubah data <strong>Profil</strong>?</>,
                colorBtnSubmit: 'info',
                clickNext:()=>{},
                clickCancel:()=>navigateContext.setOnPopupModal({} as DataPopupModalT)
            })
        }
    }

    function validateProfil():'success' | undefined{
        return
    }

    return {
        deleteFotoProfil,
        clickImg,
        changeInputImg,
        fileFotoProfil,
        updateInfoProfilValue,
        onLoadCompressImg,
        errUpdateInfoProfilValue,
        changeInputProfilInfo,
        changeDisabledEmail,
        disabledEmail,
        onVerifyChangeEmail,
        kodeVerifyValue,
        changeInputKodeVerify,
        loadingVerify,
        clickResendkode,
        isSuccessVerify,
        loadingSaveProfil,
        clickSaveUbahProfil,
        saveBtnProfil
    }
}