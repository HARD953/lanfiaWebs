import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./features/authUserSlice";
import messageConnexionReducer from "./features/messageConnexionSlice";
import donationReducer from "./features/donationSlice";
import signUpReducer  from "./features/signUpSlice";
import myDonationReducer from "./features/myDonationSlice";

export default configureStore({

    reducer:{
        messageConnexion:messageConnexionReducer,
        authUser:authUserReducer,
        donation: donationReducer,
        myDonation: myDonationReducer,
        signUp: signUpReducer,
        

    }
})