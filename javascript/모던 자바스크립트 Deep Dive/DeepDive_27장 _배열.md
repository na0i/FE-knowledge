## 27장 배열

### 27.1 배열이란?

배열은 여러 개의 값을 순차적으로 나열한 자료구조다.

##### 배열의 특징
- 요소: 배열이 가지고 있는 값을 말한다.
- 인덱스: 배열의 요소는 자신의 위치를 나타내는 0이상의 정수인 인덱스를 갖는다.
- 자바스크립트의 모든 값은 배열의 요소가 될 수 있다.
- 요소에 접근할 때에는 대괄호 표기법(`배열[인덱스]`)을 이용한다.
- 배열은 요소의 개수(배열의 길이)를 나타내는 length 프로퍼티를 갖는다.
- 배열이라는 타입은 존재하지 않으며, 배열은 객체 타입이다.
- 배열 리터럴, Array 생성자 함수, Array.from 메서드로 생성할 수 있다.
- 배열의 생성자 함수는 Array이며, 배열의 프로토타입 객체는 Array.prototype이다.
- Array.prototype은 배열을 위한 빌트인 메서드를 제공한다.

<br>

앞서 말했듯이 배열은 객체이지만, 일반 객체와 다른 점이 있다.

<img width="363" alt="스크린샷 2023-03-07 오후 10 43 21" src="https://user-images.githubusercontent.com/77482972/223440033-e966a98f-a2f5-4756-affc-db97ea61033a.png">

배열은 일반 객체와 달리 값의 순서(index)와 length 프로퍼티를 갖기 때문에 순차적으로 값에 접근하기 적합한 자료구조다.

<br>

### 27.2 자바스크립트 배열은 배열이 아니다.

**밀집 배열**: 요소가 하나의 데이터 타입으로 통일되어 있으며, 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료구조<br>
**희소 배열**: 배열의 요소를 위한 각각의 메모리 공간은 동일한 크기를 갖지 않아도 되며, 연속적으로 이어져 있지 않을 수도 있다.
<br>

보통의 자료구조에서 말하는 배열은 밀집 배열이다. 일반적인 배열(밀집 배열)은 같은 크기의 요소가 연속적으로 이어져 있기 때문에 임의의 요소에 접근하기에 매우 효율적이며 고속이다.

> **why?**<br>
검색 대상 요소의 메모리 주소 = 배열의 시작 메모리 주소 + 인덱스 * 요소의 바이트 수

<br>

하지만, 특정한 요소를 검색하는 경우 선형 검색을 해야하기 때문에 시간 복잡도가 O(n)이며, 요소를 삽입하거나 삭제할 때 배열 요소를 이동시켜야한다는 단점도 있다.

<br>

**자바스크립트 배열은 일반적인 의미의 배열과 다르다.** 자바스크립트 배열은 일반적인 배열을 흉내 낸 특수한 객체이다. 

<img width="433" alt="스크린샷 2023-03-07 오후 10 52 40" src="https://user-images.githubusercontent.com/77482972/223442263-7aadd147-9860-45f1-b45a-f362095d81c0.png">

<br>

자바스크립트의 배열은
- 인덱스를 나타내는 문자열을 프로퍼티 키로 가지며
- length 프로퍼티를 갖는 특수한 객체다.
- 배열의 요소는 프로퍼티 값이다.

<br>

##### 일반적인 배열과 자바스크립트 배열의 장단점
- 일반적인 배열
	- 인덱스로 요소에 빠르게 접근할 수 있다.
	- 특정 요소를 검색하거나 요소를 삭제, 삽입하는 경우 효율적이지 않다.
- 자바스크립트 배열
	- 해시 테이블로 구현된 객체이므로 인덱스로 요소에 접근하는 경우 일반적인 배열보다 성능적인 면에서 느리다.
	- 특정 요소를 검색하거나 요소를 삽입, 삭제하는 경우에는 일반적인 배열보다 빠른 성능을 기대할 수 있다.
	- 인덱스로 배열 요소에 접근할 때 일반적인 배열보다 느릴 수 밖에 없는 단점을 보완하기 위해 일반 객체보다 좀 더 배열처럼 동작하도록 최적화하여 구현되었다.

<br>

### 27.3 length 프로퍼티와 희소 배열

length 프로퍼티는 요소의 개수, 즉 배열의 길이를 나타내는 0 이상의 정수를 값으로 갖는다. length 프로퍼티 값은 배열에 요소를 추가하거나 삭제하면 자동 갱신된다. 

<br>

