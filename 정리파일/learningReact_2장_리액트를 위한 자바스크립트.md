## 2장 리액트를 위한 자바스크립트

#### 2.2.4 화살표 함수

##### 객체 반환하기

- 반환하려는 객체를 괄호로 둘러싼다.

<br>

##### 화살표 함수와 영역

- 일반 함수는 this를 새로 바인딩
- 화살표 함수는 this의 영역이 제대로 유지

```javascript
const gangwon = {
	resorts: ['용평', '평양', '강촌'],
	print: function(delay = 1000) {
		setTimeout(function(){
			console.log(this.resort.join(','));
		}, delay)
	}
};

gangwon.print(); // 오류
// this가 window 객체임
// 화살표 함수로 setTimeout을 작성할 경우 제대로 동작
```

<br>

#### 2.3 자바스크립트 컴파일하기

컴파일링: 브라우저에서 코드를 실행하기 전에 더 호환성이 높은 코드로 변환하는 것<br>
가장 유명한 js 컴파일링 도구는 바벨이 있다.<br>

<br>
바벨을 통해 최신 js 기능을 바로 사용할 수 있다.<br>
바벨은 "use strict" 선언을 맨 위에 추가 → 코드가 엄격한 모드에서 실행되도록 함<br>

<br>

#### 2.4.1 구조 분해를 사용한 대입

객체 필드에 접근하기 위해 점(.)이나 필드 이름을 사용하는 대신, 구조 분해로 가져올 수 있음

```javascript
var lordify = ({firstname}) =>
	console.log(`${firstname} of canterbury`)

var regularPerson = {
	firstname: "Dale",
	lastname: "Smith"
}

lordify(regularPerson)
```

<br>

#### 2.4.2 배열 구조 분해하기

##### 리스트 매칭

불필요한 값을 콤마를 사용해 생략

```javascript
var [,,thirdResort] = ["Kirkwood", "Squaw", "Alpine"]

console.log(thirdResort) // Apline
```

<br>

#### 2.4.3 객체 리터럴 개선

구조 분해의 반대<br>
```javascript
const name = '나영';
const age = '27'

const info = {name, age};
console.log(info); // {name: '나영', age: '27'}
```

<br>

#### 2.4.4 스프레드 연산자

스프레드 연산자: 3개의 점(...)으로 이뤄진 연산자<br>
1. 배열 내용 조합: [...arr1, ...arr2]
2. 복사 [...arr]
3. 배열의 나머지 원소 얻기: [first, ...remaining]
4. 함수의 인자를 배열로 모으기: (...args)

<br>

#### 2.5 비동기 자바스크립트
동기적
- 일련의 명령이 순서대로 실행
- 각 연산이 일어나는 동안 다른 어떤 일도 벌어질 수 X

<br>

비동기적
- api가 데이터를 반환할 때까지 자바스크립트는 자유롭게 다른 일을 할 수 있음

<br>

#### 2.5.1 단순한 프라미스와 fetch

프라미스: 자바스크립트에서 비동기적인 동작을 잘 처리할 수 있게 해줌<br>
대기중인 프라미스는 데이터가 도착하기 전의 상태를 나타냄<br>
.then()은 콜백 함수를 인자로 받고 프라미스가 성공하면 콜백 함수가 호출<br>
**fetch()는 데이터를 받아오고, then()은 데이터가 도착하면 그 데이터를 가지고 다른 일을 함**<br>
콜백함수가 반환하는 값은 그 다음에 오는 then 함수 콜백에 전달되는 인자가 된다. → then 함수 연쇄 호출 가능

```javascript
fetch("https://url)
	.then(res => res.json())
	.then(json => json.results)
	.then(console.log);
	.catch(console.err);
```

<br>

#### 2.5.2 async/await

then 함수를 연쇄 호출해서 프라미스 결과를 기다리는 대신<br>
async 함수는 프라미스가 끝날 때까지 기다리라고 명령할 수 있음<br>

- 비동기 프라미스를 처리하는 방법 중 하나로 async 함수가 있다.

- async 키워드는 함수를 비동기 함수로 만들어준다.
- 프라미스 호출 앞에 await을 붙이면 프라미스가 완료될 때까지 기다렸다가 함수가 진행된다.
- async과 await을 사용할 때는 프라미스 호출 주변을 try...catch 블록으로 둘러싼다.

<br>

#### 2.7 ES6 모듈

- export를 사용해 다른 모듈에서 활용하도록 외부에 익스포트 할 수 있다.
- 모듈에서 단 하나의 이름만을 외부에 익스포트 하고 싶을 때는 export default를 사용
- import를 사용해 다른 파일에 있는 모듈을 불러와 사용
- import 시 객체 구조 분해를 활용 가능