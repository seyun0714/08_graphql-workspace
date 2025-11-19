// 필요한 모듈들
import { ApolloServer } from '@apollo/server'; // Apollo Server 핵심 라이브러리
import { expressMiddleware } from '@as-integrations/express5'; // Express에 Apollo Server를 연결해 주는 미들웨어
import express from 'express'; // HTTP 서버(Express) 모듈
import cors from 'cors'; // CORS 허용을 위한 모듈

const users = [
  { id: '1', username: 'Alice', age: 25 },
  { id: '2', username: 'Bob', age: 30 },
  { id: '3', username: 'Chalie', age: 35 },
];

const posts = [
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

const typeDefs = `
  type User{
    id: ID!
    username: String!
    age: Int
    posts: [Post]
  }

  type Post{
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query{
    users: [User]
    posts: [Post]
    user(id: ID!): User
    post(id: ID!): Post
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    posts: () => posts,
    user: (_, { id }) => users.find((user) => user.id === id),
    post: (_, { id }) => posts.find((post) => post.id === id),
  },

  User: {
    // parent는 상위 리졸버의 결과
    posts: (parent) => posts.filter((post) => post.authorId === parent.id),
  },

  Post: {
    // parent는 상위 리졸버의 결과
    author: (parent) => users.find((user) => user.id === parent.authorId),
  },
};

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
