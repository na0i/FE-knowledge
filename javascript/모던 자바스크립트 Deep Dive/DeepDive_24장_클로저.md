## 24장 클로저

##### MDN 내 클로저 정의

> 클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.

<br>

### 24.1 렉시컬 스코프

##### 렉시컬 스코프란?

> 자바스크립트 엔진은 **함수를 어디서 호출했는지가 아니라 함수를 어디에 정의했는지에 따라 상위 스코프를 결정**한다. "외부 렉시컬 환경에 대한 참조"에 저장할 참조값인 상위 스코프는 함수가 정의된 위치에 의해 결정된다는 것이다.

<br>

### 24.2 함수 객체의 내부 슬롯 [[Environment]]

함수가 정의되는 위치와 함수가 호출되는 위치는 다를 수 있기 때문에 상위 스코프(함수 정의가 위치하는 스코프)를 반드시 기억해야 한다. 이를 위해 함수는 내부 슬롯 `[[Environment]]`에 상위 스코프를 저장한다.
<br>

함수 정의가 평가되어 함수 객체를 생성하는 시점은, 상위 함수가 평가 또는 실행되는 시점이기 때문에 **`[[Environment]]`에 저장된 상위 스코프의 참조는 현재 실행 중인 실행 컨텍스트의 렉시컬 환경**을 

<br>

**예시**

1. 전역에서 정의된 함수 선언문의 경우
	- 전역 코드가 평가되는 시점에 함수 객체를 생성
	- 이 때 생성된 함수 객체의 내부 슬롯 `[[Environment]]`에는 전역 렉시컬 환경의 참조가 저장

2. 함수 내부에서 정의된 함수 표현식의 경우
	- 외부 함수가 실행되는 시점에 평가되어 함수 객체를 생성
	- 이 때 생성된 함수 객체의 내부 슬롯 `[[Environment]]`에는 외부 함수 렉시컬 환경의 참조가 저장

<br>

**`[[Environment]]`에 저장한 렉시컬 환경의 스코프 = 함수 자신이 호출되었을 때 생성될 함수 렉시컬 환경의 "외부 렉시컬 환경에 대한 참조" = 상위스코프**

<br>

##### 예시

```javascript
const x = 1;

function foo() {
	const x = 10;
	bar();
}

function bar() {
	console.log(x);
}

foo(); // 1
bar(); // 1
```

- 함수 foo와 bar는 전역에 정의된 함수 선언문이다.
- 따라서 함수 foo와 bar의 내부 슬롯 `[[Environment]]`에 전역 렉시컬 환경의 참조가 저장된다.
- 실행 순서에 따라 전역 코드가 먼저 실행된다.
- 함수 foo 실행 도중 함수 bar가 실행된다.
	- 함수 bar는 스코프 체인을 따라 변수 x를 검색하고
	- 외부 렉시컬 환경에 대한 참조가 전역 렉시컬 환경이고
	- x를 전역 렉시컬 환경에서 발견한다.
	- 1을 출력한다.
- 함수 bar가 실행되고 똑같이 1을 출력한다.

<br>

### 24.3 클로저와 렉시컬 환경

##### 클로저
외부 함수보다 중첩 함수가 더 오래 유지되는 경우, 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있고, 이 때 이러한 중첩 함수를 클로저라고 부른다.

##### 예시

```javascript
const x = 1;

function outer() {
	const x = 10;
	const inner = function () { console.log(x); };
	return inner;
}

const innerFunc = outer();
innerFunc(); // 10
```

<img width="501" alt="스크린샷 2023-02-15 오후 12 41 36" src="https://user-images.githubusercontent.com/77482972/218923267-f17f2881-e4fa-47a7-9bbb-e8c24dfa5709.png">


→ outer 함수 호출<br>
→ outer 함수 렉시컬 환경 생성<br>
→ 중첩함수 inner 평가<br>
→ outer 함수의 렉시컬 환경을 상위 스코프로 저장<br>
→ outer 함수 실행이 종료되고 outer 함수의 실행 컨텍스트가 실행 컨텍스트 스택에서 제거됨<br>
→ 하지만 **outer 함수의 렉시컬 환경은 inner 함수의 [[Environment]] 내부 슬롯에 의해 참조되고 있고, inner 함수는 전역 변수 innerFunc에 의해 참조되고 있으므로** 가비지 컬렉션의 대상이 되지 않는다.<br>
> 가비지 컬렉터는 누군가 참조하고 있는 메모리 공간을 함부로 해제하지 않는다.

