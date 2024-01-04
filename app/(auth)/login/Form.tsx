'use client'

import InputForm from "@/components/Forms/InputForm";
import UseLogin from "./UseLogin";
import { IoEyeSharp } from "react-icons/io5";
import { HiMiniEyeSlash } from "react-icons/hi2";
import Link from "next/link";
import { Button } from "flowbite-react";
import LoadingBtn from "@/components/LoadingBtn";
import { customButtonDefault } from "@/components/CustomTheme";

export default function Form() {
    const {
        loginValue,
        changeInput,
        errForm,
        showPw,
        pressEnter,
        clickShowPw,
        clickSubmit,
        loading,
        usersContext
    } = UseLogin()

    return (
        <>
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
                pressEnter={pressEnter}
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
                    pressEnter={pressEnter}
                    errMsg={errForm.password}
                />

                <button className='absolute right-2' onClick={clickShowPw} style={{
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
            <div className="flex items-center justify-end">
                <Link href='/lupa-password' className='text-sm text-gray-text'>
                    Lupa password?
                </Link>
            </div>
            {!usersContext?.loadingUsers && !loading ? (
                <Button theme={customButtonDefault} onClick={clickSubmit} className='w-full'>
                    Login
                </Button>
            ) : (
                <LoadingBtn theme={customButtonDefault} color='info' className='w-full' />
            )}
        </>
    )
}