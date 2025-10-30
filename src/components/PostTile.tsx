import type { CSSProperties } from 'react';
import type { Post } from '../graphql/queries';
import { Link } from 'react-router-dom';

interface PostTileProps {
  post: Omit<Post, 'body'>;
}

const PostTile = (post: PostTileProps) => {
  const {
    post: { id, title },
  } = post;

  return (
    <div style={tileContainer}>
      <Link to={`post/${id}`}>{title}</Link>
      <button>Delete</button>
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
