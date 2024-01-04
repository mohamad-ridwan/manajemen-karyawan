export default function SkeletonNavigation() {
    return (
        <div role="status" className="max-w-sm animate-pulse mt-12 px-4">
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-5"></div>
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-5"></div>
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-5"></div>
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-[7.5rem] mb-5"></div>
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-36 mb-5"></div>
        </div>
    )
}