import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import React from 'react';

const GET_USER_DETAIL = gql`
  query GetUserDetail($id: ID!) {
    user(id: $id) {
      id
      username
      age
      posts {
        id
        title
        content
      }
    }
  }
`;

function UserDetail({ userId }) {
  const { loading, error, data } = useQuery(GET_USER_DETAIL, {
    variables: { id: userId },
  });

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;
  return (
    <div>
      <h2>유저 상세</h2>
      <p>ID: {data.user.id}</p>
      <p>Username: {data.user.username}</p>
      <p>Age: {data.user.age}</p>
      <h3>Posts:</h3>
      <ul>
        {data.user.posts.map((post) => (
          <li key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserDetail;
