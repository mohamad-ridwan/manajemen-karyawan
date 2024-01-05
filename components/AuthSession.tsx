'use client'

import { useContext, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { UsersContext } from "@/utils/context/UsersContext"
import { NavigateContext } from "@/utils/context/NavigateContext"
import { DataNotifAlert, UsersT } from "@/utils/types"
import { UseCookies } from "@/lib/useCookies"
import { CustomFlowbiteTheme } from "flowbite-react"

type Props = {
    users: UsersT | "exp" | "network error" | null
    customAlertSuccess: CustomFlowbiteTheme['alert']
}

export default function AuthSession({
    users,
    customAlertSuccess
}: Props) {
    const usersContext = useContext(UsersContext)
    const navigateContext = useContext(NavigateContext)

    const router = useRouter()
    const pathname = usePathname()

    async function getSession(): Promise<void> {
        usersContext?.setLoadingUsers(true)
        navigateContext?.setOnNotifConnection(false)
        if (!users) {
            router.push('/login')
            usersContext?.setUsers({} as UsersT)
            setTimeout(() => {
                usersContext?.setLoadingUsers(false)
            }, 1500);
            return
        } else if (users == 'exp') {
            UseCookies(undefined, true)
            navigateContext?.setOnNotifAlert({
                errMsg: 'Sesi login Anda tidak valid atau sudah berakhir. Mohon untuk login kembali.',
                color: 'success',
                onDissmiss: () => navigateContext.setOnNotifAlert({} as DataNotifAlert),
                customTheme: customAlertSuccess
            })
            usersContext?.setUsers({} as UsersT)
            router.push('/login')
            setTimeout(() => {
                usersContext?.setLoadingUsers(false)
            }, 1500);
            return
        } else if (users == 'network error') {
            navigateContext?.setOnNotifConnection(true)
            return
        }

        usersContext?.setUsers(users as UsersT)
        setTimeout(() => {
            usersContext?.setLoadingUsers(false)
        }, 1500);

        if ((users as UsersT)?.id && pathname == '/login') {
            router.push('/')
        }
    }

    useEffect(() => {
        if (
            pathname !== '/lupa-password' &&
            !pathname.includes('/lupa-password/ganti-password/')
        ) {
            getSession()
        }
    }, [users])

    return <></>
}