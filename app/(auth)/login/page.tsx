import Auth from "@/components/Auth";
import Form from "./Form";

export default async function Login() {
    return (
        <Auth
            title="Masuk ke akun Anda"
        >
            <Form />
        </Auth>
    )
}