import Image, { StaticImageData } from "next/image";

type Props = {
    logo: StaticImageData
}

export default function HeadNavigation({logo}: Props) {
    return (
        <div className='flex justify-center'>
            <Image
                src={logo}
                width={170}
                height={170}
                alt="Manajemen Karyawan"
            />
        </div>
    )
}