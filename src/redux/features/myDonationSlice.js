
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import donationServices from "../../services/donationServices";
import { setMessageConnexion } from "./messageConnexionSlice";


const initialState ={ loading: false,dons: []  } ;



export const getMyDonation  =  createAsyncThunk(
  "myDonation/getMyDonation",
  async (thunkAPI) =>{
      //try {
          const responseLogin = await donationServices.getMyDonation()
         // console.log("my donations : " ,responseLogin)
          return responseLogin.data
          
     /* } catch (error) {
          const errorMessage = error?.message?.toString();
          thunkAPI.dispatch(setMessageConnexion(errorMessage))
          return thunkAPI.rejectWithValue()
      }*/
  }
)

const myDonationSlice = createSlice({
  name: "myDonation",
  initialState,
  extraReducers: {

   
    [getMyDonation.pending]: (state) => {
      state.loading = true;
    },

    [getMyDonation.fulfilled]: (state, action) => {
      state.loading = false;
      state.dons = action.payload;

    },

    [getMyDonation.rejected]: (state, action) => {
      state.loading = false;
      state.dons = [];
    },

  },
});


export default myDonationSlice.reducer


