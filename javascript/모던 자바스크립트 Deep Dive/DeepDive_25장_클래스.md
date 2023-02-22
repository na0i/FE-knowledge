## 25장 클래스

### 25.1 클래스는 프로토타입의 문법적 설탕인가?

자바스크립트는 프로토타입 기반 객체지향 언어이기 때문에 클래스가 필요하지 않다. 하지만 클래스를 도입함으로써 클래스 기반 객체지향 프로그램이 언어와 흡사한 새로운 객체 생성 메커니즘을 제시한다. 

<br>

사실 클래스는 함수이며 기존 프로토타입 기반 패턴을 클래스 기반 패턴처럼 사용할 수 있도록 하는 문법적 설탕이다. 생성자 함수와 클래스는 프로토타입 기반의 객체지향을 구현했다는 점에서 매우 유사하지만 몇 가지 차이가 있다.

<br>

### 25.2 클래스 정의

클래스는 class 키워드를 사용하여 정의한다.

```javascript
// 클래스 선언문
class Person {};

// 익명 클래스 표현식
const Person = class {};

// 기명 클래스 표현식
const Person = class MyClass {};
```

클래스는 함수이고 표현식으로 사용할 수 있기 때문에 일급 객체이다. 즉, 클래스는 값처럼 사용할 수 있다.
> 일급 객체로서의 특징
> - 무명의 리터럴로 생성 가능하다. 런타임에 생성 가능하다.
> - 변수나 자료구조에 저장할 수 있다.
> - 함수의 매개변수에 전달할 수 있다.
> - 함수의 반환값으로 사용할 수 있다.

<br>

클래스 몸체에는 **0개 이상의 메서드만 정의할 수 있으며**, constructor, 프로토타입 메서드, 정적 메서드 세 가지가 있다.

```javascript
class Person {
	constructor(name) {
		this.name = name;
	}

	sayHi() {
		console.log(`My name is ${this.name}`);
	}

	static sayHello() {
		console.log('Hello!');
	}
}

const me = new Person('Lee');
me.sayHi(); // My name is Lee
Person.sayHello(); // Hello!
``` 

<br>

##### 클래스와 생성자 함수의 정의 방식 비교

형태적인 면에서 큰 차이가 없다.

<img width="1033" alt="스크린샷 2023-02-22 오전 1 19 40" src="https://user-images.githubusercontent.com/77482972/220400934-12955717-1977-4959-8084-265e1c605348.png">

<br>

### 25.3 클래스 호이스팅

클래스는 함수이다. 따라서 클래스 선언문으로 정의된 클래스는 (함수 선언문과 같이) 런타임 이전에(소스 코드 평가 과정) 함수 객체를 생성한다. 이때 생성된 함수 객체(클래스)는 constructor(생성자 함수로서 호출할 수 있는 함수)고, 프로토타입도 더불어 생성된다.
> 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 쌍으로 존재하기 때문이다.

<br>

클래스 선언문도 변수 선언, 함수 정의와 마찬가지로 호이스팅이 발생하지만, 클래스는 let, const 키워드로 선언한 변수처럼 호이스팅된다. 따라서, 선언문 이전에 TDZ에 빠지기 때문에 호이스팅이 발생하지 않는 것처럼 동작한다.
> var, let, const, function, class 키워드를 사용하여 선언된 모든 식별자는 호이스팅된다.

<br>

### 25.4 인스턴스 생성

클래스는 생성자 함수이며 new 연산자와 함께 호출되어 인스턴스를 생성한다.

```javascript
// 클래스 선언문
class Person {}
const me = Person();

// 클래스 표현식
const Person = class MyClass {};
const me = new Person();
const you = new MyClass(); // ReferenceError
console.log(MyClass); // ReferenceError
```

클래스 표현식으로 정의된 클래스 또한 기명 함수 표현식과 마찬가지로 클래스 표현식 내 클래스 이름은 외부 코드에서 접근 불가능하다. 클래스를 가리키는 식별자로 인스턴스를 생성해야 한다.

