import Auth from "@/components/Auth";
import Form from "./Form";
import HeaderVerifikasi from "@/app/(auth)/lupa-password/ganti-password/[jwt]/HeaderVerifikasi";
import { getClient } from "@/lib/client";
import { verifySchemas } from "@/lib/graphql/schemas/verify";

export const dynamic = 'force-dynamic'

const {
    validateVerify
} = verifySchemas

type Props = {
    params: { jwt: string }
}

async function fetchData(jwt: string): Promise<{ email: string, id: string } | 'exp' | 'network error'> {
    return await new Promise((resolve) => {
        getClient().query({
            query: validateVerify(
                'ResultValidateLupaPw',
                `data{
                    email
                    id
                }`
            ),
            variables: {
                role: 'register-admin',
                jwt,
            },
        })
            .then(res => {
                resolve(res.data.validateVerify?.data)
            })
            .catch(err => {
                if (err?.graphQLErrors[0]?.message?.toLowerCase() == 'token tidak valid atau sudah kedaluarsa') {
                    resolve('exp')
                } else if (err?.networkError) {
                    resolve('network error')
                }
            })
    })
}

export default async function Verifikasi({
    params
}: Props) {
    const { jwt } = params

    const data = await fetchData(jwt)
    return (
        <Auth>
            <Form
                data={data}
                jwt={jwt}
                headerVerifikasi={
                    <HeaderVerifikasi
                        email={(data as { email: string })?.email}
                        title="Verifikasi Akun Admin"
                    />
                }
            />
        </Auth>
    )
}