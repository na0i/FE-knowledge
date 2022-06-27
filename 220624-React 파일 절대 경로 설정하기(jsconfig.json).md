### 220624

#### React 파일 절대 경로 설정하기(jsconfig.json)

리액트에서 파일 위치를 import 할때

>  import Main from '../../../../../Main';

과 같이 쓰게 되면 파일 위치가 어디 있는지 찾는데만 한참이 걸릴 수 있다.

<br>

평소처럼 아무렇지 않게 절대경로로 썼는데

![image](https://user-images.githubusercontent.com/77482972/175483700-4a5b9c88-1fd2-4a1b-803d-14eacb7c8e21.png)

이런 오류가 발생했다.

<br>

알고보니 절대 경로를 사용하려면<br>

`jsconfig.json` 파일을 이용해 절대 경로를 설정해주어야 한다.

<br>

##### jsconfig.json 란?

- 디렉토리 에 `jsconfig.json`파일이 있으면 해당 디렉토리가 JavaScript 프로젝트의 루트임을 나타낸다.
- 프로젝트에 속한 파일, 프로젝트에서 제외할 파일 및 컴파일러 옵션을 나열할 수 있다.

- jsconfig.json의 compilerOptions
  - baseUrl: 프로젝트 기본 디렉토리(절대 경로 기준 디렉토리)
  - paths: baseUrl 기준으로 계산될 경로, baseUrl 옵션 설정이 선행되어야 한다!

<br>

이제 절대경로를 지정하는 방법에 대해 알아보자!

<br>

##### 1. src를 생략하고 싶은 경우

1. jsconfig.json 생성 (package.json과 같은 위치에 만들어준다)

2. jsconfig.json에 소스코드 작성

   ```json
   {
       "compilerOptions": {
           "baseUrl": "src"
       },
       "include": [
           "src"
       ]
   }
   ```

3. src 키워드 없이 절대 경로로 import 가능!

3. components/main.jsx 와 같이 접근 가능

<br>

##### 2. src 생략하지 않고 src 부터 작성하고 싶은 경우

나는 src 생략이 아닌  **src/components/main.jsx** 와 같은 방법으로 사용하고 싶었다.

1. jsconfig.json 생성 (package.json과 같은 위치에 만들어준다)

2. jsconfig.json에 소스코드 작성

   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "*": ["*", "src/*", "public/*"]
       }
     }
   }
   ```

   - 나는 baseUrl에 '.'을 작성하였다 = 프로젝트 루트 전체를 기준으로 사용하고 싶었다.

   - paths에 `*` 와일드 카드 작성 = 예약어를 따로 지정하지 않겠다.

   - `*`에 해당할 폴더들을 우측에 배열 형태로 작성!

   - 잘 이해되지 않는 분들을 위한 상세 설명

     - paths는 baseUrl을 기준으로 파일을 불러올 때 기준점을 설정하는 옵션이다.

     - 예시
     - ![image](https://user-images.githubusercontent.com/77482972/175864267-9b61faf1-8eb0-4349-97ec-c09e8dbfc7f8.png)
     - 좌측에는 사용할 이름
     - 우측에는 사용될 디렉토리 주소를 작성한다.(baseUrl 기준)

3. 절대 경로로 import 가능

   ![image](https://user-images.githubusercontent.com/77482972/175864629-1a256b5e-521d-4ba2-9176-c746ecf7b0ad.png)

   

<br>

참고한 사이트

>  https://velog.io/@kcj_dev96/jsconfig.json