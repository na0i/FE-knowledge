## 33장 7번째 데이터 타입 Symbol

### 33.1 심벌이란?

심벌은 ES6에서 도입된 7번째 데이터 타입으로 변경 불가능한 원시 타입의 값이다. 심벌 값은 다른 값과 중복되지 않는 유일무이한 값이라 주로 이름의 충돌 위험이 없는 유일한 프로퍼티 키를 만들기 위해 사용한다.

> 프로퍼티 키로 사용할 수 있는 값은 문자열 또는 심벌 값이다.

<br>

### 33.2 심벌 값의 생성

#### 33.2.1 Symbol 함수

심벌 값은 Symbol 함수를 호출하여 생성한다.(리터럴 표기법으로 생성 x)

- 심벌 값은 외부로 노출되지 않아 확인할 수 없으며
- 다른 값과 절대 중복되지 않는 유일무이한 값이다.


```javascript
const mySymbol = Symbol(); // Symbol 함수를 호출하여 값을 생성

console.log(mySymbol); // Symbol()
// 값이 외부로 노출되지 않아 확인할 수 없다.
```

- String, Number, Boolean 생성자 함수와 달리 new 연산자와 함께 호출하지 않는다. new 연산자와 함께 생성자 함수 또는 클래스를 생성하면 객체(인스턴스)가 생성되지만, 심벌값은 변경 불가능한 원시값이다.

- Symbol 함수에는 선택적으로 문자열을 인수로 전달할 수 있다. 하지만 이는 생성된 심벌 값에 대한 설명(디버깅용)일 뿐으로, 심벌 값 생성에 어떠한 영향도 주지 않는다.

```javascript
new Symbol(); // TypeError: Symbol is not a constructor

const mySymbol1 = Symbol('mySymbol');
const mySymbol2 = Symbol('mySymbol');

console.log(mySymbol1 === mySymbol2); // false
```

- 심벌 값도 문자열, 숫자, 불리언과 같이 객체처럼 접근하면 암묵적으로 래퍼 객체를 생성한다.

```javascript
const mySymbol = Symbol('mySymbol');

console.log(mySymbol.description); // mySymbol
console.log(mySymbol.toString()); // Symbol(mySymbol)
```

- 심벌 값은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않는다. 하지만 불리언 타입으로는 암묵적으로 타입 변환된다.

```javascript
const mySymbol = Symbol();

console.log(mySymbol + ''); // TypeError
console.log(+mySymbol); // TypeError

if (mySymbol) console.log('not Empty'); // not Empty
```

<br>

#### 33.2.2 Symbol.for / Symbol.keyFor 메서드

##### Symbol.for

`Symbol.for` 메서드는 인수로 전달받은 문자열을 키로 사용하여 키와 심벌 값들의 쌍들이 저장되어 있는 전역 심벌 레지스트리에서 해당 키와 일치하는 심벌 값을 검색한다.

- 검색에 성공 > 검색된 심벌 값 반환
- 검색에 실패 > 새로운 심벌 값을 생성하여 전역 심벌 레지스트리에 전달된 키와 함께 저장한 후, 생성된 심벌값을 반환한다.

```javascript
const s1 = Symbol.for('mySymbol'); // 새로운 심벌 값 생성
const s2 = Symbol.for('mySymbol'); // 검색된 심벌 값 반환

console.log(s1 === s2); // true
```

<br>

Symbol 함수는 호출될 때마다 유일무이한 심벌 값을 생성한다. 이 때 전역 심벌 레지스트리에서 심벌 값을 검색할 수 있는 키가 지정되지 않으므로 등록되어 관리되지 않는다. Symbol.for 메서드를 이용하면 중복되지 않는 유일무이한 상수인 심벌 값을 단 하나만 생성하여 전역 심벌 레지스트리를 통해 공유할 수 있다.

<img width="265" alt="스크린샷 2023-04-18 오후 11 22 50" src="https://user-images.githubusercontent.com/77482972/232807293-d5df5ddf-febd-492b-8036-6fb041d534f2.png">


<br>

##### Symbol.keyfor

`Symbol.keyfor` 메서드는 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출할 수 있다.

```javascript
const s1 = Symbol.for('mySymbol');
Symbol.keyfor(s1); // mySymbol

const s2 = Symbol('foo'); // Symbol.for로 생성되지 않았으므로 전역 심벌 레지스트리에 등록되지 않았다.
Symbol.keyfor(s2); // undefined
```

<br>

### 33.3 심벌과 상수

#### 예시: 4방향(상하좌우)을 나타내는 상수를 정의

```javascript
// BAD
const Direction = {
	UP: 1,
	DOWN: 2,
	LEFT: 3,
	RIGHT: 4,
}

// 상수값 1 ~ 4는 변경될 수 있으며, 다른 변수 값과 중복될 수 있다.

// GOOD
const Direction = {
	UP: Symbol('up'),
	DOWN: Symbol('down'),
	LEFT: Symbol('left'),
	RIGHT: Symbol('right'),
}
```

<br>

### 33.4 심벌과 프로퍼티 키

심벌 값을 프로퍼티 키로 사용하려면 사용할 심벌 값에 대괄호를 사용한다. 심벌 값은 유일무이한 값이므로 심벌 값으로 프로퍼티 키를 만들면 다른 프로퍼티 키와 절대 충돌하지 않는다.

```javascript
const obj = {
	[Symbol.for('mySymbol')]: 1
}

obj[Symbol.for('mySymbol')]; // 1
```