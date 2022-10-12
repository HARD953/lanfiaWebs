import axios from "axios"
const userItem = "userDonnateurIformationsLanfiatech"

const tokenString = localStorage.getItem(userItem);
export const BASE_URL  = 'https://apidons.herokuapp.com'
export const API_VULNERABLE = 'https://apivulnerable.herokuapp.com/'
const axiosInstance = axios.create({
    baseURL:`${ BASE_URL}/`,
    headers: tokenString?{'Authorization': 'Bearer ' +tokenString}:{}
  });

//  return instance;
//}
export default axiosInstance
