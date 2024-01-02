import { ChangeEventHandler, KeyboardEventHandler } from "react";
import InputForm from "@/components/Forms/InputForm";
import { Button, Spinner } from "flowbite-react";
import LoadingBtn from "@/components/LoadingBtn";
import { customButtonDefault, customSpinnerInfo } from "@/components/CustomTheme";
import Link from "next/link";

type Props = {
    kodeValue: string
    changeInput: ChangeEventHandler<HTMLInputElement>
    errForm: string
    resendToken: ()=>void
    clickSubmit:()=>void
    loadingResendMail: boolean
    loadingVerify: boolean
    pressEnter: KeyboardEventHandler<HTMLInputElement>
}

export default function Verifikasi({
    kodeValue,
    changeInput,
    errForm,
    resendToken,
    clickSubmit,
    loadingResendMail,
    loadingVerify,
    pressEnter
}: Props) {
    return (
        <>
            <InputForm
                type='tel'
                name='kode'
                placeholder='Kode 4 digit'
                label='Kode Verifikasi'
                noRequired={true}
                value={kodeValue}
                classInput='mt-2'
                changeInput={changeInput}
                errMsg={errForm}
                maxLength={4}
                pressEnter={pressEnter}
            />

            <div className='flex justify-end'>
                {loadingResendMail && (
                    <Spinner size="sm" color="info" theme={customSpinnerInfo} className="mr-2"/>
                )}
                <button className='text-sm text-gray-text font-semibold' onClick={resendToken} disabled={loadingResendMail || loadingVerify}>
                    Kirim ulang kode
                </button>
            </div>
            {!loadingVerify ? (
                <Button onClick={clickSubmit} theme={customButtonDefault} className='w-full'>
                    Verifikasi
                </Button>
            ) : (
                <LoadingBtn color='info' theme={customButtonDefault} className='w-full' />
            )}
            <div className='flex justify-end'>
                <Link href='/'>
                    <button className='text-sm text-gray-text'>
                        Kembali ke Beranda
                    </button>
                </Link>
            </div>
        </>
    )
}