### 220704

#### hyper-chatbot-studio 보일러플레이트

https://chanyeong.com/blog/post/17

1. 프로젝트 생성(yarn create vite '프로젝트 이름')

   - chatbot-studio v1의 코드양이 그렇게 길지 않은데 빌드하는데 생각보다 오랜 시간이 걸렸다.
   - webpack이 범용성이 좋긴 하지만 속도도 빠르고 도전하는 마인드로 vite 도입 결정
   - 위와 비슷한 이유로 yarn berry 사용(yarn set version berry)

2. yarn

3. 라이브러리 설치

   ```bash
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

4. prettierrc 생성 후 설정

5. eslintrc.js 생성 후 설정

   - tslint는 더이상 지원되지 않는다고 한다.

6. yarn husky install (+husky 추가 설정)

   - githook을 사용하려다가 discord랑 git연동할 때 github과 gitlab의 git 설정이 달랐기 때문에
   - 추후에 gitlab으로 옮겨갈 가능성을 고려해서 husky를 사용하기로 결정

-------------

`-D`: develop 할때만 쓰겠다

eslintrc.js의 rules: 필요없는 데 에러뜨는 것들에 대해서 경고문구를 띄울지 말지