<br>

### 25.5 메서드

클래스 몸체에는 메서드만 선언할 수 있다.

#### 25.5.1 constructor

- constructor 메서드는 인스턴스를 생성하고 초기화하기 위한 특수한 메서드다.
- constructor는 이름을 변경할 수 없다.

##### 클래스 예시
```javascript
class Person {
	constructor(name) {
		this.name = name;
	}
}
```

![스크린샷 2023-02-22 오후 7 18 11](https://user-images.githubusercontent.com/77482972/220591246-74671b38-0a0d-4871-bca3-e906a5f55a56.png)

클래스는 평가되어 함수 객체가 되고 함수 객체 고유의 프로퍼티를 모두 가지고 있다. 이 때 prototype 프로퍼티가 가리키는 프로토타입 객체의 constructor 프로퍼티는 자기 자신을 가리키고 있다. 즉, 클래스가 인스턴스를 생성하는 생성자 함수라는 것을 의미한다.

<br>

##### 인스턴스 예시
```javascript
const me = new Person('Lee');
```

![스크린샷 2023-02-22 오후 7 20 57](https://user-images.githubusercontent.com/77482972/220591950-46ea7a6a-dcc6-421c-9444-2e7fa1136b9c.png)

클래스의 constructor 내부에서 추가한 프로퍼티(name)가 클래스가 생성한 인스턴스의 프로퍼티로 추가되었다. 클래스의 contructor 메서드의 this는 생성자 함수와 마찬가지로 클래스가 생성한 인스턴스를 가리킨다.

<br>

이 때 흥미로운 점은 constructor 메서드가 보이지 않는다는 것이다. constructor는 메서드로 해석되지 않고 클래스가 평가되어 생성한 함수 객체 코드의 일부가 되기 때문이다. **클래스 정의가 평가되면 constructor에 기술된 동작을 하는 함수 객체가 생성된다는 뜻이다.** 
> 클래스의 constructor 메서드와 프로토타입의 constructor 프로퍼티는 이름만 같을 뿐 관련이 없다. 프로토타입의 constructor 프로퍼티는 모든 프로토타입이 가지고 있는 프로퍼티로 생성자 함수를 가리킨다.
<br>

##### constructor 특징
1. 클래스 내에 최대 1개만이 존재한다.<br>
만약 constructor가 생략되면 빈 constructor가 암묵적으로 정의된다.

<br>

2. 프로퍼티가 추가되어 초기화된 인스턴스를 생성하려면 constructor 내부에서 this에 인스턴스 프로퍼티를 추가한다.<br>

<br>

3. 인스턴스를 생성할 때 클래스 외부에서 인스턴스 프로퍼티의 초기값을 전달하려면 constructor에 매개변수를 선언하고 인스턴스를 생성할 때 초기값을 전달하면 된다.<br>
따라서 인스턴스를 초기화하려면 constructor를 생략해서는 안된다.
```javascript
class Person {
	constructor (name, address) {
		this.name = name;
		this.address = address;
	}
}

const me = new Person('Lee', 'Seoul');
```

<br>

4. contructor는 별도의 반환문을 갖지 않아야 한다.<br>
new 연산자와 함께 클래스가 호출되면 생성자 함수와 동일하게 암묵적으로 this(인스턴스)를 반환하기 때문이다.
> return 문에 명시적으로 객체를 반환하면 객체가 반환 되고, 원시값을 반환하면 무시하고 this가 반환된다.

<br>

#### 25.5.2 프로토타입 메서드

클래스 몸체에서 정의한 메서드는 생성자 함수처럼 prototype 프로퍼티에 메서드를 추가하지 않아도 기본적으로 프로토타입 메서드가 된다. 또한, 생성자 함수와 마찬가지로 클래스가 생성한 인스턴스는 프로토타입 체인의 일원이 된다. 

<br>

**즉, 생성자 함수의 역할을 클래스가 할 뿐이다.** 클래스는 생성자 함수와 마찬가지로 프로토타입 기반의 객체 생성 매커니즘이다.

<br>

##### 예시

```javascript
class Person {
	constructor (name, address) {
		this.name = name;
		this.address = address;
	}

	sayHi() {
		console.log(`Hi My name is ${this.name}`)
	}
}

const me = new Person('Lee', 'Seoul');

Object.getPrototypeOf(me) === Person.prototype; // true
me instanceof Person; // true
```

<br>

#### 25.5.3 정적 메서드

정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있는 메서드다. 클래스에서는 메서드에 `static` 키워드를 붙이면 정적 메서드가 된다.

```javascript
class Person {
	constructor(name) {
		this.name = name;
	}

	static sayHi() {
		console.log('Hi');
	}
}

```

클래스는 함수 객체로 평가되므로 자신의 프로퍼티/메서드를 소유할 수 있고, 정적 메서드는 클래스에 바인딩된 메서드가 된다. 정적 메서드는 클래스 정의 이후 인스턴스를 생성하지 않아도 호출할 수 있다.

<br>

**정적 메서드는 인스턴스로 호출할 수 없다.** 정적 메서드가 바인딩된 클래스는 인스턴스의 프로토타입 체인 상에 존재하지 않기 때문이다.

![스크린샷 2023-02-22 오후 8 34 15](https://user-images.githubusercontent.com/77482972/220608667-f91b488f-7b12-4880-ac31-efda8333b7b1.png)


<br>

#### 25.5.4 정적 메서드와 프로토타입 메서드의 차이

1. 정적 메서드와 프로토타입 메서드는 자신이 속해 있는 프로토타입 체인이 다르다.
2. 정적 메서드는 클래스로 호출하고, 프로토타입 메서드는 인스턴스로 호출한다.
3. 정적 메서드는 인스턴스 프로퍼티를 참조할 수 없지만, 프로토타입 메서드는 인스턴스 프로퍼티를 참조할 수 있다.

##### 정적 메서드 예시
```javascript
class Square {
	static area(width, height) {
		return width * height;
	}
}

console.log(Square.area(10, 10));
```

- 정적 메서드는 인스턴스 프로퍼티를 참조하지 않는다.
- 정적 메서드 내부의 this는 인스턴스가 아닌 클래스를 가리킨다.<br>
why? 메서드 내부의 this는 메서드를 호출한 객체를 가리키므로 정적 메서드 내부의 this는 Square 객체를 가리킨다.
- 따라서, 인스턴스 프로퍼티를 참조해야 한다면 프로토타입 메서드로 정의해야 한다.
- 정적 메서드인 Math.max도 인스턴스와 상관없이 동작한다. 이처럼 정적 메서드는 애플리케이션 전역에서 사용할 유틸리티 함수를 메서드로 구조화?할 때 유용하다?

<br>

##### 프로토타입 메서드 예시
```javascript
class Square {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}

	area () {
		return this.width * this.height;
	}
}
```

- 프로토타입 메서드는 인스턴스로 호출하므로 프로토타입 메서드 내부의 this는 인스턴스를 가리킨다.
- 따라서, 메서드 내부에서 인스턴스 프로퍼티를 참조할 필요가 있다면 프로토타입 메서드로 정의해야 한다.
- 인스턴스를 생성한 다음 인스턴스로 호출해야하므로 this를 사용하지 않는 메서드는 정적 메서드로 정의하는 것이 좋다.

<br>

#### 25.5.5 클래스에서 정의한 메서드의 특징

1. function 키워드를 생략한 메서드 축약 표현을 사용한다.
2. 메서드를 정의할 때 콤마가 필요 없다.
3. 암묵적으로 strict mode로 실행된다.
4. for ...in 문, Object.keys로 열거 할 수 없다.<br>
[[Enumerable]] 값이 false다.
5. new 연산자로 호출할 수 없는 non-constructor다.

<br>

### 25.6 클래스의 인스턴스 생성 과정

#### 1. 인스턴스 생성과 this 바인딩
→ new 연산자와 함께 클래스 호출<br>
→ 암묵적으로 빈 객체 생성(완성되지 않은 인스턴스)<br>
→ 빈 객체(인스턴스)의 프로토타입으로 클래스의 prototype 프로퍼티가 가리키는 객체 설정<br>
→ 빈 객체(인스턴스)는 this에 바인딩: constructor 내부의 this는 클래스가 생성한 인스턴스를 가리킨다.

<br>

#### 2. 인스턴스 초기화
> constructor가 생략되면 이 과정도 생략된다.

→ constructor 내부 코드 실행<br>
→ this에 바인딩 되어 있는 인스턴스를 초기화: 프로퍼티를 추가하고, 인수로 전달받은 초기값으로 프로퍼티 값을 초기화<br>

<br>

#### 3. 인스턴스 반환
→ 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환

<br>

##### 예시
```javascript
class Person {
	constructor(name) {
		// 1. 빈 객체(인스턴스)가 생성 + this 바인딩
		console.log(this); // Person {}
		console.log(Object.getPrototypeOf(this) === Person.prototype);
		
		// 2. 인스턴스 초기화
		this.name = name;
	}

	// 3. 완성된 인스턴스 반환
}
```

<br>

### 25.7 프로퍼티

#### 25.7.1 인스턴스 프로퍼티

constructor 내부에서 this에 추가한 프로퍼티는 클래스가 생성한 인스턴스의 프로퍼티가 된다. ES6의 클래스는 접근 제한자(ex. private, public, protected)를 지원하지 않기 때문에, **인스턴스 프로퍼티는 언제나 public하다.**

<br>

#### 25.7.2 접근자 프로퍼티

접근자 프로퍼티는 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용되는 접근자 함수로 구성된 프로퍼티로, 클래스에서도 사용할 수 있다.

<br>

##### getter
- 메서드 이름 앞에 get을 사용해 정의한다.
- 인스턴스 프로퍼티에 접근할 때 사용한다.
- 호출하는 것이 아니라 참조하는 형식으로 사용된다.
- 무언가를 취득할 때 사용하므로 반드시 반환해야 한다.

##### setter
- 메서드 이름 앞에 set을 사용해 정의한다.
- 인스턴스 프로퍼티에 값을 할당할 때 사용한다.
- 호출하는 것이 아니라 할당하는 형식으로 사용된다.
- 할당해야 할 때 사용하므로 반드시 매개변수가 필요하다.

<br>

클래스의 메서드는 기본적으로 프로토타입 메서드이므로 **접근자 프로퍼티 또한 프로토타입의 프로퍼티**가 된다.

![스크린샷 2023-02-22 오후 9 21 25](https://user-images.githubusercontent.com/77482972/220618264-58e195e6-23e8-43b1-99da-57e87db9525e.png)

<br>

```javascript
class Person {
	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	get fullName() {
		return `${this.firstName} ${this.lastName}`
	}

	set fullName(name) {
		[this.firstName, this.lastName] = name.split(' ');
	}
}

const me = new Person('Nayoung', 'Park');
console.log(`${me.firstName} ${me.lastName}`) // Nayoung Park

me.fullName = 'Gayoung Park'; // setter 함수 호출
console.log(me); // {firstName: "Gayoung", lastName: "Park"}
console.log(me.fullName); // getter 함수 호출, Gayoung Park
```

<br>

#### 25.7.3 클래스 필드 정의 제안

클래스 필드는 클래스 기반 객체지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티를 가리키는 용어다. 최근 자바스크립트에서도 인스턴스 프로퍼티를 클래스 필드처럼 정의할 수 있는 새로운 표준 사양이 제안되어 있다.
> 최신 브라우저와 최신 Node.js는 선제적으로 구현되어 있기 떄문에 사용할 수 있지만 ECMAScript의 정식 표준 사양으로 승급되지는 않았다.

<br>


```javascript
class Person {
	// 클래스 필드 정의
	name = 'Lee';
}

const me = new Person();
console.log(me);
```

<br>

클래스 필드를 정의하는 경우 this에 클래스 필드를 바인딩해서는 안된다. this는 클래스의 constructor와 메서드 내에서만 유효하다. 또한, 클래스 필드를 참조하는 경우에는 this를 반드시 사용해야 한다.

```javascript
class Person {
	this.name = ""; // SyntaxError
}

class Person {
	name = 'Lee';

	constructor() {
		console.log(name); // ReferenceError
	}
}
```

<br>

클래스 필드에 초기값을 할당하지 않으면 undefined를 갖는다. 

<br>

인스턴스를 생성할 때 외부의 초기값으로 클래스 필드를 초기화 해야 한다면 constructor에서 클래스 필드를 초기화해야 한다. 따라서, 인스턴스 생성 시 클래스 필드를 초기화할 필요가 있다면 클래스 필드를 사용할 필요가 없다. 

```javascript
class Person {
	name;

	constructor(name) {
		this.name = name;
	}
}

const me = new Person('Lee');
```

<br>

함수는 일급 객체이므로 함수를 클래스 필드에 할당할 수 있다. 따라서, 클래스 필드를 통해 메서드를 정의할 수도 있다.

```javascript
class Person {
	name;

	getName = function () {
		return this.name;
	}
}

const me = new Person('Lee');
```

<br>

클래스 필드에 함수를 할당하는 경우, 이 함수는 인스턴스 메서드가 된다. **모든 클래스 필드는 인스턴스 프로퍼티가 되기 때문이다.** 따라서, 클래스 필드에 함수를 할당하는 것은 권장하지 않는다.

<br>

#### 25.7.4 private 필드 정의 제안

자바스크립트는 캡슐화를 완전하게 지원하지 않는다. 인스턴스 프로퍼티는 인스턴스를 통해 클래스 외부에서 언제나 참조할 수 있는 public 상태이다. 클래스 정의 제안을 사용하더라도 마찬가지다. 다만, private 필드를 정의할 수 있는 새로운 표준 사양이 제안되어 있다.

<br>

##### private 사용법
- private 필드 선두에 #을 붙여준다.
- private 필드를 참조할 때도 #을 붙여주어야 한다.

<br>

```javascript
class Person {
	#name = '';

	constructor(name) {
		this.#name = name;
	}
}

const me = new Person('Lee');

console.log(me.#name); // SyntaxError: private 필드는 클래스 외부에서 참조할 수 없기 때문이다.
```

![스크린샷 2023-02-22 오후 10 16 53](https://user-images.githubusercontent.com/77482972/220631090-39561734-4804-4401-b79b-05dd7ea31edb.png)


private 필드는 클래스 내부에서만 참조할 수 있다. 다만, 접근자 프로퍼티를 통해 간접적으로 접근할 수는 있다.

```javascript
class Person {
	#name = '';

	constructor(name) {
		this.#name = name;
	}

	get name() {
		return this.#name.trim();
	}
}

const me = new Person('Lee');
console.log(me.name);; // Lee
```

private 필드는 반드시 클래스 몸체에 정의해야 한다. private 필드를 constructor에 정의하면 에러가 발생한다.

```javascript
class Person {
	constructor(name) {
		this.#name = name; // SyntaxError
	}
}

```

<br>

#### 25.7.5 static 필드 정의 제안

클래스에는 static 키워드를 사용하여 정적 메서드를 정의할 수 있지만 static 키워드로 정적 필드를 정의할 수는 없었다. 하지만, `static public 필드`, `static private 필드`, `static private 메서드`를 정의할 수 있는 새로운 표준 사양이 제안되어 있다.

<br>

### 25.8 상속에 의한 클래스 확장

#### 25.8.1 클래스 상속과 생성자 함수 상속

프로토타입 기반 상속과 상속에 의한 클래스 확장은 다른 개념이다.
- **프로토타입 기반 상속**: 프로토타입 체인을 통해 다른 객체의 자산을 상속
- **상속에 의한 클래스 확장**: 기존 클래스를 상속받아 새로운 클래스를 확장하여 정의

<br>

```javascript
class Animal {
	constructor(age, weight) {
		this.age = age;
		this.weight = weight;
	}

	eat() { return 'eat'; }
	
	move() { return 'move'; }
}

class Bird extends Animal {
	fly() { return 'fly' }
}

const bird = new Bird(1, 5);

console.log(bird instanceof Bird); // true
console.log(bird instanceof Animal); // true

console.log(bird.eat());
console.log(bird.move());
console.log(bird.fly());
```

![스크린샷 2023-02-22 오후 10 34 02](https://user-images.githubusercontent.com/77482972/220634867-11b117ce-4366-4ea4-9437-79a0d1da112f.png)

<br>

클래스는 상속을 통해 다른 클래스를 확장할 수 있는 문법인 `extends` 키워드가 제공된다. 생성자 함수는 상속을 통해 다른 생성자 함수를 확장할 수 있는 문법이 제공되지 않는다.

<br>

#### 25.8.2 extends 키워드

상속을 통해 클래스를 확장하려면 extends 키워드를 사용해 상속받을 클래스를 구현한다.

##### 수퍼클래스
- 서브클래스에 상속될 클래스를 수퍼클래스라 부른다.
- 베이스 클래스, 부모 클래스로 부르기도 한다.

##### 서브클래스
- 상속을 통해 확장된 클래스를 서브클래스라 부른다.
- 파생 클래스, 자식 클래스라고 부르기도 한다.

<br>

**extends 역할은 수퍼클래스와 서브클래스 간의 상속 관계를 설정하는 것이다.** 클래스도 프로토타입을 통해 상속 관계를 구현한다. 수퍼클래스와 서브클래스는 인스턴스의 프로토타입 체인 뿐만 아니라 클래스 간의 프로토타입 체인도 생성하기 때문에 프로토타입 메서드, 정적 메서드 모두 상속이 가능하다.


![스크린샷 2023-02-22 오후 10 40 20](https://user-images.githubusercontent.com/77482972/220636371-60b9bd98-e063-4f47-8363-87c893042844.png)

<br>

#### 25.8.3 동적 상속

extends 키워드는 생성자 함수를 상속받아 클래스를 확장할 수 있다. 단, extends 앞에는 반드시 클래스가 와야한다.(상속받는 대상은 언제나 클래스여야한다.)

```javascript
class Base(a) {
	this.a = a;
}

class Derived extends Base {}

const derived = new Derived(1);
console.log(derived); // Derived {a: 1}
```

<br>

extends 키워드 뒤에는 [[Construct]] 내부 메서드를 갖는 함수 객체로 평가될 수 있는 모든 표현식을 사용할 수 있어 동적으로 상속받을 대상을 결정할 수 있다.

```javascript
function Base1() {}

class Base2 {}

let condition = true;

class Derived extends (condition ? Base1 : Base2) {}
```

<br>

#### 25.8.4 서브클래스의 constructor

클래스에서 constructor를 생략하면 비어있는 constructor가 암묵적으로 정의된다. 하지만 서브클래스에서 constructor를 생략하면 클래스에 아래와 같은 constructor가 암묵적으로 정의된다.

```javascript
// args: 클래스를 호출할 때 전달한 인수의 리스트
// super()는 수퍼클래스의 constructor를 호출하여 인스턴스를 생성한다.
constructor(...args) { super(...args) }
```

![스크린샷 2023-02-22 오후 10 52 33](https://user-images.githubusercontent.com/77482972/220640004-6acec35c-2f60-4943-bdbe-7a6cd89ab77f.png)

<br>

수퍼클래스와 서브클래스 모두 constructor를 생략할 경우 빈 객체가 생성된다.

```javascript
class Base {}

class Derived extends Base {}

const derived = new Derived();
console.log(derived); // Derived {}
```

<br>

#### 25.8.5 super 키워드

`super` 키워드는 함수처럼 호출할 수도 있고 this와 같이 식별자처럼 참조할 수 있는 특수한 키워드이다.
- super를 호출하면 수퍼클래스의 constructor를 호출한다.
- super를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.

<br>

##### super 호출

```javascript
class Base {
	constructor(a, b) {
		this.a = a;
		this.b = b;
	}
}

class Derived1 extends Base {
	// constructor(...args) { super(...args) }
	// constructor의 super 호출을 통해 수퍼클래스의 constructor에 args가 전달된다.
}

const derived = new Derived1(1, 2);
console.log(derived); // Derived {a: 1, b: 2}


class Derived2 extends Base {
	constructor(a, b, c) {
		super(a, b); // super 호출을 통해 Base 클래스의 constructor에 일부를 전달
		this.c = c;
	}
}

const derived = new Derived(1, 2, 3);
console.log(derived); // Derived {a: 1, b: 2, c: 3}
```

이처럼 인스턴스 초기화를 위해 전달된 인수는 수퍼클래스와 서브클래스에 배분되고 두 클래스가 서로 협력하여 인스턴스를 생성한다.

<br>

**super 호출 시 주의사항**
1. 서브클래스에서 constructor를 생략하지 않는 경우 서브클래스의 constructor에서는 반드시 super를 호출해야한다.
2. 서브클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없다.
3. super는 반드시 서브클래스의 constructor에서만 호출한다.


<br>

##### super 참조
메서드 내에서 super를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.

1. 서브클래스의 프로토타입 메서드 내에서 super.sayHi는 수퍼클래스의 프로토타입 메서드 sayHi를 가리킨다.

```javascript
class Base {
    constructor(name) {
        this.name = name;
    }

	sayHi() {
		return `Hi ${this.name}`
	}
}

class Derived extends Base {
	sayHi() {
		return `${super.sayHi()} how are you doing`
	}
}

const derived = new Derived('Lee');
console.log(derived.sayHi()); // Hi Lee how are you doing
``` 

아래는 위와 같이 동작한다. super는 자신을 참조하고 있는 메서드(Derived.sayHi)가 바인딩되어 있는 객체(Dervied.prototype)의 프로토타입(Base.prototype)을 가리키기 때문이다.

```javascript
class Base {
    constructor(name) {
        this.name = name;
    }

	sayHi() {
		return `Hi ${this.name}`
	}
}

class Derived extends Base {
	sayHi() {
		const __super = Object.getPrototypeOf(Dervied.prototype);
		return `${__super.sayHi.call(this)} how are you doing`
		// call(this)를 사용하지 않으면 메서드는 자신을 호출한 객체인 __super에 this가 바인딩된다.
		// sayHi는 Base.prototype이 아니라 인스턴스를 가리켜야하므로(name 프로퍼티를 사용해야 하므로)
		// call 메서드를 사용해 this를 전달한다.
	}
}

const derived = new Derived('Lee');
console.log(derived.sayHi()); // Hi Lee how are you doing
``` 

이처럼 super 참조가 동작하기 위해서는 super를 참조하고 있는 메서드(Derived의 sayHi)가 바인딩 되어있는 객체(Derived.prototype)의 프로토타입을 찾을 수 있어야 한다. 이를 위해 메서드는 내부슬롯 [[HomeObject]]를 가지며, 자신을 바인딩하고 있는 객체를 가리킨다.

> ES6의 메서드 축약표현으로 정의된 함수만이 [[HomeObject]]를 가진다. 따라서, [[HomeObject]]를 가지는 ES6의 메서드 축약 표현으로 정의된 함수만이 super 참조를 할 수 있다.

<br>

2. 서브클래스의 정적 메서드 내에서 super.sayHi는 수퍼클래스의 정적 메서드 sayHi를 가리킨다.

```javascript
class Base {
	static sayHi() {
		return 'hi'
	}
}

class Dervied extends Base {
	static sayHi() {
		return `${super.sayHi()} how are you doing`
	}
}

console.log(Derived.sayHi()); // hi how are you doing
```

<br>

#### 25.8.6 상속 클래스의 인스턴스 생성 과정

```javascript
// 수퍼클래스
class Rectangle {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}

	getArea() {
		return this.width * this.height;
	}

	toString() {
		return `width = ${this.width}, height = ${this.height}`;
	}
}

// 서브클래스
class ColorRectangle extends Rectangle {
	constructor(width, height, color) {
		super(width, height);
		this.color = color;
	}

	// 메서드 오버라이딩
	toString() {
		return super.toString() + `, color = ${this.color}`;
	}
}

const colorRectangle = new ColorRectangle(2, 4, 'red');
console.log(colorRectangle); // ColorRectangle {width: 2, height: 4, color: "red"}

console.log(colorRectangle.getArea()); // 8
console.log(colorRectangle.toString()); // width = 2, height = 4, color = red
```

![스크린샷 2023-02-22 오후 11 24 37](https://user-images.githubusercontent.com/77482972/220650213-3e30312c-361b-4e8b-924f-c8b612bbdaa0.png)

<br>

##### 1. 서브클래스의 super 호출

자바스크립트 엔진은 수퍼클래스와 서브 클래스를 구분하기 위해 `base` 또는 `dervied`를 값으로 갖는 내부 슬롯 `[[ConstructorKind]]`를 갖는다. 이를 통해 수퍼클래스와 서브클래스는 new 연산자와 함께 호출되었을 때의 동작이 구분된다.

<br>

**다른 클래스를 상속받지 않는 클래스(생성자 함수)**
- [[ConstructorKind]] 값이 base다.
- new 연산자와 함께 호출되었을 때 암묵적으로 빈 객체(인스턴스)를 생성하고 this에 바인딩한다.

<br>

**서브클래스**
- [[ConstructorKind]] 값이 derived다.
- new 연산자와 함께 호출되었을 때 자신이 직접 인스턴스를 생성하지 않고
- **수퍼클래스에게 인스턴스 생성을 위임**한다.
- 이러한 이유로 서브클래스의 constructor에서 반드시 super를 호출해야 한다.

<br>

**서브클래스가 new 연산자와 함께 호출되었을 때**<br>
→ 서브클래스 constructor 내부의 super 키워드가 함수처럼 호출<br>
→ super가 호출되면 수퍼클래스의 constructor가 호출<br>

따라서, 서브클래스 constructor 내부에 super 호출이 없으면 에러가 발생한다.

<br>

##### 2. 수퍼클래스의 인스턴스 생성과 this 바인딩

수퍼클래스는 new 연산자와 함께 호출되었을 때 암묵적으로 빈 객체(인스턴스)를 생성하고 this에 바인딩한다. 따라서, 수퍼클래스의 constructor 내부의 this는 생성된 인스턴스를 가리킨다. 

<br>

하지만, new 연산자와 함께 호출된 클래스가 서브클래스라면 new.target은 서브클래스를 가리킨다. 따라서, 인스턴스는 new.target이 가리키는 서브클래스가 생성한 것으로 처리된다.

```javascript
// 수퍼클래스
class Rectangle {
	constructor(width, height) {
		console.log(this); // ColorRectangle {}
		console.log(new.target); // ColorRectangle
...
```
