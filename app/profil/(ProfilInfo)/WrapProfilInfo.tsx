'use client'

import ProfilInfo from "./ProfilInfo";
import UseProfil from "../UseProfil";

export default function WrapProfilInfo() {
    const {
        deleteFotoProfil,
        clickImg,
        changeInputImg,
        updateInfoProfilValue,
        onLoadCompressImg
    } = UseProfil()
    return (
        <>
            <ProfilInfo
                deleteFotoProfil={deleteFotoProfil}
                clickImg={clickImg}
                changeInputImg={changeInputImg}
                updateInfoProfilValue={updateInfoProfilValue}
                onLoadCompressImg={onLoadCompressImg}
            />
        </>
    )
}