## 26장 ES6 함수의 추가 기능

### 26.1 함수의 구분

ES6 이전의 함수는 동일한 함수라도 다양한 형태로 호출할 수 있다. 

```javascript
var foo = function () {
	return 1;
};

// 일반적인 함수로서 호출
foo();

// 생성자 함수로서 호출
new foo();

// 메서드로서 호출
var obj = { foo: foo };
obj.foo();
```

ES6 이전의 함수는 일반 함수로서 호출할 수도 있고 생성자 함수로도 호출할 수 있다. 즉, 일반 함수, 생성자 함수, 메서드 모두가 callable이면서 constructor다.

> callable: 호출할 수 있는 함수 객체<br>
constructor: 인스턴스를 생성할 수 있는 함수 객체

<br>

> 일반함수의 this: 전역, 메서드의 this: 메서드를 호출한 대상, 화살표함수 this: 자체적인 this 갖지 않음(상위 스코프의 this)

<br>

생성자 함수가 아닌 함수가 constructor라는 것은 prototype 프로퍼티를 가지며, 프로토타입 객체도 생성한다는 것을 의미하므로 성능 면에서 문제가 있다. 콜백 함수도 마찬가지로 constructor이기 때문에 불필요한 프로토타입 객체를 생성한다.

<br>

이처럼 ES6 이전의 함수는 사용 목적에 따라 명확한 구분이 없어 호출 방식에 제약이 없고 생성자 함수로 호출되지 않아도 프로토타입 객체를 생성한다. 이는 혼란스럽고, 실수를 유발할 가능성이 있으며, 성능에도 좋지 않다.

<br>

이를 해결하기 위해 ES6에서는 함수를 목적에 따라 3가지로 명확히 구분했다.

