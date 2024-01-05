'use client'

import { ReactNode } from "react";
import ProfilInfo from "./ProfilInfo";
import UseProfil from "../UseProfil";
import { CustomFlowbiteTheme } from "flowbite-react";
import { ClassModalIconT } from "@/utils/types";

type Props = {
    customAlertFailure: CustomFlowbiteTheme['alert']
    customInput: CustomFlowbiteTheme['textInput']
    customButtonDefault: CustomFlowbiteTheme['button']
    classModalIcon: ClassModalIconT
    loadingBtn: ReactNode
}

export default function WrapProfilInfo({
    customAlertFailure,
    customInput,
    customButtonDefault,
    classModalIcon,
    loadingBtn
}: Props) {
    const {
        deleteFotoProfil,
        clickImg,
        changeInputImg,
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
    } = UseProfil({ customAlertFailure, classModalIcon })

    return (
        <>
            <ProfilInfo
                deleteFotoProfil={deleteFotoProfil}
                clickImg={clickImg}
                changeInputImg={changeInputImg}
                updateInfoProfilValue={updateInfoProfilValue}
                onLoadCompressImg={onLoadCompressImg}
                errUpdateInfoProfilValue={errUpdateInfoProfilValue}
                customInput={customInput}
                changeInputProfilInfo={changeInputProfilInfo}
                changeDisabledEmail={changeDisabledEmail}
                disabledEmail={disabledEmail}
                onVerifyChangeEmail={onVerifyChangeEmail}
                customButtonDefault={customButtonDefault}
                kodeVerifyValue={kodeVerifyValue}
                changeInputKodeVerify={changeInputKodeVerify}
                loadingVerify={loadingVerify}
                clickResendkode={clickResendkode}
                isSuccessVerify={isSuccessVerify}
                loadingSaveProfil={loadingSaveProfil}
                loadingBtn={loadingBtn}
                clickSaveUbahProfil={clickSaveUbahProfil}
                saveBtnProfil={saveBtnProfil}
            />
        </>
    )
}