→ 이 때 inner 함수를 호출하면 inner 함수의 실행 컨텍스트가 생성되고 실행 컨텍스트 스택에 푸시된다.<br>
→ inner 함수 객체의 [[Environment]] 내부 슬롯에 저장되어 있는 참조값이 외부 렉시컬 환경에 대한 참조 값으로 할당된다.<br>
→ 중첩함수 inner가 outer 함수보다 오래 생존<br>
> 외부 함수의 생존 여부와 관계 없이 자신이 정의된 의치에 의해 상위 스코프를 기억하고 상위 스코프의 식별자를 참조할 수 있다.

<br>

위 예시처럼 중첩 함수가 외부 함수보다 오래 살아 남은 경우를 클로저라고 한다. 하지만, 일반적으로 상위 스코프를 참조하는 중첩 함수를 식별자라고 한다.

<br>

##### 클로저가 아닌 예시 1
```javascript
function foo() {
	const x = 1;
	const y = 2;
	
	function bar() {
		const z = 3;
	
		debugger; // this: Window
		console.log(z);
	}
	
	return bar;
}

const bar = foo();
bar();
```

위 예시에서 bar 함수는 foo 함수보다 오래 유지됐지만 foo 함수의 어떤 식별자도 참조하지 않고, 이런 경우 대부분의 모던 브라우저는 최적화를 통해 상위 스코프를 기억하지 않는다. 따라서, bar 함수는 클로저라고 할 수 없다.

<br>

##### 클로저가 아닌 예시 2
```javascript
function foo() {
	const x = 1;
	
	function bar() {
		debugger;
		console.log(x);
	}

	bar();
}

foo();
```

위 예시의 bar 함수는 상위 스코프의 식별자를 참조하는 클로저였지만 곧바로 소멸해 외부 함수보다 일찍 소멸하기 때문에 일반적으로 클로저라고 하지 않는다. 생명 주기가 종료된 외부 함수의 식별자를 참조할 수 있다는 클로저의 본질에 부합하지 않는다.

<br>

**클로저는 중첩 함수가 상위 스코프의 식별자를 참조하고 있고, 중첩 함수가 외부 함수보다 더 오래 유지되는 경우에 한정하는 것이 일반적**이다. 다만, 모던 브라우저는 최적화를 통해 상위 스코프의 식별자 중 클로저가 참조하고 있는 식별자만을 기억한다.

<br>

- 자유 변수: 클로저에 의해 참조되는 상위 스코프의 변수
- 클로저: 함수가 자유 변수에 대해 닫혀 있다 = 자유 변수에 묶여있는 함수

<br>

### 24.4 클로저의 활용

**클로저는 상태를 안전하게 변경하고 은닉하기 위해 사용한다.** 상태가 의도치 않게 변경되지 않도록 상태를 안전하게 은닉하고, 특정 함수에게만 상태 변경을 허용하기 위해 사용한다.

<br>

##### 좋지 않은 예시

```javascript
let num = 0;

const increase = function () {
	return ++num;
}

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```

##### 위 코드가 가질 수 있는 문제점
- num 값이 increase 함수 호출 전까지 변경되지 않고 유지되는가
- num 값은 increase 함수만이 변경할 수 있는가

<br>

##### 좋은 예시

```javascript
const increase = (function() {
	let num = 0;
	
	return function () {
		return ++num;
	};
}());

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```

즉시 실행 함수는 호출 된 이후 즉시 소멸하지만, 한 번만 실행되므로 num 변수가 재차 초기화될 일은 없을 것이다.

<br>

이처럼 **클로저는 상태를 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하여 상태를 안전하게 변경하고 유지하기 위해 사용한다.**

<br>

##### 생성자 함수를 사용한 예시

