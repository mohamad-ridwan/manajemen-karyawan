import Auth from "@/components/Auth";
import WrapVerifikasi from "./WrapVerifikasi";
import HeaderVerifikasi from "./HeaderVerifikasi";
import { getClient } from "@/lib/client";
import { verifySchemas } from "@/lib/graphql/schemas/verify"
import Success from "./Success";

const {
    validateVerify
} = verifySchemas

type Params = {
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
                role: 'lupa-password',
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

export default async function GantiPassword({
    params
}: Params) {
    const { jwt } = params

    const data = await fetchData(jwt)

    return (
        <Auth>
            <WrapVerifikasi
                data={data}
                header={<HeaderVerifikasi email={(data as { email: string })?.email} />}
                isSuccessResetPw={<Success/>}
            />
        </Auth>
    )
}