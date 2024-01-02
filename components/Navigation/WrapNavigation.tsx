'use client'

import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import UseNavigation from "./UseNavigation"
import NavMobile from "./NavMobile"
import { UsersT } from "@/utils/types"

type Props = {
    headNavigation: ReactNode
    children?: ReactNode
    users: UsersT | "exp" | "network error" | null
}

export default function WrapNavigation({
    headNavigation,
    children,
    users
}: Props) {
    const pathname = usePathname()
    const {
        navigateContext,
        closeNavigate,
    } = UseNavigation()

    return (
        <>
            {
                pathname !== '/login' &&
                pathname !== '/lupa-password' &&
                !pathname.includes('/lupa-password/ganti-password/') &&
                !pathname.includes('/register') &&
                <>
                    {children}
                    <NavMobile
                        users={users}
                        headNavigation={headNavigation}
                        activeSideBar={navigateContext?.activeSideBar as boolean}
                        closeNavigate={closeNavigate}
                    />
                </>
            }
        </>
    )
}