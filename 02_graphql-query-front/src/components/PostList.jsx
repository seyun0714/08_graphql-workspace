import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import React from 'react';

const GET_ALL_POSTS = gql`
  query {
    posts {
      id
      title
    }
  }
`;

function PostList({ setSelectedPostId }) {
  const { loading, error, data } = useQuery(GET_ALL_POSTS); // response === {loading: boolean, error: Error | undefined, data: object}

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;
  return (
    <div>
      <h2>포스트 목록</h2>
      <ul>
        {data.posts.map((post) => (
          <li key={post.id} onClick={() => setSelectedPostId(post.id)}>
            {post.id} - {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