length 프로퍼티 값은 배열의 길이를 바탕으로 결정되지만 임의의 숫자 값을 할당할 수 있다.
- 실제 프로퍼티 값보다 작은 값을 할당했을 때: 배열의 길이가 줄어든다.
- 실제 프로퍼티 값보다 큰 값을 할당했을 때: length 프로퍼티 값은 변경되지만 실제로 배열의 길이가 늘어나지는 않는다.

```javascript
const arr = [1];

arr.length = 3;

console.log(arr.length); // 3
console.log(arr); // [1, empty * 2]
```

위 예시에서 empty * 2는 실제로 추가된 배열의 요소가 아니며 arr[1]과 arr[2]에는 값이 존재하지 않는다. 즉, 값 없이 비어있는 요소를 위해 메모리 공간을 확보하지 않으며 빈 요소를 생성하지도 않는다.

<br>

이처럼 배열의 요소가 연속적으로 위치하지 않고 일부가 비어있는 배열을 희소 배열이라고 하며 **자바스크립트는 희소 배열을 문법적으로 허용**한다.

![스크린샷 2023-03-14 오후 10 39 55](https://user-images.githubusercontent.com/77482972/225019558-c013b2a0-7eed-4f25-b721-56c469af58a4.png)

##### 희소 배열
> 희소 배열은 length와 배열 요소 개수가 일치하지 않는다. 희소 배열의 length는 희소 배열의 실제 요소 개수보다 언제나 크다. 희소 배열은 연속적인 값의 집합이라는 배열의 기본적 개념과 맞지 않으며, 성능에도 좋지 않으므로 사용하지 않는 것이 좋다. **배열에는 같은 타입의 요소를 연속적으로 위치시키는 것이 최선이다.**

<br>

### 27.4 배열 생성

배열도 다양한 생성 방식이 있다.

#### 27.4.1 배열 리터럴

가장 일반적이고 간편한 배열 생성 방식이다. 배열 리터럴은 0개 이상의 요소를 쉼표로 구분해 대괄호로 묶는다. 배열 리터럴은 프로퍼티 키가 없고 값만 존재한다.

```javascript
// 배열 리터럴
const arr = [1, 2, 3];
const arr = []; // length가 0인 배열
const arr = [1, , 3]; // 희소 배열
```

<br>

#### 27.4.2 Array 생성자 함수

Array 생성자 함수를 통해 배열을 생성할 수도 있다. Array 생성자 함수는 전달된 인수의 개수에 따라 다르게 동작하므로 주의가 필요하다.

##### 1. 전달된 인수가 1개이고 숫자인 경우

length 프로퍼티 값이 인수인 배열을 생성하고 이 배열은 희소 배열이다.

```javascript
const arr = new Array(10);

console.log(arr); // [empty * 10]
console.log(arr.length); // 10
```

<br>

##### 2. 전달된 인수가 없는 경우

빈 배열을 생성한다. 배열 리터럴 []과 같다.

<br>

##### 3. 전달된 인수가 2개 이상이거나 숫자가 아닌 경우

인수를 요소로 갖는 배열을 생성한다.

```javascript
// 전달된 인수가 2개 이상인 경우
new Array(1, 2, 3); // [1, 2, 3]

// 전달된 인수가 숫자가 아닌 경우
new Array({}); // [{}]
```

<br>

> Array 생성자 함수는 new 연산자와 함께 호출하지 않더라도 생성자 함수로 동작한다. Array 생성자 함수 내부에서 new.target을 확인하기 때문이다.

<br>

#### 27.4.3 Array.of

Array.of 메서드는 전달된 인수를 요소로 갖는 배열을 생성한다. Array.of는 전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성한다.

<br>

#### 27.4.4 Array.from

Array.from 메서드는 유사 배열 객체 또는 이터러블 객체를 인수로 전달받아 배열로 변환하여 반환한다. 두번째 인수로 전달한 콜백 함수를 통해 값을 만들면서 요소를 채울 수 있다.

```javascript
// 유사 배열 객체
Array.from({length: 2, 0: 'a', 1: 'b'}); // ['a', 'b']

// 이터러블 변환
Array.from('Hello'); // ['H', 'e', 'l', 'l', 'o']

// 두번째 인수로 전달한 콜백 함수의 반환값으로 구성된 배열 반환
Array.from({length : 3}, (_, i) => i);
```

> 유사 배열 객체: 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체

> 이터러블 객체: Symbol.iterator 메서드를 구현하여 for ...of문으로 순회할 수 있으며, 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있는 객체

<br>

### 27.5 배열 요소의 참조

배열의 요소를 참조할 때는 대괄호 표기법을 사용하고 대괄호 안에는 인덱스가 와야한다. 

<br>

존재하지 않는 요소에 접근하면 undefined가 반환된다. 배열은 인덱스를 나타내는 문자열을 프로퍼티 키로 갖는 객체이기 때문에 존재하지 않는 프로퍼티 키로 객체의 프로퍼티에 접근했을 때 undefined를 반환하는 것과 동일하다.

<br>

### 27.6 배열 요소의 추가와 갱신

배열에도 요소를 동적으로 추가할 수 있다.
- 존재하지 않는 인덱스를 사용해 값을 할당하면 새로운 요소가 추가되며 length 값은 자동 갱신된다.
- 이미 존재하는 요소에 값을 재할당하면 요소값이 갱신된다.
- 정수 이외의 값을 인덱스처럼 사용하면 요소가 생성되는 것이 아니라 프로퍼티가 생성된다.

```javascript
const arr = [0];

arr[1] = 1;
console.log(arr); // [0, 1]
console.log(arr.length); // 2

// 배열 요소의 추가
arr[10] = 10;
console.log(arr); // [0, 1, empty * 8, 10]
console.log(arr.length); // 11

// 요소값의 갱신
arr[1] = 10;
console.log(arr); // [0, 10, empty * 8, 10]
```

![스크린샷 2023-03-15 오후 2 37 56](https://user-images.githubusercontent.com/77482972/225217048-429c5255-6216-4a50-ab95-5d1148827fb9.png)

<br>

### 27.7 배열 요소의 삭제

배열은 객체이기 때문에 배열의 특정 요소를 삭제하기 위해 `delete` 연산자를 사용할 수 있다. 다만 delete 연산자는 객체의 프로퍼티를 삭제하므로 delete arr[1]은 arr에서 프로퍼티 키가 '1'인 프로퍼티를 삭제한다. 따라서 희소 배열을 만드는 delete 연산자는 사용하지 않는 것이 좋다.

```javascript
const arr = [1, 2, 3];

delete arr[1];

console.log(arr); // [1, empty, 3]
console.log(arr.length); // 3
```

<br>

희소 배열을 만들지 않으면서 배열의 특정 요소를 삭제하려면 `Array.prototype.splice` 메서드를 사용한다.

> Array.prototype.splice(삭제를 시작할 인덱스, 삭제할 요소 수)

```javascript
const arr = [1, 2, 3];

arr.splice(1, 1);

console.log(arr); // [1, 3]
console.log(arr.length); // 2
```

<br>

### 27.8 배열 메서드

초창기 배열 메서드 중에는 원본 배열을 직접 변경하는 경우가 많다. 가급적 원본 배열을 직접 변경하지 않는 메서드를 사용하는 것이 권장된다.

<br>

#### 27.8.1 Array.isArray

`Array.isArray`는 Array 생성자 함수의 정적 메서드로 **전달된 인수가 배열이면 true, 아니면 false를 반환한다.**

```javascript
Array.isArray([]); // true

Array.isArray(); // false
Array.isArray({}); // false
```

<br>

#### 27.8.2 Array.prototype.indexOf

`indexOf` 메서드는 원본 배열에서 인수로 전달된 요소를 검색하여 인덱스를 반환한다. 배열에 특정 요소가 존재하는지 확인할 때 유용하다.

- 중복되는 요소가 여러개라면 첫번째로 검색된 요소의 인덱스를 반환한다.
- 인수로 전달된 요소가 존재하지 않으면 -1을 반환한다.

<br>

ES7에서 도입된 `Array.prototype.includes` 메서드를 사용하면 가독성이 더 좋다.

```javascript
const foods = ['apple', 'banana'];

if (foods.indexOf('orange') === -1) {
	foods.push('orange');
}

if (!foods.includes('orange')) {
	foods.push('orange');
}
```

<br>

#### 27.8.3 Array.prototype.push

`push` 메서드는 인수로 전달받은 모든 값을 원본 배열의 마지막 요소로 추가하고 변경된 length 프로퍼티 값을 반환한다. **push 메서드는 원본을 직접 변경한다.**

- push 메서드는 성능이 좋지 않으므로 추가할 요소가 하나라면 length 프로퍼티를 사용하여 배열의 마지막에 요소를 직접 추가하는 게 더 빠르다.
- 원본 배열을 직접 변경하는 부수효과가 있으므로 ES6의 스프레드 문법을 사용하는 편이 좋다.

<br>

#### 27.8.4 Array.prototype.pop

`pop` 메서드는 원본 배열에서 마지막 요소를 제거하고 제거된 요소를 반환한다. 

- 원본 배열이 빈 배열이면 undefined를 반환한다.
- 원본 배열을 직접 변경한다.
- pop과 push 메서드를 사용하면 스택(자료구조)을 쉽게 구현할 수 있다.

<br>

#### 27.8.5 Array.prototype.unshift

`unshift` 메서드는 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고 변경된 length 프로퍼티 값을 반환한다.

- 원본 배열을 직접 변경하므로 스프레드 문법을 사용하는 편이 좋다.

```javascript
const arr = [1, 2];

let result = arr.unshift(3, 4);

console.log(result); // 4
console.log(arr); // [3, 4, 1, 2]
```

<br>

#### 27.8.6 Array.prototype.shift

`shift` 메서드는 원본 배열에서 첫 번째 요소를 제거하고 제거한 요소를 반환한다. 

- 원본 배열이 빈 배열이면 undefined를 반환한다.
- 원본 배열을 직접 변경한다.
- shift와 push 메서드를 사용하면 큐(자료구조)를 쉽게 구현할 수 있다.

```javascript
const arr = [1, 2];

let result = arr.shift();

console.log(result); // 1
console.log(arr); // [2]
```

<br>

#### 27.8.7 Array.prototype.concat

`concat` 메서드는 인수로 전달된 값들(배열 혹은 원시값)을 원본 배열의 마지막 요소로 추가한 새로운 배열을 반환한다.

- 인수로 전달한 값이 배열인 경우 배열을 해체하여 새로운 배열의 요소로 추가한다.
- 원본 배열은 변경되지 않는다.
- push와 unshift 메서드는 concat 메서드로 대체할 수 있다.
- concat 메서드를 사용할 경우 반환값을 반드시 변수에 할당받아야 한다.
- concat 메서드는 스프레드 문법으로 대체할 수 있다.

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];

let result = arr1.concat(arr2); // [1, 2, 3, 4]
result = arr1.concat(3); // [1, 2, 3]
result = arr1.concat(arr2, 5); // [1, 2, 3, 4, 5]
result = [...[1, 2], ...[3, 4]]; // [1, 2, 3, 4]

console.log(arr1); // [1, 2]
```

> 결론적으로 push/unshift/concat 보다 스프레드 문법을 사용하는 것이 권장된다.

<br>

#### 27.8.8 Array.prototype.splice

원본 배열의 중간에 요소를 추가하거나 중간에 있는 요소를 제거하려면 `splice` 메서드를 사용한다.

- 제거한 요소가 배열로 반환된다.
- 3개의 매개변수가 있다.(start, deleteCount, items)
	- start: 원본 배열의 요소를 제거하기 시작할 인덱스, start만 지정되면 start부터 모든 요소를 제거한다. start가 음수인 경우 배열 끝의 인덱스를 나타낸다.
	- deleteCount(옵션): start부터 제거할 요소의 개수로 0일 경우 아무것도 제거되지 않는다.
	- items(옵션): 제거한 위치에 삽입할 요소들의 목록이다.
- 배열에서 특정 요소를 제거하려면 indexOf 메서드를 통해 요소의 인덱스를 취득한 다음 splice 메서드를 사용한다.

```javascript
const arr = [1, 2, 3, 4];

const result = arr.splice(1, 2, 20, 30);

console.log(result); // [2, 3]
console.log(arr); // [1, 20, 30, 4]
```

<br>

#### 27.8.9 Array.prototype.slice

`slice` 메서드는 인수로 전달된 범위의 요소들을 복사하여 배열로 반환한다.

- 원본 배열은 변경되지 않는다.(splice는 원본 배열을 변경한다.)
- 두 개의 매개변수를 갖는다.(start, end)
	- start: 복사를 시작할 인덱스 / 음수인 경우 배열의 끝에서의 인덱스
	- end: 복사를 종료할 인덱스로 생략시 기본값은 length 프로퍼티 값이다.
- end 생략시 start부터 모든 요소를 복사하여 배열로 반환한다.
- 인수를 모두 생략하면 원본 배열의 복사본을 생성하여 반환한다.(얕은 복사)
- slice 메서드를 이용하여 arguments, HTMLCollection, NodeList 같은 유사 배열 객체를 배열로 변환할 수 있다.

> ![스크린샷 2023-03-20 오전 10 33 42](https://user-images.githubusercontent.com/77482972/226226893-87bb4b34-0802-4bab-85e8-f34731fec94f.png)

> 얕은 복사와 깊은 복사: https://bbangson.tistory.com/78

<br>

#### 27.8.10 Array.prototype.join

`join` 메서드는 원본 배열의 모든 요소를 문자열로 변환한 후, 인수로 전달받은 문자열을 구분자로 연결한 문자열을 반환한다.

- 구분자는 생략 가능하며 기본 구분자는 `,`이다.

```javascript
const arr = [1, 2, 3, 4];

arr.join(); // '1,2,3,4'
arr.join(''); // '1234'
arr.join(':'); // '1:2:3:4'
```

<br>

#### 27.8.11 Array.prototype.reverse

`reverse` 메서드는 원본 배열 순서를 반대로 뒤집는다.

- 원본 배열이 변경된다.
- 반환값은 변경된 배열이다.

```javascript
const arr = [1, 2, 3];
const result = arr.reverse();

console.log(arr); // [3, 2, 1]
console.log(result); // [3, 2, 1]
```

<br>

#### 27.8.12 Array.prototype.fill

`fill` 메서드는 인수로 전달받은 값을 배열의 처음부터 끝까지 요소로 채운다. fill 메서드를 사용해 배열을 생성하면서 특정 값으로 요소를 채울 수도 있다. 

- 원본 배열이 변경된다.
- 두번째 인수로 요소 채우기를 시작할 인덱스를 전달한다.
- 세번째 인수로 요소 채우기를 멈출 인덱스를 전달한다.

```javascript
const arr = [1, 2, 3, 4, 5];

arr.fill(0); // [0, 0, 0, 0, 0]

arr.fill(0, 2); // [1, 2, 0, 0, 0]

arr.fill(0, 1, 3); // [1, 0, 0, 4, 5]

const arr = new Array(3); // [empty * 3]
const arr2 = arr.fill(1); // [1, 1, 1]
```

<br>

fill 메서드로는 모든 요소를 하나의 값만으로 채울 수 밖에 없지만 `Array.from` 메서드를 사용하면 콜백함수를 통해 요소값을 만들면서 배열을 채울 수 있다.

```javascript
const sequences = (length = 0) => Array.from({ length }, (_, i) => i);
console.log(sequences(3)); // [0, 1, 2]
```

<br>

#### 27.8.13 Array.prototype.includes

`includes` 메서드는 배열 내에 특정 요소가 포함되어 있는지 확인하여 true 또는 false를 반환한다.

- 첫 번째 인수로 검색할 대상을 지정한다.
- 두 번째 인수로 검색을 시작할 인덱스를 전달한다.(옵션) / 생략할 경우 기본값은 0이다. / 음수가 전달될 경우 length + 음수 인덱스 값으로 검색 시작 인덱스를 설정한다.

```javascript
const arr = [1, 2, 3];

arr.includes(1); // true
arr.includes(1, 1); // false
arr.includes(3, -1); // true (3 - 1인 2부터 검색)
```

<br>

indexOf 메서드를 사용하여도 배열 내에 특정요소가 있는지 확인할 수 있지만 배열에 NaN이 포함되어 있는지 확인할 수 없다는 문제가 있다.

```javascript
[NaN].includes(NaN); // true
[NaN].indexOf(NaN); // -1
```

<br>

#### 27.8.14 Array.prototype.flat

`flat` 메서드는 인수로 전달한 깊이만큼 재귀적으로 배열을 평탄화한다.

- 중첩 배열을 평탄화할 깊이를 인수로 전달할 수 있으며 기본값은 1이다.
- 인수로 Infinity를 전달하면 중첩 배열 모두를 평탄화한다.

```javascript
[1, [2, [3, [4]]]].flat(); // [1, 2, [3, [4]]]
[1, [2, [3, [4]]]].flat(Infinity); // [1, 2, 3, 4]
```

<br>

### 27.9 배열 고차 함수

**고차 함수는 함수를 인수로 전달받거나 함수를 반환하는 함수를 말한다.** 고차 함수는 **외부 상태의 변경이나 가변 데이터를 피하고 불변성을 지향하는 함수형 프로그래밍에 기반을 두고 있다.**

<br>

> **함수형 프로그래밍**: 순수 함수와 보조 함수의 조합을 통해 로직 내에 존재하는 조건문과 반복문을 제거하여 복잡성을 해결하고 변수의 사용을 억제하여 상태 변경을 피하려는 프로그래밍 패러다임이다. 순수 함수를 통해 부수 효과를 최대한 억제하여 오류를 피하고 프로그램의 안정성을 높이려는 노력의 일환이다.

<br>

#### 27.9.1 Array.prototype.sort

`sort` 메서드는 배열의 요소를 정렬한다.

- 원본 배열을 직접 변경하며 정렬된 배열을 반환한다.
- 기본적으로 오름차순으로 요소를 정렬한다.
- 내림차순으로 요소를 정렬하려면 sort > reverse 순으로 메서드를 사용한다.
- 문자열 정렬에는 문제가 없지만 숫자 요소로 이루어진 배열에서는 문제가 생기기 때문에 숫자 요소를 정렬할 때에는 정렬 순서를 정의하는 비교 함수를 인수로 전달해야 한다.
> sort 메서드는 유니코드 코드 포인트의 순서를 따라 정렬하기 때문에 배열 요소가 숫자 타입이라고 할 지라도 요소를 일시적으로 문자열로 변환한 후 유니코드 코드 포인트 순서를 기준으로 정렬하기 때문이다.

```javascript
const fruits = ['Bananan', 'Orange', 'Apple'];

fruits.sort(); // ['Apple', 'Banana', 'Orange']

const points = [40, 100, 1, 5, 2, 25, 10];

points.sort(); // [1, 10, 100, 2, 25, 40, 5]

// 비교 함수의 반환값이
// 0보다 작으면 첫번째 인수를 우선하여 정렬하고
// 0이면 정렬하지 않으며
// 0보다 크면 두번째 인수를 우선하여 정렬한다.
points.sort((a, b) => a - b); // [1, 2, 5, 10, 25, 40, 100]

const todos = [
	{id: 4, content: 'Js'},
	{id: 1, content: 'HTML'},
	{id: 2, content: 'CSS'},
]

function compare(key) {
	return (a, b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0));
}

