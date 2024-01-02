import { useContext, useEffect, useState } from "react"
import { NavigateContext } from "@/utils/context/NavigateContext"
import { UsersContext } from "@/utils/context/UsersContext"
import { MenuItemsT } from "@/utils/types"
import { menuItems, menuItemsAdmin } from "@/utils/navigation"

export default function UseNavigation(){
    const [menuNavigation, setMenuNavigation] = useState<MenuItemsT[]>([])
    const navigateContext = useContext(NavigateContext)
    const usersContext = useContext(UsersContext)

    const users = usersContext?.users

    useEffect(()=>{
        if(users?.role == 'Admin'){
            setMenuNavigation(menuItemsAdmin)
        }else if(users?.role == 'User'){
            setMenuNavigation(menuItems)
        }
    }, [users])

    function closeNavigate():void {
        navigateContext?.setActiveSideBar(!navigateContext.activeSideBar)
    }

    return {
        navigateContext,
        closeNavigate,
        usersContext,
        menuNavigation
    }
}