![스크린샷 2023-03-02 오후 5 19 33](https://user-images.githubusercontent.com/77482972/222371307-de09c5da-3d94-45e2-a067-548f793110ef.png)

- 일반 함수: 함수 선언문 혹은 함수 표현식으로 정의한 함수
- ES6 이전의 메서드와 ES6 이후의 메서드와 화살표 함수는 차이가 있음
- 일반 함수는 constructor
- ES6의 메서드와 화살표 함수는 non-constructor

<br>

### 26.2 메서드

일반적으로 메서드는 객체에 바인딩된 함수를 일컬었지만 ES6 사양에서 메서드는 이제 **메서드 축약 표현으로 정의된 함수**만을 의미한다.

```javascript
const obj = {
	x: 1,
	foo() { return this.x } // 메서드
	bar: function() { return this.x } // 일반 함수(메서드 x)
}
```

<br>

##### 메서드 특징(ES6 기준)
- 인스턴스를 생성할 수 없는 non-constructor
- 따라서 생성자 함수로 호출할 수 없다.
- 인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고 프로토타입도 생성하지 않음
- 표준 빌트인 객체도 마찬가지: 프로토타입 메서드와 정적 메서드 모두 non-constructor
- 자신을 바인딩한 객체를 가리키는 내부 슬롯 `[[HomeObject]]`를 가짐
- super 참조는 내부 슬롯 `[[HomeObject]]`를 사용해 수퍼클래스의 메서드를 참조하므로 super 키워드 사용 가능

```javascript
const base = {
	name: "Lee",
	sayHi() {
		return `Hi! ${this.name}`
	}
};

const derived1 = {
	__proto__: base,
	sayHi() {
		return `${super.sayHi()}`
	}
}

const derived2 = {
	__proto__: base,
	sayHi: function() {
		return `${super.sayHi()}`
	}
}
```

위 예시에서 derived2는 derived1과 달리 정상 작동하지 않는다. ES6 메서드가 아닌 함수는 내부 슬롯 `[[HomeObject]]`를 갖지 않기 때문이다. 따라서 메서드 정의 시 익명 함수 표현식을 할당하는 방식은 권장되지 않는다.

<br>

### 26.3 화살표 함수

화살표 함수는 function 키워드 대신 화살표 `=>` 를 사용하여 간략하게 함수를 정의할 수 있으며, 화살표 함수는 내부 동작 또한 기존 함수보다 간략하다. 

<br>

#### 26.3.1 화살표 함수 정의

##### 함수 정의
- 화살표 함수는 함수 표현식으로 정의해야한다.
- 호출 방식은 기존과 동일하다.

##### 매개변수 선언
- 매개변수가 여러 개인 경우 소괄호 안에 매개변수를 선언한다.

##### 함수 몸체 정의
- 함수 몸체가 하나의 문으로 구성된다면 중괄호를 생략할 수 있다.
- 함수 몸체 내부 문이 표현식인 문이라면 암묵적으로 반환된다.
- 함수 몸체가 하나의 문이더라도 몸체의 문이 표현식이 아닌 문이라면 중괄호를 생략할 수 없다.
- 객체 리터럴을 반환하는 경우 소괄호로 감싸준다.
- 함수 몸체가 여러 개의 문으로 구성된다면 중괄호를 생략할 수 없다.
- 반환값이 있다면 명시적으로 반환한다.
- 즉시 실행 함수로 사용할 수 있다.
- 화살표 함수도 일급 객체이므로 고차 함수에 인수로 전달 가능하다.

```javascript
const arrow = () => const x = 1; // SyntaxError

const arrow = () => { const x = 1; } // 표현식이 아닌 문은 중괄호 필수

const create = (id, content) => ({id, content}); 객체 리터럴 반환

const person = ( name => ({
	sayHi() { return `Hi ${name}` }
}))('Lee'); // 즉시 실행 함수

[1, 2, 3].map(v => v * 2); // 고차 함수에 인수로 전달 가능
```

<br>

#### 26.3.2 화살표 함수와 일반 함수의 차이

##### 1. 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor다.

화살표 함수는 인스턴스를 생성하지 않으므로 prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.

```javascript
const Foo = () => {};
new Foo(); // TypeError
Foo.hasOwnProperty('prototype'); // false
```

<br>

##### 2. 중복된 매개변수 이름을 선언할 수 없다.

일반 함수는 중복 선언해도 에러가 발생하지 않는다.

```javascript
function normal (a, a) { return a + a };
const arrow = (a, a) => a + a; // SyntaxError
```

<br>

##### 3. 화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않는다.

화살표 함수 내부에서 this, arguments, super, new.target를 참조하면, 화살표 함수 내부에는 존재하지 않기 때문에 가장 가까운 상위 스코프의 this, arguments, super, new.target을 참조하게 된다.

> 화살표 함수 내 화살표 함수일 경우 화살표 함수가 아닌 가장 가까운 상위 함수 중에서 참조하게 된다.

<br>

#### 26.3.3 this

화살표 함수가 일반 함수가 구별되는 가장 큰 특징이 this다. 화살표 함수의 this는 **콜백 함수 내부의 this가 외부 함수 this와 다르기 때문에 발생하는 문제를 해결하기 위해** 의도적으로 설계된 것이다.

> this 바인딩은 함수의 호출 방식에 의해 동적으로 결정된다. 즉, 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 결정된다.

##### 예시

```javascript
class Prefixer {
	constructor(prefix) {
		this.prefix = prefix;
	}

	add(arr) {
		// 1
		return arr.map(function (item) {
			// TypeError
			return this.prefix + item; // 2
		});
	}
}

const prefixer = new Prefixer('webkit');
console.log(prefixer.add['transition', 'user-select']);
```

위 예시에서 TypeError가 나는 이유는 1과 달리(1에서 this는 메서드를 호출한 객체 = prefixer) 2에서 this는 undefined를 가리키기 때문이다. 이러한 문제가 **콜백 함수 내부의 this 문제(콜백 함수의 this와 외부 함수의 this가 같지 않음)** 이다.

<br>

> 일반 함수로서 호출되는 함수 내부의 this는 전역 객체를 가리킨다. 그러나 클래스 내부는 암묵적으로 strict mode가 적용되어 strict mode 내 일반 함수로 호출되는 함수 내부의 this는 undefined가 바인딩된다. 

<br>

##### 콜백 함수 내부의 this 문제를 해결하기 위한 방법(ES6 이전)

**1. this를 일단 회피시킨 후 콜백 함수 내부에서 사용한다.**

```javascript
...
add(arr) {
	const that = this; // this 회피
	return arr.map(function (item) {
		return that.prefix + item; // this 대신 that 참조
	});
}
...
```

<br>

**2. Array.prototype.map의 두번째 인수로 prefixer 객체를 가리키는 this를 전달한다.**

> Array.prototype.map은 콜백 함수 내부의 this 문제를 해결하기 위해 두 번째 인수로 콜백 함수 내부에서 this로 사용할 객체를 전달할 수 있다.

```javascript
...
add(arr) {
	return arr.map(function (item) {
		return this.prefix + item;
	}, this);
}
...
```

<br>

**3. Function.prototype.bind 메서드를 사용한다.**

```javascript
...
add(arr) {
	return arr.map(function (item) {
		return this.prefix + item;
	}.bind(this)); // this에 바인딩된 값이 콜백 함수 내부의 this에 바인딩된다.
}
...
```

<br>

**ES6에서는 화살표 함수를 사용하여 해결할 수 있다.**

```javascript
...
add(arr) {
	return arr.map(item => this.prefix + item);
}
...
```

##### lexical this

- 화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다. 
- 따라서 **화살표 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다.**
- 화살표 함수의 this가 함수가 정의된 위치에 의해 결정된다.

<br>

화살표 함수는 함수 자체의 this 바인딩이 존재하지 않기 때문에 화살표 함수 내부에서 this를 참조하면 일반적인 식별자처럼 스코프 체인을 통해 상위 스코프에서 this를 탐색한다. 만약, 화살표 함수와 화살표 함수가 중첩되어 있다면 스코프 체인 상에서 가장 가까운 상위 함수 중, 화살표 함수가 아닌 함수의 this를 참조한다. 만약 화살표 함수가 전역 함수라면 화살표 함수의 this는 전역 객체를 가리키게 된다. 전역 함수의 상위 스코프는 전역이기 때문이다??. 프로퍼티에 할당된 함수도 마찬가지다.

```javascript
// bar 함수는 화살표 함수를 반환한다.
// 화살표 함수는 this 바인딩이 없으므로 상위 스코프에서 this를 탐색하지만
// bar 함수도 화살표 함수이므로
// 즉시 실행 함수의 this를 참조하게 된다.
(function () {
	const bar = () => () => console.log(this);
	bar()();
}).call({a:1}); // {a:1}

// 전역함수의 상위 스코프는 전역
const foo = () => console.log(this);
foo(); // window

// increase의 상위 스코프가 전역
const counter = {
	num: 1,
	increase: () => ++this.num;
}
console.log(counter.increase()); // NaN
```

<br>

**화살표 함수는 함수 자체의 this 바인딩을 갖지 않기 때문에 `Function.prototype.call`, `Function.prototype.apply`, `Function.prototype.bind`를 사용해도 화살표 함수 내부의 this를 교체할 수 없다.** 화살표 함수는 함수 자체의 this 바인딩을 갖지 않기 때문에 this를 교체할 수 없고 언제나 상위 스코프의 this 바인딩을 참조한다.

```javascript
window.x = 1;

const normal = function () { return this.x };
const arrow = () => this.x;

console.log(normal.call({x:10}); // 10
console.log(arrow.call({x:10}); // 1
```

<br>

메서드를 화살표 함수로 정의하는 것은 피해야 한다.

```javascript
const person = {
	name: "Lee",
	sayHi: () => console.log(`Hi ${this.name}`)
}

person.sayHi(); // Hi

// sayHi 메서드는 화살표 함수로 정의되었으므로 this 바인딩이 존재하지 않는다.
// 따라서 this.name은 window.name과 같으며
// window.name은 이미 존재하는 빌트인 프로퍼티이다.
```

> window.name: 창의 이름을 얻거나 설정할 때 사용하는 전역 객체 window의 빌트인 프로퍼티이다.

위 예시와 같은 일이 발생할 수 있으므로 메서드를 정의할 때는 메서드 축약 표현으로 정의하는 것이 좋다.

<br>

```
// 아쉬운 예
function Person(name) {
	this.name = name;
}

Person.prototype.sayHi = () => console.log(`Hi ${this.name}`);

const person = new Person('Lee');
person.sayHi(); // Hi


// 좋은 예 - 일반 함수를 사용
function Person(name) {
	this.name = name;
}

Person.prototype.sayHi = function() { console.log(`Hi ${this.name}`) };

const person = new Person('Lee');
person.sayHi(); // Hi Lee

// 좋은 예 - ES6 메서드 사용
function Person(name) {
	this.name = name;
}

Person.prototype = {
	// ES6 메서드는 non-constructor이므로 
	// constructor 프로퍼티와 생성자 함수 간의 연결을 재설정한다.
	constructor: Person, 
	sayHi() { console.log(`Hi ${this.name}`) }
}

const person = new Person('Lee');
person.sayHi(); // Hi Lee

// 좋은 예 - 클래스 필드 정의 제안 사용
class Person {
	name = 'Lee';
	sayHi() { console.log(`Hi ${this.name}`) }
}

const person = new Person('Lee');
person.sayHi(); // Hi Lee
```

> 클래스 필드는 클래스 기반 객체지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티를 가리키는 용어다. 클래스 필드에 함수를 할당하는 경우, 이 함수는 인스턴스 메서드가 된다. 모든 클래스 필드는 인스턴스 프로퍼티가 되기 때문이다. 따라서, 클래스 필드에 함수를 할당하는 것은 권장하지 않는다.

485쪽 아무리 봐도 이해가 안됩니다..

<br>

<img width="508" alt="스크린샷 2023-03-06 오전 12 16 36" src="https://user-images.githubusercontent.com/77482972/222969214-3b34ed53-b245-4f22-93e6-ed87b48e5cd8.png">


- constructor 재설정을 안해도 제대로 출력되는 이유가 무엇인지
- es6 메서드 축약표현의 this는 그대로 메서드를 호출한 객체인지


#### 26.3.4 super

화살표 함수는 함수 자체의 super 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 super를 참조하면 this와 마찬가지로 상위 스코프의 super를 참조한다. 

<br>

> super는 내부 슬롯 [[HomeObject]]를 갖는 ES6 메서드 내에서만 사용할 수 있는 키워드다. 화살표 함수는 ES6 메서드는 아니지만 애초에 함수 자체의 super 바인딩을 갖지 않으므로 super를 참조해도 에러가 발생하지 않는다.


<br>

#### 26.3.5 arguments

화살표 함수는 함수 자체의 arguments 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 arguments를 참조하면 this와 마찬가지로 상위 스코프의 arguments를 참조한다. 

> arguments 객체는 함수를 정의할 때 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다. 하지만 화살표 함수는 arguments 객체를 사용해 자신에게 전달된 인수 목록을 확인할 수 없으므로 **화살표 함수로 가변 인자 함수를 구현해야 할 때에는 Rest 파라미터를 사용해야 한다.**

<br>

### 26.4 Rest 파라미터

#### 26.4.1 기본 문법

Rest 파라미터는 매개변수 이름 앞에 세개의 점 `...`을 붙여서 정의한 매개변수를 의미한다. Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.


##### 예시
```
function foo(...rest) {
	console.log(rest); // [1, 2, 3, 4, 5]
}

foo(1, 2, 3, 4, 5); 

function bar(param, ...rest) {
	console.log(param); // 1
	console.log(rest); // [2, 3, 4, 5]
}

bar(1, 2, 3, 4, 5);
```

<br>

##### Rest 파라미터의 특징
- 먼저 선언된 매개변수에 할당된 인수를 제외한 나머지 인수들로 구성된 배열이 할당된다.
- Rest 파라미터는 반드시 마지막 파라미터여야 한다.
- 단 하나만 선언할 수 있다.
- 함수 객체 length 프로퍼티에 영향을 주지 않는다.(예: x, y, ...rest가 인수일 경우 length는 2)

<br>

#### 26.4.2 Rest 파라미터와 arguments 객체

arguments 객체는 배열이 아닌 유사 배열 객체이므로 배열 메서드를 사용하려면 Function.prototype.call 혹은 Function.prototype.apply 메서드를 사용해 arguments 객체를 배열로 변환해야 하는 번거로움이 있었다.

<br>

ES6의 rest 파라미터를 사용하면 인자 목록을 배열로 직접 전달받을 수 있어 배열로 변환하는 번거로움이 없다.

<br>

화살표 함수는 arguments를 갖지 않으므로 화살표 함수를 사용할 경우에는 반드시 rest 파라미터를 사용해야 한다.

<br>

### 26.5 매개변수 기본값

자바스크립트 엔진은 매개변수 개수와 인수 개수를 체크하지 않아, 두 개의 개수가 동일하지 않을 때에도 에러를 발생시키지 않았다. 따라서 인수가 전달되지 않았을 경우에 매개변수에 기본값을 할당하는 방어코드가 필요했다.

<br>

하지만 ES6에서 도입된 매개변수 기본값을 사용하면 이를 간소화 할 수 있다.

```javascript
// ES6 도입 이전 코드
function sum(x, y) {
	x = x || 0;
	y = y || 0;

	return x + y;
}

// ES6 도입 이후 코드
function sum(x = 0, y= 0) {
	return x + y;
}

```

<br>

매개변수 기본값은 함수 객체의 length 프로퍼티와 arguments 객체에 아무런 영향을 주지 않는다.

> rest 파라미터에는 기본값을 지정할 수 없다.
