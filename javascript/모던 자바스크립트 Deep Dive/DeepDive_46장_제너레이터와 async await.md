## 46장 제너레이터와 async/await

### 46.1 제너레이터란

ES6에 도입된 제너레이터는 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수다.

##### 제너레이터 특징

- 함수 호출자에게 함수 실행의 제어권을 양도 가능하다.

> 일반 함수는 함수가 호출되면 제어권이 함수로 넘어가고 함수를 일괄 실행하므로 함수 실행을 제어할 수 없다. 하지만, 제너레이터는 함수 실행을 일시 중지시키거나 재개시킬 수 있다. **즉, 함수 제어권을 함수 호출자에게 양도할 수 있다.**

- 함수 호출자와 함수 상태를 주고받을 수 있다.

> 일반 함수는 함수 코드를 일괄 실행 후 결과값을 함수 외부로 반환하므로 실행 도중에 함수 외부에서 내부로 값을 전달하여 함수의 상태를 변경할 수 없다. 하지만 제너레이터는 함수 호출자에게 상태를 전달할 수 있고 함수 호출자로부터 상태를 전달받을 수도 있다.

- 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.

> 제너레이터 함수를 호출하면 함수 코드를 실행하는 것이 아니라 제너레이터 객체를 반환한다.

<br>

### 46.2 제너레이터 함수의 정의

- 제너레이터 함수는 `function*` 키워드로 선언한다. 
	- `*`의 위치는 function 키워드와 함수 이름 사이라면 상관 없다.
	- 하지만 일관성을 위해 function 키워드 바로 뒤에 붙이는 것이 권장된다.
- 하나 이상의 `yield` 표현식을 포함한다.
- new 연산자와 함께 생성자 함수로 호출할 수 없다.
- 화살표 함수로 정의할 수 없다.

```javascript
function* genDecFunc() {
	yield 1;
}
```

<br>

### 46.3 제너레이터 객체

제너레이터 함수를 호출하면 제너레이터 객체를 생성해 반환한다.

- 제너레이터 객체는 이터러블이면서 이터레이터다.
- 제너레이터는 이터레이터의 next 메서드뿐만 아니라 이터레이터에 없는 return, throw 메서드를 갖는다.
	- next 메서드를 호출하면 yield 표현식까지 코드 블록을 실행하고 이터레이터 리절트 객체를 반환한다.(value: yield된 값 / done: false)
	- return 메서드를 호출하면 이터레이터 리절트 객체를 반환한다.(value: 인수로 전달받은 값 / done: true)
	- throw 메서드를 호출하면 이터레이터 리절트 객체를 반환한다.(value: undefined / done: true)

<br>

```javascript
function* genFunc() {
	try {
		yield 1;
		yield 2;
		yield 3;
	} catch (e) {
		console.error(e);
	}
}

const generator = genFunc();

console.log(generator.next()); // {value: 1, done: false}
console.log(generator.return('return')); // {value: 'return', done: true}
console.log(generator.throw('Error')); {value: undefined, done: true}
```

<br>

### 46.4 제너레이터의 일시 중지와 재개

제너레이터는 `yield 키워드`, `next 메서드`로 실행을 일시 중지했다가 필요한 시점에 다시 재개할 수 있다.

- next 메서드를 호출하면 제너레이터 함수의 코드 블록을 실행한다.
- yield 키워드는 제너레이터 함수의 실행을 일시 중지시키거나 yield 키워드 뒤에 오는 표현식 평과 결과를 제너레이터 함수 호출자에게 반환한다.
- next 메서드를 반복 호출하여 yield 표현식까지 실행과 일시중지를 반복한다.
- 제너레이터 객체의 next 메서드에 전달한 인수는 제너레이터 함수의 yield 표현식을 할당받는 변수에 할당된다.

![스크린샷 2023-07-24 오후 7 21 17](https://github.com/TFrontend/rg-news/assets/77482972/23cb5ba7-63bd-49c4-87c2-d6d71d1464e5)


```javascript
function* genFunc() {
	try {
		yield 1;
		yield 2;
		yield 3;
	} catch (e) {
		console.error(e);
	}
}

const generator = genFunc();

console.log(generator.next()); // {value: 1, done: false}
console.log(generator.next()); // {value: 2, done: false}
console.log(generator.next()); // {value: 3, done: false}
console.log(generator.next()); // {value: undefined, done: true}
```

```
function* genFunc() {
  const x = yield 1;
  const y = yield (x + 10);
  return x + y;
}


const generator = genFunc(0);

let res = generator.next(); // 처음 호출하는 next 메서드에는 인수를 전달하지 않는다(전달해도 무시된다)
console.log(res); // {value: 1, done: false}

res = generator.next(10); // 10은 x에 할당
console.log(res); // {value: 20, done: false}

res = generator.next(20); // 20은 y에 할당
console.log(res); // {value: 30, done: true}
```

<br>

### 46.6 async/await

`async/await`은 프로미스를 기반으로 동작한다. 

<br>

#### 46.6.1 async 함수

- await 키워드는 반드시 async 함수 내부에서 사용해야 한다.
- async 함수는 async 키워드를 사용해 정의하며 언제나 프로미스를 반환한다.

<br>

#### 46.6.2 await 키워드

- await 키워드는 프로미스가 settled 상태가 될 때까지 대기하다가
- settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환한다.
- 즉 다음 실행을 일시 중지 시켰다가 프로미스가 settled 상태가 되면 다시 재개한다.

<br>

#### 46.6.3 에러 처리

async/await에서 에러 처리는 `try...catch` 문을 사용할 수 있다.