import { ReactNode } from "react"
import AuthSession from "@/components/AuthSession"
import authSessions from "@/lib/authSessions"
import WrapNavigation from "@/components/Navigation/WrapNavigation"
import HeadNavigation from "@/components/Navigation/HeadNavigation"
import NavDesktop from "@/components/Navigation/NavDesktop"
import logo from '@/images/logo.png'
import SkeletonNavigation from "@/components/Loaders/SkeletonNavigation"
import { customAlertSuccess } from "@/components/CustomTheme"

type Props = {
    children: ReactNode
}

export default async function Template({ children }: Props) {
    const users = await authSessions()

    return (
        <>
            <AuthSession 
            users={users} 
            customAlertSuccess={customAlertSuccess}
            />
            <WrapNavigation
                users={users}
                headNavigation={<HeadNavigation logo={logo} />}
                skeletonNav={<SkeletonNavigation />}
            >
                <NavDesktop
                    users={users}
                    headNavigation={<HeadNavigation logo={logo} />}
                    skeletonNav={
                        <SkeletonNavigation />
                    }
                />
            </WrapNavigation>
            {children}
        </>
    )
}