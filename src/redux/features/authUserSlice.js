import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userServices";
import { setMessageConnexion } from "./messageConnexionSlice";


const userItem = "userDonnateurIformationsLanfiatech"
const userToken = localStorage.getItem(userItem);
//const userToken = JSON.parse(tokenString)?.access;


const initialState = userToken? { isLoggedIn: true, token:userToken } : { isLoggedIn: false, token: null };


export const login  =  createAsyncThunk(
    "authUser/login",
    async ({email,password},thunkAPI) =>{
        try {
            const userData = {email,password}
            const responseLogin = await userService.loginUser(userData)
           // console.log("respons : " ,responseLogin)
            return responseLogin.data
            
        } catch (error) {
            const errorMessage = error?.message?.toString();
            thunkAPI.dispatch(setMessageConnexion(errorMessage))
            return thunkAPI.rejectWithValue()
        }
    }
)


export const logout = createAsyncThunk("auth/logout", async () => {
  await userService.logoutUser();
});

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  extraReducers: {
   
    [login.pending]: (state) => {
      state.isLoggedIn = false;
    },

    [login.fulfilled]: (state, action) => {
     
      state.isLoggedIn = true;
      state.token = action.payload.access;

    },

    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
    },



   [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});


export default authUserSlice.reducer


