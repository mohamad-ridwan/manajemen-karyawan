'use client'

import { Dropdown } from "flowbite-react"
import Image from "next/image"
import logo from '../../../images/avatar.svg'
import Link from "next/link"
import UseNavbar from "../UseNavbar"

export default function ProfilIcon() {
    const {
        signOut,
        usersContext
    } = UseNavbar()

    return (
        <>
            {!usersContext?.loadingUsers ?
                <Dropdown
                    className="shadow-md rounded-md"
                    inline
                    arrowIcon={false}
                    label={
                        <div className="w-[45px] h-[45px] rounded-full overflow-hidden flex">
                            <Image
                                src={
                                    (usersContext?.users?.fotoProfil as string)?.length > 0 ?
                                        usersContext?.users.fotoProfil :
                                        logo
                                }
                                alt="Manajemen Karyawan"
                                height={45}
                                width={45}
                                className="object-cover"
                            />
                        </div>
                    }
                >
                    <div className="min-w-[12rem]">
                        <Dropdown.Header
                            className="py-[0.7rem] px-4 border-b-[1px] border-black border-border-g"
                        >
                            <span className="block truncate text-sm font-medium text-gray-text">
                                {usersContext?.users.role == 'User' ? 'Karyawan' : 'Admin'}
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Header className="border-b-[1px] border-black border-border-g py-[0.7rem] px-4">
                            <span className="block text-sm font-light text-gray-text">{usersContext?.users.nama}</span>
                            <span className="block truncate text-sm font-medium text-gray-text">{usersContext?.users.email}</span>
                        </Dropdown.Header>
                        <Link href="/profil">
                            <Dropdown.Item className="text-gray-text border-b-[1px] border-black border-border-g py-[0.7rem] px-4">Profil</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item className="text-red-700 py-[0.7rem] px-4" onClick={signOut}>
                            Keluar
                        </Dropdown.Item>
                    </div>
                </Dropdown>
                :
                <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-[45px] w-[45px] bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
            }
        </>
    )
}