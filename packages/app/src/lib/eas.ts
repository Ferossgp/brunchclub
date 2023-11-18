import { GraphQLClient } from 'graphql-request'
export const API_URL = 'https://base-goerli-predeploy.easscan.org/graphql'

export const graphQLClient = new GraphQLClient(API_URL, { fetch })