import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import cors from 'cors';

// 샘플 데이터 (In-Memory DB)
// const -> let으로 변경하여 데이터 수정이 가능하도록 합니다.
let users = [
  { id: '1', username: 'Alice', age: 25 },
  { id: '2', username: 'Bob', age: 30 },
  { id: '3', username: 'Charlie', age: 35 },
];

let posts = [
  {
    id: '101',
    title: 'GraphQL Intro',
    content: 'GraphQL은 REST API 대신 사용하는 새로운 쿼리 언어입니다.',
    authorId: '1',
  },
  {
    id: '102',
    title: 'React Hooks',
    content: 'React Hooks는 React 16.8에 도입된 새로운 기능입니다.',
    authorId: '1',
  },
  {
    id: '103',
    title: 'Vite vs CRA',
    content: 'Vite와 CRA는 각각 다른 빌드 툴입니다.',
    authorId: '2',
  },
];

// GraphQL 스키마 정의(Type Definitions)
const typeDefs = `
  type User {
    id: ID!
    username: String!
    age: Int
    posts: [Post] 
  }

  type Post {
    id: ID!
    title: String!
    content: String
    author: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    posts: [Post]
    post(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String, authorId: ID!): Post
    deletePost(id: ID!): Post
  }
`;
// ---------------------------------------------

// --- (3) 리졸버 (Resolvers) 수정 ---
const resolvers = {
  Query: {
    users: () => users,
    user: (parent, args) => users.find((user) => user.id === args.id),
    posts: () => posts,
    post: (parent, args) => posts.find((post) => post.id === args.id),
  },

  User: {
    posts: (parent) => posts.filter((post) => post.authorId === parent.id),
  },
  Post: {
    author: (parent) => users.find((user) => user.id === parent.authorId),
  },

  // Mutation 리졸버 추가
  Mutation: {
    // createPost 리졸버
    createPost: (parent, args) => {
      const { title, content, authorId } = args;

      // 신규 게시글 ID 생성
      const id = String(posts.length + 101);
      // 신규 게시글 생성
      const newPost = {
        id,
        title,
        content: content || '...',
        authorId,
      };

      // 'DB'(배열)에 데이터 추가
      posts.push(newPost);

      // 생성된 객체 반환
      return newPost;
    },

    // deletePost 리졸버
    deletePost: (parent, args) => {
      const { id } = args;
      const postIndex = posts.findIndex((post) => post.id === id);

      if (postIndex === -1) {
        // (실제로는 에러 처리를 해야 합니다)
        return null;
      }

      // 'DB'(배열)에서 데이터 삭제
      const deletedPost = posts.splice(postIndex, 1)[0];

      // 삭제된 객체 반환
      return deletedPost;
    },
  },
};

// (서버 시작 로직은 동일 ... )
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  const app = express();
  app.use('/graphql', cors(), express.json(), expressMiddleware(server));
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(
      `🚀 GraphQL 서버가 http://localhost:${PORT}/graphql 에서 실행 중입니다.`
    );
  });
}

startServer();
