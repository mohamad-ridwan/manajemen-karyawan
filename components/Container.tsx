import { ReactNode } from "react"
import Navbar from "./Navbar/Navbar"

type Props = {
    children: ReactNode
}

export default function Container({
    children
}: Props){
    return (
        <div className="md:ml-64 ml-0 flex w-auto min-h-screen p-6">
            <div className="w-full">
                <Navbar/>
                <div className="flex justify-center">
                    <div className="min-w-full xl:min-w-[968px]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}