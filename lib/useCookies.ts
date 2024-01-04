'use server'

import { cookies } from "next/headers"

export async function UseCookies(
    token?: string,
    isDeleteToken?: boolean
    ){
    const cookieStore = cookies()

    if(token){
        cookieStore.set('auth-id', token)
    }

    if(isDeleteToken){
        cookieStore.delete('auth-id')
    }

    const getCookie = cookieStore.get('auth-id')
    
    return {
        getCookie,
    }
}