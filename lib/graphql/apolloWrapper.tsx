'use client'

import { ReactNode } from "react"
import {
    ApolloClient,
    ApolloLink,
    HttpLink
} from '@apollo/client'
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    SSRMultipartLink
} from '@apollo/experimental-nextjs-app-support/ssr'

export const GRAPHQL_ENDPOINT = process.env.NODE_ENV == 'development' ? 'http://localhost:4000' : process.env.NEXT_PUBLIC_API

function makeClient() {
    const httpLink = new HttpLink({
        uri: GRAPHQL_ENDPOINT,
    })

    return new ApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: typeof window === 'undefined' ?
            ApolloLink.from([
                new SSRMultipartLink({
                    stripDefer: true
                }),
                httpLink
            ]) :
            httpLink
    })
}

type Props = {
    children: ReactNode
}

export default function ApolloWrapper({
    children
}: Props) {
    return (
        <ApolloNextAppProvider
            makeClient={makeClient}
        >
            {children}
        </ApolloNextAppProvider>
    )
}