import {gql} from "@apollo/client"

export const MY_ACCESS = gql`
    query MY_ACCESS {
        my_access {
        me {
            last_name
            first_name
            email
        }
        doors {
            id
            name
            status
        }
        }
    }
`

export const LOGIN = gql`
    mutation LOGIN ($email:String!){
        login(input: {email: $email}){
        user {
            first_name
            last_name
            email
        }
        token
        }
    }
`

export const MANAGE_DOOR = gql`
mutation MANAGE_DOOR($door_id: String!, $door_status:LockInputEnum!){
    manageDoor(input: {
      door_id: $door_id,
      door_status: $door_status
    }){
      name
      acme_id
      status
      id
    }
  }
`