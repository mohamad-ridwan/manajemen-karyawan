import { ReactNode } from "react"
import { UsersT } from "@/utils/types"
import SideBar from "./SideBar"

type Props = {
    headNavigation: ReactNode
    users: UsersT | "exp" | "network error" | null
    skeletonNav: ReactNode
}

export default function NavDesktop({
    headNavigation,
    users,
    skeletonNav
}: Props) {
    return (
        <div className='fixed left-0 bottom-0 top-0 hidden md:flex bg-white'>
            <div className="shadow-xl w-64">
                {headNavigation}
                <SideBar
                    users={users}
                    skeletonNav={skeletonNav}
                />
            </div>
        </div>
    )
}