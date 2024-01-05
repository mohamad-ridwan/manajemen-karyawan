import { ClassModalIconT } from "@/utils/types";
import { CustomFlowbiteTheme } from "flowbite-react";

// export const customThemeDatePicker:CustomFlowbiteTheme['datepicker'] = {
//     "root": {
//       "base": "relative"
//     },
//     "popup": {
//       "root": {
//         "base": "absolute top-10 z-50 block pt-2",
//         "inline": "relative top-0 z-auto",
//         "inner": "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700"
//       },
//       "header": {
//         "base": "",
//         "title": "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
//         "selectors": {
//           "base": "flex justify-between mb-2",
//           "button": {
//             "base": "text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch",
//             "prev": "",
//             "next": "",
//             "view": ""
//           }
//         }
//       },
//       "view": {
//         "base": "p-1"
//       },
//       "footer": {
//         "base": "flex mt-2 space-x-2",
//         "button": {
//           "base": "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-cyan-300",
//           "today": "bg-cyan-700 text-white hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-700",
//           "clear": "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
//         }
//       }
//     },
//     "views": {
//       "days": {
//         "header": {
//           "base": "grid grid-cols-7 mb-1",
//           "title": "dow h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400"
//         },
//         "items": {
//           "base": "grid w-64 grid-cols-7",
//           "item": {
//             "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 ",
//             "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
//             "disabled": "text-gray-500"
//           }
//         }
//       },
//       "months": {
//         "items": {
//           "base": "grid w-64 grid-cols-4",
//           "item": {
//             "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
//             "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
//             "disabled": "text-gray-500"
//           }
//         }
//       },
//       "years": {
//         "items": {
//           "base": "grid w-64 grid-cols-4",
//           "item": {
//             "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 text-gray-900",
//             "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
//             "disabled": "text-gray-500"
//           }
//         }
//       },
//       "decades": {
//         "items": {
//           "base": "grid w-64 grid-cols-4",
//           "item": {
//             "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 text-gray-900",
//             "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
//             "disabled": "text-gray-500"
//           }
//         }
//       }
//     }
//   }

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
        info: 'text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 p-[0]',
        dark: 'text-white bg-gray-800 border border-transparent enabled:hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:enabled:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700 p-[0]',
        failure: "text-white bg-red-700 border border-transparent enabled:hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:enabled:hover:bg-red-700 dark:focus:ring-red-900 p-[0]"
    },
    size: {
        "xs": "text-xs px-2 py-1",
        "sm": "text-sm px-3 py-1.5",
        "md": "text-sm px-4 py-2",
        "lg": "text-base px-5 py-2.5",
        "xl": "text-base px-6 py-3"
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
        base: "relative h-auto w-[460px] p-4 md:h-auto flex justify-center max-h-[90vh]",
        inner: "relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col w-full"
    },
    body: {
        base: 'p-6 flex-1 overflow-auto overflow-y-auto'
    }
}