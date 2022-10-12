import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userServices";
import { setMessageConnexion } from "./messageConnexionSlice";



const initialState = { 
    loading: false, 
    user:{} 
    } 

export const signUp  =  createAsyncThunk(
  "signUpUser/signUp",
  async (userData,thunkAPI) =>{
      try {
           // console.log("dat1",userData)
          const responseLogin = await userService.signUpUser(userData.url,userData)
          //console.log("respons : " ,responseLogin)
          return responseLogin.data
          
      } catch (error) {
          const errorMessage = error?.message?.toString();
          thunkAPI.dispatch(setMessageConnexion(errorMessage))
          return thunkAPI.rejectWithValue()
      }
  }
)


const signUpSlice = createSlice({
  name: "signUpUser",
  initialState,
  extraReducers: {
   

    [signUp.pending]: (state) => {
      state.loading = true;
    },

    [signUp.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;

    },

    [signUp.rejected]: (state, action) => {
      state.loading = false;
      state.user = {};
    },
    

  },
});


export default signUpSlice.reducer


