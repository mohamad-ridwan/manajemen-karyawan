'use client'

import Link from "next/link"
import { Button } from "flowbite-react"
import InputForm from "@/components/Forms/InputForm"
import UseLupaPassword from "./UseLupaPassword"
import LoadingBtn from "@/components/LoadingBtn"
import { customButtonDefault } from "@/components/CustomTheme"

export default function Form() {
    const {
        changeInput,
        inputValue,
        clickSubmit,
        errForm,
        pressEnter,
        loading
    } = UseLupaPassword()
    return (
        <>
            <InputForm
                type="email"
                name="email"
                placeholder='alamat.email@gmail.com'
                label="Email"
                classInput="mt-2"
                value={inputValue.email}
                errMsg={errForm?.email}
                changeInput={changeInput}
                pressEnter={pressEnter}
            />
            <div className="flex items-center justify-end">
                <Link href='/login' className='text-sm text-gray-text'>
                    Kembali ke Login
                </Link>
            </div>
            {!loading ? (
                <Button theme={customButtonDefault} onClick={clickSubmit} className='w-full'>
                    Kirim
                </Button>
            ) : (
                <LoadingBtn theme={customButtonDefault} color='info' className='w-full' />
            )}
        </>
    )
}