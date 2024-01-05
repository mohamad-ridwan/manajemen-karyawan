import Link from "next/link";

type Props = {
    href: string
    btnName: string
}

export default function BtnBackOfForm({
    href,
    btnName
}: Props) {
    return (
        <div className='flex justify-end'>
            <Link href={href} className='text-sm text-gray-text'>
                {btnName}
            </Link>
        </div>
    )
}