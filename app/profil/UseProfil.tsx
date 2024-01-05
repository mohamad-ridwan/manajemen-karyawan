import { ChangeEvent, useContext, useState } from "react";
import { DataNotifAlert, UpdateInfoProfilT } from "@/utils/types";
import ValidateImg from "@/utils/validations/ValidateImg";
import { NavigateContext } from "@/utils/context/NavigateContext";
import { customAlertFailure } from "@/components/CustomTheme";

export default function UseProfil() {
    const [updateInfoProfilValue, setUpdateInfoProfilValue] = useState<UpdateInfoProfilT>({
        fotoProfil: '',
        nama: '',
        email: '',
    })
    const [fileFotoProfil, setFileFotoProfil] = useState<File | null>(null)
    const [onLoadCompressImg, setOnLoadCompressImg] = useState<boolean>(false)

    const navigateContext = useContext(NavigateContext)

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

    return {
        deleteFotoProfil,
        clickImg,
        changeInputImg,
        fileFotoProfil,
        updateInfoProfilValue,
        onLoadCompressImg
    }
}