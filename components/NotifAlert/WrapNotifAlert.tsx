'use client'

import { useContext } from "react"
import { NavigateContext } from "@/utils/context/NavigateContext"
import NotifAlert from "./NotifAlert"

export default function WrapNotifAlert() {
    const navigateContext = useContext(NavigateContext)

    return (
        <>
            {navigateContext?.onNotifAlert.errMsg && <>
                <NotifAlert
                    errMsg={navigateContext.onNotifAlert.errMsg}
                    color={navigateContext.onNotifAlert.color}
                    onDissmiss={navigateContext.onNotifAlert.onDissmiss}
                    customTheme={navigateContext.onNotifAlert.customTheme}
                />
            </>}
        </>
    )
}