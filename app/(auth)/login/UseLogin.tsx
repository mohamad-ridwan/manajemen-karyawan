'use client'

import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { NavigateContext } from '@/utils/context/NavigateContext'
import { DataNotifAlert } from '@/utils/types'
import { UseCookies } from '@/lib/useCookies'
import { UsersContext } from '@/utils/context/UsersContext'
import { CustomFlowbiteTheme } from 'flowbite-react'
import actionLogin from './actionLogin'

type LoginValueT = {
    email: string
    password: string
}

type Props = {
    customAlertFailure: CustomFlowbiteTheme['alert']
}

type LoginResultT = {
    token: string
    error: string | null
}

const loginState = {
    token: '',
    error: null
}

export default function UseLogin({
    customAlertFailure,
}: Props) {
    const [loginValue, setLoginValue] = useState<LoginValueT>({
        email: '',
        password: ''
    })
    const [errForm, setErrForm] = useState({} as LoginValueT)
    const [showPw, setShowPw] = useState<boolean>(false)

    const [stateLogin, formloginAction] = useFormState(actionLogin, loginState)

    function handleErrors(stateLogin: LoginResultT):void{
        if(stateLogin.error?.toLowerCase() == 'akun tidak terdaftar'){
            setErrForm({
                ...errForm,
                password: stateLogin.error
            })
        }else if(stateLogin.error == 'err-network'){
            navigateContext?.setOnNotifConnection(true)
        }else if(stateLogin.error == 'internal-server-error'){
            navigateContext?.setOnNotifAlert({
                errMsg: 'Terjadi kesalahan server. Mohon coba lagi',
                color: 'failure',
                onDissmiss: () => navigateContext.setOnNotifAlert({} as DataNotifAlert),
                customTheme: customAlertFailure
            })
        }
    }

    function handleResultLogin(stateLogin: LoginResultT){
        if(stateLogin.token.length > 0){
            UseCookies(stateLogin.token)
            navigateContext?.setOnNotifAlert({} as DataNotifAlert)
        }
    }

    useEffect(()=>{
        handleErrors(stateLogin as LoginResultT)
        handleResultLogin(stateLogin as LoginResultT)
    }, [stateLogin])

    const navigateContext = useContext(NavigateContext)
    const usersContext = useContext(UsersContext)

    function changeInput(e: ChangeEvent<HTMLInputElement>): void {
        setLoginValue({
            ...loginValue,
            [e.target.name]: e.target.value
        })
    }

    function clickShowPw(): void {
        setShowPw(!showPw)
    }

    return {
        loginValue,
        changeInput,
        errForm,
        showPw,
        clickShowPw,
        usersContext,
        formloginAction,
    }
}