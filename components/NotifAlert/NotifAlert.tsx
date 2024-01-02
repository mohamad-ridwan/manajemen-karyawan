import { DataNotifAlert } from "@/utils/types"
import { Alert, CustomFlowbiteTheme } from "flowbite-react"
import { IoClose } from "react-icons/io5"

type Props = DataNotifAlert

export default function NotifAlert({
    color = 'failure',
    errMsg,
    onDissmiss,
    customTheme
}: Props) {
    return (
        <div className='flex fixed max-w-[20rem] right-[24px] top-8 z-[9]'>
            <Alert color={color} theme={customTheme} className='shadow-lg'>
                <div className='flex justify-end'>
                    <button onClick={onDissmiss}>
                        <IoClose style={{
                            height: '1.3rem',
                            width: '1.3rem'
                        }} />
                    </button>
                </div>
                {errMsg}
            </Alert>
        </div>
    )
}