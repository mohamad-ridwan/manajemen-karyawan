import { ClassModalIconT } from "@/utils/types";
import { CustomFlowbiteTheme } from "flowbite-react";

export const classModalIcon: ClassModalIconT = 'mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200'

export const customSidebarCollapse = {
    button: 'text-gray-500 group flex w-full items-center rounded-lg p-2 text-base font-normal transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
    label: {
        base: 'ml-3 flex-1 whitespace-nowrap text-left',
        "icon": {
            "base": "h-6 w-6 transition ease-in-out delay-0",
            "open": {
                "on": "rotate-180",
                "off": ""
            }
        }
    }
}

export const customSpinnerInfo: CustomFlowbiteTheme['spinner'] = {
    color: {
        info: 'fill-cyan-600 text-gray-300'
    }
}

export const customInput: CustomFlowbiteTheme['textInput'] = {
    field: {
        input: {
            colors: {
                gray: 'bg-white border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500'
            }
        },
    }
}

export const customButtonDefault: CustomFlowbiteTheme['button'] = {
    color: {
        info: 'text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 p-[0.6rem]'
    }
}

export const customAlertFailure: CustomFlowbiteTheme['alert'] = {
    color: {
        failure: 'text-red-700 bg-red-100 border-red-500 dark:bg-red-200 dark:text-red-800'
    }
}

export const customAlertSuccess: CustomFlowbiteTheme['alert'] = {
    color: {
        success: 'bg-green-100 text-green-500 hover:bg-green-200 focus:ring-green-400 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300'
    }
}

export const customLoadingBtn: CustomFlowbiteTheme['spinner'] = {
    color: {
        info: 'fill-cyan-600'
    }
}

export const customPopupModal: CustomFlowbiteTheme['modal'] = {
    header: {
        close: {
            icon: 'h-6 w-6 mr-2 mt-2'
        }
    },
    root: {
        base: "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    },
    content: {
        base: "relative h-full w-[460px] p-4 md:h-auto flex justify-center items-center",
        inner: "relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col w-full"
    }
}