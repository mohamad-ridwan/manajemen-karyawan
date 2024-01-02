import { ReactNode } from "react";
import { UsersT } from "@/utils/types";
import SideBar from "./SideBar";

type Props = {
    headNavigation: ReactNode
    activeSideBar: boolean
    closeNavigate:()=>void
    users: UsersT | "exp" | "network error" | null
}

export default function NavMobile({
    headNavigation,
    activeSideBar,
    closeNavigate,
    users
}: Props) {
    return (
        <div className={`fixed left-0 right-0 top-0 bottom-0 ${activeSideBar ? 'flex' : 'hidden'} md:hidden bg-black/50 transition-all z-10`}
            onClick={closeNavigate}
        >
            <div className='fixed left-0 bottom-0 top-0 z-[11] bg-white shadow-xl w-64'
                onClick={(e)=>{e.stopPropagation()}}
            >
                {headNavigation}
                <SideBar users={users}/>
            </div>
        </div>
    )
}