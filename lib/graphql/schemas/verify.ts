import { DocumentNode, gql } from "@apollo/client";

const resendToken = (
  possibleTypes: 'DataVerify' | 'ResendToken',
  query: string[]
):DocumentNode=>{
  return gql`
  query ResendToken($role: String!, $resendTokenId: String!, $jwt: String) {
    resendToken(role: $role, id: $resendTokenId, jwt: $jwt) {
      ... on ${possibleTypes} {
        ${query.join(' ')}
      }
    }
  }
  `
}

const validateVerify = (
  possibleTypes: 'ResultValidateLupaPw',
  query: string
):DocumentNode=>{
  return gql`
  query ValidateVerify($role: String!, $jwt: String) {
      validateVerify(role: $role, jwt: $jwt) {
        ... on ${possibleTypes} {
          ${query}
        }
      }
    }
  `
}

const verifyLupaPassword = (
  possibleTypes: 'ResultVerifyLupaPassword' | 'ResultVerifyRegister',
  query: string
):DocumentNode=>{
  return gql`
  query VerifyRegister($kode: String!, $jwt: String!, $role: String!, $verifyRegisterId: String) {
    verifyRegister(kode: $kode, jwt: $jwt, role: $role, id: $verifyRegisterId) {
      ... on ${possibleTypes} {
        ${query}
      }
    }
  }
  `
}

export const verifySchemas = {
  resendToken,
  validateVerify,
  verifyLupaPassword
}