todos.sort(compare('id'))
```

<br>

#### 27.9.2 Array.prototype.forEach

for문은 반복을 위한 변수를 선언해야 하며, 조건식과 증감식으로 이루어져 있어서 함수형 프로그래밍이 추구하는 바와 맞지 않는다. `forEach` 메서드는 for문을 대체할 수 있는 고차 함수다. 

- forEach 메서드는 자신의 내부에서 반복문을 실행한다. 
- 반복문을 추상화한 고차함수로서 반복문을 통해 자신을 호출한 배열을 순회하면서 수행해야 할 처리를 콜백 함수로 전달받아 반복 호출한다.
- forEach 메서드의 콜백 함수는 forEach 메서드를 호출한 배열의 요소값과 인덱스, this(forEach를 호출한 배열)를 순차적으로 전달받을 수 있다.
- 원본 배열을 변경하지는 않지만 콜백함수를 통해 원본 배열을 변경할 수는 있다.
- forEach 메서드의 반환값은 undefined다.

```javascript
[1, 2, 3].forEach((item, index, arr) => {
	console.log(item, index, arr));
}

// 1 0 [1, 2, 3]
// 2 1 [1, 2, 3]
// 3 2 [1, 2, 3]

const numbers = [1, 2, 3];
numbers.forEach((item, index, arr) => { arr[index] = item ** 2; }); // [1, 4, 9]

