'use server'

import { getClient } from "@/lib/client"
import { usersSchemas } from "@/lib/graphql/schemas/users"
import { ApolloError } from "@apollo/client"
import { revalidateTag } from "next/cache"
import {z} from 'zod'

type LoginValueT = {
    email: string
    password: string
}

const {
    loginQuery
} = usersSchemas

export default async function actionLogin(prevState: any, formData: FormData){
    const schema = z.object({
        email: z.string({
            invalid_type_error: 'Alamat email tidak valid'
        }),
        password: z.string({
            invalid_type_error: 'Mohon isi password Anda'
        })
    })

    const validateFields = schema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    })

    const {
        email,
        password
    } = (validateFields as {data: LoginValueT}).data

    try {
        const result = await getClient().query({
            query: loginQuery([
                'token'
            ]),
            variables: {
                email,
                password
            }
        })
        revalidateTag('login-data')
        return {token: result.data.login.token, error: null}
    } catch (error) {
        const err = error as ApolloError
        if(err?.message.toLowerCase() == 'akun tidak terdaftar'){
            return {token: '', error: err?.message}
        }else if(err?.networkError){
            return {token: '', error: 'err-network'}
        }else if(err){
            return {token: '', error: 'internal-server-error'}
        }
    }
}