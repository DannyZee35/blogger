import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { PostCard, Wrapper } from "../components";

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
        <Box>
          {posts.map((post) => (
            <Box component="div" key={post.$id}>
              <PostCard
                title={post.title}
                featuredImage={post.featuredImage}
                $id={post.$id}
              />
            </Box>
          ))}
        </Box>
      </Wrapper>
    </Box>
  );
};
