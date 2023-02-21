# HTML

### 2022.04.12 HTML basics

<br>

##### 참고한 사이트

> https://www.w3schools.com/html/html_intro.asp > https://brunch.co.kr/@coveryou/14

<br>

##### What is HTML?

- Hyper Text Markup Language의 약자
- 웹 페이지를 만들기 위한 표준 마크업 언어
- 웹 페이지의 구조를 설명

<br>

##### What is an HTML Element?

- 여는 태그, 컨텐츠, 닫는 태그로 구분
- 여는 태그와 닫는 태그로 컨텐츠를 감싼다.
- 닫히는 태그가 필요 없는 태그도 있다. 이런 경우 <태그명 />의 형식
- 속성

<br>

##### 기본 HTML5 문서타입 예시

```
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Script-Type" content="text/javascript">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title>HTML 4.01 문서타입</title>
  <link rel="stylesheet" type="text/css" href="css/service_name.css">
</head>
<body>

</body>
</html>
```

- `<!DOCTYPE html>`
  - DTD(Document type Definition)는 HTML문서 최상단에 위치
  - html이 어떤 버전으로 작성되었는지 미리 선언해, 웹 브라우저가 내용을 올바르게 표시할 수 있도록 함
  - DOCTYPE 버전별 선언에 따라 HTML이 지원하는 태그가 조금씩 다름
  - 종료하는 태그 X
  - html 문서의 구성요소는 X
- html 태그
  - 속성으로 문서에서 다룰 언어를 지정(필수 속성)
- head
  - 콘텐츠를 표현하는 내용은 없지만 콘텐츠를 표현하기 위한 내용을 포함
  - meta 태그
    - 웹페이지(Web page)의 요약
    - 웹 서버와 웹 브라우저간에 상호 교환되는 정보를 정의
    - 문서가 어떤 내용을 담고 있고, 문서의 키워드는 무엇이며, 누가 만들었는지 등의 문서 자체의 특성을 담고 있음
- title
  - 웹 페이지의 제목을 나타내는 태그
  - 브라우저 탭에서 확인 가능
  - 검색엔진, 웹페이지 북마크에서 제목으로 표시
  - title 태그를 빠트리면 브라우저는 html 문서로 인정하지 않음
- link
  - 외부자원
- body
  - 문서의 본문 영역
  - 웹페이지에 표현되는 콘텐츠를 작성

<br>

##### Web Browsers

- 웹 브라우저의 목적은 html 문서를 읽고 그것들을 잘 보여주기 위함
- 브라우저는 html 태그를 보여주지는 않지만 이를 사용하여 문서를 표시하는 방법을 결정

<br>

##### 그 외

- Hyper Text
  - 텍스트 정보에 대한 접근인 순차적 접근을 뛰어넘는다는 의미
  - 다른 페이지로의 이동
  - 같은 페이지 내의 다른 데이터로의 이동
- markup language
  - 문서를 구조적으로 표시하기 위한 것
  - 정보를 수집하는 검색 엔진에게 정확한 자료를 제공하늠
- 월드와이드웹(www): 인터넷에 연결된 컴퓨터들을 통해 사람들이 정보를 공유할 수 있는 세게적인 정보 공간
