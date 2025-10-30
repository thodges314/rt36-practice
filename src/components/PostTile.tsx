import type { Post } from '../graphql/queries';
const PostTile = (post: Omit<Post, 'body'>) => {
  return <div>PostTile</div>;
};
export default PostTile;
