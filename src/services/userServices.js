import axiosInstance from "../api/axiosInstance";

const loginUser = (userData) => {
  return axiosInstance.post('token/',userData);
};

const signUpUser = (url,userData) => {
  return axiosInstance.post(url,userData);
};

const logoutUser = () => {
    return axiosInstance.get('logout/blacklist/');
};
  

const getUser = (id) => {
    return axiosInstance.get('token/');
  };
  

const userService = {
    loginUser,
    logoutUser,
    signUpUser,
    getUser,

};
export default userService