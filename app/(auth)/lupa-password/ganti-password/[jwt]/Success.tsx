import { Button } from "flowbite-react"
import { FaCircleCheck } from "react-icons/fa6"
import Link from "next/link"
import { classModalIcon, customButtonDefault } from "@/components/CustomTheme"

type Props = {
    title?: string
    href?: string
    btnName?: string
}

export default function Success({
    title = 'Password berhasil diperbarui',
    href="/login",
    btnName = 'Login'
}: Props) {
    return (
        <div className='flex flex-col justify-center items-center h-[12rem] w-full'>
            <h1 className='text-gray-text font-medium text-xl mb-4 text-center'>{title}</h1>
            <FaCircleCheck className={classModalIcon} />
            <Link href={href}>
                <Button theme={customButtonDefault}>
                    {btnName}
                </Button>
            </Link>
        </div>
    )
}