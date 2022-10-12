import { createSlice } from "@reduxjs/toolkit";

const initialState ={}

const messageConnexionSlice = createSlice({
    name: "messageConnexion",
    initialState,
    reducers:{
        setMessageConnexion: (state, action)=>{
            return {
                message: action.payload,
            }
        },
        clearMessageConnexion: ()=>{
            return {
                message: ""
            }
        }
    }
})

export const {setMessageConnexion,clearMessageConnexion} = messageConnexionSlice.actions
export default messageConnexionSlice.reducer