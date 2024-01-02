'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { UsersT } from "../types";

type UsersContextValueT = {
    users: UsersT
    setUsers: Dispatch<SetStateAction<UsersT>>
    loadingUsers: boolean
    setLoadingUsers: Dispatch<SetStateAction<boolean>>
}

export const UsersContext = createContext<UsersContextValueT | null>(null)

type Props = {
    children: ReactNode
}

export default function UsersProvider({children}: Props){
    const [users, setUsers] = useState({} as UsersT)
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true)

    return(
        <UsersContext.Provider value={{
            users,
            setUsers,
            loadingUsers,
            setLoadingUsers
        }}>
            {children}
        </UsersContext.Provider>
    )
}