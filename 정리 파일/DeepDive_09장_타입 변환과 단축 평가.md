## 9장 타입 변환과 단축 평가

### 9.1 타입 변환이란?

##### 명시적 타입 변환
자바스크립트 값의 타입은 개발자의 의도에 따라 다른 타입으로 변환할 수 있다. 이처럼 개발자가 의도적으로 타입을 변환하는 것을 명시적 타입 변환 또는 타입 캐스팅이라고 한다.

**예시**: toString()

##### 암묵적 타입 변환
반대로 개발자의 의도와 상관없이 표현식을 평가하는 도중 자바스크립트 엔진에 의해 암묵적으로 타입이 변환될 때도 있는데 이를 암묵적 타입 변환 혹은 타입 강제 변환 이라고 한다.

**예시**: typeof(10 + '') // string 

<br>

명시적 타입 변환과 암묵적 타입 변환 모두 **기존 원시값을 변경하는 것은 아니다.** 타입 변환이란 기존 원시값을 사용해 다른 타입의 원시 값을 생성하는 것이다.
- `x = 10, str = x.toString()`일 때 x 변수의 값은 변경되지 않는다.
- `x = 10일 때, x + ''`의 결과로 생성된 `'10'`은 x에 재할당 되지 않는다.
- 즉, 암묵적 타입 변환은 표현식을 평가하기 위해 피연산자 값을 암묵적 타입 변환해 새로운 타입의 값을 만들어 단 한 번 사용하고 버린다.

<br>

### 9.2 암묵적 타입 변환

자바스크립트는 가급적 에러를 발생시키지 않도록 암묵적 타입 변환을 통해 표현식을 평가한다. 암묵적 타입 변환이 발생하면 문자열, 숫자, 불리언과 같은 원시 타입 중 하나로 타입을 자동 변환한다.

#### 9.2.1 문자열 타입으로 변환

+연산자는 피연산자 중 하나 이상이 문자열이라면 문자열 연결 연산자로 동작한다. 따라서 문자열 연결 연산자의 모든 피연산자는 코드의 문맴ㄱ상 모두 문자열 타입이어야 한다. 따라서, 자바스크립트 엔진은 문자열 타입이 아닌 피연산자를 문자열 타입으로 암묵적 타입 변환한다.

<img width="688" alt="스크린샷 2022-11-23 오전 9 25 04" src="https://user-images.githubusercontent.com/77482972/203447332-e486cf66-e5c5-437a-9280-cb5b00885f93.png">

<br>

#### 9.2.2 숫자 타입으로 변환

산술연산자의 역할은 숫자 값을 만드는 것이고 비교 연산자의 역할은 불리언 값을 만드는 것이다. 즉, 산술연산자와 비교연산자의 모든 피연산자는 코드 문맥상 모두 숫자 타입이야 하므로 자바스크립트 엔진은 피연산자 중에서 숫자 타입이 아닌 피연산자를 숫자 타입으로 암묵적 타입 변환한다. 이 때, 산술연산자의 경우 피연산자를 암묵적 타입 변환할 수 없는 경우에 산술 연산을 수행할 수 없기 때문에 평가결과가 NaN이 된다. + 딘힝 연산자는 피연산자가 숫자 타입의 값이 아니면 쑤자 타입의 값으로 암묵적 타입 변환을 수행한다.


<img width="718" alt="스크린샷 2022-11-23 오전 9 34 18" src="https://user-images.githubusercontent.com/77482972/203448129-308a64ad-82a5-492d-9d3d-dea7b5eef47e.png">

- 객체, 빈 배열이 아닌 배열, undefined는 변환되지 않는다. → NaN을 반환

<br>

#### 9.2.3 불리언 타입으로 변환

if 문이나 for 문, 삼항 조건 연산자의 조건식은 불리언 값으로 평가되어야 하는 표현식이다. 자바스크립트 엔진은 조건식의 평가 결과를 불리언 타입으로 암묵적 타입 변환한다. 

<img width="689" alt="스크린샷 2022-11-23 오전 9 37 26" src="https://user-images.githubusercontent.com/77482972/203448399-04184594-a8e9-46ea-854d-5d54f3c26e67.png">

자바스크립트 엔진은 불리언 타입이 아닌 값을 `Truthy 값` 또는 `Falsy 값` 으로 구분한다. 

##### Falsy 값
- false, undefined, null, 0, -0, NaN, ''

##### Truthy 값
- Falsy 값 외의 모든 값

<br>

### 9.3 명시적 타입 변환

명시적으로 타입을 변경하는 방법은 다양하다.
1. 표준 빌트인 생성자 함수를 new 연산자 없이 호출하는 방법
2. 빌트인 메서드를 사용하는 방법
3. 암묵적 타입 변환을 이용하는 방법

#### 9.3.1 문자열 타입으로 변환
1. String 생성자 함수를 new 연산자 없이 호출

```javascript
String(1); // '1'
String(Infinity); // 'Infinity'
String(true); // 'true'
```

2. Object.prototype.toString 메서드 사용