const result = [1, 2, 3].forEach(console.log);
console.log(result); // undefined
```

<br>

- forEach 메서드의 두 번째 인수로 forEach 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달할 수 있다.
```javascript
class Numbers {
	numberArray = [];
	
	multiply(arr) {
		arr.forEach(function (item) {
			this.numberArray.push(item * item); // TypeError
		});
	}
}

const numbers = new Numbers();
numbers.multiply([1, 2, 3])
```

위 예시에서 forEach 메서드의 콜백함수 내부의 this는 undefined를 가리킨다.
> why? <br>일반 함수로 호출되어 this가 전역을 가리킬 것 같지만, 클래스 내부의 모든 코드는 암묵적으로 strict mode 이므로 undefined를 가리킨다.
<br>

따라서, forEach 메서드 콜백 함수 내부의 this와 multiply 메서드 내부의 this를 일치시키려면 forEach 메서드의 두 번째 인수로 this로 사용할 객체를 전달한다.

```javascript
class Numbers {
	numberArray = [];
	
	multiply(arr) {
		arr.forEach(function (item) {
			this.numberArray.push(item * item);
		}, this);
	}
}

const numbers = new Numbers();
numbers.multiply([1, 2, 3])
```

더 나은 방법은 화살표 함수를 사용하는 것이다.
> why? <br>
화살표 함수는 함수 자체의 this 바인딩을 갖지 않기 때문에 화살표 함수 내부에서 this를 참조하면 상위 스코프, 즉 multiply 메서드 내부의 this를 그대로 참조한다.

```javascript
class Numbers {
	numberArray = [];
	
