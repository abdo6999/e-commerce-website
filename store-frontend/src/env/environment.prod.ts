const API_BASE_URL = 'http://localhost:3200/api'
const REGISTER_ROUTE = '/customers/register';
const LOGIN_ROUTE = '/customers/login';
// const USER_ROUTE = '/customers/current-user';
// const PROFILE_ROUTE = '/profile';
// const USERS_ROUTE = '/customers/system-users';
// const USERDATA_ROUTE = '/customers/user-main-data';
// const IMAGECHANGE_ROUTE = '/profile/userprofile/changeprofileimage';
// const NEWIMAGE_ROUTE = '/profile/userprofile/setprofileimage';
// const CONTACT_ROUTE = '/contacts/new-mail';

export const environment = {
  production: false,
  REGISTER_ROUTE:`${API_BASE_URL}${REGISTER_ROUTE}`,
  LOGIN_ROUTE:`${API_BASE_URL}${LOGIN_ROUTE}`,
  // USER_ROUTE:`${API_BASE_URL}${USER_ROUTE}`,
  // PROFILE_ROUTE:`${API_BASE_URL}${PROFILE_ROUTE}`,
  // USERS_ROUTE:`${API_BASE_URL}${USERS_ROUTE}`,
  // USERDATA_ROUTE:`${API_BASE_URL}${USERDATA_ROUTE}`,
  // IMAGECHANGE_ROUTE:`${API_BASE_URL}${IMAGECHANGE_ROUTE}`,
  // NEWIMAGE_ROUTE:`${API_BASE_URL}${NEWIMAGE_ROUTE}`,
  // CONTACT_ROUTE:`${API_BASE_URL}${CONTACT_ROUTE}`,
};

