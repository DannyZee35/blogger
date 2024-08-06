import { Box,Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { PostCard, Wrapper } from "../components";
import { Text } from "../components/Text";

export const Home = () => {
  const posts = useSelector((state) => state.posts.posts);
  console.log(posts);
  
  if (posts.length === 0) {
    return (
      <Box>
        <Wrapper>
          <Box>
            <Box>
              <h1>Login to read posts</h1>
            </Box>
          </Box>
        </Wrapper>
      </Box>
    );
  }
  return (
    <Box>
      <Wrapper>
      <Text
          text={"Welcome to Our Blog!"}
          variant="h4"
          sx={{ fontWeight: "bold", mt: 10 }}
          gutterBottom
        />
        <Text
          text={
            "Explore our collection of insightful posts, where we share a variety of topics that cater to your interests."
          }
          variant="h5"
          sx={{ mb: 10 }}
          gutterBottom
        />

      <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.$id}>
              
                <PostCard {...post} />
           
            </Grid>
          ))}
        </Grid>
       
      </Wrapper>
    </Box>
  );
};
