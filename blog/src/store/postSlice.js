


import { createSlice } from '@reduxjs/toolkit'



const initialState ={
posts:[],
singlePost:null,
loading:false,
error:null
}


const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
      getAllPosts(state, action) {
        state.posts = action.payload;
      },
      getSinglePost(state, action) {
        state.singlePost = action.payload;
      },
      setLoading(state) {
        state.loading = true;
      },
      setError(state, action) {
        state.error = action.payload.message;
      },
      addPost(state, action) {
        state.posts.push(action.payload)
        // state.posts = [...state.posts, action.payload];
      },
      del_Post(state, action) {
        state.posts = state.posts.filter((post) => post.$id !== action.payload);
      },
    },
  });
  

export const { getAllPosts,getSinglePost,setError,setLoading ,addPost,del_Post} = postSlice.actions;
export default postSlice.reducer;