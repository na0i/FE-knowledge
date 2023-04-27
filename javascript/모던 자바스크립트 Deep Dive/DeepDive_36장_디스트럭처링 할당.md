## 36장 디스트럭처링 할당

`디스트럭처링 할당(구조 분해 할당)`은 이터러블 또는 객체를 비구조화하여 1개 이상의 변수에 개별적으로 할당하는 것을 말한다. 필요한 값만을 추출하여 변수에 할당할 때 유용하다.

<br>

### 36.1 배열 디스트럭처링 할당

##### 배열 디스트럭처링 할당 특징
- 할당의 대상은(우변)은 이터러블이어야 하며, 할당 기준은 인덱스다.
- 할당 연산자 왼쪽(좌변)에 할당받을 변수를 선언해야 하며, 변수를 배열 리터럴 형태로 선언한다.
- 할당의 기준은 배열의 인덱스로 순서대로 할당된다.
- 변수의 개수와 이터러블 요소 개수가 일치할 필요는 없다.
- 변수에 기본 값을 설정할 수 있으며 기본값보다 할당 값이 우선이다.
- 할당을 위한 변수에 Rest 파라미터와 유사하게 Rest 요소를 사용할 수 있다.(반드시 마지막에 위치)

```javascript
const arr = [1, 2, 3];

const [one, two, three] = [1, 2, 3];

const [e, f] = [1, 2, 3]; // 1 2

const [a, b, c = 3] = [1, 2]; // a - 1, b - 2, c - 3
const [e, f = 10, g = 3] = [1, 2]; // e - 1, f - 2, g - 3

const [x, ...y] = [1, 2, 3]; // x - 1, y = [2, 3]
```

<br>

### 36.2 객체 디스트럭처링 할당

##### 객체 디스트럭처링 할당의 특징
- 객체의 각 프로퍼티를 객체로부터 추출하여 1개 이상의 변수에 할당한다.
- 할당의 대상(우변)은 객체여야 한다.
- 할당 기준은 프로퍼티 키다.(순서는 의미 x)
- 할당 연산자 왼쪽(좌변)에 프로퍼티 값을 할당받을 변수를 선언해야 하며, 변수를 객체 리터럴 형태로 선언한다.
- 변수에 기본값을 설정할 수 있다.
- 객체를 인수로 전달받는 함수의 매개변수에도 사용할 수 있다.
- 중첩 객체에도 사용 가능하다.
- 할당을 위한 변수에 Rest 파라미터와 Rest 요소와 같이 Rest 프로퍼티를 사용할 수 있다.

```javascript
const user = { firstName: 'Nayoung', lastName: 'Park' };

const { firstName, lastName } = user;

const { firstName: fn, lastName: ln } = user;

const { firstName = 'Jeongmin' , lastName } = { lastName: 'Lee' };

function printTodo({ content, completed }) {
	console.log(content, completed); // deepdive 비완료
}

const user = {
	name: 'Ny',
	address: {
		zipCode: '111',
		city: 'YeongTong',
	}
}
const { address: { city }} = user;

const { x, ...rest } = { x: 1, y: 2, z: 3 }; // x - 1, rest: { y: 2, z: 3 }
```