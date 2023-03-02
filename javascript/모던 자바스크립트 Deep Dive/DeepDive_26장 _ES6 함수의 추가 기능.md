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

화살표 함수가 일반 함수가 구별되는 가장 큰 특징이 this다.

> this 바인딩은 함수의 호출 방식에 의해 동적으로 결정된다. 즉, 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 결정된다.