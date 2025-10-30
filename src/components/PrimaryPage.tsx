import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useQuery } from '@apollo/client/react';

import { GET_ALL_POSTS } from '../graphql/queries';
import PostTile from './PostTile';

import type { CSSProperties } from 'react';

import type { GetAllPostsResponse, Post } from '../graphql/queries';

const PrimaryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const [page, setPage] = useState(pageFromUrl);
  const [limit, setLimit] = useState(5);
  const [posts, setPosts] = useState<Omit<Post, 'body'>[]>([]);
  const totalCountRef = useRef(0);

  const lengthOptions = [5, 10, 20, 50, totalCountRef.current];

  const { error, data, networkStatus } = useQuery<GetAllPostsResponse>(
    GET_ALL_POSTS,
    {
      variables: {
        options: {
          paginate: {
            page,
            limit,
          },
        },
      },
      notifyOnNetworkStatusChange: true,
    }
  );
  useEffect(() => {
    setPosts((prev) => data?.posts.data ?? prev);
    if (data?.posts.meta.totalCount)
      totalCountRef.current = data?.posts.meta.totalCount;
  }, [data]);
  useEffect(() => {
    setSearchParams({ page: String(page) });
  }, [page, setSearchParams]);

  if (networkStatus === 1) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <ul style={listStyles}>
        {posts.map((post) => (
          <li key={post.id} style={itemStyles}>
            <PostTile post={post} />
          </li>
        ))}
      </ul>
      {networkStatus === 3 && <p>Loading next page...</p>}
      <div style={paginationRowStyles}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>
          {page} of {Math.ceil(totalCountRef.current / limit)}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(totalCountRef.current / limit)}
        >
          Next
        </button>
      </div>
      <span>Posts per page: {limit}</span>
      <div style={paginationRowStyles}>
        {lengthOptions.map((len) => (
          <button key={len} onClick={() => setLimit(len)}>
            {len}
          </button>
        ))}
      </div>
    </>
  );
};
export default PrimaryPage;

const listStyles: CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: '40px auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20 px',
};

const itemStyles: CSSProperties = {
  width: 800,
  padding: 0,
};

const paginationRowStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  alignItems: 'center',
};
