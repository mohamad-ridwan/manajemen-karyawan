'use client'

import { useContext } from "react"
import { NavigateContext } from "@/utils/context/NavigateContext"
import PopupModal from "./PopupModal"

export default function WrapPopupModal() {
    const navigateContext = useContext(NavigateContext)
    const onPopupModal = navigateContext?.onPopupModal

    return (
        <>
            {onPopupModal?.show && (
                <PopupModal
                    show={onPopupModal.show}
                    clickClose={onPopupModal.clickClose}
                    icon={onPopupModal.icon}
                    txtAsk={onPopupModal.txtAsk}
                    colorBtnSubmit={onPopupModal.colorBtnSubmit}
                    nameBtnSubmit={onPopupModal.nameBtnSubmit}
                    clickNext={onPopupModal.clickNext}
                    clickCancel={onPopupModal.clickCancel}
                />
            )}
        </>
    )
}