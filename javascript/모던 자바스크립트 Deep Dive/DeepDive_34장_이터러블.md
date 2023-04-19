## 34장 이터러블

### 34.1 이터레이션 프로토콜

ES6에 도입된 이터레이션 프로토콜은 순회 가능한 데이터 컬렉션(자료 구조)를 만들기 위해 미리 약속한 규칙이다. ES6부터는 순회 가능한 데이터 컬렉션을 이터레이션 프로토콜을 준수하는 이터러블로 통일해 for ...of문, 스프레드 문법, 배열 디스트럭처링 할당의 대상으로 사용할 수 있도록 일원화했다.

<br>

이터레이션 프로토콜에는 `이터러블 프로토콜`과 `이터레이터 프로토콜`이 있다.

##### 이터러블 프로토콜

- Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나, 프로토타입 체인을 통해 상속받은 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다.
- 위 규약을 이터러블 프로토콜이라고 하며
- 이터러블 프로토콜을 준수한 객체를 이터러블이라 한다.
	- 이터러블: for ...of 문으로 순회 가능, 스프레드 문법과 배열 디스트럭처링 할당 대상으로 사용 가능

##### 이터레이터 프로토콜
- Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다.
	- 이터레이터
		- next 메서드를 소유
		- next 메서드를 호출하면 이터러블을 순회
		- value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환
- 이터레이터 프로토콜을 준수한 객체를 이터레이터라 한다.
- 이터레이터는 이터러블의 요소를 탐색하기 위한 포인터 역할을 한다.


<img width="820" alt="image" src="https://user-images.githubusercontent.com/77482972/233085166-b6a3e553-1712-4770-8c64-ae5e39125d39.png">

<br>

#### 34.1.1 이터러블

##### 이터러블
- Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나
- 프로토타입 체인을 통해 Symbol.iterator를 상속받은 객체
- 이터러블 프로토콜을 준수한 객체

<br>

##### 이터러블인지 확인하는 함수

```javascript
const isIterable = v => v !== null && typeof v[Symbol.iterator] === 'function'; // ??

isIterable([]); // true
isIterable({}); // false
```

배열은 Array.prototype의 Symbol.iterator 메서드를 상속받는 이터러블이다. 일반 객체는 Symbol.iterator를 직접 구현하거나 상속받지 않으므로 이터러블이 아니다.

<br>

#### 34.1.2 이터레이터

이터러블의 Symbol.iterator 메서드를 호출하면 이터레이터를 반환한다.

- 이터레이터는 next 메서드를 갖는다.

```javascript
const arr = [1, 2, 3];

const iterator = arr[Symbol.iterator](); // 이터레이터 반환

console.log('next' in iterator); // true
```

<br>

##### next 메서드

- 이터러블의 각 요소를 순회하기 위한 포인터의 역할
- 이터러블을 순차적으로 순회하며 순회 결과를 나타내는 이터레이터 리절트 객체를 반환
	- 이터레이터 리절트 객체
		- value: 현재 순회 중인 이터러블의 값
		- done: 이터러블의 순회 완료 여부

