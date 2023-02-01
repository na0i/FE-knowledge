## 21장 빌트인 객체

### 21.1 자바스크립트 객체의 분류

자바스크립트 객체는 3개의 객체로 분류할 수 있다.

##### 표준 빌트인 객체
- ECMAScript 사양에 정의된 객체
- 애플리케이션 전역의 공통 기능 제공
- 자바스크립트 실행 환경과 관계없이 사용 가능 ?
- 전역 객체의 프로퍼티로 제공
- 별도의 선언 없이 전역 변수처럼 참조 가능

<br>

##### 호스트 객체
- ECMAScript 사양에 정의되어 있지 않지만 자바스크립트 실행 환경(브라우저나 Node.js 환경)에서 추가적으로 제공하는 객체

<br>

##### 사용자 정의 객체
- 기본 제공되는 객체가 아닌 사용자가 직접 정의한 객체

<br>

### 21.2 표준 빌트인 객체

> Object, String, Number, Boolean, Symbol, Date, Math, RegExp, Array, Map/Set, WeakMap/WeakSet, Function, Promise, Reflect, Proxy, JSON, Error

<br>

표준 빌트인 객체 중 Math, Reflect, JSON을 제외하고는 모두 인스턴스를 생성할 수 있는 생성자 함수 객체다.

- 생성자 함수 객체인 표준 빌트인 객체: 프로토타입 메서드 + 정적 메서드 제공
- 생성자 함수 객체가 아닌 표준 빌트인 객체: 정적 메서드만 제공

##### 예시

```javascript
const numObj = new Number(1.5);

// toFixed는 Number.prototype의 프로토타입 메서드
console.log(numObj.toFixed());

// isInteger는 Number의 정적 메서드
// 인스턴스 없이 정적으로 호출 가능
console.log(Number.isInteger(0.5));
```

<br>

### 21.3 원시값과 래퍼 객체

원시값은 객체가 아니므로 프로퍼티나 메서드를 가질 수 없다.

```javascript
const str = 'hello';

console.log(str.length);
console.log(str.toUpperCase());
```

하지만 위 예시에서는 원시타입인 문자열이 프로퍼티와 메서드를 갖고 있는 객체처럼 동작했다.

<br>

자바스크립트 엔진은 원시값에 대해 객체처럼 마침표 표기법(혹은 대괄호 표기법)으로 접근하면 일시적으로 원시값을 연관된 객체로 변환해준다. 원시값을 객체처럼 사용하면 자바스크립트 엔진이 암묵적으로 연관된 객체를 생성하여 생성된 객체로 프로퍼티에 접근하거나 메서드를 호출하고 다시 원시값으로 되돌린다.

> #### 래퍼객체
> 문자열, 숫자, 불리언 값에 대해 객체처럼 접근하면 생성되는 임시 객체

<br>

##### 예시

```javascript
const str = 'hello';
    
// 원시값에 대해 마침표 표기법으로 접근 → 암묵적으로 생성된 래퍼 객체를 가리킨다.
// hello는 래퍼객체의 [[StringData]] 내부 슬롯에 할당
// 래퍼 객체에 name 프로퍼티가 동적 추가
str.name = 'Lee';
    
// 식별자 str은 다시 원래의 원시값을 갖는다.
// 래퍼 객체는 가비지 컬렉션의 대상이 된다.
    
// 식별자 str은 새롭게 암묵적으로 생성된 래퍼 객체를 가리킨다.(위에서 가리킨 래퍼객체 X)
// 새롭게 생성된 래퍼 객체에는 name 프로퍼티 존재 X
console.log(str.name); // undefined
    
// 식별자 str은 다시 원래의 원시값을 가진다.
// 새롭게 생성된 래퍼 객체도 가비지 컬렉션의 대상이 된다.
console.log(typeof str, str); // string hello
```

<img width="342" alt="스크린샷 2023-01-30 오전 9 37 59" src="https://user-images.githubusercontent.com/77482972/216053862-bd86ab25-46cb-403b-a7dd-3c72c3152350.png">

