import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams,Link } from "react-router-dom";
import dbService from "../services/DbService";
import bucketService from "../services/bucketService";
import { del_Post,getSinglePost } from "../store/postSlice";
import { ButtonComponent, Wrapper } from "../components";
import { Box } from "@mui/material";
import parse from "html-react-parser";

export const Post = () => {
  const [post,setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
 const singlePost= useSelector((state)=>state.posts.singlePost)
 const isAuthor = singlePost && userData ? singlePost.userID  === userData.$id : false;

  console.log("single",singlePost);
  
  useEffect(()=>{
    const fetchPosts=async()=>{
    if(slug){
     await dbService.getSinglePost(slug).then((post)=>{
      console.log("slug",slug);
        console.log("post",post);

        if (post) {
          dispatch(getSinglePost(post))
          setPost(post)
        }
      })
    }}
    fetchPosts()
  },[navigate,slug])
  // const post = useSelector((state) => state.posts.singlePost);
  
  
 

  const deletePost = () => {
    dbService.deletePost(post.$id).then((status) => {
      dispatch(del_Post(post.$id));
      if (status) {
        bucketService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };
  return singlePost ? (
    <Wrapper>
      <Box>
        <img
          src={bucketService.filePreview(singlePost.featuredImage)}
          alt={singlePost.title}
         />

        {isAuthor && (
          <Box  >
            <Link to={`/edit-post/${singlePost.$id}`}>
              <ButtonComponent  text={'Edit'} />
            
            </Link>
            <ButtonComponent  text={'Delete'} onClick={deletePost} />

          
          </Box>
        )}
      </Box>
      <Box  >
        <h1  >{singlePost.title}</h1>
      </Box>
      <Box  >{parse(singlePost.content)}</Box>
    </Wrapper>
  ) : null;
};