```javascript
const Counter = (function() {
	let num = 0;
	// 인스턴스를 통해 접근할 수 없으며
	// 즉시 실행 함수 외부에서도 접근할 수 없는 은닉된 변수

	Counter.prototype.increase = function() {
		return ++num;
	};
      
	Counter.prototype.decrease = function() {
		return --num;
	};
	// increase와 descrease 메서드는 자신이 정의된 위치를 기억하기 때문에
	// num을 참조할 수 있다.
      
	return Counter;
}());

const counter = new Counter();

console.log(counter.increase()); // 1
console.log(counter.decrease()); // 1
```

<br>

##### 함수형 프로그래밍에서 사용하는 예시

```javascript
// 함수를 인수로 전달받고 함수를 반환하는 고차 함수
function makeCounter(aux) {
	let counter = 0;
      
	return function() {
		counter = aux(counter);
		return counter;
	};
}
  
function increase(n) {
	return ++n;
}
  
function decrease(n) {
	return --n;
}
  
const increaser = makeCounter(increase);
const decreaser = makeCounter(decrease);
  
console.log(increaser()); // 1
console.log(increaser()); // 2
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

위 예시와 같이 makeCounter를 두번 호출하게 되면 increaser과 decreaser은 각각 다른 렉시컬 환경을 갖게 되고, 자유 변수 counter 를 공유하지 않아 증감이 연동되지 않는다.
<br>

![image](https://user-images.githubusercontent.com/77482972/175249266-1e9b3366-47b6-4952-8e5b-6926d954c3ab.png)

<br>

즉, 렉시컬 환경을 공유하는 클로저를 만들어야 한다.

<br>

##### 올바른 예시

```javascript
const counter = (function(){
	let counter = 0;
      
	return function(aux) {
		counter = aux(counter);
		return counter;
	};
}());
  
function increase(n) {
	return ++n;
}
  
function decrease(n) {
	return --n;
}
  
console.log(counter(increase)); // 1
console.log(counter(decrease)); // 0
```

<br>

### 24.5 캡슐화와 정보 은닉

##### 캡슐화
객체의 상태를 나타내는 **프로퍼티**와 프로퍼티를 참조하고 조작할 수 있는 동작인 **메서드**를 **하나로 묶는 것**

<br>


##### 정보 은닉
- 캡슐화가 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용되기도 하는데 이를 정보 은닉이라고 한다.
- 객체의 상태가 변경되는 것을 방지해 정보를 보호하고
- 객체간의 상호 의존성을 낮추는 효과가 있다.

<br>

```
const Person = (function (){
	let _age = 0; // private

	// 생성자 함수
	function Person(name, age){
		this.name = name; // public
		_age = age;
	}

	Person.prototype.sayHi = function () {
		console.log(`My Name is ${this.name}. I am ${_age}`);
	}
	
	return Person;
}());


const me = new Person('Lee', 20); 
me.sayHi(); // Hi! My name is Lee. I am 20.
console.log(me.name); // Lee
console.log(me._age); // undefined


const you = new Person('Kim', 30);
you.sayHi(); // Hi! My name is Kim. I am 30.
console.log(you.name); // Kim
console.log(you._age); // undefined

me.sayHi(); // Hi! My name is Lee. I am 30.
```

- 생성자 함수 Person과 Person.prototype.sayHi 메서드는 즉시 실행 함수가 종료된 이후 호출되고 소멸하지만, 지역변수 _age를 참조할 수 있는 클로저이다.
- 하지만 마지막 me.sayHi()에서 30이 출력된 것처럼 지역변수 _age의 값이 유지되지 않는다는 문제가 있다.

<br>

### 24.6 자주 발생하는 실수

![스크린샷 2023-02-16 오전 8 20 07](https://user-images.githubusercontent.com/77482972/219214440-4b278e4f-6941-4190-a4f8-c011feb1b722.png)

위 예시에서 for 문의  변수 선언문에서 var 키워드로 선언한 i 변수는 **함수 레벨 스코프**를 따르기 때문에 전역 변수이고, 따라서 3이 출력된다. 따라서, for 문의 변수 선언문에서 let 키워드를 사용한다면 해결된다. let 키워드로 선언한 변수는 for문의 코드 블록이 반복 실행될 때마다 for문 코드 블록의 새로운 렉시컬 환경이 생성되기 때문이다.

![스크린샷 2023-02-16 오전 8 23 43](https://user-images.githubusercontent.com/77482972/219215191-076a24d8-2f7c-465e-a6cb-5326709ae2c6.png)


