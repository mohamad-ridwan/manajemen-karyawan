import { Button, Modal } from "flowbite-react"
import { DataPopupModalT } from "@/utils/types"
import { customPopupModal } from "../CustomTheme"

export default function PopupModal({
    show,
    clickClose,
    icon,
    txtAsk,
    colorBtnSubmit = 'failure',
    nameBtnSubmit = 'Ya',
    clickNext,
    clickCancel
}: DataPopupModalT) {
    return (
        <Modal
            show={show}
            onClose={clickClose}
            className="bg-[rgba(0,0,0,0.4)]"
            theme={customPopupModal}
            popup
        >
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <div className="justify-center flex">
                        {icon}
                    </div>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {txtAsk}
                    </h3>
                    <div className='flex justify-center gap-4'>
                        <Button color={colorBtnSubmit} onClick={clickNext}>
                            {nameBtnSubmit}
                        </Button>
                        <Button color="light" onClick={clickCancel}>
                            Batal
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}