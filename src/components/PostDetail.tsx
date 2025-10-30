import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client/react';

import { GET_A_POST } from '../graphql/queries';

import type { Post } from '../graphql/queries';
const PostDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<Post>(GET_A_POST, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
  return <div>PostDetail</div>;
};
export default PostDetail;
