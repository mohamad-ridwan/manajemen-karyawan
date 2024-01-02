import { customButtonDefault } from "@/components/CustomTheme";
import InputForm from "@/components/Forms/InputForm";
import LoadingBtn from "@/components/LoadingBtn";
import { Button, Label } from "flowbite-react";
import Link from "next/link";
import { ChangeEventHandler, KeyboardEventHandler } from "react";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";

type NewPasswordT = {
    newPassword: string
    confirmPassword: string
}

type Props = {
    showNewPw: boolean
    formGantiPassword: NewPasswordT
    changeInputGantiPw: ChangeEventHandler<HTMLInputElement>
    errFormGantiPw: NewPasswordT
    clickShowPw:(type: 'NEW-PASSWORD' | 'CONFIRM-PASSWORD')=>void
    showConfirmPw: boolean
    loadingSubmitGantiPw: boolean
    clickSubmitGantiPw: ()=>void
    pressEnter: KeyboardEventHandler<HTMLInputElement>
}

export default function FormGantiPassword({
    showNewPw,
    formGantiPassword,
    changeInputGantiPw,
    errFormGantiPw,
    clickShowPw,
    showConfirmPw,
    loadingSubmitGantiPw,
    clickSubmitGantiPw,
    pressEnter
}:Props){
    return (
        <>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-text md:text-2xl dark:text-white">
                Ganti Password Anda
            </h1>
            <div className='mt-8'>
                <Label value='Password Baru' />
                <span className="text-red-500 ml-1">*</span>
            </div>
            <div className='flex relative' style={{
                marginTop: '0.5rem'
            }}>
                <InputForm
                    type={showNewPw ? 'text' : 'password'}
                    name='newPassword'
                    placeholder={showNewPw ? 'Password Baru' : '••••••••'}
                    value={formGantiPassword.newPassword}
                    classLabel='hidden'
                    classWrap='w-full'
                    changeInput={changeInputGantiPw}
                    errMsg={errFormGantiPw.newPassword}
                    pressEnter={pressEnter}
                />

                <button className='absolute right-2' onClick={() => clickShowPw('NEW-PASSWORD')} style={{
                    marginTop: '0.8rem'
                }}>
                    {showNewPw ? (
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
            <div className='mt-8'>
                <Label value='Konfirmasi Password' />
                <span className="text-red-500 ml-1">*</span>
            </div>
            <div className='flex relative' style={{
                marginTop: '0.5rem'
            }}>
                <InputForm
                    type={showConfirmPw ? 'text' : 'password'}
                    name='confirmPassword'
                    placeholder={showConfirmPw ? 'Konfirmasi Password' : '••••••••'}
                    value={formGantiPassword.confirmPassword}
                    classLabel='hidden'
                    classWrap='w-full'
                    changeInput={changeInputGantiPw}
                    errMsg={errFormGantiPw.confirmPassword}
                    pressEnter={pressEnter}
                />

                <button className='absolute right-2' onClick={() => clickShowPw('CONFIRM-PASSWORD')} style={{
                    marginTop: '0.8rem'
                }}>
                    {showConfirmPw ? (
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
                <Link href='/login' className='text-sm text-gray-text'>
                    Kembali ke Login
                </Link>
            </div>
            {!loadingSubmitGantiPw ? (
                <Button onClick={clickSubmitGantiPw} theme={customButtonDefault} className='w-full'>
                    Ganti Password
                </Button>
            ) : (
                <LoadingBtn color='info' theme={customButtonDefault} className='w-full' />
            )}
        </>
    )
}