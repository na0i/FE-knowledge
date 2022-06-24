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