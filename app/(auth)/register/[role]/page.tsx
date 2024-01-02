import Auth from "@/components/Auth";
import WrapRegister from "./WrapRegister";

type Props ={
    params: {role: string}
}

export default async function Register({
    params
}: Props){
    const {role} = params
    return (
        <Auth
        title={`Tambahkan Akun ${role}`}
        >
            <WrapRegister params={params}/>
        </Auth>
    )
}