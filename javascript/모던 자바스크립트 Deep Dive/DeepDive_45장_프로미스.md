## 45장 프로미스

기존 자바스크립트는 비동기 처리를 위한 하나의 패턴으로 콜백 함수를 사용하였으나 이는 

- 가독성이 나쁘고
- 여러 개의 비동기 처리를 한 번에 처리하는 데 한계가 있기 때문에

<br>

ES6에서는 비동기 처리를 위한 또 다른 패턴으로 **프로미스**를 도입했다.

<br>

### 45.1 비동기 처리를 위한 콜백 패턴의 단점

#### 45.1.1 콜백 헬

비동기 함수란 함수 내부에 비동기로 동작하는 코드를 포함한 함수를 말한다. 비동기 함수는 **함수 내부의 비동기로 동작하는 코드가 완료되지 않았다 해도 기다리지 않고 즉시 종료된다.** 따라서, 비동기 함수 내부의 비동기로 동작하는 코드에서 처리 결과를 외부로 반환하거나 상위 스코프 변수에 할당하면 기대한대로 동작하지 않게 된다.

<br>

```javascript
let todos;

const get = url => {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.send();

	xhr.onload = () => {
		if (xhr.status === 200) {
			todos = JSON.parse(xhr.response);
		} else {
		console.error(`${xhr.status} ${xhr.statusText}`);
		}
	};
};

get('https://jsonplaceholder.typicode.com/posts/1');
console.log(todos);
```

xhr.onload 이벤트 핸들러는 load 이벤트가 발생하면 태스크 큐에 저장되어 대기하다가, **콜 스택(실행 컨텍스트 스택)이 비면 이벤트 루프에 의해 콜 스택으로 푸시되어 실행**된다.

<br>

따라서 console.log가 호출되기 전에 load 이벤트가 발생했다고 하더라도 xhr.onload 이벤트 핸들러 프로퍼티에 바인딩한 이벤트 핸들러는 결코 console.log 보다 먼저 실행되지 않는다.

<br>

- 비동기 함수는 비동기 처리 결과를 외부에 반환할 수 없고
- 상위 스코프의 변수에 할당할 수도 없다.
- 따라서, 비동기 함수의 처리 결과에 대한 후속 처리는 비동기 함수 내부에서 수행해야 한다.(보통, 콜백 함수 이용)

<br>

이처럼, 비동기 처리 결과를 위해 콜백 함수 호출이 중첩되고 복잡도가 높아지는 현상을 `콜백 헬`이라 한다.

<br>

```javascript
get('/step1', a => {
	get(`/step2/${a}`, b => {
		get(`/step3/${b}`, c => {
			get(`/step4/${c}`, d => {
				console.log(d);
			});
		});
	});
});
```

<br>

#### 45.1.2 에러 처리의 한계

콜백 패턴의 문제점 중 가장 심각한 것은 **에러 처리가 곤란**하다는 것이다.

<br>

```javascript
try {
	setTimeout(() => { throw new Error('Error!'); }, 1000);
} catch (e) {
	// 에러를 캐치하지 못한다
	console.error('캐치한 에러', e);
}
```

<br>

이와 같은 콜백 헬, 에러 처리 한계를 극복하기 위해 프로미스가 도입되었다.

<br>

### 45.2 프로미스 생성

##### 프로미스 생성
- new 연산자와 함께 Promise 생성자 함수 호출
- Promise는 표준 빌트인 객체
- 비동기 처리를 수행할 콜백 함수를 인수로 전달받는다.
	- 콜백함수는 resolve(성공)와 reject(실패) 함수를 인수로 전달받는다.

<br>

```javascript
const promise = new Promise((resolve, reject) => {
	if (/* 비동기 처리 성공 */) {
		resolve('result');
	} else { /* 비동기 처리 실패 */
		reject('failure reason');
	}
});
```

<br>

#### 프로미스 상태 정보

- `pending`: 비동기 처리 아직 수행되지 않은 상태 → 프로미스가 생성된 직후 기본 상태
- `fulfilled`: 비동기 처리가 수행된 상태(성공) → resolve 함수 호출
- `rejected`: 비동기 처리가 수행된 상태(실패) → reject 함수 호출

<br>

즉, `pending` → `fulfilled` / `rejected` 로 이루어진다.

<br>

##### 프로미스 처리 결과

프로미스는 처리 상태와 더불어 처리 결과도 상태(result)로 갖는다.

<br>

즉, **프로미스는 비동기 처리 상태와 처리 결과를 관리하는 객체다.**

<br>

### 45.3 프로미스 후속 처리 메서드

프로미스는 후속 메서드 `then`, `catch`, `finally`를 제공한다.

- 후속 처리 메서드는 프로미스를 반환하며
- 비동기로 동작한다.

<br>

#### 45.3.1 Promise.prototype.then

`then` 메서드는 `두 개의 콜백 함수`를 인수로 전달받는다.

- 첫번째 콜백함수
	- fulfilled 상태가 되면 호출
	- 처리결과(result)를 전달받는다.
- 두번째 콜백함수
	- rejected 상태가 되면 호출
	- 에러를 인수로 전달받는다.

<br>

then 메서드는 언제나 프로미스를 반환한다.
- then 메서드의 콜백함수가 프로미스를 반환하면 그대로 반환하고
- 프로미스가 아닌 값을 반환하면 그 값을 암묵적으로 resolve / reject 하여 프로미스를 생성해 반환한다.

<br>

#### 45.3.2 Promise.prototype.catch

`catch` 메서드는 `한 개의 콜백 함수`를 인수로 전달받는다.