	multiply(arr) {
		arr.forEach(item => this.numberArray.push(item * item));
	}
}

const numbers = new Numbers();
numbers.multiply([1, 2, 3])
```

<br>

- forEach 메서드도 내부에서는 반복문을 통해 배열을 순회할 수 밖에 없다. 단, 반복문을 메서드 내부로 은닉하여 로직의 흐름을 이해하기 쉽게 하고 복잡성을 해결한다.
- break, continue 문을 사용할 수 없다.(배열의 모든 요소를 빠짐없이 순회하며 중간에 순회를 중단할 수 없다.)
- 희소 배열의 경우, 존재하지 않는 요소는 순회 대상에서 제외된다.

<br>

**forEach 메서드는 for 문에 비해 성능이 좋지는 않지만 가독성은 더 좋다.** 따라서 높은 성능이 필요한 경우가 아니라면 forEach 문을 사용할 것이 권장된다.

<br>

#### 27.9.3 Array.prototype.map

`map` 메서드는 콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다.

- 원본 배열은 변경되지 않는다.
- map 메서드가 생성하여 반환하는 새로운 배열의 length 프로퍼티 값은 map 메서드를 호출한 배열의 length 프로퍼티 값과 반드시 일치한다. (map 메서드를 호출한 배열과 map 메서드가 생성하여 반환한 배열은 1:1 매핑한다.)
- map 메서드의 콜백함수는 map 메서드를 호출한 배열의 요소값, 인덱스, this(map 메서드를 호출한 배열 자체)를 순차적으로 전달받을 수 있다.
- map 메서드의 두번째 인수로 map 메서드의 콜백함수 내부에서 this로 사용할 객체를 전달할 수 있다.
- forEach와 마찬가지로 화살표 함수를 사용하는 것이 낫다.

<br>

forEach와 map 메서드는 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출한다는 공통점이 있지만, forEach는 언제나 undefined를 반환하고 map은 콜백함수의 반환값들로 구성된 새로운 배열을 반환하는 차이가 있다. **forEach 메서드는 반복문을 대체하기 위한 고차 함수고, map 메서드는 요소값을 다른 값들로 매핑한 새로운 배열을 생성하기 위한 고차 함수다.**

<br>

#### 27.9.4 Array.prototype.filter

`filter` 메서드는 콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환한다. 

- 원본 배열은 변경하지 않는다.
- filter 메서드는 자신을 호출한 배열에서 필터링 조건을 만족하는 특정 요소만 추출하여 새롱누 배열을 만들고 싶을 때 사용한다.
- filter 메서드가 생성하여 반환한 새로운 배열의 length 프로퍼티 값은 filter 메서드를 호출한 배열의 length 프로퍼티 값과 같거나 작다.
- filter 메서드의 콜백 함수는 filter 메서드를 호출한 배열의 요소값과, 인덱스, this(filter 메서드를 호출한 배열 자체)를 순차적으로 전달받을 수 있다.
- filter 메서드의 두번째 인수로 filter 메서드의 콜백함수 내부에서 this로 사용할 객체를 전달할 수 있다.
- forEach와 마찬가지로 화살표 함수를 사용하는 것이 낫다.
- filter 메서드는 자신을 호출한 배열에서 특정 요소를 제거하기 위해 사용할 수도 있다.
- filter 메서드를 사용해 특정 메서드를 제거할 경우 중복된 요소가 모두 제거된다.

<br>

#### 27.9.5 Array.prototype.reduce

`reduce` 메서드는 **콜백 함수의 반환값을 다음 순회 시에 콜백 함수의 첫 번째 인수로 전달하면서 콜백 함수를 호출하여 하나의 결과값을 만들어 반환한다.**

- 원본 배열은 변경하지 않는다.
- reduce 메서드는 첫 번째 인수로 콜백 함수, 두 번째 인수로 초기값(옵션)을 전달받는다. 
- reduce 메서드의 콜백함수는 4개의 인수(초기값 or 콜백 함수의 이전 반환값 / reduce 메서드를 호출한 배열의 요소값 / 인덱스 / this(reduce 메서드를 호출한 배열 자체)) 가 전달된다.
- reduce 메서드는 자신을 호출한 배열의 모든 요소를 순회하며 하나의 결과값을 구해야 하는 경우에 사용한다.
- reduce 메서드의 두 번째 인수로 전달하는 초기값은 옵션이지만 언제나 초기값을 전달하는 경우가 안전하다.

```javascript
const sum = [1, 2, 3, 4].reduce((accumulator, currentValue, index, array) => accumulator + currentValue, 0);

