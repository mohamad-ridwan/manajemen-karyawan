'use client'

import { ReactNode } from "react";
import InputForm from "@/components/Forms/InputForm";
import UseLogin from "./UseLogin";
import { IoEyeSharp } from "react-icons/io5";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { Button, CustomFlowbiteTheme } from "flowbite-react";
import actionLogin from "./actionLogin";

type Props = {
    loadingBtn: ReactNode
    btnLupaPw: ReactNode
    customButtonDefault: CustomFlowbiteTheme['button']
    customInput: CustomFlowbiteTheme['textInput']
    customAlertFailure: CustomFlowbiteTheme['alert']
}

export default function Form({
    loadingBtn,
    btnLupaPw,
    customButtonDefault,
    customInput,
    customAlertFailure
}: Props) {
    const {
        loginValue,
        changeInput,
        errForm,
        showPw,
        // pressEnter,
        clickShowPw,
        // clickSubmit,
        // loading,
        usersContext,
        formloginAction,
        pending
    } = UseLogin({
        customAlertFailure
    })

    return (
        <form action={formloginAction} className="space-y-4 md:space-y-6">
            <InputForm
                type='email'
                name='email'
                placeholder='alamat.email@gmail.com'
                label='Email'
                noRequired={true}
                value={loginValue.email}
                classInput="mt-2"
                changeInput={changeInput}
                errMsg={errForm.email}
                onInputRequired={true}
                // pressEnter={pressEnter}
                customInput={customInput}
            />
            <div className='relative items-center flex'>
                <InputForm
                    type={showPw ? 'text' : 'password'}
                    name='password'
                    placeholder={showPw ? 'Password Anda' : '••••••••'}
                    label='Password'
                    noRequired={true}
                    value={loginValue.password}
                    classInput='w-full mt-2 relative'
                    classWrap='w-full'
                    changeInput={changeInput}
                    onInputRequired={true}
                    // pressEnter={pressEnter}
                    errMsg={errForm.password}
                    customInput={customInput}
                />

                <button type="button" className='absolute right-2' onClick={clickShowPw} style={{
                    marginTop: errForm?.password ? '0.5rem' : '1.7rem'
                }}>
                    {showPw ? (
                        <IoEyeSharp style={{
                            color: 'rgb(55 65 81)',
                        }}
                        />
                    ) : (
                        <HiMiniEyeSlash style={{
                            color: 'rgb(156 163 175)',
                        }} />
                    )}
                </button>
            </div>
            {btnLupaPw}
            {!usersContext?.loadingUsers && !pending ? (
                <Button
                    type="submit"
                    theme={customButtonDefault}
                    // onClick={clickSubmit}
                    className='w-full'
                >
                    Login
                </Button>
            ) : (
                <>{loadingBtn}</>
            )}
        </form>
    )
}