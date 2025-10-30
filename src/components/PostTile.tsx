import type { CSSProperties } from 'react';
import type { Post } from '../graphql/queries';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client/react';

import { DELETE_POST } from '../graphql/mutations';
import { GET_ALL_POSTS } from '../graphql/queries';

import type {
  DeletePostResponse,
  DeletePostVariables,
} from '../graphql/mutations';

interface PostTileProps {
  post: Omit<Post, 'body'>;
}

const PostTile = (post: PostTileProps) => {
  const {
    post: { id, title },
  } = post;

  const [deletePost] = useMutation<DeletePostResponse, DeletePostVariables>(
    DELETE_POST,
    { refetchQueries: [{ query: GET_ALL_POSTS }] }
  );

  return (
    <div style={tileContainer}>
      <Link to={`post/${id}`}>{title}</Link>
      <button onClick={() => deletePost({ variables: { id: id } })}>
        Delete
      </button>
    </div>
  );
};
export default PostTile;

const tileContainer: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  textAlign: 'center',
  textDecoration: 'none',
  color: '#0074d9',
};
