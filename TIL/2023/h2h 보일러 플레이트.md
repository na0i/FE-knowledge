### 230320

# h2h 프론트엔드 개발일지 01 - 보일러 플레이트

### 보일러 플레이트 과정

- yarn create vite h2h-frontend
- git init
- git remote add origin 'git 주소'
- yarn add react-router-dom
- yarn add styled-components
- yarn add react-icons: https://react-icons.github.io/react-icons/icons?name=bi
- yarn add recoil
- yarn add styled-reset
- yarn add react-query
- yarn add -D typescript eslint prettier
- yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
- yarn add -D eslint-plugin-react eslint-plugin-react-hooks
- yarn add -D eslint-plugin-jsx-a11y eslint-plugin-import
- prettierrc 생성 및 옵션 설정
- eslintrc.js 생성 및 옵션 설정

<br>

### 라이브러리 선정 이유

#### vite

21년 가장 만족도가 높은 번들 툴이 vite라고 한다.
https://yozm.wishket.com/magazine/detail/1620/

<br>

#### react-query

작은 규모의 프로젝트라 axios 써도 될 것 같지만 추후에 버전 업이나 기능 추가 등 규모가 커질 가능성을 생각해 data fetching 라이브러리를 사용하기로 마음먹었고 npm trends에서 현재 swr보다 인기가 많은 react query를 사용해보기로 결정했다. 최근에 카카오 테크의 가독성 개선 영상을 봤는데 react query가 isFetching, isLoading 등 기능을 문맥에 맞는 용어로 잘 사용하는 것 같아서 궁금했다.


<br>

#### recoil

전역 상태관리 라이브러리로 recoil을 채택했다. 처음 프론트를 작업하는 친구가 있어서 최대한 사용법이 간편하고 useState와 사용법이 비슷한 recoil을 골랐다.

<br>

#### styled-components

스타일에 관해서는 styled component 쓰기로 결정했다. 계속 써왔던건데 사용법이 간단하고 컴포넌트에 이름을 붙일수 있어서 가독성이 좋은 것 같다. emotion을 새로 사용해볼까 했지만 사용법이 거의 동일했던 것 같다.

<br>

### 알게 된 점

##### styled-reset

브라우저마다 기본적으로 설치되어 있는 스타일을 지워주는 Node.js 패키지이다. 기본 제공 스타일을 초기화시켜 호환성을 맞춘다.


##### typescript-eslint/parser

Typescript에서 ESLint를 사용할 수 있도록 해줍니다.

##### typescript-eslint/eslint-plugin

TypeScript 린팅(linting) 규칙을 실행할 수 있는 ESlint 플러그인

##### prettierrc 옵션 설정

https://velog.io/@kyusung/eslint-prettier-config

##### tsconfig.json 옵션 설정

https://velog.io/@jjunyjjuny/React-TS-boilerplate-%EC%A0%9C%EC%9E%91%EA%B8%B0-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%84%B1

##### 모바일화면 100vh로 맞추기
https://velog.io/@eunddodi/React-%EB%AA%A8%EB%B0%94%EC%9D%BC-%EC%9B%B9-%EC%95%B1-100vh-%EC%8B%A4%EC%A0%9C-%ED%99%94%EB%A9%B4-%ED%81%AC%EA%B8%B0%EB%A1%9C-%EB%A7%9E%EC%B6%94%EA%B8%B0

<br>

리액트로 개발한 후 웹뷰 형식으로 개발하려고 했으나 uiux 적으로 어느정도 한계가 존재할 것 같아 결국 react native로 변경하기로 결정했다.

- 기본 환경 세팅: https://velog.io/@willy4202/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%84%A4%EC%9D%B4%ED%8B%B0%EB%B8%8C-%EC%B4%88%EA%B8%B0-%EC%84%B8%ED%8C%85%EB%B2%95
