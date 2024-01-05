'use client'

import { ReactElement } from "react";
import { Sidebar } from "flowbite-react";
import { MenuItemsT } from "@/utils/types";
import Link from "next/link";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";

type Props = {
    menuItems: MenuItemsT[]
}

export default function NavigationItems({
    menuItems
}: Props) {
    const pathname = usePathname()

    return (
        <Sidebar.Items>
            <Sidebar.ItemGroup className="p-4">
                {menuItems.length > 0 && menuItems.map((menu, i) => {
                    const isCollapseMenu = menu?.children
                    return (
                        <div key={i}>
                            {!isCollapseMenu ?
                                <Link href={menu.path as string} className={`${pathname == menu.path ? 'text-gray-900' : 'text-gray-500'} w-full flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group mt-2`}>
                                    {menu.icon as ReactElement}
                                    <span className="text-gray-900">
                                        {menu.name}
                                    </span>
                                </Link>
                                :
                                <Sidebar.Collapse icon={menu.icon as IconType} label={menu.name} className="mt-2">
                                    <div className="ml-3">
                                        {menu?.children?.map((childMenu, iChild) => (
                                            <Link key={iChild} href={childMenu.path as string} className={`${pathname == childMenu.path ? 'text-gray-900' : 'text-gray-500'} w-full flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group mt-2`}>
                                                {childMenu.icon as ReactElement}
                                                <span className="text-gray-900">
                                                    {childMenu.name}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </Sidebar.Collapse>
                            }
                        </div>
                    )
                })}
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    )
}