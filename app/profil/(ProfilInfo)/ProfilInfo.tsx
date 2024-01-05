import { ChangeEventHandler } from "react";
import { Label, Spinner, TextInput } from "flowbite-react";
import profilDefault from '@/images/avatar.svg'
import { MdDeleteForever } from "react-icons/md";
import { FcGallery } from "react-icons/fc"
import Image from "next/image";
import { UpdateInfoProfilT } from "@/utils/types";

type Props = {
    deleteFotoProfil: () => void
    clickImg: () => void
    changeInputImg: ChangeEventHandler<HTMLInputElement>
    updateInfoProfilValue: UpdateInfoProfilT
    onLoadCompressImg: boolean
}

export default function ProfilInfo({
    deleteFotoProfil,
    clickImg,
    changeInputImg,
    updateInfoProfilValue,
    onLoadCompressImg
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
        </>
    )
}