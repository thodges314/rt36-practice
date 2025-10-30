import { useQuery } from '@apollo/client/react';

import { GET_ALL_POSTS } from '../graphql/queries';

import type { GetAllPostsResponse } from '../graphql/queries';

const PrimaryPage = () => {
  const { loading, error, data } = useQuery<GetAllPostsResponse>(
    GET_ALL_POSTS,
    {
      variables: {
        options: {
          paginate: {
            page: 1,
            limit: 5,
          },
        },
      },
    }
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
  return <div>PrimaryPage</div>;
};
export default PrimaryPage;
