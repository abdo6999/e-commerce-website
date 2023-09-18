
export class AuthCredentialsDot {
  username!: string
  password!: string
}

export class accessToken {
  access_token!:string
}


export class Response<T> {
  status!: number
  message!: string
  data!:T
}