console.log(sum); // 10

// 평균 구하기
const values = [1, 2, 3, 4, 5, 6];
const avg = values.reduce((acc, cur, i, { length }) => {
	return i === length - 1 ? (acc + cur) / length : acc + cur;
}, 0);

// 최대값 구하기(Math.max가 더 직관적)
const values = [1, 2, 3, 4, 5, 6];
const max = values.reduce((acc, cur) => (acc > cur ? acc : cur), 0);

// 요소의 중복 횟수 구하기
const fruits = ['apple', 'banana', 'orange', 'orange'];
const count = fruits.reduce((acc, cur) => {
	acc[cur] = (acc[cur] || 0) + 1;
	return acc;
}, {});

// 중첩 배열 평탄화(flat 메서드가 더 직관적)
const values = [1, [2, 3], 4, [5, 6]];
const flatten = values.reduce((acc, cur) => acc.concat(cur), []);

// 중복 요소 제거(filter 메서드가 더 직관적)
const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];
const result = values.reduce(
	(unique, val, i, _values) => _values.indexOf(val) === i ? [...unique, val] : unique, []
);

// 초기값을 전달하지 않을 때 생기는 문제
const products = [
	{id: 1, price: 100},
	{id: 2, price: 200},
	{id: 3, price: 300}
]

