'use client'

import UseRegister from "./UseRegister";
import FormDaftarAkun from "./FormDaftarAkun";

type Props ={
    params: {role: string}
}

export default function WrapRegister({
    params
}: Props) {
    const {
        daftarAkunValue,
        errFormDaftarAkun,
        changeInput,
        showPw,
        pressEnter,
        clickShowPw,
        showConfirmPw,
        loadingSubmitPostUser,
        clickSubmitFormAkun
    } = UseRegister({params})

    return (
        <>
            <FormDaftarAkun
                daftarAkunValue={daftarAkunValue}
                changeInput={changeInput}
                errFormDaftarAkun={errFormDaftarAkun}
                showPw={showPw}
                pressEnter={pressEnter}
                clickShowPw={clickShowPw}
                showConfirmPw={showConfirmPw}
                loadingSubmitFormAkun={loadingSubmitPostUser}
                clickSubmitFormAkun={clickSubmitFormAkun}
                currentRoute={params?.role as 'Admin'}
            />
        </>
    )
}