import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query GetAllPosts($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
      }
      meta {
        totalCount
      }
    }
  }
`;

export const GET_A_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      body
    }
  }
`;

export interface Post {
  id: string;
  title: string;
  body: string;
}

export interface GetAllPostsResponse {
  posts: {
    data: Omit<Post, 'body'>[];
    meta: { totalCount: number };
  };
}
