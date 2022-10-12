import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userServices";
import { setMessageConnexion } from "./messageConnexionSlice";



const initialState = { loading: false, user:[] }


export const getInformation  =  createAsyncThunk(
    "user/getInformation",
    async (idUser,thunkAPI) =>{
        try {
            const responseLogin = await userService.getUser(idUser)
           // console.log("respons : " ,responseLogin)
            return responseLogin.data
            
        } catch (error) {
            const errorMessage = error?.message?.toString();
            thunkAPI.dispatch(setMessageConnexion(errorMessage))
            return thunkAPI.rejectWithValue()
        }
    }
)



const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
   
    [getInformation.pending]: (state) => {
      state.loading = true;
    },

    [getInformation.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;

    },

    [getInformation.rejected]: (state) => {
      state.loading = false;
      state.user = [];
    },


  },
});


export default userSlice.reducer


