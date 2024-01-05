import { Button, CustomFlowbiteTheme } from "flowbite-react"
import { FaCircleCheck } from "react-icons/fa6"
import Link from "next/link"
import { ClassModalIconT } from "@/utils/types"

type Props = {
    title?: string
    href?: string
    btnName?: string
    customBtnDefault: CustomFlowbiteTheme['button']
    classModalIcon: ClassModalIconT
}

export default function Success({
    title = 'Password berhasil diperbarui',
    href="/login",
    btnName = 'Login',
    customBtnDefault,
    classModalIcon
}: Props) {
    return (
        <div className='flex flex-col justify-center items-center h-[12rem] w-full'>
            <h1 className='text-gray-text font-medium text-xl mb-4 text-center'>{title}</h1>
            <FaCircleCheck className={classModalIcon} />
            <Link href={href}>
                <Button theme={customBtnDefault}>
                    {btnName}
                </Button>
            </Link>
        </div>
    )
}