'use client'

import { NavigateContext } from "@/utils/context/NavigateContext"
import { useContext } from "react"
import NotifConnection from "./NotifConnection"

export default function WrapNotifConnection() {
    const navigateContext = useContext(NavigateContext)
    return (
        <>
            {navigateContext?.onNotifConnection && (
                <NotifConnection
                    text="Tidak dapat menemukan jaringan, silahkan periksa jaringan Anda."
                />
            )}
        </>
    )
}