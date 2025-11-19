// 필요한 모듈들
import { ApolloServer } from '@apollo/server'; // Apollo Server 핵심 라이브러리
import { expressMiddleware } from '@as-integrations/express5'; // Express에 Apollo Server를 연결해 주는 미들웨어
import express from 'express'; // HTTP 서버(Express) 모듈
import cors from 'cors'; // CORS 허용을 위한 모듈

// 1. GraphQL 스키마 정의(Type Definitions): 어떤 타입과 쿼리를 제공할지 선언합니다.
//    - API의 데이터 구조를 정의하는 과정 (메뉴판)
//    - Query 타입은 모든 GraphQL 스키마에 필수이며, 데이터 조회(읽기)의 진입점
const typeDefs = `
  type Query {
    hello: String
    user: User
  }

  type User {
    id: ID!
    username: String
  }
`;

// 2. 리졸버: 스키마에 정의된 필드가 실제로 어떤 데이터를 반환할지 구현합니다.
//    - 스키마 정의에 따라 실제 데이터를 반환하는 함수 (요리법)
const resolvers = {
  Query: {
    // 2_1) hello 쿼리가 요청되면 "Hello, GraphQL World!" 문자열을 반환합니다.
    hello: () => 'Hello, GraphQL World!',
    // 2_2) user 쿼리가 요청되면 객체를 반환합니다.
    user: () => {
      return {
        id: 'user-001', // - user 쿼리의 id 필드가 요청되면 "user-001" 문자열을 반환합니다.
        username: 'GraphQLStudent', // - user 쿼리의 username 필드가 요청되면 "GraphQLStudent" 문자열을 반환합니다.
      };
    },
  },
};

// 3. Apollo Server와 Express를 초기화하고 실행하는 함수
async function startServer() {
  // 3_1) GraphQL 요청을 처리할 Apollo Server 인스턴스 생성 (typeDefs와 resolvers를 사용하여 생성)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  // 3_2) Apollo Server가 요청을 받을 준비를 마칠 때까지 대기
  await server.start();

  // 3_3) REST 엔드포인트, 미들웨어 등을 연결할 Express 앱 생성
  const app = express();
  // 3_4) /graphql 엔드포인트로 들어오는 요청에 대한 미들웨어 체인 구성
  app.use(
    '/graphql', // - /graphql 엔드포인트로 들어오는 요청에 대한 미들웨어 체인 구성
    cors(), // - 다른 도메인에서 접근할 수 있도록 CORS 허용
    express.json(), // - 요청 본문을 JSON으로 파싱
    expressMiddleware(server) // - Apollo Server와 Express를 연결 (Express 에서 GraphQL 요청을 처리할 수 있도록 연결)
  );
  // 3_5) 서버가 열릴 포트 지정 후 실행
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(
      `🚀 GraphQL 서버가 http://localhost:${PORT}/graphql 에서 실행 중입니다.`
    );
  });
}

// 4. 서버 실행
startServer();
