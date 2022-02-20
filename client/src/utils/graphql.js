import { gql } from "@apollo/client";

export const FETCH_POST_QUERY = gql`
  query {
    getPosts {
      id
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
