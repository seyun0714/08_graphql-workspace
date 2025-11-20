import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { CREATE_NEW_POST, GET_ALL_POSTS } from '../queries/postQueries';

function PostForm() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    authorId: '',
  });

  const [createPostSubmit, { loading, error, data }] = useMutation(
    CREATE_NEW_POST,
    {
      refetchQueries: [GET_ALL_POSTS],
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.authorId) {
      alert('제목과 작성자 ID는 필수 입력 사항입니다.');
      return;
    }
    console.log(formData.authorId);
    createPostSubmit({
      variables: { ...formData },
    });
    setFormData({ title: '', content: '', authorId: '' });
  };

  return (
    <div>
      <h2>게시글 등록</h2>
      <form>
        <div>
          <input
            type="text"
            name="title"
            placeholder="제목"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div>
          <input
            type="text"
            name="content"
            placeholder="내용"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />
        </div>
        <div>
          <input
            type="text"
            name="authorId"
            placeholder="작성자 ID"
            value={formData.authorId}
            onChange={(e) =>
              setFormData({ ...formData, authorId: e.target.value })
            }
          />
        </div>
        <button type="submit" onClick={handleSubmit} disabled={loading}>
          등록
        </button>
      </form>
    </div>
  );
}

export default PostForm;
