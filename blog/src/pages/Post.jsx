import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import dbService from "../services/DbService";
import bucketService from "../services/bucketService";
import { del_Post, getSinglePost } from "../store/postSlice";
import { ButtonComponent, Wrapper } from "../components";
import { Box, CircularProgress, Divider } from "@mui/material";
import parse from "html-react-parser";
import { Text } from "../components/Text";
import { theme } from "../components/Theme/Theme";

export const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const singlePost = useSelector((state) => state.posts.singlePost);
  const isAuthor =
    singlePost && userData ? singlePost.userID === userData.$id : false;
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      try {
        if (slug) {
          const post = await dbService.getSinglePost(slug);
          if (post) {
            dispatch(getSinglePost(post));
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    return () => {
      // Clear the singlePost state when the component unmounts or slug changes
      dispatch(getSinglePost(null));
    };
  }, [slug, dispatch]);

  // const post = useSelector((state) => state.posts.singlePost);

  const deletePost = async () => {
    try {
      const status = await dbService.deletePost(singlePost.$id);
      if (status) {
        await bucketService.deleteFile(singlePost.featuredImage);
        dispatch(del_Post(singlePost.$id));
        navigate("/all-posts");
      } else {
        console.log("Failed to delete the post");
      }
    } catch (error) {
      console.error("Error deleting post or image: ", error);
    }
  };
  return (
    <Wrapper>
      {loading ? (
        <Box sx={{
          display:'flex',
          alignItems:'center',
          justifyContent:"center",
          mt:55
        }}>
        <CircularProgress  />

        </Box>
      ) : singlePost ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: { lg: "center", sm: "start", xs: "start" },
              justifyContent: "space-between",
              flexDirection: { lg: "row", sm: "column", xs: "column-reverse" },
              gap: { lg: 0, sm: 3, xs: 3 },
              my: 10,
            }}
          >
            <Box>
              <Text
                text="Blog"
                color="primary"
                variant="h6"
                sx={{ fontWeight: "bold" }}
              />
              <Text
                text={singlePost.title}
                variant="h2"
                sx={{ fontWeight: "bold" }}
              />
            </Box>
            <Box sx={{ width: { lg: 600, sm: 400, xs: 400 } }}>
              <img
                src={bucketService.filePreview(singlePost.featuredImage)}
                alt={singlePost.title}
                style={{
                  borderRadius: 20,
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
              />
            </Box>
          </Box>
          <Divider />
          <Box sx={{ my: 10 }}>{parse(singlePost.content)}</Box>
          {isAuthor && (
            <Box sx={{ display: "flex", gap: 5 }}>
              <Link to={`/edit-post/${singlePost.$id}`}>
                <ButtonComponent
                  text="Edit"
                  size="large"
                  sx={{ textTransform: "none", color: "white" }}
                />
              </Link>
              <ButtonComponent
                text="Delete"
                size="large"
                color="error"
                onClick={deletePost}
                sx={{ textTransform: "none", color: "white" }}
              />
            </Box>
          )}
        </Box>
      ) : null}
    </Wrapper>
  );
};