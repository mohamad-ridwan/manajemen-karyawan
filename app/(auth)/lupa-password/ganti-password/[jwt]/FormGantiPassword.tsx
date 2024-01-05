import { ChangeEventHandler, KeyboardEventHandler, ReactNode } from "react";
import InputForm from "@/components/Forms/InputForm";
import { Button, CustomFlowbiteTheme, Label } from "flowbite-react";
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
    clickShowPw: (type: 'NEW-PASSWORD' | 'CONFIRM-PASSWORD') => void
    showConfirmPw: boolean
    loadingSubmitGantiPw: boolean
    clickSubmitGantiPw: () => void
    pressEnter: KeyboardEventHandler<HTMLInputElement>
    loadingBtnGantiPw: ReactNode
    btnBackGantiPw: ReactNode
    customInput: CustomFlowbiteTheme['textInput']
    customBtnDefault: CustomFlowbiteTheme['button']
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
    pressEnter,
    loadingBtnGantiPw,
    btnBackGantiPw,
    customInput,
    customBtnDefault
}: Props) {
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
                    customInput={customInput}
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
                    customInput={customInput}
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
            {btnBackGantiPw}
            {!loadingSubmitGantiPw ? (
                <Button onClick={clickSubmitGantiPw} theme={customBtnDefault} className='w-full'>
                    Ganti Password
                </Button>
            ) : (
                <>{loadingBtnGantiPw}</>
            )}
        </>
    )
}