## 28장 Number

### 28.1 Number 생성자 함수

Number 객체는 생성자 함수 객체로 new 연산자와 함께 호출하면 Number 인스턴스를 생성할 수 있다.

<br>

- **인수로 숫자를 전달**하면서 new 연산자와 함께 호출하면 `[[NumberData]]` 내부 슬롯에 인수로 전달받은 숫자를 할당한 Number 래퍼 객체를 생성한다.
- **인수를 전달하지 않고** new 연산자와 함께 호출하면 `[[NumberData]]` 내부 슬롯에 0을 할당한 Number 래퍼 객체를 생성한다. 
- **숫자가 아닌 값을 인수로 전달하면** 인수를 숫자로 강제 변환한 후 `[[NumberData]]` 내부 슬롯에 변환된 숫자를 할당한 Number 래퍼 객체를 생성한다.

<br>

### 28.2 Number 프로퍼티

#### 28.2.1 Number.EPSILON

Number.EPSILON은 1과 1보다 큰 숫자 중에서 가장 작은 숫자와의 차이와 같다.(약 2.220446049250313080847263336 1816 x 10**16 )

```javascript
0.1 + 0.2 === 0.3 // false
```

<br>

Number.EPSILON은 위 예시와 같이 부동소수점으로 인해 발생하는 오차를 해결하기 위해 사용한다.
```javascript
function isEqual(a, b) {
	return Math.abs(a - b) < Number.EPSILON;
}

isEqual(0.1 + 0.2, 0.3); // true
```

<br>

#### 28.2.2 Number.MAX_VALUE

Number.MAX_VALUE는 자바스크립트에서 표현할 수 있는 가장 큰 양수값이다. Number.MAX_VALUE보다 큰 숫자는 Infinity다.

<br>

#### 28.2.3 Number.MIN_VALUE

Number.MIN_VALUE는 자바스크립트에서 표현할 수 있는 가장 작은 양수값이다. Number.MIN_VALUE보다 작은 숫자는 0이다.

<br>

#### 28.2.4 Number.MAX_SAFE_INTEGER

Number.MAX_SAFE_INTEGER는 자바스크립트에서 안전하게 표현할 수 있는 가장 큰 정수값(9007199254740)이다.

<br>

#### 28.2.5 Number.MIN_SAFE_INTEGER

Number.MIN_SAFE_INTEGER 는 자바스크립트에서 안전하게 표현할 수 있는 가장 작은 정수 값(-90071992547409)이다.

<br>

#### 28.2.6 Number.POSITIVE_INFINITY

Number.POSITIVE_INFINITY는 양의 무한대를 나타내는 숫자값 Infinity와 같다.

<br>

#### 28.2.7 Number.NEGATIVE_INFINITY

Number.NEGATIVE_INFINI 는 음의무한대를 나타내는 숫자값-Infinity 와 같다.

<br>

#### 28.2.8 Number.NaN

Number.NaN은 숫자가아님(Not-a-Number)을 나타내는 숫자값이다. Number.NaN은 window.NaN과 같다.

<br>

### 28.3 Number 메서드

#### 28.3.1 Number.isFinite

Number.isFinite 정적 메서드는 인수로 전달된 숫자값이 정상적인 유한수,즉 Infinity 또는 -Infinity가 아닌지 검사하여 그 결과를 불리언값으로 반환한다.

- 인수가 NaN이면 false를 반환한다.
- 빌트인 전역함수 isFinite는 전달받은 인수를 암묵적 타입 변환해 검사를 수행하지만 Number.isFinite는 전달받은 인수를 숫자로 암묵적 타입변환 하지 않는다.
- 따라서, 숫자 이외의 인수는 언제나 false를 반환한다.

<br>

#### 28.3.2 Number.isInteger

Number.isInteger 정적 메서드는 인수로 전달된 숫자값이 정수인지 검사하여 그 결과를 불리언 값으로 반환한다. 

- 암묵적 타입 변환을 하지 않는다.

<br>

#### 28.3.3 Number.isNaN

Number.isNaN 정적 메서드는 인수로 전달된 숫자값이 NaN인지 검사하여 그 결과를 불리언 값으로 반환한다. 

- 빌트인 전역함수 isNaN은 전달받은 인수를 암묵적 타입 변환해 검사를 수행하지만 Number.isNaN는 전달받은 인수를 숫자로 암묵적 타입변환 하지 않는다.
- 따라서, 숫자 이외의 인수는 언제나 false를 반환한다.

<br>

#### 28.3.4 Number.isSafeInteger

Number.isSafeInteger 정적 메서드는 인수로 전달된 숫자값이 안전한 정수인 검사하여 그 결과를 불리언 값으로 반환한다.

- 안전한 정수값은 -(253-1)과 253-1사이의 정수값이다. ?
- 암묵적 타입 변환을 하지 않는다.

<br>

#### 28.3.5 Number.prototype.toExponential

toExponential 메서드는 숫자를 지수 표기법으로 변환하여 문자열로 반환한다.

```javascript
(77.1234).toExponential(); // "7.71234e+1" 
(77.1234).toExponential(4); // "7.7123e+1"
(77.1234).toExponential(2); // "7.71e+1"

77.toExponential(); // 숫자 리터럴과 사용할 경우 SyntaxError: 부동 소수점인지 프로퍼티 접근 연산자인지 구분하지 못하기 때문이다.
77.1234.toExponential(); // "7.71234e+1" // 숫자에 소수점은 하나만 존재하므로 두 번째 .은 프로퍼티 접근 연산자로 해석된다.
(77).toExponential();// "7.7e+1": 그룹 연산자와 함께 사용하는 것이 권장되는 방법이다.
77 .toExponential();// "7.7e+1": 숫자 뒤 공백으로 인해 프로퍼티 접근 연산자로 해석 가능
```

<br>

#### 28.3.6 Number.prototype.toFixed

toFixed 메서드는 숫자를 반올림하여 문자열로 반환한다.

- 반올림하는 소수점 이하 자릿수를 나타내는 0~20 사이의 정수값을 인수로 전달할 수 있다.
- 인수를 생략하면 기본값이 0이다.

```javascript
(12345.6789).toFixed(); // '12346'
```

<br>

#### 28.3.7 Number.prototype.toPrecision

toPrecision 메서드는 인수로 전달받은 전체 자릿수까지 유효하도록 나머지 자릿수를 반올림하여 문자열로 반환한다.

- 인수로 전달받은 전체 자릿수로 표현할 수 없는 경우 지수표기법으로 결과를 반환한다.
- 인수를 생략하면 기본값이 0이다.

```javascript
(12345.6789).toPrecision(2) // "1.2e+4"
```

<br>

#### 28.3.8 Number.prototype.toString

toString 메서드는 숫자를 문자열로 변환하여 반환한다.

- 진법을 나타내는 2~36 사이의 정수값을 인수로 전달할 수 있다.
- 인수를 생략하면 기본값 10진법이 지정된다.