## 47장 에러 처리

### 47.2 try...catch...finally 문

- try : 실행할 코드(에러가 발생할 가능성이 있는 코드)
- catch: try 코드 블록에서 에러가 발생할 경우 실행될 코드, Error 객체가 전달
- finally: 에러 발생과 상관없이 반드시 한번 실행

<br>

### 47.3 Error 객체

Error 생성자 함수는 에러 객체를 생성한다. 인수로 에러를 설명하는 에러 메세지를 전달할 수 있다.

```javascript
const error = new Error('invalid');
```

<br>

에러 객체는 message 프로퍼티와 stack 프로퍼티를 갖는다.

- message: Error 생성자 함수에 인수로 전달한 에러 메시지
- stack: 에러를 발생시킨 콜스택의 호출 정보를 나타내는 문자열

![스크린샷 2023-07-27 오후 8 08 19](https://github.com/na0i/FE-knowledge/assets/77482972/56ed510d-f7f2-4caf-92da-62fc845ad322)

<br>

### 47.4 throw 문

에러 객체를 생성한다고 에러가 발생하는 것은 아니다. 에러를 발생시키려면 try 코드 블록에서 `throw 문`으로 에러 객체를 던져야 한다.

```javascript
const repeat = (n, f) => {
  if (typeof f !== 'function') throw new TypeError('f must be a function');

  for (var i = 0; i < n; i++) {
    f(i);
  }
};

try {
  repeat(2, 1); 
} catch (err) {
  console.error(err); // TypeError: f must be a function
}
```

<br>

### 47.5 에러의 전파

에러는 호출자(caller) 방향으로 전파된다. 즉, 콜 스택의 아래 방향으로 전파된다.

- 실행중인 컨텍스트가 푸시되기 직전에 푸시된 실행 컨텍스트 방향으로 전파된다.

```javascript
const foo = () => {
  throw Error('foo에서 발생한 에러'); // ④
};

const bar = () => {
  foo(); // ③
};

const baz = () => {
  bar(); // ②
};

try {
  baz(); // ①
} catch (err) {
  console.error(err);
}
```

<br>

![스크린샷 2023-07-27 오후 8 12 50](https://github.com/na0i/FE-knowledge/assets/77482972/1e3f822b-1c34-4923-a055-13eec9836551)

<br>

##### 주의할 점

setTimeout이나 프로미스 후속처리 메서드의 콜백 함수는 태스크 큐나 마이크로 태스크큐에 임시 저장되었다가 콜 스택이 비면 이벤트 루프에 의해 콜 스택으로 푸시되어 실행되므로 콜스택이 비어있는 상태이기 때문에 위와 같이 이벤트 전파가 제대로 이루어지지 않을 수 있다.
