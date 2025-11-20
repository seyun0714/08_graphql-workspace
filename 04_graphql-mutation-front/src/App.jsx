import { useState } from 'react';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import { useMutation } from '@apollo/client/react';
import { DELETE_POST, GET_ALL_POSTS } from './queries/postQueries';

function App() {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const [deletePost, { loading, error, data }] = useMutation(DELETE_POST, {
    refetchQueries: [GET_ALL_POSTS],
  });

  const handleDelete = () => {
    if (!confirm('정말로 이 포스트를 삭제하시겠습니까?')) {
      return;
    }
    deletePost({ variables: { id: selectedPostId } });
    alert(`포스트 ID ${selectedPostId}를 삭제했습니다.`);
    setSelectedPostId(null);
  };

  return (
    <>
      <PostList setSelectedPostId={setSelectedPostId} />
      {selectedPostId && (
        <>
          <PostDetail postId={selectedPostId} />
          <button onClick={handleDelete} disabled={loading}>
            삭제
          </button>
        </>
      )}
      <hr />
      <PostForm />
    </>
  );
}

export default App;
