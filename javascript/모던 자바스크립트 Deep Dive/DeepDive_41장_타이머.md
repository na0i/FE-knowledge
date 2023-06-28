## 41장 타이머

### 41.1 호출 스케줄링

##### 호출 스케줄링이란?

함수를 일정 시간이 경과된 이후에 호출되도록 함수 호출을 예약하는 타이머 함수를 사용하는 것을 호출 스케줄링이라 한다. 자바스크립트는 타이머를 생성하는 `setTimeout`과 `setInterval`, 타이머를 제거하는 `clearTimeout`과 `clearInterval`을 제공한다.

<br>

타이머함수는 ECMAScript에 정의된 빌트인 함수는 아니지만 브라우저 환경과 Node.js 환경에서 모두 전역 객체의 메서드로 사용할 수 있는 호스트 객체다.

<br>

##### setTimeout과 setInterval

setTimeout과 setInterval은 일정 시간 경과된 이후 **콜백 함수가 호출되도록 타이머를 생성**한다. 즉, 타이머가 만료되면 콜백 함수가 호출된다.

- setTimeout: (타이머가 만료되면) 콜백 함수를 단 한 번 호출
- setInterval: (타이머가 만료될 때마다) 콜백 함수를 반복 호출

<br>

자바스크립트 엔진은 싱글 스레드로 동작하기 때문에 setTimeout과 setInterval은 비동기로 동작한다.

> 자바스크립트 엔진은 단 하나의 실행 컨텍스트 스택을 갖기 때문에 두 가지 이상의 태스크를 동시에 실행할 수 없다.

<br>

### 41.2 타이머 함수

#### 41.2.1 setTimeout/clearTimeout

setTimeout 함수는 `두 번째 인수로 전달받은 시간`으로 **단 한 번 동작하는 타이머**를 생성한다. 타이머가 만료되면 `첫 번째 인수로 전달받은 콜백 함수`가 호출된다.

<br>

##### 매개변수
- func: 타이머가 만료된 뒤 호출될 콜백 함수
- delay: 타이머 만료 시간(ms 단위), 생략할 경우 기본값은 0
- parms: 콜백 함수에 전달해야할 인수가 존재하는 경우 3번째 이후의 인수로 전달 가


<br>

##### 특징
- setTimeout은 생성된 타이머를 식별할 수 있는 고유한 타이머 id를 반환한다.
	- 브라우저 환경인 경우 id는 숫자
	- Node.js 환경인 경우 id는 객체
- setTimeout 함수가 반환한 id를 clearTimeout 함수의 인수로 전달하여 타이머를 취소할 수 있다.


<br>

##### 예시
```javascript
setTimeout(name => console.log(`Hi! ${name}.`), 1000, 'Lee');

const timerId = setTimeout(() => console.log('Hi!'), 1000);
clearTimeout(timerId);
```

<br>

#### 41.2.2 setInterval/clearInterval

setInterval 함수는 `두 번째 인수로 전달받은 시간`으로 **반복 동작하는 타이머**를 생성한다. 타이머가 만료될 때마다 첫 번째 인수로 전달받은 콜백 함수가 반복 호출된다.

<br>

##### 매개변수
- setTimeout과 동일하다.

<br>

##### 특징
- setInterval 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 id를 반환한다.
	- 브라우저 환경인 경우 id는 숫자
	- Node.js 환경인 경우 id는 객체
- setInterval 함수가 반환한 id를 clearInterval 함수의 인수로 전달하여 타이머를 취소할 수 있다.

<br>

### 41.3 디바운스와 스로틀

scroll, resize, input, mousemove 같은 이벤트는 짧은 시간 간격으로 연속해서 발생하므로 과도하게 호출되어 성능에 문제를 일으킬 수 있다.

<br>

`디바운스`와 `스로틀`은 **이벤트를 그룹화해서 과도한 이벤트 핸들러의 호출을 방지하는 프로그래밍**이다.


<br>

#### 41.3.1 디바운스

디바운스는 짧은 시간 간격으로 이벤트가 연속해서 발생하면 이벤트 핸들러를 호출하지 않다가 일정 시간이 경과한 이후에 이벤트 핸들러가 한 번만 호출되도록 한다.

![스크린샷 2023-06-28 오후 10 38 29](https://github.com/na0i/Algorithm-study/assets/77482972/6dddb076-58a6-4eaf-8f3e-5a227a16ef52)


<br>

```javascript
const debounce = (callback, delay) => {
	let timerId;

	return event => {
        // delay가 경과하기 이전에 이벤트가 발생하면 이전 타이머를 취소
		if (timerId) clearTimeout(timerId);
		timerId = setTimeout(callback, delay, event);
	};
};

$input.oninput = debounce(e => {
	$msg.textContent = e.target.value;
}, 300);
```

> timerId가 undefined로 계속 생성되는건 아닌가? 정확한 동작 방식을 물어보자

<br>

delay보다 짧은 간격으로 이벤트가 발생하면 이전 타이머를 취소하고 새로운 타이머를 재설정한다.

<br>

resize 이벤트 처리, input 요소에 입력된 값으로 ajax 요청, 버튼 중복 클릭 방지 처리 등에 유용하게 쓰이며 실무에서는 Underscore나 Lodash의 debounce 함수를 사용하는 것을 권장한다.

<br>

#### 41.3.2 스로틀

스로틀은 짧은 시간 간격으로 이벤트가 연속해서 발생하더라도 일정 시간 간격으로 이벤트 핸들러가 최대한 한 번만 호출되게 한다.

![스크린샷 2023-06-28 오후 10 38 49](https://github.com/na0i/Algorithm-study/assets/77482972/e2c3205f-c202-4733-beec-167d27279143)

<br>

```javascript
const throttle = (callback, delay) => {
	let timerId;

	return event => {
		// delay가 경과하기 이전에 이벤트가 발생하면 아무것도 하지 않다가
        // delay가 경과했을 때 이벤트가 발생하면 새로운 타이머를 재설정한다.
		if (timerId) return;
		timerId = setTimeout(() => {
			callback(event);
			timerId = null;
		}, delay, event);
	};
};

$container.addEventListener('scroll', throttle(() => {
	$throttleCount.textContent = ++throttleCount;
}, 100));
```

<br>

delay 시간이 경과하기 이전에 이벤트가 발생하면 아무것도 하지 않다가 delay 시간이 경과했을 때 이벤트가 발생하면 콜백함수를 호출하고 새로운 타이머를 재설정한다. 따라서 delay 시간 간격으로 콜백 함수가 호출된다.

<br>

scroll 이벤트나 무한 스크롤 UI 구현에 유용하게 쓰이며 실무에서는 Underscore나 Lodash의 throttle 함수를 사용하는 것을 권장한다.
