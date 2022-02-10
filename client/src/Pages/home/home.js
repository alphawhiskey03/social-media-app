import Typography from "@mui/material/Typography";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

import { useEffect, useState } from "react";
import PostCard from "./postCard";
const FETCH_POST_QUERY = gql`
  query {
    getPosts {
      body
      username
      createdAt
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        username
        body
      }
    }
  }
`;

const Home = () => {
  const { error, loading, data } = useQuery(FETCH_POST_QUERY);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (data) {
      setPosts(data.getPosts);
    }
  }, [data]);
  return (
    <>
      <Typography
        variant={"h5"}
        align="center"
        color="text.primary"
        style={{ marginBottom: 20 }}
      >
        Recent posts
      </Typography>
      <PostCard posts={posts} />
    </>
  );
};
export default Home;
