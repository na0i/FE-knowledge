### 220510

#### RESTful API 설계하기

##### 참고한 사이트

> https://velog.io/@couchcoding/%EA%B0%9C%EB%B0%9C-%EC%B4%88%EB%B3%B4%EB%A5%BC-%EC%9C%84%ED%95%9C-RESTful-API-%EC%84%A4%EA%B3%84-%EA%B0%80%EC%9D%B4%EB%93%9C

<br>

##### RESTful API

- Representational State Transfer라는 용어의 약자(자원(Resource)을 의미(Representation)로 구분하여 그 상태를 전달)
- REST API는 HTTP Method별로 역할을 명시한게 특징

<br>

##### RESTful API 디자인 가이드

1. URI는 정보의 자원을 표현해야 한다.

```
GET /members/delete/1
- URI는 자원을 표현하는데 중점을 두어야 합니다.
- delete와 같은 행위에 대한 표현이 들어가서는 안됩니다.
```



2. 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE)로 표현한다.

```
DELETE /members/1
GET /members/1
POST /members 
```

<br>

##### URI 설계 시 주의할 점

1) 슬래시 구분자(/)는 계층 관계를 나타내는 데 사용

```null
http://restapi.example.com/houses/apartments
http://restapi.example.com/animals/mammals/whales
```

2) URI 마지막 문자로 슬래시(/)를 포함하지 않는다.

3) 하이픈(-)은 URI 가독성을 높이는데 사용
3) 밑줄(_)은 URI에 사용하지 않는다.
5) URI 경로에는 소문자가 적합하다.
6) 파일 확장자 포함 x