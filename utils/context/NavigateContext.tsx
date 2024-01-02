'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { DataNotifAlert, DataPopupModalT } from "../types";

type NavigateValueT = {
    activeSideBar: boolean
    setActiveSideBar: Dispatch<SetStateAction<boolean>>
    onNotifAlert: DataNotifAlert
    setOnNotifAlert: Dispatch<SetStateAction<DataNotifAlert>>
    onNotifConnection: boolean
    setOnNotifConnection: Dispatch<SetStateAction<boolean>>
    onPopupModal: DataPopupModalT
    setOnPopupModal: Dispatch<SetStateAction<DataPopupModalT>>
}

export const NavigateContext = createContext<NavigateValueT | null>(null)

type Props = {
    children: ReactNode
}

export default function NavigateProvider({children}: Props){
    const [activeSideBar, setActiveSideBar] = useState<boolean>(false)
    const [onNotifAlert, setOnNotifAlert] = useState({} as DataNotifAlert)
    const [onNotifConnection, setOnNotifConnection] = useState<boolean>(false)
    const [onPopupModal, setOnPopupModal] = useState({} as DataPopupModalT)

    return (
        <NavigateContext.Provider value={{
            activeSideBar,
            setActiveSideBar,
            onNotifAlert,
            setOnNotifAlert,
            onNotifConnection,
            setOnNotifConnection,
            onPopupModal,
            setOnPopupModal
        }}>
            {children}
        </NavigateContext.Provider>
    )
}