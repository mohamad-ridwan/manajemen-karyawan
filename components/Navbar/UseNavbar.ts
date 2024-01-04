import { useContext} from "react"
import { NavigateContext } from "@/utils/context/NavigateContext"
import { UseCookies } from "@/lib/useCookies"
import { UsersContext } from "@/utils/context/UsersContext"

export default function UseNavbar(){
    const navigateContext = useContext(NavigateContext)
    const usersContext = useContext(UsersContext)

    function clickBtnNavbar(){
        navigateContext?.setActiveSideBar(!navigateContext.activeSideBar)
    }

    async function getCookies():Promise<void>{
        const {getCookie} = await UseCookies(undefined, true)
        if(getCookie?.value?.length === 0){
            window.location.href = '/login'
        }
    }

    function signOut():void{
        getCookies()
    }

    return {
        clickBtnNavbar,
        signOut,
        usersContext
    }
}