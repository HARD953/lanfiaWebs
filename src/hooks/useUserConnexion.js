import { useState } from 'react';

export default function useUserConnexion() {

  const userItem = "userDonnateurIformationsLanfiatech"

  const getUserToken = () => {
    const tokenString = localStorage.getItem(userItem);
   // const userToken = JSON.parse(tokenString);
    return tokenString
  };

  const getUserConnexion = () => {
    const userString = localStorage.getItem(userItem);
    return userString
  };

  const removeUserConnexion = () => {
    localStorage.removeItem(userItem);
    setToken(getUserToken())

  };

  const saveUserConnexion = userData => {
    localStorage.setItem(userItem,userData);
    setToken(getUserToken())
  };

  const [token, setToken] = useState(getUserToken());

  return {
    getUserConnexion,
    removeUserConnexion,
    saveUserConnexion,
    token
  }

}