import { ChangeEventHandler, ReactNode } from "react";
import { Button, CustomFlowbiteTheme, Label, Spinner, TextInput } from "flowbite-react";
import profilDefault from '@/images/avatar.svg'
import { MdDeleteForever } from "react-icons/md";
import { FcGallery } from "react-icons/fc"
import Image from "next/image";
import { UpdateInfoProfilT } from "@/utils/types";
import InputForm from "@/components/Forms/InputForm";

type Props = {
    deleteFotoProfil: () => void
    clickImg: () => void
    changeInputImg: ChangeEventHandler<HTMLInputElement>
    updateInfoProfilValue: UpdateInfoProfilT
    onLoadCompressImg: boolean
    errUpdateInfoProfilValue: UpdateInfoProfilT
    customInput: CustomFlowbiteTheme['textInput']
    changeInputProfilInfo: ChangeEventHandler<HTMLInputElement>
    onVerifyChangeEmail: boolean
    disabledEmail: boolean
    changeDisabledEmail:()=>void
    customButtonDefault: CustomFlowbiteTheme['button']
    kodeVerifyValue: string
    changeInputKodeVerify:ChangeEventHandler<HTMLInputElement>
    loadingVerify: boolean
    clickResendkode: ()=>void
    isSuccessVerify: boolean
    loadingSaveProfil: boolean
    clickSaveUbahProfil:()=>void
    saveBtnProfil: 'Simpan' | 'Kirim Kode'
    loadingBtn: ReactNode
}

export default function ProfilInfo({
    deleteFotoProfil,
    clickImg,
    changeInputImg,
    updateInfoProfilValue,
    onLoadCompressImg,
    errUpdateInfoProfilValue,
    customInput,
    changeInputProfilInfo,
    onVerifyChangeEmail,
    disabledEmail,
    changeDisabledEmail,
    customButtonDefault,
    kodeVerifyValue,
    changeInputKodeVerify,
    loadingVerify,
    clickResendkode,
    isSuccessVerify,
    loadingSaveProfil,
    clickSaveUbahProfil,
    saveBtnProfil,
    loadingBtn
}: Props) {
    return (
        <>
            <h1 className="mt-8 text-gray-text text-lg"><strong>Informasi Profil</strong></h1>
            <div className="flex items-center mt-8">
                <Label htmlFor="fotoProfil" value="Foto Profil" />
            </div>
            <div className="mt-2 relative flex w-fit h-fit">
                <div className="h-[130px] w-[130px] rounded-full">
                    <Image
                        src={updateInfoProfilValue.fotoProfil.length > 0 ?
                            updateInfoProfilValue.fotoProfil :
                            profilDefault
                        }
                        height={130}
                        width={130}
                        alt="foto profil"
                        className="object-cover h-full w-full rounded-full shadow-md"
                    />
                </div>

                {onLoadCompressImg ? (
                    <button className="absolute left top-0 h-9 w-9 rounded-full justify-center items-center flex bg-white z-[9px] shadow-md">
                        <Spinner
                            size='sm'
                            theme={{
                                size: {
                                    sm: 'w-4 h-4'
                                },
                                base: 'inline animate-spin text-gray-200'
                            }}
                            color='info'
                        />
                    </button>
                ) : (
                    <>
                        {updateInfoProfilValue.fotoProfil.length > 0 && (
                            <button className="absolute left top-0 h-9 w-9 rounded-full justify-center items-center flex bg-white z-[9px] shadow-md"
                                onClick={deleteFotoProfil}
                            >
                                <MdDeleteForever style={{
                                    height: '1.3rem',
                                    width: '1.3rem',
                                    color: 'rgb(220 38 38)'
                                }} />
                            </button>
                        )}
                    </>
                )}

                <button className="absolute right-2 bottom-0 h-10 w-10 rounded-full justify-center items-center flex bg-white z-[9px] shadow-md"
                    onClick={clickImg}
                >
                    <FcGallery style={{
                        height: '1.6rem',
                        width: '1.6rem'
                    }} />
                    <TextInput id="inputFotoProfil" type="file" accept="image/jpeg, image/jpg, image/png" className="hidden" onChange={changeInputImg} />
                </button>
            </div>
            <InputForm
                type='text'
                name='nama'
                placeholder='Mohamad Ridwan Apriyadi'
                label='Nama'
                noRequired={true}
                value={updateInfoProfilValue.nama}
                classWrap="mt-8"
                classInput='mt-2'
                changeInput={changeInputProfilInfo}
                errMsg={errUpdateInfoProfilValue.nama}
                customInput={customInput}
            />

            <div className="mt-8"><Label value="Email" /></div>
            <div className="items-end md:flex">
                <InputForm
                    type='email'
                    name='email'
                    placeholder='email.user@gmail.com'
                    label='Email'
                    noRequired={true}
                    onDisabled={onVerifyChangeEmail ? true : disabledEmail}
                    value={updateInfoProfilValue.email}
                    classWrap="mt-2 w-full"
                    classLabel="hidden"
                    changeInput={changeInputProfilInfo}
                    customInput={{
                        field:{
                            input:{
                                colors:{
                                    gray: `bg-white border-gray-300 ${onVerifyChangeEmail ? 'text-gray-900' : disabledEmail ? 'text-gray-300' : 'text-gray-900'} focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500`
                                }
                            }
                        }
                    }}
                />
                <div className="mt-2 md:mt-0">
                    <Button size='sm' color={disabledEmail ? "dark" : 'failure'} className="h-fit w-[6.5rem]" onClick={changeDisabledEmail} disabled={onVerifyChangeEmail} theme={customButtonDefault}>
                        {disabledEmail ? 'Ubah Email' : 'Batal'}
                    </Button>
                </div>
            </div>
            <p className="text-red-600"><small>{errUpdateInfoProfilValue.email}</small></p>
            <p className="text-sm text-gray-text mt-2">
                Ubah alamat Email perlu verifikasi ke Email Anda untuk dikonfirmasi, untuk memastikan kalau yang dapat merubah adalah Anda.
            </p>
            {onVerifyChangeEmail && (
                <>
                    <div className="mt-4">
                        <Label value="Kode Verifikasi" />
                    </div>
                    <div>
                        <InputForm
                            type='text'
                            name='text'
                            placeholder='Kode 4 digit'
                            value={kodeVerifyValue}
                            classWrap="mt-2 w-full"
                            classLabel="hidden"
                            changeInput={changeInputKodeVerify}
                            maxLength={4}
                            errMsg={kodeVerifyValue.length !== 4 ? 'Maksimal kode 4 digit' : ''}
                            customInput={customInput}
                        />
                    </div>
                    {loadingVerify && (
                        <Spinner size='sm' />
                    )}
                    <div className="flex justify-end mt-2">
                        <button className="text-gray-text text-sm" onClick={clickResendkode} disabled={loadingVerify === true ? true : isSuccessVerify === true ? true : false}>Kirim ulang kode</button>
                    </div>
                </>
            )}
            <div className="flex justify-end mt-4">
                {!loadingSaveProfil ? (
                    <Button onClick={clickSaveUbahProfil} disabled={!onVerifyChangeEmail ? false : onVerifyChangeEmail && isSuccessVerify === true ? false : true}>
                        {saveBtnProfil}
                    </Button>
                ) : (
                    <>{loadingBtn}</>
                )}
            </div>
        </>
    )
}