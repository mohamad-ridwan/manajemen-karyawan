import { MdOutlineWifiOff } from "react-icons/md";

type Props = {
    text: string
}

export default function NotifConnection({
    text
}: Props) {
    return (
        <div className="fixed bottom-10 left-10 z-[1]">
            <div className="w-auto max-w-[20rem] bg-white shadow-lg p-4 rounded-md mr-4">
                <div>
                    <MdOutlineWifiOff
                        style={{
                            height: '1.5rem',
                            width: '1.5rem',
                            color: '#ff0000'
                        }}
                    />
                    <p className="text-start text-gray-text font-semibold text-sm mt-2">{text}</p>
                </div>
            </div>
        </div>
    )
}