```javascript
(1).toString(); // '1'
(NaN).toString(); // 'NaN'
(Infinity).toString(); // 'Infinity'
```

3. 문자열 연결 연산자를 이용
```javascript
1 + ''; // '1'
NaN + ''; // 'NaN'
Infinity + ''; // 'Infinity'
```

<br>

#### 9.3.2 숫자 타입으로 변환

1. Number 생성자 함수를 new 연산자 없이 호출

```javascript
Number('10.53');
Number(ture);
```

2. parseInt, parseFloat 함수를 사용(문자열만 가능)

```javascript
parseInt('0');
parseInt('-1');
parseFloat('10.53');
```

3. +단항 연산자 이용
```javascript
+'0'; // 0
+'-1'; // -1
+true; // 1
+false; // 0
```

4. *산술 연산자 이용
```javascript
'0' * 1;
'-1' * 1;
'10.53' * 1;
true * 1;
```

<br>

#### 9.3.3 불리언 타입으로 변환

1. Boolean 생성자 함수를 new 연산자 없이 호출

```javascript
Boolean([]); // true
Boolean({}); // true
Boolean(undefined); // false
Boolean(0); // false
```

2. ! 부정 논리 연산자를 두번 사용
 
```javascript
!!{}; // true
!![]; // true
!!null; // false
!!'x'; // true
!!Infinity; // true
!!0; // false
```

<br>

### 9.4 단축 평가

#### 9.4.1 논리 연산자를 사용한 단축 평가

논리합(`||`)과 논리곱(`&&`) 연산자 표현식은 언제나 2개의 피연산자 중 어느 한쪽으로 평가된다. 

##### 논리곱(`&&`) 연산자

- 두 개의 피연산자가 모두 true로 평가될 때 true를 반환
- 좌항에서 우항으로 평가가 진행

##### 논리합(`||`) 연산자

- 두 개의 피연산자 중 하나만 true로 평가되어도 true를 반환한다.
- 좌항에서 우항으로 평가 진행

<br>

위 논리곱과 논리합과 같이 논리 연산의 결과를 결정하는 피연산자를 타입 변환하지 않고 그대로 반환하는 것을 **단축 평가**라고 한다. 단축 평가는 표현식을 평가하는 도중 결과가 확정된 경우 나머지 평가 과정을 생략한다.

<br>

단축 평가를 사용하면 if문을 대신할 수 있다.

```javascript
var done = true;
var message = '';

if (done) message = '완료';

var message = done && '완료';
```

```javascript
var done = false;
var message = '';

if (!done) message = '미완료';

message = done || '미완료';
```

<br>

##### 단축평가가 유용하게 사용되는 경우
- 객체가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 참조할 때
	- 예시
	- elem && elem.value
	- elem이 null이어도 에러를 뱉어내지 않는다.

- 함수 매개변수에 기본값을 설정할 때
	- 예시
	- ```javascript
		// 단축 평가 사용
		function Temp(str) {
			str = str || ""
			return str.length
		}

		// es6 매개변수 기본값 설정
		function Temp(str = "") {
			return str.length
		}
		```

<br>

#### 9.4.2 옵셔널 체이닝 연선자

옵셔널 체이닝 연산자(`?.`)는 좌항의 피연산자가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 참조할 때 유용하다. 옵셔널 체이닝 연산자가 도입되기 전에는 논리곱 연산자를 사용했으나 약간의 차이가 있다.

```javascript
var str1 = "";

var length1 = str1 && str1.length;

console.log(length1); // ""

var str2 = "";

var length2 = str2?.length;

console.log(length2);
```

length1의 경우 논리곱 연산자를 이용한 결과로, Falsy 값으로 평가됐기 때문에 좌항의 피연산자를 그대로 반환했다. 그러나 length2의 경우 옵셔널 체이닝 연산자를 이용한 결과로, Falsy 값일지라도 그 값이 null 또는 undefined가 아니면 우항의 프로퍼티 참조를 이어나간다.

<br>

#### 9.4.3 null 병합 연산자

null 병합 연산자(`??`)는 좌항의 피연산자가 null 또는 undefined인 경우 우항의 피연산자를 반환하고 그렇지 않으면 좌항의 피연산자를 반환한다. null 병합 연산자는 변수에 기본값을 설정할 때 유용하다. null 병합 연산자가 도입되기 전에는 논리합 연산자를 사용했으나 약간의 차이가 있다.

```javascript
var foo1 = '' ?? 'default string';
console.log(foo1); // ''


var foo2 = '' || 'default string';
console.log(foo2); // 'default string';
```

foo1의 경우 null 병합 연산자를 이용한 결과로, Falsy 값일지라도 그 값이 null 또는 undefined가 아니면 좌항의 피연산자를 그대로 반환한다. 그러나, foo2는 논리곱 연산자를 이용한 결과로, Falsy 값으로 평가됐기 때문에 우항의 피연산자를 그대로 반환했다. 만약 기본값으로 ""나 0을 설정했다면 ??를 사용하는 것이 좋다.