import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const GRAPHQL_ENDPOINT = process.env.NODE_ENV == 'development' ? 'http://localhost:4000' : process.env.NEXT_PUBLIC_API

export const {getClient} = registerApolloClient(()=>{
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: GRAPHQL_ENDPOINT
        }),
    })
})