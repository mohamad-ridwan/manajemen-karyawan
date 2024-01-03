import React, { CSSProperties, ChangeEventHandler } from "react"
import InputForm from "@/components/Forms/InputForm"
import { UsersT } from "@/utils/types"
import { Button, Label } from "flowbite-react"
import { IoEyeSharp } from "react-icons/io5"
import { HiMiniEyeSlash } from "react-icons/hi2"
import Link from "next/link"
import { customButtonDefault } from "@/components/CustomTheme"
import LoadingBtn from "@/components/LoadingBtn"
import { CgCloseO } from "react-icons/cg";
import { MdOutlineCheckCircle } from "react-icons/md";

type Props = {
    daftarAkunValue: UsersT & {
        confirmPassword: string
    }
    changeInput: ChangeEventHandler<HTMLInputElement>
    errFormDaftarAkun: UsersT & {
        confirmPassword: string
        dataKaryawan: string
    }
    showPw: boolean
    showConfirmPw: boolean
    pressEnter: (e: React.KeyboardEvent<HTMLInputElement>, type: 'Admin' | 'Karyawan') => void
    clickShowPw: (type: 'PASSWORD' | 'CONFIRM-PASSWORD') => void
    loadingSubmitFormAkun: boolean
    clickSubmitFormAkun: (type: 'Admin' | 'Karyawan') => void
    currentRoute: 'Admin' | 'Karyawan'
    clickFormDataKaryawan: () => void
}

export default function FormDaftarAkun({
    daftarAkunValue,
    changeInput,
    errFormDaftarAkun,
    showPw,
    pressEnter,
    clickShowPw,
    showConfirmPw,
    loadingSubmitFormAkun,
    clickSubmitFormAkun,
    currentRoute,
    clickFormDataKaryawan
}: Props) {

    const styleIconX: CSSProperties = {
        height: '1.1rem',
        width: '1.1rem',
        color: 'rgb(220 38 38)',
        marginRight: '0.3rem'
    }
    const styleIconSuccess: CSSProperties = {
        height: '1.1rem',
        width: '1.1rem',
        color: 'rgb(34 197 94)',
        marginRight: '0.3rem'
    }

    return (
        <>
            <InputForm
                type='text'
                name='nama'
                placeholder='Mohamad Ridwan Apriyadi'
                label='Nama'
                value={daftarAkunValue.nama}
                classInput='mt-2'
                changeInput={changeInput}
                errMsg={errFormDaftarAkun.nama}
                pressEnter={(e) => pressEnter(e, currentRoute)}
            />
            <InputForm
                type='email'
                name='email'
                placeholder='email.user@gmail.com'
                label='Email'
                value={daftarAkunValue.email}
                classInput='mt-2'
                changeInput={changeInput}
                errMsg={errFormDaftarAkun.email}
                pressEnter={(e) => pressEnter(e, currentRoute)}
            />
            <div className='mt-8'>
                <Label value='Password' />
                <span className="text-red-500 ml-1">*</span>
            </div>
            <div className='flex relative' style={{
                marginTop: '0.5rem'
            }}>
                <InputForm
                    type={showPw ? 'text' : 'password'}
                    name='password'
                    placeholder={showPw ? 'Password' : '••••••••'}
                    value={daftarAkunValue.password}
                    classLabel='hidden'
                    classWrap='w-full'
                    changeInput={changeInput}
                    errMsg={errFormDaftarAkun.password}
                    pressEnter={(e) => pressEnter(e, currentRoute)}
                />

                <button className='absolute right-2' onClick={() => clickShowPw('PASSWORD')} style={{
                    marginTop: '0.8rem'
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
                    value={daftarAkunValue.confirmPassword}
                    classLabel='hidden'
                    classWrap='w-full'
                    changeInput={changeInput}
                    errMsg={errFormDaftarAkun.confirmPassword}
                    pressEnter={(e) => pressEnter(e, currentRoute)}
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
            {currentRoute == 'Karyawan' &&
                <div className="items-center flex flex-wrap">
                    {errFormDaftarAkun?.dataKaryawan ?
                        <CgCloseO style={styleIconX} />
                        :
                        <MdOutlineCheckCircle style={styleIconSuccess} />
                    }

                    <button className="text-gray-text" onClick={clickFormDataKaryawan}>
                        Isi data Karyawan
                    </button>
                </div>
            }

            <div className="flex items-center justify-end">
                <Link href='/' className='text-sm text-gray-text'>
                    Kembali ke Beranda
                </Link>
            </div>
            {!loadingSubmitFormAkun ? (
                <Button onClick={() => clickSubmitFormAkun(currentRoute)} theme={customButtonDefault} className='w-full'>
                    Submit
                </Button>
            ) : (
                <LoadingBtn color='info' theme={customButtonDefault} className='w-full' />
            )}
        </>
    )
}