
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import donationServices from "../../services/donationServices";
import { setMessageConnexion } from "./messageConnexionSlice";


const initialState ={ loading: false,data: {}  } ;


export const makeDonation  =  createAsyncThunk(
    "donation/makeDonation",
    async (donationData,thunkAPI) =>{
        try {
            const responseLogin = await donationServices.makeDonation(donationData)
            //console.log("respons : " ,responseLogin)
            return responseLogin.data
            
        } catch (error) {
            const errorMessage = error?.message?.toString();
            thunkAPI.dispatch(setMessageConnexion(errorMessage))
            return thunkAPI.rejectWithValue()
        }
    }
)


const donationSlice = createSlice({
  name: "donation",
  initialState,
  extraReducers: {
   
    [makeDonation.pending]: (state) => {
      state.loading = true;
    },

    [makeDonation.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;

    },

    [makeDonation.rejected]: (state, action) => {
      state.loading = false;
      state.data = {};
    },


  },
});


export default donationSlice.reducer


