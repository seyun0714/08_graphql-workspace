import { useState } from 'react';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  return (
    <>
      <UserList setSelectedUserId={setSelectedUserId} />
      {selectedUserId && <UserDetail userId={selectedUserId} />}

      <hr />

      <PostList setSelectedPostId={setSelectedPostId} />
      {selectedPostId && <PostDetail postId={selectedPostId} />}
    </>
  );
}

export default App;
