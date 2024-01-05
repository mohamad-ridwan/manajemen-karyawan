import Auth from "@/components/Auth";
import WrapRegister from "./WrapRegister";
import { customButtonDefault, customInput, customPopupModal } from "@/components/CustomTheme";
import LoadingBtn from "@/components/Loaders/LoadingBtn";
import BtnBackOfForm from "@/components/Forms/BtnBackOfForm";

type Props = {
    params: { role: string }
}

export default async function Register({
    params
}: Props) {
    const { role } = params
    return (
        <Auth
            title={`Tambahkan Akun ${role}`}
        >
            <WrapRegister
                params={params}
                customInput={customInput}
                customPopupModal={customPopupModal}
                loadingBtn={
                    <LoadingBtn color='info' theme={customButtonDefault} className='w-full' />
                }
                customBtnDefault={customButtonDefault}
                btnBack={
                    <BtnBackOfForm
                        href="/"
                        btnName="Kembali ke Beranda"
                    />
                }
            />
        </Auth>
    )
}