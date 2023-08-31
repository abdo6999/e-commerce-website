import { AuthCredentialsDto } from "./auth/auth-credentials.dto";
import { CreateProfileDto } from "./profile/create-profile.dto";



export class Customer implements AuthCredentialsDto, CreateProfileDto{
  username!: string;
  password!: string;
  first_name!: string;
  last_name!: string;
  email!: string;
  gender!: string;
  age!: string;
  country!: string;
  city!: string;
  address!: string;
  phone!: string;
  date_of_birth!: string;
  post_code!: string;
  profile_image!: string;
}  


// some type need for Return 
export class Token {
    token!:string
    refresh_token!:string
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
