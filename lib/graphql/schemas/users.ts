import { DocumentNode, gql } from "@apollo/client"

const loginQuery = (query: string[]):DocumentNode=>{
  return gql`
  query Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        ${query.join(' ')}
      }
  }
  `
}

const authSessionQuery = (query: string[]):DocumentNode=>{
  return gql`
  query AuthSession($token: String!) {
    authSession(token: $token) {
      ${query.join(' ')}
    }
  }
  `
}

const reqLupaPassword = (query: string[]):DocumentNode=>{
  return gql`
  query AuthSession($email: String!) {
    reqLupaPassword(email: $email) {
      ${query.join(' ')}
    }
  }
  `
}

const resetPassword = (query: string[]):DocumentNode=>{
  return gql`
  query ResetPassword($resetPasswordId: String!, $newPassword: String!, $email: String!) {
    resetPassword(id: $resetPasswordId, newPassword: $newPassword, email: $email) {
      ${query.join(' ')}
    }
  }
  `
}

const postUser = (query: string[]):DocumentNode=>{
  return gql`
  query PostUsers($postUsersId: String!, $role: String!, $isDefaultAdmin: String!, $nama: String!, $email: String!, $fotoProfil: String!, $password: String!, $isVerification: String!) {
    postUsers(id: $postUsersId, role: $role, isDefaultAdmin: $isDefaultAdmin, nama: $nama, email: $email, fotoProfil: $fotoProfil, password: $password, isVerification: $isVerification) {
      ${query.join(' ')}
    }
  }
  `
}

export const usersSchemas = {
    loginQuery,
    authSessionQuery,
    reqLupaPassword,
    resetPassword,
    postUser
}