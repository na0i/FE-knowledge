### React-Router

<br>

#### Router 개요

![image](https://user-images.githubusercontent.com/77482972/153336370-420f5761-cd45-4ab6-b79f-3466e50d7867.png)

##### MPA 방식
- 각각의 페이지들이 고유한 url을 가진다.
- 클라이언트가 url을 통한 요청에서(고유의 url로)
- 서버는 그 url을 보고 해당 페이지에 대한 리스폰스 결과를 보낸다.
- 사용자가 보고자하는 리소스들을 url로 구분해서 요청을 보내고
- 그 url과 mapping 되어있는 리소스들을 클라이언트에게 제공하는 형태

##### SPA 방식
- 하나의 url로 서버에 요청을 보내고
- 그 결과로 하나의 페이지를 보내게 된다.
- 그 이후부터는 화면이 변경되어도 클라이언트 내부에서 라이브러리 등으로 컴포넌트를 전환해
- 사용자로 하여금 페이지가 바뀐 것처럼 보이게 하는 것
- 따라서 url이 변경되지 않음
- url이 변경되지 않음으로서 생기는 단점들을 개선하기 위해 사용하는 것이 리액트 라우터

<br>

![image](https://user-images.githubusercontent.com/77482972/153337037-6e2d7ca4-77b8-46c9-93dc-31ecb2e5cd59.png)

<br>

#### Router 주요 컴포넌트

![image](https://user-images.githubusercontent.com/77482972/153337143-fd5bfc0e-832a-4bc5-abbe-ab492e80ab6a.png)

##### BrouserRouter
- 라우팅할 모든 컴포넌트를 감싸게 되는 컴포넌트
- 라우트할 수 있는 기능들을 사용할 수 있도록

##### Router
- 라우팅 할 때 어떤 컴포넌트를 보여줄지

##### Link
- a태그와 비슷
- 그러나 페이지 전환은 아님