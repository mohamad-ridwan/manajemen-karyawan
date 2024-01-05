export default function SkeletonVerify() {
    return (
        <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <br />
            <div className="flex justify-end">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4"></div>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="flex justify-end">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
            </div>
        </div>
    )
}