
const userItem = "userDonnateurIformationsLanfiatech"

const getUserToken = () => {
 return localStorage.getItem(userItem);

};

export default function authHeader() {
    let token = getUserToken()
    if (token) {
      return  {"Authorization" : `Bearer ${token}`};
    } else {
      return {};
    }
  }

