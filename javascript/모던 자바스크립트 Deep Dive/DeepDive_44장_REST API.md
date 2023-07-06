## 44장 REST API

`REST`는 HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처고, REST API는 REST를 기반으로 서비스 API를 구현한 것을 의미한다. REST 기본 원칙을 성실히 지킨 서비스 디자인을 RESTful이라고 표현한다.

<br>

### 44.1 REST API의 구성

REST API는 자원, 행위, 표현의 3가지 요소로 구성된다.

- 리소스(자원): 자원 → URI(엔드포인트)로 표현
- 행위: 자원에 대한 행위 → HTTP 요청 메서드로 표현
- 표현: 자원에 대한 행위의 구체적 내용 → 페이로드로 표현

<br>

### 44.2 REST API 설계 원칙

##### 1. URI는 리소스를 표현하는 데 집중한다.

리소스를 식별할 수 있는 이름은 동사보다는 **명사**를 사용한다.

<br>

```markdown
bad
GET /getTodos/1
GET /todos/show/1

good
GET /todos/1
```

<br>

##### 2. 행위에 대한 정의는 HTTP 요청 메서드를 통해 한다.

주로 5가지 요청 메서드를 사용해 CRUD를 구현한다.


![스크린샷 2023-07-06 오후 9 08 06](https://github.com/na0i/FE-knowledge/assets/77482972/99d099a2-ac65-4379-bfc2-6731c06ad24a)

리소스에 대한 행위는 HTTP 요청 메서드를 통해 표현하며 URI에 표현하지 않는다.

```markdown
bad
DELETE /todos/delete/1

good
DELETE /todos/1
```

