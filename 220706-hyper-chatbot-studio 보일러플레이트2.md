### 220705

#### hyper-chatbot-studio 보일러플레이트2

##### 프로젝트 아키텍쳐 논의

오늘은 프로젝트 아키텍쳐(폴더 구조)에 대해 논의하는 시간을 가졌다.

그렇게 정해진 아키텍쳐 완성본!

![image](https://user-images.githubusercontent.com/77482972/177338273-663b69dc-7a98-45a3-b5ea-2314611576d2.png)

api - api 호출 관련

assets - 정적 파일들

components - 공통적으로 사용될 UI components

hooks - custom hook

pages - view와 유사

store - 전역 상태 관리

styles - globalStyle 파일

utils - 그 외에 글로벌적으로 사용될 수 있는 로직들

<br>

- 디렉토리 구조를 깔끔하게 할 것인가<br>

- 코드 단위에서 깔끔하게 보여줄 수 있도록 할 것인가<br>

둘 중 어느 것에 우선 순위를 둘 것인지에 대한 논의 끝에<br>

코드 심미성에 기울었다.

<br>

예를 들어, type 선언을 types라는 폴더를 생성해 정리함으로써<br>

파일 디렉토리를 깔끔하게 유지하고 일관성을 유지할 수는 있었겠지만<br>

import, export 구문을 작성할 때 깔끔하게 보이기 위해서는 types 폴더보다는<br>

필요한 곳(로직) 바로 위에 작성하는 게 더 깔끔할 수 있겠다는 결론!<br>

결국 types 폴더도 삭제하게 됐다.<br>

<br>

##### Typescript의 interface vs type

typescript에서 interface를 사용할 지 type을 사용할 지에 대해 논의가 있었다.<br>

그래서 type과 interface의 차이에 대해 조사하는 시간을 가졌었는데<br>

두 개의 차이가 엄청나게 크지 않았다.(extends랑 병합에 있어서는 차이가 있긴 하지만 아주 큰 차이는 없었던 것으로 확인)<br>

<br>

- 공식문서에서 interface 사용이 권장되며
- 나를 제외한 팀원들이 interface에 대한 경험이 그나마 많았기 때문에

interface를 사용하기로 결정! <br>

다만 병합에 있어서는 type 말고는 방법이 없어서 그럴 때에만 (선택권없이) type을 쓰기로 했다..

<br>

##### 참고한 사이트

https://www.taniarascia.com/react-architecture-directory-structure/