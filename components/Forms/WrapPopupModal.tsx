'use client'

import { useContext } from "react"
import { NavigateContext } from "@/utils/context/NavigateContext"
import PopupModal from "./PopupModal"
import { CustomFlowbiteTheme } from "flowbite-react"

type Props = {
    customPopupModal: CustomFlowbiteTheme['modal']
}

export default function WrapPopupModal({
    customPopupModal
}:Props) {
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
                    customPopupModal={customPopupModal}
                />
            )}
        </>
    )
}