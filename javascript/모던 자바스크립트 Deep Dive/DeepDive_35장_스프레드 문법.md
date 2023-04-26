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

// ES6
arr1.splice(1, 0, ...arr2); // [1, 2, 3, 4]
```