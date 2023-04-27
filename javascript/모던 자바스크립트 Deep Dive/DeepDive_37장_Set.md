## 37장 Set과 Map

### 37.1 Set

Set 객체는 중복되지 않는 유일한 값들의 집합이다.


|         특징             | 배열 | Set |
|-------------------------|-----|-----|
| 중복값이 가능하다           |  ㅇ  |  X  |
| 요소 순서에 의미가 있다      |  ㅇ  |  X  |
| 인덱스로 요소에 접근할 수 있다 |  ㅇ  |  X  |

<br>

Set은 수학적 집합을 구현하기 위한 자료구조로 Set을 통해 교집합, 합집합, 차집합, 여집합 등을 구현할 수 있다.

<br>

#### 37.1.1 Set 객체의 생성

- Set 생성자 함수로 생성한다. 인수를 전달하지 않으면 빈 Set 객체가 생성된다.

```javascript
const set = new Set(); // Set(0) {}
```

- Set 생성자 함수는 이터러블을 인수로 전달받는다.
- 중복된 값은 저장되지 않는다.

```javascript
const set1 = new Set([1, 2, 3, 3]); // Set(3) [1, 2, 3]
const set2 = new Set('hello'); // Set(4) ['h', 'e', 'l', 'o']
```

- 이러한 특성을 활용해 배열에서 중복된 요소를 제거할 수 있다.
```javascript
const uniq = array => [...new Set(array)];
```

<br>

#### 37.1.2 요소 개수 확인

`Set.prototype.size` 프로퍼티로 Set 객체의 요소 개수를 확인할 수 있다.

```javascript
const { size } = new Set([1, 2, 3, 3]); // 3
```

<br>

##### size 프로퍼티

- getter 함수만 존재하는 접근자 프로퍼티다(setter X)
- 즉, size 프로퍼티에 숫자를 할당해 Set 객체의 요소 개수를 변경할 수 없다. 할당해도 무시된다.

<br>

#### 37.1.3 요소 추가

`Set.prototype.add` 메서드로 Set 객체에 요소를 추가한다. 

##### add 메서드

- 새로운 요소가 추가된 Set 객체를 반환한다.
- 따라서 add 메서드 호출 후 연속적으로 add 메서드를 호출할 수 있다.
- 중복된 요소가 추가될 경우 무시된다.(에러 발생 x)
- NaN !== NaN이지만 Set 객체는 NaN을 중복 추가하지 않는다.
- Set 객체는 자바스크립트의 모든 값을 요소로 추가할 수 있다.

```javascript
const set = new Set();

set.add(0); // Set(1) {0}
set.add(1).add(2); // Set(3) {0, 1, 2}
set.add(NaN).add(NaN); // Set(4) {0, 1, 2, NaN}

const set = new Set();

set
.add(1)
.add('a')
.add(true)
.add(undefined)
.add(null)
.add({})
.add([])
.add(() => {});

console.log(set); // Set(8) {1, "a", true, undefined, null, {}, [], () => {}}
```

<br>

#### 37.1.4 요소 존재 여부 확인

`Set.prototype.has` 메서드로 Set 객체에 특정 요소가 존재하는지 확인할 수 있다. 불리언 값을 반환한다.

```javascript
const set = new Set([1, 2, 3]);

console.log(set.has(2)); // true
```

<br>

#### 37.1.5 요소 삭제

`Set.prototype.delete` 메서드로 Set 객체의 특정 요소를 삭제할 수 있다. 

##### delete 메서드
- delete 메서드는 삭제 성공을 나타내는 불리언 값을 반환한다.
- 따라서 add 메서드처럼 연속적으로 호출이 불가능하다.
- Set 객체는 순서에 의미가 없으므로 삭제하려는 요소의 인덱스가 아닌 요소값을 전달한다.

```javascript
const set = new Set([1, 2, 3]);

set.delete(2); // true
console.log(set); // Set(2) {1, 3}

set.delete(1).delete(2); // TypeError
```

<br>

#### 37.1.6 요소 일괄 삭제

`Set.prototype.clear` 메서드로 Set 객체의 모든 요소를 일괄 삭제할 수 있다. 언제나 undefined를 반환한다.

```javascript
const set = new Set([1, 2, 3]);

set.clear(); // Set(0) {}
```

<br>

#### 37.1.7 요소 순회

`Set.prototype.forEach`를 사용하여 Set 객체의 요소를 순회할 수 있다.

##### forEach 메서드
- 콜백함수로 3개의 인수를 전달받는다.
	- 1st, 2nd: 현재 순회중인 요소값
	- 3rd: 현재 순회중인 Set 객체 자체
- 1st, 2nd 인수가 같은 이유는 Array.prototype.forEach 메서드와 인터페이스를 통일하기 위해서다. Array.prototype.forEach 메서드는 2번째 인수로 인덱스를 전달받지만 Set은 인덱스가 존재하지 않기 때문이다.

<br>

- Set 객체는 이터러블이므로 `for ...of문`으로 순회할 수 있으며, 스프레드 문법과 배열 디스트럭처링 대상이 될 수 있다.

```javascript
const set = new Set([1, 2, 3]);

for (const value of set) {
	console.log(value); // 1 2 3
}

console.log([...set]); // [1, 2, 3]
```

<br>

- Set 객체의 순서는 의미가 없지만 Set 객체를 순회하는 순서는 추가된 순서를 따른다.


