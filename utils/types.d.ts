import { ReactElement, ReactNode } from 'react'
import { CustomFlowbiteTheme } from 'flowbite-react'
import { IconType } from 'react-icons'

export type UpdateInfoProfilT = {
    fotoProfil: string
    nama: string
    email: string
}

export type SelectOptT = {
    name: string
    value: string | number
}

type MenuT = {
    name: string
    path: string | null
    icon?: IconType | ReactElement
}

export type MenuItemsT = MenuT & {
    children?: MenuT[]
}

export type DataNotifAlert = {
    errMsg: string | ReactNode | ReactElement
    color:
    'failure' |
    'gray' |
    'success' |
    'blue'
    onDissmiss?: () => void
    customTheme: CustomFlowbiteTheme['alert']
}

export type UsersT = {
    id: string
    role: 'Admin' | 'User'
    nama: string
    email: string
    fotoProfil: string
    password: string
    isVerification: string
    isDefaultAdmin: string
}

export type DataKaryawanT = {
    id: string
    jabatan: string
    NIK: string
    alamat: string
    noTelp: string
    tglLahir: string
    divisi: string
    gaji: string
    tglBergabung: string
    statusKaryawan: 'Aktif' | 'Tidak'
}

export type DataPopupModalT = {
    show: boolean
    clickClose: () => void
    icon?: ReactElement
    txtAsk: string | ReactElement | ReactNode
    colorBtnSubmit?: string
    nameBtnSubmit?: string
    clickNext: () => void
    clickCancel: () => void
}

export type ClassModalIconT = 'mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200'