const priceSum = products.reduce((acc, cur) => acc.price + cur.price); 
// acc가 300이 되어버려 acc.price는 undefined가 되고 결국 priceSum은 NaN이 된다.
```

<br>

> Set: 중복되지 않는 유일한 값들의 집합
```javascript
const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];

const result = [...new Set(values)];
```

<br>

#### 27.9.6 Array.prototype.some

`some` 메서드는 콜백 함수의 반환값이 **단 한 번이라도 참이면 true, 모두 거짓이면 false를 반환**한다.

- 빈 배열일 경우 언제나 false를 반환한다.
- some 메서드의 콜백 함수는 some 메서드를 호출한 요소값과, 인덱스, this(some 메서드를 호출한 배열 자체)를 전달받을 수 있다.
- some 메서드의 두번째 인수로 some 메서드의 콜백함수 내부에서 this로 사용할 객체를 전달할 수 있다.
- forEach와 마찬가지로 화살표 함수를 사용하는 것이 낫다.

```javascript
[5, 10, 15].some(item => item > 10); // true
[].some(item => item > 3); // false
```

<br>

#### 27.9.7 Array.prototype.every

`every` 메서드는 콜백 함수의 반환값이 **모두 참이면 true, 단 한 번이라도 거짓이라면 false를 반환**한다.

- 빈 배열일 경우 언제나 true를 반환한다.
- every 메서드의 콜백 함수는 every 메서드를 호출한 요소값과, 인덱스, this(every 메서드를 호출한 배열 자체)를 전달받을 수 있다.
- every 메서드의 두번째 인수로 every 메서드의 콜백함수 내부에서 this로 사용할 객체를 전달할 수 있다.
- forEach와 마찬가지로 화살표 함수를 사용하는 것이 낫다.

```javascript
[5, 10, 15].every(item => item > 3); // true
[].every(item => item > 3); // true
```

<br>

#### 27.9.8 Array.prototype.find

`find` 메서드는 반환값이 true인 첫번째 요소를 반환한다. 

- true인 요소가 존재하지 않는다면 undefined를 반환한다.
- filter 메서드는 true인 요소만 추출하여 새로운 배열을 반환하지만, find는 콜백 함수의 반환값이 true인 첫 번째 요소를 반환하므로 결과값은 배열이 아닌 해당 요소값이다.
- find 메서드의 콜백 함수는 find 메서드를 호출한 요소값과, 인덱스, this(find 메서드를 호출한 배열 자체)를 전달받을 수 있다.
- find 메서드의 두번째 인수로 find 메서드의 콜백함수 내부에서 this로 사용할 객체를 전달할 수 있다.
- forEach와 마찬가지로 화살표 함수를 사용하는 것이 낫다.

```javascript
const users = [
	{ id: 1, name: 'Lee'},
	{ id: 2, name: 'Park'},
]

