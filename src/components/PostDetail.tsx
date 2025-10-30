import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client/react';

import { GET_A_POST } from '../graphql/queries';

import type { Post } from '../graphql/queries';

import type { CSSProperties } from 'react';
const PostDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<{ post: Post }>(GET_A_POST, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const { title, body } = data!.post;
  return (
    <div style={postContainer}>
      <div style={titleRowDiv}>
        <div>{title}</div>
      </div>
      <div>
        <div>{body}</div>
      </div>
    </div>
  );
};
export default PostDetail;

const postContainer: CSSProperties = {
  width: '800px',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const titleRowDiv: CSSProperties = {
  marginBottom: '10px',
  fontWeight: 'bold',
  alignItems: 'center',
};
