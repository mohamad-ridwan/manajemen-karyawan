'use client'

import UseRegister from "./UseRegister";
import FormDaftarAkun from "./FormDaftarAkun";
import ModalForm from "./ModalForm";
import { SelectOptT } from "@/utils/types";

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
    } = UseRegister({params})

    return (
        <>
            <ModalForm
                openModal={onFormDataKaryawan}
                closeModal={clickFormDataKaryawan}
                dataSelectInput={dataSelectInput}
                changeSelect={changeSelect}
                changeInput={changeInputDataKaryawan}
                changeNumberInput={changeNumberInput}
                formValue={formValue}
                errForm={errForm}
                onSelectedDateChanged={onSelectedDateChanged}
            />

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
                clickFormDataKaryawan={clickFormDataKaryawan}
            />
        </>
    )
}