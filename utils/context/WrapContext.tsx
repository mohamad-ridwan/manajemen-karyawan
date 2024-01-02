import { ReactNode } from "react"
import NavigateProvider from "./NavigateContext"
import UsersProvider from "./UsersContext"

type Props = {
    children: ReactNode
}

export default function WrapContext({ children }: Props) {
    return (
        <UsersProvider>
            <NavigateProvider>
                {children}
            </NavigateProvider>
        </UsersProvider>
    )
}