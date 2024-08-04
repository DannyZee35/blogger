

import { createSlice } from "@reduxjs/toolkit";



const initialState={

    images:[]
}


const bucketSlice=createSlice({
    name:'bucket',
    initialState,
    reducers:{
        addImage(state,action){
            state.images.push(action.payload)
        },

        deleteImage(state,action){
            state.images  = state.images.filter((image)=> image.$id !== action.payload)
        }
    }
})



export const {addImage,deleteImage} = bucketSlice.actions;

export default bucketSlice.reducer