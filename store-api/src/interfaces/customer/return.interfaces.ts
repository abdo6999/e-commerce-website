import { CreateProfileDto } from "../profile/create-profile.dto";


// some type need for Return 
export class TokenAndProfileResponse  {
  access_token!:string
  refresh_token!:string
  profile!:Partial<CreateProfileDto>
}
export class Response<T> {
  status!: number
  message!: string
  data!:T
}


export class Response_Message {
  status!: number
  message!: string
}
