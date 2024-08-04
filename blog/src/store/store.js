
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice';
import postSlice from './postSlice';
import bucketSlice from './bucketSlice';


const store = configureStore({
reducer:{
    auth:authSlice,
    posts:postSlice,
    bucket:bucketSlice
}
})

export default store;