```javascript
const arr = [1, 2, 3];

const iterator = arr[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

<br>

### 34.2 빌트인 이터러블

자바스크립트는 이터레이션 프로토콜을 준수한 객체인 빌트인 이터러블을 제공한다.

- Array: Array.prototype[Symbol.iterator]
- String: String.prototype[Symbol.iterator]
- Map: Map.prototype[Symbol.iterator]
- Set: Set.prototype[Symbol.iterator]
- TypedArray: TypedArray.prototype[Symbol.iterator]
- arguments: arguments[Symbol.iterator]
- DOM 컬렉션: NodeList.prototype[Symbol.iterator], HTMLCollection.prototype[Symbol.iterator]

<br>

### 34.3 for ... of 문

`for ... of` 문은 이터러블을 순회하면서 이터러블 요소를 변수에 할당한다.

```javascript
for (변수 선언문 of 이터러블) { ... }
```

<br>

- for ... of 문은 내부적으로 이터레이터의 next 메서드를 호출하여 이터러블을 순회하며
- next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티 값을 for ... of 문 변수에 할당한다.
- 이터레이터 리절트 객체의 done 프로퍼티 값이 false이면 이터러블 순회를 계속하고 true이면 순회를 중단한다.

<br>

### 34.4 이터러블과 유사 배열 객체

> 유사 배열 객체는 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체다. for문으로 순회할 수 있고, 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있다.

유사 배열 객체는 이터러블이 아닌 일반 객체이므로 Symbol.iterator 메서드가 없다. 즉, for ... of 문으로 순회할 수 없다.

<br>

> 단, arguments, NodeList, HTMLCollection은 ES6에서 Symbol.iterator 메서드가 구현되어 유사 배열 객체이면서 이터러블이 되었다.(모든 유사 배열 객체가 이터러블인 것은 아니다)

> Array.from 메서드는 유사 배열 객체 또는 이터러블을 인수로 받아 배열로 변환해 반환하므로 Array.from을 이용해 배열로 변환하는 방법도 있다.

<br>

### 34.5 이터레이션 프로토콜의 필요성

ES6에서는 순회 가능한 데이터 컬렉션을 이터레이션 프로토콜을 준수하는 이터러블로 통일하여 for ... of 문, 스프레드 문법, 배열 디스트럭처링 할당의 대상으로 사용할 수 있도록 일원화했다. 만약 데이터 공급자(예: Array, String)가 각자의 순회 방식을 갖는다면 데이터 소비자는 다양한 데이터 공급자의 순회방식을 전부 지원해야하는데 이는 비효율적이다.

<br>

데이터 공급자가 이터레이터 프로토콜을 준수하도록 규정되면 데이터 소비자는 이터레이션 프로토콜만 지원하도록 구현하면 된다. 즉, 이터레이션 프로토콜은 다양한 데이터 공급자가 하나의 순회 방식을 갖도록 규정해 데이터 소비자가 효율적으로 다양한 데이터 공급자를 사용할 수 있도록 한다.

![스크린샷 2023-04-19 오후 10 46 03](https://user-images.githubusercontent.com/77482972/233094874-a2badfed-a347-4997-b8dc-f56e165ccdbd.png)

<br>

### 34.6 사용자 정의 프로토콜

#### 34.6.1 사용자 정의 이터러블 구현

```javascript
const fibonacci = {
  // Symbol.iterator 메서드를 구현하여 이터러블 프로토콜을 준수한다.
  [Symbol.iterator]() {
    let [pre, cur] = [0, 1];
    const max = 10; 

    // Symbol.iterator 메서드는 next 메서드를 소유한 이터레이터를 반환해야 하고
    // next 메서드는 이터레이터 리절트 객체를 반환해야 한다.
    return {
      next() {
        [pre, cur] = [cur, pre + cur]; 
        // 이터레이터 리절트 객체를 반환한다.
        return { value: cur, done: cur >= max };
      }
    };
  }
};

// 이터러블인 fibonacci 객체를 순회할 때마다 next 메서드가 호출된다.
for (const num of fibonacci) {
  console.log(num); // 1 2 3 5 8
}
```

<br>

#### 34.6.2 이터러블을 생성하는 함수

```javascript
const fibonacciFunc = function (max) {
  let [pre, cur] = [0, 1];

  // Symbol.iterator 메서드를 구현한 이터러블을 반환한다.
  return {
    [Symbol.iterator]() {
      return {
        next() {
          [pre, cur] = [cur, pre + cur];
          return { value: cur, done: cur >= max };
        }
      };
    }
  };
};

for (const num of fibonacciFunc(10)) {
  console.log(num); // 1 2 3 5 8
}
```

<br>

#### 34.6.3 이터러블이면서 이터레이터인 객체를 생성하는 함수

```javascript
const iterable = fibonacciFunc(5);
const iterator = iterable[Symbol.iterator](); // 이터레이터를 생성하려면 이터러블의 Symbol.iterator 메서드를 호출해야 한다.

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 5, done: true }
```

<br>

```javascript
// 이터러블이면서 이터레이터인 객체. 
// 이터레이터를 반환하는 Symbol.iterator 메서드와
// 이터레이션 리절트 객체를 반환하는 next 메서드를 소유한다.
{
  [Symbol.iterator]() { return this; },
  next() {
    return { value: any, done: boolean };
  }
}
```