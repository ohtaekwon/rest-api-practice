## 풀스택 리액트 토이프로젝트 - REST, GraphQL

- 지식공유자 : 정재남
- React 기반의 간단한 SNS 서비스를 만들면서 REST API 및 GraphQL을 연습한다.

## 목차

- 섹션 1. Client - 기본기능 구현
- 섹션 2. Server - REST API
- 섹션 3. Client - REST API 통신
- 섹션 4. Server - GraphQL
- 섹션 5. Client - GraphQL 통신
- 섹션 5. Client - GraphQL 통신
- 섹션 6. Client - GraphQL 무한스크롤
- 섹션 7. 기타 library 소개
- 섹션 8. TS 적용기

## 개요

- 서버를 구현하지 않고, 임시 데이터를 활용한 기본적인 메시지 CRUD 형태 구현

## 임시 데이터

```typescript
const UserIds = ["roy", "jay"];
const getRandomUserId = () => UserIds[Math.round(Math.random())];
const originalMsgs = Array(50)
  .fill(0)
  .map((_, index) => ({
    id: index + 1,
    userId: getRandomUserId,
    timestamp: 1234567890123 + index * 1000 * 60,
    text: `${index + 1} mock text`,
  }))
  .reverse();
```

## 구현 원리

- 메시지 데이터를 관리하기 위해 최상단의 `MsgList` 컴포넌트에서 하위 컴포넌트 `MsgItem` , `MsgInput` 컴포넌트로 props를 내려준다.
- 기본 데이터 props 외에 CRUD를 위해, 추가 메서드도 props로 내려준다.
  - `onUpdate`, `onDelete`, `startEdit`, `isEditing`

## 실행방법

#### 1) server

```bash
cd /server
yarn run start
```

#### 2) client

```bash
cd /client
yarn run start

```
