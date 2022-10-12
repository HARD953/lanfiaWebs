import axiosInstance from "../api/axiosInstance";

const makeDonation = (dataDonation) => {
    return axiosInstance.post("efdoargent/",dataDonation);
  };

const getMyDonation = () => {
    return axiosInstance.get("argent/");
  };
  
const getAllDonation = () => {
    return axiosInstance.get("listargea/");
  };
  
const getDonationImage = async(path)=>{
    const response = axiosInstance.get(path)
    console.log("image don : ",response)
}
  

const donationService = {
    makeDonation,
    getMyDonation,
    getAllDonation,
    getDonationImage,
    
    
};
export default donationService