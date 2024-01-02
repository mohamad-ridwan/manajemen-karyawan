'use server'

import { UsersT } from "@/utils/types"
import { getClient } from "./client"
import { usersSchemas } from "./graphql/schemas/users"
import { UseCookies } from "./useCookies"

const {
    authSessionQuery
} = usersSchemas

export default async function authSessions(): Promise<UsersT | null | 'exp' | 'network error'> {
    const cookieData = await UseCookies()
    const { getCookie } = cookieData

    if (!getCookie) {
        return null
    }

    return await new Promise((resolve, reject) => {
        getClient().query({
            query: authSessionQuery([
                'id',
                'role',
                'isDefaultAdmin',
                'nama',
                'email',
                'fotoProfil',
                'isVerification'
            ]),
            variables: { token: getCookie.value }
        })
            .then(res => {
                resolve(res.data.authSession)
            })
            .catch(err => {
                if (err?.graphQLErrors[0]?.message == 'jwt expired') {
                    resolve('exp')
                } else if (err?.networkError) {
                    resolve('network error')
                }
            })
    })
}