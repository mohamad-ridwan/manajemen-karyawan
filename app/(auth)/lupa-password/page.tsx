import Auth from "@/components/Auth";
import Form from "./Form";
import LoadingBtn from "@/components/Loaders/LoadingBtn";
import { classModalIcon, customAlertFailure, customAlertSuccess, customButtonDefault, customInput } from "@/components/CustomTheme";
import BtnBackOfForm from "@/components/Forms/BtnBackOfForm";

export const dynamic = "force-dynamic";

export default function LupaPassword() {
    return (
        <Auth title="Lupa Password">
            <Form
                customInput={customInput}
                loadingBtn={
                    <LoadingBtn theme={customButtonDefault} color='info' className='w-full' />
                }
                customBtnDefault={customButtonDefault}
                btnBack={
                    <BtnBackOfForm
                        href="/login"
                        btnName="Kembali ke Login"
                    />
                }
                customAlertFailure={customAlertFailure}
                customAlertSuccess={customAlertSuccess}
                classModalIcon={classModalIcon}
            />
        </Auth>
    )
}