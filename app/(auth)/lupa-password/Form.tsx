'use client'

import { ReactNode } from "react"
import { Button, CustomFlowbiteTheme } from "flowbite-react"
import InputForm from "@/components/Forms/InputForm"
import UseLupaPassword from "./UseLupaPassword"
import { ClassModalIconT } from "@/utils/types"

type Props = {
    loadingBtn: ReactNode
    btnBack: ReactNode
    customInput: CustomFlowbiteTheme['textInput']
    customBtnDefault: CustomFlowbiteTheme['button']
    classModalIcon: ClassModalIconT
    customAlertFailure: CustomFlowbiteTheme['alert']
    customAlertSuccess: CustomFlowbiteTheme['alert']
}

export default function Form({
    loadingBtn,
    btnBack,
    customInput,
    customBtnDefault,
    classModalIcon,
    customAlertFailure,
    customAlertSuccess,
}: Props) {
    const {
        changeInput,
        inputValue,
        clickSubmit,
        errForm,
        pressEnter,
        loading
    } = UseLupaPassword({
        classModalIcon,
        customAlertFailure,
        customAlertSuccess,
        customButtonDefault: customBtnDefault
    })
    return (
        <>
            <InputForm
                type="email"
                name="email"
                placeholder='alamat.email@gmail.com'
                label="Email"
                classInput="mt-2"
                value={inputValue.email}
                errMsg={errForm?.email}
                changeInput={changeInput}
                pressEnter={pressEnter}
                customInput={customInput}
            />
            {btnBack}
            {!loading ? (
                <Button theme={customBtnDefault} onClick={clickSubmit} className='w-full'>
                    Kirim
                </Button>
            ) : (
                <>{loadingBtn}</>
            )}
        </>
    )
}