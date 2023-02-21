# HTML

### 2022.04.13 Semantic HTML

<br>

##### 참고한 사이트

> https://www.w3schools.com/html/html5_semantic_elements.asp > https://geonlee.tistory.com/96 > https://velog.io/@syoung125/%EC%8B%9C%EB%A7%A8%ED%8B%B1-%ED%83%9C%EA%B7%B8-Semantic-Tag-%EC%9E%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

<br>

##### Semantic HTML?

- 시맨틱(Semantic) HTML을 직역하면 의미론적 HTML
- 의미론적이란 언어에서 단어와 구절의 의미를 아는 것
- 시맨틱 요소는 브라우저와 개발자 모두에게 의미를 명확히 전달
- semantic 요소: `<form>`, `<table>`, `<article>` 등 내용물에 대해 확실한 정보를 제공
- non-semantic 요소: `<div>`, `<span>` 등 내용물에 대한 어떠한 것도 알려주지 못함

<br>

##### Semantic Tag의 장점

- 검색엔진최적화(SEO)
  - 검색엔진은 태그를 기반으로 페이지 내 검색 키워드의 우선 순위를 판단
  - 제목은 h1, 중요한 단어는 strong 혹은 em을 사용하는 등
- W3C에 따르면 "시맨틱 웹을 사용하면 애플리케이션, 기업 및 커뮤니티에서 데이터를 공유하고 재사용할 수 있다"고 함
- 시각장애가 있는 사용자가 스크린 리더를 사용하여 페이지를 탐색할 때 도움이 됨

<br>

![image](https://user-images.githubusercontent.com/77482972/163098256-f0c5da09-45ae-44f3-b4a8-2c2a610bd92b.png)

<br>

##### `<section>`

- 문서의 어느 한 구역
- 내용의 주제에 따른 그룹핑을 하며, 주로 heading과 같이 쓰입니다

<br>

##### `article`

- 독립된 내용임을 알려줌
- 그 자체로 의미를 가져야하고, 웹 사이트로부터 독립적으로 읽을 수 있어야 함
- 예시: 포럼 글, 블로그 포스트, 신문 기사

<br>

##### `section`과 `article`의 차이점

- section은 문서에서 독립적인 특정 영역, 여러개 콘텐츠의 묶음
- article은 영역 속에서 독립적인 콘텐츠, 그 자체로 독립적 콘텐츠

<br>

##### `header`

- 문서나 섹션의 머릿말을 의미
- 한 문서에서 여러개의 `<header>`를 가질 수 있음

<br>

##### `footer`

- 문서나 섹션의 꼬릿말을 의미
- 포함된 요소에 대한 정보를 담고 있어야 함
- 문서의 저자나 저작권 정보, 사용법을 위한 링크, 연락처 정보(address 태그 사용) 등을 포함
- 한 문서에서 여러개의 `<footer>`를 가질 수 있음

<br>

##### `nav`

- 네비게이션 링크의 집합
- 모든 문서의 링크가 <nav>의 안에 있어야하는 건 아님

<br>

##### `main`

- 문서의 주요 콘텐츠
- 한 페이지에 한 번만 사용 가능

<br>

##### `aside`

- 사이드에 배치되는 경우가 많음

<br>

##### `figure`과 `figurecaption`

- figurecaption: 이미지에 시각적 설명을 추가해주기 위한 목적
- figure: 이미지와 캡션을 묶음

```
<figure>
  <img src="pic_trulli.jpg" alt="Trulli">
  <figcaption>Fig1. - Trulli, Puglia, Italy.</figcaption>
</figure>
```

<br>

##### 그 외

- `strong`, `em`: 강조되는 텍스트(굵게, 기울여서)
- `mark`: 강조에 사용(기본값 yellow)
- `time`: 날짜와 시간
