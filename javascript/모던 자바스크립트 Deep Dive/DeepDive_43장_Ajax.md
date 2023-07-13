## 43장 Ajax

### 43.1 Ajax란?

##### Ajax

Ajax는 자바스크립트를 사용하여 **브라우저가 서버에게 비동기 방식으로 데이터를 요청**하고, **서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 프로그래밍 방식**을 말한다.

- 브라우저에서 제공하는 Web API인 XMLHttpRequest 객체를 기반으로 동작
- Ajax의 등장으로 서버로부터 웹페이지 변경에 필요한 데이터만 비동기 방식으로 전송받아 필요한 부분만 한정적으로 렌더링하는 방식이 가능해졌다.

<br>

##### Ajax의 장점

- 필요한 데이터만 서버로부터 전송받기 때문에 불필요한 데이터 통신이 발생하지 않는다.
- 변경할 필요가 없는 부분은 다시 렌더링하지 않기 때문에 화면이 순간적으로 깜빡이는 현상이 발생하지 않는다.
- 서버와의 통신이 비동기 방식으로 동작하기 때문에 서버에게 요청을 보낸 후 블로킹이 발생하지 않는다.

<br>

### 43.2 JSON

JSON은 **클라이언트와 서버 간의 HTTP 통신을 위한 텍스트 데이터 포맷**이다.

<br>

#### 43.2.1 JSON 표기 방식

JSON은 키와 값으로 구성된 순수한 텍스트다.

- 키: 반드시 큰따옴표로 묶어야 함
- 값: 객체 리터럴과 같은 표기법을 사용할 수 있음

<br>

#### 43.2.2 JSON.stringfy


`직렬화(serializing)`: 클라이언트에서 서버로 객체를 전송하려면 객체를 **문자열화**해야 하는데 이를 직렬화라고 한다. 

<br>

##### JSON.stringfy
- JSON.stringfy 메서드는 객체를 JSON 포맷의 문자열로 변환한다. 
- 객체뿐만 아니라 배열도 JSON 포맷의 문자열로 변환한다.
- 두번째 인수로 filtering, 세번째 인수로 들여쓰기도 가능하다.

<br>

#### 43.2.3 JSON.parse

`역직렬화(deserializing)`: 서버로부터 클라이언트에 전송된 JSON 데이터는 문자열로 이를 객체로 사용하려면 JSON 포맷의 문자열을 객체화해야 한다.

<br>

##### JSON.parse

- JSON 포맷의 문자열을 객체로 변환한다.
- 배열이 JSON 포맷의 문자열로 변환되어 있는 경우 JSON.parse는 문자열을 배열 객체로 변환한다.
- 배열 요소가 객체인 경우 배열 요소까지 객체로 변환한다.

<br>

### 43.3 XMLHttpRequest

자바스크립트를 사용하여 HTTP 요청을 전송하려면 `XMLHttpRequest` 객체를 사용한다. 

<br>

#### 43.3.1 XMLHttpRequest 객체 생성

XMLHttpRequest 생성자 함수를 호출하여 생성한다. 

> XMLHttpRequest 객체는 Web API이므로 브라우저 환경에서만 정상적으로 실행된다.

```javascript
const xhr = new XMLHttpRequest();
```

<br>

#### 43.3.2 XMLHttpRequest 객체의 프로퍼티와 메서드

![스크린샷 2023-07-05 오후 10 22 44](https://github.com/na0i/FE-knowledge/assets/77482972/236577bc-79e7-4781-aebb-cea729c17cdd)
![스크린샷 2023-07-05 오후 10 22 53](https://github.com/na0i/FE-knowledge/assets/77482972/c44724a6-d558-43c8-a0db-33bc98991d25)
![스크린샷 2023-07-05 오후 10 23 01](https://github.com/na0i/FE-knowledge/assets/77482972/496fccbe-f0a4-41d2-8cda-63e1cc0fd91d)

<br>

#### 43.3.3 HTTP 요청 전송

1. XMLHttpRequest.prototype.open 메서드로 HTTP 요청을 초기화
2. (선택) XMLHttpRequest.prototype.setRequestHeader 메서드로 HTTP 요청의 헤더 값을 설정
3. XMLHttpRequest.prototype.send 메서드로 HTTP 요청을 전송

<br>

`open` → `(header 설정)` → `send`

<br>

```javascript
const xhr = new XMLHttpRequest();

xhr.open('GET', '/users'); // 1
xhr.setRequestHeader('content-type', 'application/json'); // 2
xhr.send(); // 3
```

<br>

##### XMLHttpRequest.prototype.open

open 메서드는 서버에 전송할 HTTP 요청을 초기화한다.

<br>

`xhr.open(method, url[, async])`

- method: HTTP 요청 메서드(GET, POST, PUT, DELETE)
- url: HTTP 요청을 전송할 URL
- async: 비동기 요청 여부, 기본값은 true

<br>

##### XMLHttpRequest.prototype.send

send 메서드는 open 메서드로 초기화된 HTTP 요청을 서버에 전송한다. 

- send 메서드는 요청 몸체에 담아 전송할 데이터(payload)를 인수로 전달할 수 있다.
- payload가 객체인 경우 반드시 JSON.stringfy 메서드를 사용해 직렬화한 후 전달한다.
- **GET 메서드의 경우 payload로 전달된 인수는 무시된다.**
	- GET 메서드는 데이터를 URL 일부(쿼리)로 서버에 전송한다.
	- POST 메서드는 payload로 서버에 데이터를 전송한다.

<br>

##### XMLHttpRequest.prototype.setRequestHeader

setRequestHeader 메서드는 특정 HTTP 요청의 헤더 값을 설정한다.

- 반드시 open 메서드를 호출한 이후 호출한다.
- Content-type: 요청 몸체에 담아 전송할 데이터의 MIME 타입의 정보를 표현
	- ![스크린샷 2023-07-05 오후 10 34 10](https://github.com/na0i/FE-knowledge/assets/77482972/49a925eb-4d57-4bf9-96f5-286df16dfb57)
- Accept: 서버가 응답할 데이터의 MIME 타입을 지정
	- 설정하지 않으면 Accept 헤더가 `*/*`으로 전송된다.


> **MIME(Multipurpose Internet Mail Extensions)**

> 이메일과 함께 동봉할 파일을 텍스트 문자로 전환해서 이메일 시스템을 통해 전달하기 위해 개발되었다.
> - ASCII만으로 전송이 불가능한 바이너리 파일들(음악, 영상, 워드 등)을 텍스트 파일로 변환이 필요하게 되었는데(인코딩)
> - MIME로 인코딩한 파일은 Content-type 정보를 파일 앞 부분에 담게 된다.

<br>

#### 43.3.4 HTTP 응답 처리

서버가 전송한 응답을 처리하려면 XMLHttpRequest 객체가 발생시키는 이벤트를 캐치해야 한다. 

- readyState(HTTP 요청의 현재 상태를 나타냄) 프로퍼티 값이 변경된 경우 발생하는 readystatechange 이벤트를 캐치해 HTTP 응답을 처리할 수 있다.
- load 이벤트(HTTP 요청이 성공적으로 완료된 경우 발생)를 캐치해도 된다. 