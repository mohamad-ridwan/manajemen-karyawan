'use client'

import { ReactNode } from "react";
import UseRegister from "./UseRegister";
import FormDaftarAkun from "./FormDaftarAkun";
import ModalForm from "./ModalForm";
import { CustomFlowbiteTheme } from "flowbite-react";

type Props ={
    params: {role: string}
    customInput: CustomFlowbiteTheme['textInput']
    loadingBtn: ReactNode
    customBtnDefault: CustomFlowbiteTheme['button']
    btnBack: ReactNode
    customPopupModal: CustomFlowbiteTheme['modal']
}

export default function WrapRegister({
    params,
    customInput,
    loadingBtn,
    customBtnDefault,
    btnBack,
    customPopupModal
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
                customInput={customInput}
                customBtnDefault={customBtnDefault}
                customPopupModal={customPopupModal}
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
                customInput={customInput}
                loadingBtn={loadingBtn}
                customBtnDefault={customBtnDefault}
                btnBack={btnBack}
            />
        </>
    )
}