users.find(user => user.id === 2); // { id: 2, name: 'Park' }
```

<br>

#### 27.9.9 Array.prototype.findIndex

`findIndex` 메서드는 반환값이 true인 첫 번째 요소의 인덱스를 반환한다.

- true인 요소가 존재하지 않는다면 -1을 반환한다.
- findIndex 메서드의 콜백 함수는 findIndex 메서드를 호출한 요소값과, 인덱스, this(findIndex 메서드를 호출한 배열 자체)를 전달받을 수 있다.
- findIndex 메서드의 두번째 인수로 findIndex 메서드의 콜백함수 내부에서 this로 사용할 객체를 전달할 수 있다.
- forEach와 마찬가지로 화살표 함수를 사용하는 것이 낫다.

<br>

#### 27.9.10 Array.prototype.flatMap

`flatMap` 메서드는 map 메서드를 통해 생성된 새로운 배열을 평탄화한다. map 메서드와 flat 메서드를 순차적으로 실행하는 효과가 있다.

- flatMap 메서드는 flat 메서드처럼 평탄화 깊이를 지정할 수는 없고 1단계만 평탄화할 수 있다.
- 따라서, 평탄화 깊이를 지정하고 싶다면 flatMap 메서드가 아니라 map과 flat 메서드를 각각 호출한다.

```javascript
const arr = ['hello', 'world'];

arr.map(x => x.split('')); // [['h', 'e', 'l', 'l', 'o'], ['w', 'o', 'r', 'l', 'd']]
arr.map(x => x.split('')).flat(); // ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
```
