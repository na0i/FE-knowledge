## 35장 스프레드 문법

스프레드 문법 `(...)` 은 하나로 뭉쳐 있는 여러 값들의 집합을 펼쳐서 개별적인 값들의 목록으로 만든다.

<br>

스프레드 문법을 사용할 수 있는 대상: 이터러블(Array, String, Map, Set, DOM 컬렉션, arguments)

<br>

##### 스프레드 문법의 특징

- 스프레드 문법의 결과는 값이 아니라 값들의 목록이다. 즉, 스프레드 문법의 결과는 변수에 할당할 수 없다.
- 따라서 쉼표로 구분한 값의 목록을 사용하는 문맥에서만 사용 가능하다.
	- 함수 호출문의 인수 목록
	- 배열 리터럴의 요소 목록
	- 객체 리터럴의 프로퍼티 목록

```javascript
console.log(...[1, 2, 3]); // 1 2 3
const list = ...[1, 2, 3]; // SyntaxError
```

<br>

### 35.1 함수 호출문의 인수 목록에서 사용하는 경우

배열을 펼쳐서 개별적인 값들의 목록으로 만든 후, 함수의 인수 목록으로 전달해야 하는 경우에 사용한다.

```javascript
const arr = [1, 2, 3];
const max1 = Math.max(arr); // NaN
const max2 = Math.max(...arr); // 3
```

> Math.max 메서드는 가변 인자 함수다. 여러 개의 숫자를 인수로 전달받아 인수 중에서 최대값을 반환한다.

<br>

스프레드 문법이 제공되기 전에는 `Function.prototype.apply`를 사용했다.

```javascript
const arr = [1, 2, 3];
const max = Math.max.apply(null, arr); // 3
```

> apply 함수의 두번째 인수는 apply 함수가 호출하는 함수의 인수 목록이다.

<br>

스프레드 문법은 `Rest 파라미터`와 형태가 동일하므로 주의해야 한다. 

> Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받기 위해 매개변수 이름 앞에 ...을 붙이는 것이다. Rest 파라미터와 스프레드 문법은 서로 반대의 개념이다.
> ```javascript
> function foo(...rest) {
> 	console.log(rest); // [1, 2, 3]
> }
>
> foo(1, 2, 3)
> ```

<br>

### 35.2 배열 리터럴 내부에서 사용하는 경우

스프레드 문법을 배열 리터럴에서 사용하면 더욱 간결하고 가독성이 좋다.

<br>

#### 35.2.1 concat

```javascript
// ES5
const arr = [1, 2].concat([3, 4]);

// ES6
const arr = [...[1, 2], ...[3, 4]];
```

<br>

#### 35.2.2 splice

```javascript
// ES5 ver1
const arr1 = [1, 4];
const arr2 = [2, 3];

arr1.splice(1, 0, arr2); // arr1: [1, [2, 3], 4]

// ES5 ver2
Array.prototype.splice.apply(arr1, [1, 0].concat(arr2)); // [1, 2, 3, 4]
// [1, 0].concat(arr2)의 결과인 [1, 0, 2, 3]이
// splice 메서드에 해체되어 1 0 2 3 으로 전달되고
// arr1인 [1, 4]의 1번째 요소부터 0개의 요소를 제거하고 2, 3을 삽입한다

// ES6
arr1.splice(1, 0, ...arr2); // [1, 2, 3, 4]
```

<br>

#### 35.2.3 배열 복사

```javascript
// ES5: ES5에서는 slice를 배열 복사로 사용한다
const origin = [1, 2];
const copy1 = origin.slice();

// ES6
const copy2 = [...origin];
```

이 때 복사본은 얕은 복사하여 생긴 객체다.(slice도 마찬가지)

<br>

#### 35.2.4 이터러블을 배열로 변환

- ES5: `Function.prototype.apply` 또는 `Function.prototype.call` 메서드 사용하여 slice 메서드 호출

```javascript
// ES5
function sum() {
	const args = Array.prototype.slice.call(arguments);

	return args.reduce(function (pre, cur) {
		return pre + cur;
	}, 0);
}

const arrayLike = {
	0: 1,
	1: 2,
	2: 3,
	length: 3,
}

const arr = Array.prototype.slice.call(arrayLike); // [1, 2, 3]


// ES6 with 스프레드 문법
function sum() {
	return [...arguments].reduce((pre, cur) => pre + cur, 0);
}

// ES6 with Rest 파라미터
const sum = (...args) => args.reduce((pre, cur) => pre + cur, 0);
```

<br>

단, 이터러블이 아닌 유사 배열 객체는 스프레드 문법의 대상이 될 수 없다.

```javascript
const arrayLike = {
	0: 1,
	1: 2,
	2: 3,
	length: 3,
}

const arr = [...arrayLike]; // TypeError

// ES6 with Array.from
// 이터러블이 아닌 유사 배열 객체를 배열로 변경
Array.from(arrayLike); // [1, 2, 3]
```

<br>

### 35.3 객체 리터럴 내부에서 사용하는 경우

`Rest 프로퍼티`와 `스프레드 프로퍼티`가 현재 ES2018에 도입되었다. 스프레드 프로퍼티는 스프레드 문법의 대상이 이터러블에 한정됐던 것에 반해, 일반 객체를 대상으로도 스프레드 문법 사용을 허용한다.

```javascript
const obj = { x: 1, y: 2 };
const copy = { ...obj }; // { x: 1, y: 2 }

const merged = { x: 1, y: 2, ...{ a: 3, b: 4 } }; // { x: 1, y: 2, a: 3, b: 4 }
```

<br>

스프레드 프로퍼티가 제안되기 전에는 ES6의 Object.assign 메서드를 이용하면 여러 개의 객체를 병합하거나 특정 프로퍼티를 변경 또는 추가했다.

```javascript
const merged = Object.assign({}, { x: 1, y: 2 }, { y: 10, z: 3 }); // { x: 1, y: 10, z: 3 }
```