import { ChangeEventHandler, KeyboardEventHandler, ReactNode } from "react";
import InputForm from "@/components/Forms/InputForm";
import { Button, CustomFlowbiteTheme, Spinner } from "flowbite-react";

type Props = {
    kodeValue: string
    changeInput: ChangeEventHandler<HTMLInputElement>
    errForm: string
    resendToken: ()=>void
    clickSubmit:()=>void
    loadingResendMail: boolean
    loadingVerify: boolean
    pressEnter: KeyboardEventHandler<HTMLInputElement>
    loadingBtnVerify: ReactNode
    btnBackVerify: ReactNode
    customInput: CustomFlowbiteTheme['textInput']
    customSpinnerInfo: CustomFlowbiteTheme['spinner']
    customBtnDefault: CustomFlowbiteTheme['button']
}

export default function Verifikasi({
    kodeValue,
    changeInput,
    errForm,
    resendToken,
    clickSubmit,
    loadingResendMail,
    loadingVerify,
    pressEnter,
    loadingBtnVerify,
    btnBackVerify,
    customInput,
    customSpinnerInfo,
    customBtnDefault
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
                customInput={customInput}
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
                <Button onClick={clickSubmit} theme={customBtnDefault} className='w-full'>
                    Verifikasi
                </Button>
            ) : (
                <>{loadingBtnVerify}</>
            )}
            {btnBackVerify}
        </>
    )
}