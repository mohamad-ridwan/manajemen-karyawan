'use client'

import { ReactNode } from "react";
import { Sidebar } from "flowbite-react";
import NavigationItems from "./NavigationItems";
import { UsersT } from "@/utils/types";
import UseNavigation from "./UseNavigation";
import { menuItems, menuItemsAdmin } from "@/utils/navigation";

type Props = {
    users: UsersT | "exp" | "network error" | null
    skeletonNav: ReactNode
}

export default function SideBar({
    users,
    skeletonNav
}: Props) {
    const { usersContext } = UseNavigation()
    return (
        <>
            {usersContext?.users?.id ?
                <Sidebar>
                    <NavigationItems
                        menuItems={(users as UsersT)?.role == 'User' ? menuItems : menuItemsAdmin}
                    />
                </Sidebar>
                :
                <>{skeletonNav}</>
            }
        </>
    )
}