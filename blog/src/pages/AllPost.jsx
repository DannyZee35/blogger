import React, { useEffect, useState } from "react";
import dbService from "../services/DbService";
import { getAllPosts } from "../store/postSlice";
import { PostCard, Wrapper } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { Box,Grid } from "@mui/material";
import { Text } from "../components/Text";
export const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  const fetchedPosts = useSelector((state) => state.posts.posts);
  // console.log("fetched posts ",fetchedPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      await dbService.getPosts([]).then((posts) => {
        if (posts.documents) {
          dispatch(getAllPosts(posts.documents));
          setPosts(posts.documents);
          // console.log("fetched wali posts",posts);
        }
      });
    };
    fetchPosts();
  }, []);
  return (
    <Box>
      <Wrapper>
        <Text
          text={"Explore a Diverse Range of Blogs"}
          variant="h4"
          sx={{ fontWeight: "bold", mt: 10 }}
          gutterBottom
        />
        <Text
          text={
            "Dive into our collection of blog posts, where you'll find a diverse range of topics, insights, and stories."
          }
          variant="h5"
          sx={{ mb: 10 }}
          gutterBottom
        />

        <Grid container spacing={4}>
          {fetchedPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.$id}>
              
                <PostCard {...post} />
           
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </Box>
  );
};
