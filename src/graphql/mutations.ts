import { gql } from '@apollo/client';

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export interface DeletePostVariables {
  id: string;
}

export interface DeletePostResponse {
  deletePost: boolean;
}
