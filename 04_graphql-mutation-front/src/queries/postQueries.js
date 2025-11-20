import { gql } from '@apollo/client';

const GET_ALL_POSTS = gql`
  query {
    posts {
      id
      title
    }
  }
`;

const GET_POST_DETAIL = gql`
  query GetPostDetails($id: ID!) {
    post(id: $id) {
      id
      title
      content
      author {
        id
        username
      }
    }
  }
`;

const CREATE_NEW_POST = gql`
  mutation CreateNewPost($title: String!, $content: String, $authorId: ID!) {
    createPost(title: $title, content: $content, authorId: $authorId) {
      id
      title
      content
      author {
        id
        username
      }
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
      title
      author {
        id
      }
    }
  }
`;

export { GET_ALL_POSTS, GET_POST_DETAIL, CREATE_NEW_POST, DELETE_POST };
