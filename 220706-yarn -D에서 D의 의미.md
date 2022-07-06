### 220706

#### yarn -D에서 D의 의미

라이브러리를 설치하던 중<br>

어떤 패키지는 -D를 붙여 설치를 했다.<br>

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
yarn add -D eslint-plugin-jsx-a11y eslint-plugin-
```

<br>

그냥 yarn 설치와 `yarn -D`의 차이가 무엇인지에 대해 알아보자! 

<br>

##### package.json 에서 확인하기

![image](https://user-images.githubusercontent.com/77482972/177473816-aea2f199-6cb5-44c8-96f3-a622db1be204.png)

라이브러리 설치 후 package.json 파일을 열어보면<br>

dependencies와 devDependencies로 나뉘어 깔아져 있는 것을 확인할 수 있었다.<br>

<br>

##### dependencies와 devDependencies의 차이

- dependencies 는 애플리케이션 동작과 연관

- devDependencies 는 애플리케이션 동작과 직접적인 연관은 없지만, 개발할 때 필요한 라이브러리

라고 생각하면 된다.<br>

즉, eslint나 prettier과 같은 라이브러리는 빌드할 때 보다는 개발 시에만 필요한 라이브러리 이므로<br>

-D를 붙여서 설치함으로써 빌드시간도 줄이고, 배포할 때 불필요한 라이브러리를 포함시키지 않을 수 있다!

<br>

yarn 뿐만 아니라 npm도 마찬가지다.