### 220704

#### hyper-chatbot-studio 보일러플레이트

https://chanyeong.com/blog/post/17

프로젝트 생성(yarn create vite '프로젝트 이름') → yarn →

```
yarn set version berry
yarn add react-router-dom
yarn add recoil
yarn add swr
yarn add @mui/material @mui/styled-engine-sc styled-components
yarn add react-flow-renderer@9.7.4
yarn add styled-reset
yarn add -D typescript eslint prettier
yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
yarn add -D eslint-config-prettier eslint-plugin-prettier
yarn add -D eslint-config-airbnb
yarn add -D eslint-plugin-react eslint-plugin-react-hooks
yarn add -D eslint-plugin-jsx-a11y eslint-plugin-import
```

→ prettierrc 생성 후 설정 → eslintrc.js 생성 후 설정 → yarn husky install (+package.json 수정)

-------------

`-D`: develop 할때만 쓰겠다

eslintrc.js의 rules: 필요없는 데 에러뜨는 것들에 대해서 경고문구를 띄울지 말지

-------------------

구챗봇은 빌드하는데 좀 오래걸리긴 하기도 하고..
도전적인 마인드
코드 양이 쫌 낳을 것 같아서 빌드속도를 따졌을떄 vite

후에 깃랩으로 이동할수도 있으니까
githook은 깃험 깁랙 설정이 다ㅡㄻ
그러니까 허스키 쓰자