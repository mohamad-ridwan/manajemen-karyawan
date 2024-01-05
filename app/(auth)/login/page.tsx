import Auth from "@/components/Auth";
import Form from "./Form";
import LoadingBtn from "@/components/Loaders/LoadingBtn";
import { customAlertFailure, customButtonDefault, customInput } from "@/components/CustomTheme";
import BtnBackOfForm from "@/components/Forms/BtnBackOfForm";

export const dynamic = 'force-dynamic'

export default async function Login() {
    return (
        <Auth
            title="Masuk ke akun Anda"
        >
            <Form
                loadingBtn={
                    <LoadingBtn
                        theme={customButtonDefault}
                        color='info'
                        className='w-full'
                    />
                }
                btnLupaPw={
                    <BtnBackOfForm
                        href="/lupa-password"
                        btnName="Lupa password?"
                    />
                }
                customButtonDefault={customButtonDefault}
                customInput={customInput}
                customAlertFailure={customAlertFailure}
            />
        </Auth>
    )
}