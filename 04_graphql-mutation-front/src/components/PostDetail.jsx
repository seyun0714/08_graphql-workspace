import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { GET_POST_DETAIL } from '../queries/postQueries';

function PostDetail({ postId }) {
  const { loading, error, data } = useQuery(GET_POST_DETAIL, {
    variables: { id: postId },
  });
  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;
  return (
    <div>
      <h2>포스트 상세</h2>
      <p>ID: {data.post.id}</p>
      <p>Title: {data.post.title}</p>
      <p>Content: {data.post.content}</p>
      <h3>Author:</h3>
      <p>ID: {data.post.author.id}</p>
      <p>Username: {data.post.author.username}</p>
    </div>
  );
}

export default PostDetail;
