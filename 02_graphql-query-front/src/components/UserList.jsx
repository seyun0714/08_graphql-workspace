import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import React from 'react';

const GET_ALL_USERS = gql`
  query {
    users {
      id
      username
    }
  }
`;

function UserList({ setSelectedUserId }) {
  const { loading, error, data } = useQuery(GET_ALL_USERS); // response === {loading: boolean, error: Error | undefined, data: object}
  // data == { users: [ { id, username }, ... ] }

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <div>
      <h2>유저 목록</h2>
      <ul>
        {data.users.map((user) => (
          <li key={user.id} onClick={() => setSelectedUserId(user.id)}>
            {user.id} - {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
