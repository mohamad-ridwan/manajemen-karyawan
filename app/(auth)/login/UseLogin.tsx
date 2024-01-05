'use client'

import { ChangeEvent, KeyboardEvent, useContext, useEffect, useState } from 'react'
import { NavigateContext } from '@/utils/context/NavigateContext'
import { DataNotifAlert } from '@/utils/types'
import { useLazyQuery } from '@apollo/client'
import { usersSchemas } from '@/lib/graphql/schemas/users'
import { UseCookies } from '@/lib/useCookies'
import { UsersContext } from '@/utils/context/UsersContext'
import { CustomFlowbiteTheme } from 'flowbite-react'

type LoginValueT = {
    email: string
    password: string
}

const {
    loginQuery
} = usersSchemas

type Props = {
    customAlertFailure: CustomFlowbiteTheme['alert']
}

export default function UseLogin({
    customAlertFailure,
}: Props) {
    const [loginValue, setLoginValue] = useState<LoginValueT>({
        email: '',
        password: ''
    })
    const [loginResult, setLoginResult] = useState<LoginValueT>({
        email: '',
        password: ''
    })
    const [errForm, setErrForm] = useState({} as LoginValueT)
    const [showPw, setShowPw] = useState<boolean>(false)

    const [
        loginResolver,
        { loading, data, error }
    ] = useLazyQuery(loginQuery(['token']), {
        variables: {
            email: loginResult.email,
            password: loginResult.password
        }
    })

    const navigateContext = useContext(NavigateContext)
    const usersContext = useContext(UsersContext)

    useEffect(() => {
        if (data) {
            UseCookies(data?.login?.token)
        }
        return () => navigateContext?.setOnNotifAlert({} as DataNotifAlert)
    }, [data])

    useEffect(() => {
        if (error?.message.toLowerCase() == 'akun tidak terdaftar') {
            setErrForm({
                ...errForm,
                password: error.message
            })
        } else if (error?.networkError) {
            navigateContext?.setOnNotifConnection(true)
        } else if (error) {
            navigateContext?.setOnNotifAlert({
                errMsg: 'Terjadi kesalahan server. Mohon coba lagi',
                color: 'failure',
                onDissmiss: () => navigateContext.setOnNotifAlert({} as DataNotifAlert),
                customTheme: customAlertFailure
            })
        }
    }, [error])

    function changeInput(e: ChangeEvent<HTMLInputElement>): void {
        setLoginValue({
            ...loginValue,
            [e.target.name]: e.target.value
        })
    }

    function pressEnter(e: KeyboardEvent<HTMLInputElement>): void {
        if (e.key == 'Enter') {
            clickSubmit()
        }
    }

    useEffect(() => {
        if (loginResult.email.trim()) {
            loginResolver()
        }
    }, [loginResult])

    function clickSubmit(): void {
        if (!usersContext?.loadingUsers && !loading && validateForm()) {
            setLoginResult(loginValue)
        }
    }

    function validateForm(): 'susccess' | undefined {
        let err = {} as LoginValueT
        if (!loginValue.email.trim()) {
            err.email = 'harap diisi'
        }
        if (!loginValue.password.trim()) {
            err.password = 'harap diisi'
        }
        setErrForm(err)
        if (Object.keys(err).length > 0) {
            return
        }
        return 'susccess'
    }

    function clickShowPw(): void {
        setShowPw(!showPw)
    }

    return {
        loginValue,
        changeInput,
        errForm,
        showPw,
        pressEnter,
        clickShowPw,
        clickSubmit,
        loading,
        usersContext
    }
}