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

#### 2.5.2 async/await

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