<br>

이처럼 문자열, 숫자, 불리언, 심벌은 암묵적으로 생성되는 래퍼 객체에 의해 마치 객체처럼 사용할 수 있으며 표준 빌트인 객체의 프로토타입 메서드 또는 프로퍼티를 참조할 수 있다.<br>
단, null과 undefined는 래퍼 객체를 생성하지 않으므로 객체처럼 사용하면 에러가 발생한다.

<br>

### 21.4 전역 객체

##### 전역 객체
- 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수 객체
- 어느 객체에도 속하지 않은 최상위 객체
- 브라우저 환경에서는 window(self, this, frames)가 전역 객체를 가리키고, Node.js 환경에서는 global이 전역 객체를 가리킨다.
- 전역 객체는 계층적 구조상 어떤 객체에도 속하지 않은 모든 빌트인 객체의 최상위 객체
- 전역 객체는 개발자가 의도적으로 생성 불가능하다.
- 전역 객체 프로퍼티를 참조할 때 window나 global을 생략할 수 있다.

<br>

#### 21.4.1 빌트인 전역 프로퍼티

빌트인 전역 프로퍼티: 전역 객체의 프로퍼티로 애플리케이션 전역에서 사용하는 값을 제공

<br>

> Infinity, NaN, undefined

<br>

#### 21.4.2 빌트인 전역 함수

빌트인 전역 함수: 애플리케이션 전역에서 호출할 수 있는 빌트인 함수, 전역 객체의 메서드

<br>

> **eval**<br>
> 전달받은 문자열 코드를 평가 또는 실행<br>
> 사용이 금지된다.

<br>

> **isFinite**<br>
> 전달받은 인수가 유한수(암묵적 타입 변환 실행)이면 true, 무한수나 NaN이면 false
> isFinite(null)은 true: null > 0 > true

<br>

> **isNaN**<br>
> 전달받은 인수(암묵적 타입 변환 실행)가 NaN인지 검사하여 불리언 타입으로 반환

<br>

> **parseFloat**<br>
> 전달받은 문자열 인수를 실수로 해석해 반환

<br>

> **parseInt**<br>
> 전달받은 문자열 인수를 정수로 해석해 반환

<br>

> **encodeURI / decodeURI**<br>
> encodeURI: 완전한 URI를 문자열로 전달받아 이스케이프 처리를 위해 인코딩<br>
> 이스케이프 처리란 네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 아스키 문자 셋으로 변환하는 것이다.
> URL은 아스키 문자 셋으로만 구성되어야 하므로 한글을 포함한 외국어나 문자를 이스케이프 처리하여 문제를 예방한다.
> <br>
> decodeURI: 인코딩된 URI를 인수로 전달받아 이스케이프 처리 이전으로 디코딩

<br>

> **encodeURIComponent / decodeURIComponent**<br>
> encodeURIComponent는 URI 구성 요소를 인코딩<br>
> decodeURIComponent는 URI 구성 요소를 디코딩<br>

<br>

#### 21.4.3 암묵적 전역

```javascript
var x = 10; // 전역 변수

function foo () {
	y = 20; // window.y = 20;
	console.log(x + y);
}
    
foo(); // 30
    
console.log(window.x); // 10
console.log(window.y); // 20
    
delete x;
delete y;
    
console.log(window.x); // 10(전역 변수는 삭제 X)
console.log(window.y); // undefined(전역 객체 프로퍼티는 삭제)
```

##### 암묵적 전역

foo 함수 내부의 y는 전역 객체의 프로퍼티가 된다.
- 자바스크립트 엔진은 y = 20을 window.y = 20으로 해석
- 전역 객체의 프로퍼티에 동적 생성
- 마치 전역 변수처럼 동작

<br>

하지만 y는 단지 전역 객체의 프로퍼티로 추가되었을 뿐, 변수가 아니므로 변수 호이스팅이 발생하지는 않으며 변수가 아니므로 delete 연산자로 삭제할 수 있다.(전역 변수는 delete 연산자로 삭제 불가능)