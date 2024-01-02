import { useContext } from "react"
import {useRouter} from 'next/navigation'
import { NavigateContext } from "@/utils/context/NavigateContext"
import { UseCookies } from "@/lib/useCookies"
import { UsersContext } from "@/utils/context/UsersContext"

export default function UseNavbar(){
    const navigateContext = useContext(NavigateContext)
    const usersContext = useContext(UsersContext)
    const router = useRouter()

    function clickBtnNavbar(){
        navigateContext?.setActiveSideBar(!navigateContext.activeSideBar)
    }

    function signOut(){
        UseCookies(undefined, true)
        router.push('/login')
    }

    return {
        clickBtnNavbar,
        signOut,
        usersContext
    }
}