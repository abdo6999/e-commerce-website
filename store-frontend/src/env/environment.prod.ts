import * as dotenv from 'dotenv';
dotenv.config();
let {
  API_BASE_URL,
  REGISTER_ROUTE,
  LOGIN_ROUTE,
  USER_ROUTE,
  PROFILE_ROUTE,
  USERS_ROUTE,
  USERDATA_ROUTE,
  IMAGECHANGE_ROUTE,
  NEWIMAGE_ROUTE,
  CONTACT_ROUTE,
} = process.env;

export const environment = {
  production: false,
  REGISTER_ROUTE:`${API_BASE_URL}${REGISTER_ROUTE}`,
  LOGIN_ROUTE:`${API_BASE_URL}${LOGIN_ROUTE}`,
  USER_ROUTE:`${API_BASE_URL}${USER_ROUTE}`,
  PROFILE_ROUTE:`${API_BASE_URL}${PROFILE_ROUTE}`,
  USERS_ROUTE:`${API_BASE_URL}${USERS_ROUTE}`,
  USERDATA_ROUTE:`${API_BASE_URL}${USERDATA_ROUTE}`,
  IMAGECHANGE_ROUTE:`${API_BASE_URL}${IMAGECHANGE_ROUTE}`,
  NEWIMAGE_ROUTE:`${API_BASE_URL}${NEWIMAGE_ROUTE}`,
  CONTACT_ROUTE:`${API_BASE_URL}${CONTACT_ROUTE}`,
};