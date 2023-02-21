## 19장 프로토타입

자바스크립트는 명령형, 함수형, **프로토타입 기반 객체지향 프로그래밍**을 지원하는 프로그래밍 언어이다. 자바스크립트는 객체 기반의 프로그래밍 언어이며 자바스크립트를 이루고 있는 거의 모든 것이 객체이다. 

<br>

### 19.1 객체 지향 프로그래밍

객체지향 프로그래밍은 절차지향적 관점에서 벗어나 **객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임**을 말한다. 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 객체라고 하며, 객체지향 프로그래밍은 독립적인 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임이다.

<br>

객체지향 프로그래밍은 객체의 상태를 나타내는 데이터와, 상태 데이터를 조작할 수 있는 동작을 하나의 논리적인 단위로 묶어서 생각한다. 따라서, 객체는 **상태 데이터(프로퍼티)와 동작(메서드)을 하나의 논리적인 단위로 묶은 복합적인 자료구조**라고 할 수 있다.

<br>

### 19.2 상속과 프로토타입

상속은 객체지향 프로그래밍 핵심개념으로, 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다. 자바스크립트는 프로토타입을 기반으로 **상속을 구현해 불필요한 중복을 제거**한다.

<br>

생성자 함수는 동일한 프로퍼티 구조를 갖는 객체를 여러 개 생성할 때 유용하다. 하지만 생성자 함수는 인스턴스를 생성할 때마다 프로퍼티와 메서드를 중복 생성하고 모든 인스턴스가 중복 소유하기 때문에 메모리를 불필요하게 낭비하고 퍼포먼스에 악영향을 준다.

> Circle 생성자 함수에서 radius는 각 인스턴스마다 다른 값을 갖을 수 있지만, getArea 메서드는 중복 생성, 소유 될 필요가 없기 때문에 비효율적이다.

<br>

##### 프로토타입을 이용한 상속 구현

```javascript
function Circle(radius) {
    this.radius = radius;
}
  
// Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를 공유해서 사용할 수 있도록 프로토타입에 추가
// 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function() {
    return Math.PI * this.radius ** 2;
}
  
// 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);
  
console.log(circle1.getArea === circle2.getArea); // true
// Circle 생성자 함수가 생성한 모든 인스턴스는
// 부모 객체의 역할을 하는 프로토타입 Circle.prototype으로부터 getArea 메서드를 상속받는다.
// 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
```

![image](https://user-images.githubusercontent.com/77482972/174002966-b122a7bd-d4ce-4de8-b3e3-d968b0aaad1b.png)


- 위 예시에서 Circle 생성사 함수가 생성한 모든 인스턴스는 자신의 프로토타입, 상위 객체 역할을 하는 Circle.prototype의 모든 프로퍼티와 메서드를 상속받는다.
- 따라서, Circle 생성자 함수가 생성하는 모든 인스턴스는 getArea 메서드를 상속받아 사용할 수 있다.
- radius 프로퍼티만 개별적으로 소유하고, 내용이 동일한 메서드는 상속을 통해 공유하여 사용

**상속은 코드의 재사용 관점에서 매우 유용**하다. 공통적으로 사용할 프로퍼티나 메서드를 프로토타입에 미리 구현해 두면 인스턴스는 별도의 구현 없이 상위 객체인 프로토타입의 자산을 공유하여 사용할 수 있다.

<br>

### 19.3 프로토타입 객체

모든 객체는 `[[Prototype]]`이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참조이다. 객체가 생성될 때, 객체 생성 방식에 따라 프로토타입이 결정되고 [[Prototype]]에 저장된다. 

<br>

모든 객체는 하나의 프로토타입을 갖는다. 그리고 모든 프로토타입은 생성자 함수와 연결되어 있다.

![image](https://user-images.githubusercontent.com/77482972/174005292-b6b3392d-6278-483a-8536-a9e38f8f8ed2.png)

[[Prototype]]은 내부 슬롯이고 프로토타입의 참조로 직접 접근할 수는 없지만, **`__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입(자신의 [[Prototype]] 내부 슬롯)이 가리키는 프로토타입에 간접적으로 접근**할 수 있다. 그리고 **프로토타입은 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근**할 수 있고, **생성자 함수는 자신의 prototype 프로퍼티를 통해 프로토타입에 접근**(Circle.prototype.getArea = ...)할 수 있다.

<br>

#### 19.3.1 `__proto__` 접근자 프로퍼티

모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 [[Prototype]] 내부 슬롯에 간접적으로 접근할 수 있다. 

##### `__proto__`는 접근자 프로퍼티다.

내부 슬롯은 프로퍼티가 아니기 때문에 자바스크립트는 원칙적으로 내부 슬롯과 내부 메서드에 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않지만 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공한다. 따라서, [[Prototype]] 내부 슬롯에도 직접 접근할 수 없으며 `__proto__` 접근자 프로퍼티를 통해 간접적으로 프로토타입에 접근할 수 있다.

> 접근자 프로퍼티<br>
> 접근자 프로퍼티는 자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 변경할 때 사용하는 접근자 함수로 구성된 프로퍼티다.

<br>

`__proto__`는 접근자 프로퍼티이므로 getter/setter 함수라고 부르는 접근자 함수를 통해 [[Prototype]] 내부 슬롯의 값(프로토타입)을 취득하거나 할당한다.

```javascript
const obj = {};
const parent = { x : 1 };
    

obj.__proto__ ; // getter 함수 호출
obj.__proto__ = parent; // setter 함수 호출
    
console.log(obj.x); // 1
```
<br>

##### `__proto__` 접근자 프로퍼티는 상속을 통해 사용된다.

`__proto__` 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 **Object.prototype**의 프로퍼티다. 

```javascript
const person = { name: 'Lee' };
    
console.log(person.hasOwnProperty('__proto__')); // false

console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {get: f, set: f, enumerable: false, configurable: false}
    
console.log({}.__proto__ === Object.prototype); // true
// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
```

<br>

##### `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유

프로토타입에 접근하기 위해 접근자 프로퍼티를 사용하는 이유는 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서다.

<br>

프로토타입 체인은 **단방향 링크드 리스트**로 구현되어야한다. 순환 참조하는 프로토타입 체인이 만들어지면 프로토타입 체인에서 프로퍼티를 검색할 때 무한 루프에 빠진다. 따라서, 아무 체크 없이 무조건적으로 프로토타입을 교체할 수 없도록 `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하고 교체하도록 구현되어있다. 순환참조를 하는 비정상적인 프로토타입 체인이 만들어질 경우 `__proto__` 접근자 프로퍼티는 에러를 발생시킨다.

<br>

##### `__proto__` 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다.

모든 객체가 `__proto__` 접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문에 직접 사용하는 것은 권장되지 않는다. 따라서, `__proto__` 접근자 프로퍼티 대신 프로토타입의 참조를 취득하고 싶은 경우에는 `**Object.getPrototypeOf 메서드**`를 사용하고, 프로토타입을 교체하고 싶은 경우에는 `**Object.setPrototypeOf 메서드**`를 사용할 것을 권장한다.

```javascript
const obj = {};
const parent = { x : 1 };
      
Object.getPrototypeOf(obj); // get Object.prototype.__proto__ 처리 내용과 일치
Object.setPrototypeOf(obj, parent); // set Object.prototype.__proto__ 처리 내용과 일치
      
console.log(obj.x); // 1
```

<br>

#### 19.3.2 함수 객체의 prototype 프로퍼티

**함수 객체만이 소유하는 prototype 프로퍼티**는 생성자 함수가 **생성할 인스턴스의 프로토타입**을 가리킨다. prototype 프로퍼티는 생성자 함수가 생성할 객체의 프로토타입을 가리킨다. 따라서, 생성자 함수로 호출할 수 없는 화살표 함수와 메서드 축약표현으로 정의한 메서드는 prototype 프로퍼티를 소유하지 않으며, 프로토타입도 생성하지 않는다. 일반 함수도 prototype 프로퍼티를 소유하지만 객체를 생성하지 않는 일반 함수의 prototype 프로퍼티는 아무런 의미가 없다. 

<img width="499" alt="스크린샷 2023-01-11 오후 9 26 43" src="https://user-images.githubusercontent.com/77482972/211806143-7910a38e-a3a2-4ccc-a2fe-2eacfe8c25f1.png">

`__proto__` 접근자 프로퍼티와 prototype 프로퍼티는 동일한 프로토타입을 가리킨다. 하지만 prototype은 함수 객체만이 가지고 있으며 생성자 함수가 자신이 생성할 객체에 프로토타입을 할당하기 위해 사용하며, `__proto__`는 객체가 자신의 프로토타입에 접근하거나 교체하기 위해 사용한다는 점이 차이점이다.

<br>

```javascript
function Person(name) {
	this.name = name;
}
      
const me = new Person('Lee');

console.log(me.__proto__ === Person.prototype); // true
```

![image](https://user-images.githubusercontent.com/77482972/174065666-dd03f4c9-3056-4430-a6fc-8be23e3942a3.png)

<br>

#### 19.3.3 프로토타입의 constructor 프로퍼티와 생성자 함수

**모든 프로토타입은 constructor 프로퍼티를 갖는다.** constructor 프로퍼티는 prototype 프로퍼티로, 자신을 참조하고 있는 생성자 함수를 가리킨다. **이 연결은 생성자 함수가 생성될 때, 즉 함수 객체가 생성될 때 이뤄진다.**

<br>

```javascript
function Person(name) {
	this.name = name;
}
    
const me = new Person('Lee');
    
console.log(me.constructor === Person); // true

// me 객체에는 constructor가 없다.
// 하지만 me 객체의 프로토타입인 Person.prototype에는 constructor 프로퍼티가 있다.
```

Person 생성자 함수가 생성한 me 객체는 프로토타입의 constructor 프로퍼티를 통해 생성자 함수와 연결된다. 따라서, me 객체는 프로토타입인 Person.prototype의 constructor 프로퍼티를 상속받아 사용할 수 있다.

<br>

### 19.4 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

생성자 함수에 의해 생성된 인스턴스는 프로토타입의 constructor 프로퍼티에 의해 생성자 함수(인스턴스를 생성한 생성자 함수)와 연결된다. 

<br>

new 연산자와 함께 생성자 함수를 호출해 인스턴스를 생성하지 않는 객체 생성 방식인 리터럴 표기법에 의해 생성된 객체도 프로토타입이 존재한다. 하지만 **리터럴 표기법에 의해 생성된 객체의 경우 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수 없다.** 

<br>

##### Object 생성자 함수

![image](https://user-images.githubusercontent.com/77482972/174070792-ff53b35f-3615-421a-a412-89fd1f428221.png)

1. new target이 undefined나 Object가 아닌 경우<br>

OrdinaryCreateFromConstructor

```javascript
class Foo extends Objects {}
new Foo();
```

위 예시를 쉽게 말하면 생성된 Foo {}의 new.target은 class Foo이다. 이 때는 인스턴스 → Foo.prototype → Object.prototype 순으로 프로토타입 체인을 생성한다.

> new.target 속성(property)은 함수 또는 생성자가 new 연산자를 사용하여 호출됐는지를 감지할 수 있습니다. new 연산자로 인스턴스화된 생성자 및 함수에서, new.target은 생성자 또는 함수 참조를 반환합니다. 일반 함수 호출에서는, new.target은 undefined입니다.

<br>

2. Object 생성자 함수에 의해 객체를 생성하는데 값이 undefined나 null인 경우<br>

OrdinaryObjectCreate를 호출해 Object.prototype을 프로토타입으로 갖는 빈 객체를 생성한다.

```javascript
let obj = new Object();
```

<br>

3. 인수가 전달된 경우
인수를 객체로 반환한다.

<br>

##### 객체 리터럴 평가

![image](https://user-images.githubusercontent.com/77482972/174081655-c26e72c4-0e89-4d24-aa29-1448e9f1cee8.png)

OrdinaryObjectCreate를 호출하여 빈 객체를 생성하고 프로퍼티를 추가한다.

<br>

정리해보면, Object 생성자 함수 호출과 객체 리터럴 평가 모두 추상 연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성한다는 공통점이 있지만 new.target에 대한 확인(Object 생성자 함수)이나 프로퍼티를 추가하는 처리(객체 리터럴 평가) 등 세부 내용이 다르다. 

<br>

**따라서, 객체 리터럴에 의해 생성된 객체는 Object 생성자 함수가 생성한 객체가 아니다.**

<br>

함수 객체의 경우에도 Function 생성자 함수를 호출하여 생성한 함수는 렉시컬 스코프를 만들지 않고 전역 함수인 것처럼 스코프를 생성하며 클로저도 만들지 않으므로 함수 선언문과 함수 표현식을 평가하여 함수 객체를 생성한 것은 Function 생성자 함수가 아니다.

<br>

리터럴 표기법에 의해 생성된 객체도 상속을 위한 프로토타입이 필요하기 때문에 **가상적인 생성자 함수**를 갖는다.

하지만, 리터럴 표기법으로 생성한 객체도 생성자 함수로 생성한 객체와 본질적으로 차이가 없고, 함수 리터럴로 생성한 함수와 Function 생성자 함수가 생성한 함수는 생성 과정, 스코프, 클로저 등의 차이가 있지만 함수로서 동일한 특성을 갖는다.

<img width="395" alt="스크린샷 2023-01-11 오후 10 30 59" src="https://user-images.githubusercontent.com/77482972/211818857-c7e0f058-b75f-4f03-a598-39255a791734.png">


정리하자면, 리터럴에 의해 생성된 객체는 생성자 함수에 의해 생성된 객체는 아니다. 하지만, 본질적인 면에서 동일하여 큰 차이가 없고, 객체들은 상속을 위해 프로토타입이 필요하기 때문(**+ 프로토타입과 생성자 함수는 쌍으로 존재해야 하기 때문에**)에 가상적인 생성자 함수를 만드므로 {}.constructor === Object가 true이다.

<br>

### 19.5 프로토타입의 생성 시점

리터럴 표기법에 의해 생성된 객체도 생성자 함수와 연결되었다. 객체는 리터럴 표기법 또는 생성자 함수에 의해 생성되므로 결국 모든 객체는 생성자 함수와 연결되어 있다.

<br>

프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성되는데, 생성자 함수는 사용자 정의 함수와 빌트인 생성자 함수로 구분된다.

<br>

#### 19.5.1 사용자 정의 생성자 함수와 프로토타입 생성 시점

일반 함수(함수 선언문, 함수 표현식)로 정의한 함수 객체는 new 연산자와 함께 생성자 함수로 호출할 수 있다. 생성자 함수로 호출할 수 있는 함수(constructor)는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.

<br>

생성자 함수로서 호출할 수 없는 함수(non-constructor / 화살표 함수, 메서드 축약 표현)은 프로토타입이 생성되지 않는다.

<br>

함수 선언문은 런타임 이전에 실행되어 함수 선언문으로 정의된 생성자 함수는 어떤 코드보다 먼저 평가되어 함수 객체가 되고 이 때 프로토타입도 더불어 생성된다. 생성된 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩된다. 생성된 프로토타입은 오직 constructor만을 갖는 객체다. 이 때, 생성된 프로토타입 또한 객체이고 모든 객체는 프로토타입을 가지므로 이 프로토타입도 자신의 프로토타입을 갖는다. 생성된 프로토타입의 프로토타입은 Object.prototype이다.

<img width="362" alt="스크린샷 2023-01-11 오후 10 43 05" src="https://user-images.githubusercontent.com/77482972/211821456-997e8d5f-eace-4e3d-9bb1-5e6716d3929b.png">

<br>

#### 19.5.2 빌트인 생성자 함수와 프로토타입 생성 시점

빌트인 생성자 함수도 일반 함수와 마찬가지로 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성된다. 모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성된다. 생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩된다.

<img width="384" alt="스크린샷 2023-01-11 오후 10 45 21" src="https://user-images.githubusercontent.com/77482972/211821950-ae5f0600-bcb4-4445-8845-8273659d7fcc.png">


> 전역 객체는 코드가 실행되기 이전 단계에 생성되는 특수한 객체이고, 빌트인 생성자 함수는 이 시점에 같이 생성된다.

<br>

이처럼, 객체가 생성되기 이전에 (빌트인?) 생성자 함수와 프로토타입은 이미 객체화되어 존재한다. 이후 생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 [[Prototype]] 내부 슬롯에 할당된다.

<br>

### 19.6 객체 생성 방식과 프로토타입의 결정

객체는 다양한 생성 방법(객체 리터럴, Object 생성자 함수, 생성자 함수, Object.create 메서드, 클래스)이 있고 각 방식마다 세부적인 생성 방식의 차이는 있으나 추상 연산 OrdinaryObjectCreate에 의해 생성된다는 공통점이 있다.

<br>

OrdinaryObjectCreate는 필수적으로 자신이 생성할 객체의 프로토타입을 인수로 전달 받고, 자신이 생성할 객체에 추가할 프로퍼티 목록을 옵션으로 전달할 수 있다. 

1. OrdinaryObjectCreate는 빈 객체를 먼저 생성하고
2. 인수로 전달된 프로퍼티 목록(옵션)을 빈 객체에 추가한다. 
3. 인수로 전달된 프로토타입을 자신이 생성한 객체의 [[Prototype]] 내부 슬롯에 할당한 후
4. 생성한 객체를 반환

즉, 프로토타입은 OrdinaryObjectCreate에 전달되는 인수에 의해 결정되고, 이 인수는 객체 생성 방식에 의해 결정된다.

<br>

#### 19.6.1 객체 리터럴에 의해 생성된 객체의 프로토타입

자바스크립트 엔진은 객체 리터럴을 평가하여 객체를 생성할 때 OrdinaryObjectCreate를 호출하고 OrdinaryObjectCreate에 전달되는 프로토타입은 Object.prototype이다.

```javascript
const obj = {x : 1};
````

객체 리터럴이 평가되면 OrdinaryObjectCreate에 의해 `Object 생성자 함수`, `Object.prototype`, `생성된 객체` 사이에 연결이 만들어진다. <br>
생성된 객체는 constructor 프로퍼티와 hasOwnProperty, toString 등의 메서드를 갖고 있지 않지만 자신의 프로토타입인 Object.prototype을 상속받았기 때문에 자유롭게 사용할 수 있다.

<br>

#### 19.6.2 Object 생성자 함수에 의해 생성된 객체의 프로토타입

Object 생성자 함수를 인수 없이 호출하면 빈 객체가 생성된다. Object 생성자 함수를 호출하면 객체 리터럴과 마찬가지로 OrdinaryObjectCreate가 호출되고 OrdinaryObjectCreate에 전달되는 프로토타입은 Object.prototype이다.

```javascript
const obj = new Object();
obj.x = 1;
```

위 코드가 실행되면 OrdinaryObjectCreate에 의해 `Object 생성자 함수`, `Object.prototype`, `생성된 객체` 사이에 연결이 만들어진다.(객체 리터럴과 동일한 구조) <br>

객체 리터럴과 Object 생성자 함수에 의한 객체 생성 방식의 차이는 프로퍼티를 추가하는 방식에 있다. 
- 객체 리터럴: 객체 리터럴 내부에 프로퍼티 추가
- Object 생성자 함수: 빈 객체 생성 후 프로퍼티 추가

<br>

#### 19.6.3 생성자 함수에 의해 생성된 객체의 프로토타입

new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하면 다른 객체 생성 방식과 마찬가지로 OrdinaryObjectCreate가 호출된다. 이 때, OrdinaryObjectCreate에 전달되는 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체다.

```javascript
function Person(name) {
	this.name = name;
}
    
const me = new Person('Lee');
```

위 코드가 실행되면 OrdinaryObjectCreate에 의해 `Person 생성자 함수`와 `Person.prototype`과 `생성된 객체` 사이에 연결이 만들어진다. 사용자 정의 생성자 함수 Person과 Person의 프로토타입 프로퍼티는 constructor 뿐이지만 Person.prototype에 프로퍼티를 추가하면 자식 객체가 상속받을 수 있다. 이렇게 추가, 삭제된 프로퍼티는 프로토타입 체인에 즉각 반영된다.

<br>

#### 한 눈에 정리

![image](https://user-images.githubusercontent.com/77482972/174530200-eccd2f04-2624-4aac-8b3d-1b2637e76704.png)

![image](https://user-images.githubusercontent.com/77482972/174530470-c9ca15d8-bc02-4069-bdfc-31adfcb0db26.png)

<br>

### 19.7 프로토타입 체인

```javascript
function Person(name) {
	this.name = name;
}
  
Person.prototype.sayHello = function () {
	console.log(`Hi! My name is ${this.name}`);
}
  
const me = new Person('Lee');
  
console.log(me.hasOwnProperty('name')); // true
```

Person 생성자 함수에 의해 생성된 me 객체는 Person prototype 프로퍼티가 아닌 Object.prototype의 메서드인 hasOwnProperty를 호출할 수 있다. 이는 me 객체가 Person.prototype 뿐만 아니라, Object.prototype도 상속받았음을 의미한다.

<br>

me 객체의 프로토타입 → Person.prototype<br>
Person.prototype의 프로토타입 → Object.prototype<br>

![image](https://user-images.githubusercontent.com/77482972/174531707-9c91d220-64ed-4c91-b60f-98fc5004c6e6.png)

<br>

##### 프로토타입 체인

자바스크립트는 객체의 프로퍼티에 접근하려 할 때, 해당 객체에 접근하려는 프로퍼티가 없으면 [[Prototype]] 내부 슬롯의 참조를 따라 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 이는 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 메커니즘이다.

<br>

**프로토타입 체인의 최상단에 위치하는 객체는 언제나 Object.prototype**이다. 따라서 모든 객체는 Object.prototype을 상속받고 Object.prototype을 프로토타입 체인의 종점이라고 한다. Object.prototype의 프로토타입은 null이다.

<br>

프로토타입 체인의 종점에서도 프로퍼티를 검색할 수 없을 때 undefined를 반환한다(에러 발생 x).

<br>

- 프로토타입 체인은 상속과 프로퍼티 검색을 위한 메커니즘
- 스코프 체인은 식별자 검색을 위한 메커니즘

<br>

### 19.8 오버라이딩과 프로퍼티 섀도잉

##### 추가

```javascript
const Person = (function () {
	function Person(name) {
		this.name = name;
    }
  
    Person.prototype.sayHello = function () {
      console.log(`${this.name} 프로토타입`);
    };
  
    return Person;
})();

const me = new Person("Lee");

me.sayHello = function () {
    console.log(`${this.name} 인스턴스`);
};
  
me.sayHello(); // Lee 인스턴스
```

<img width="412" alt="스크린샷 2023-01-11 오후 11 25 46" src="https://user-images.githubusercontent.com/77482972/211831110-6a314740-1ab8-4208-b77e-d26c8fac7c9a.png">

<br>

- 프로토타입 프로퍼티: 프로토타입이 소유한 프로퍼티
- 인스턴스 프로퍼티: 인스턴스가 소유한 프로퍼티

<br>

프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면 체인을 타고 올라가 덮어쓰는 것이 아니라 **인스턴스 프로퍼티로 추가한다.** 위 예시에서 sayHello를 호출했을 때, 인스턴스 프로퍼티가 프로토타입 프로퍼티를 **오버라이딩**했고, 프로토타입 메서드가 가려지는 것을 **섀도잉**이라고 한다.

<br>

##### 삭제

```javascript
delete me.sayHello();
```

인스턴스 메서드인 sayHello가 삭제된다. 하위 객체를 통해 프로토타입 프로퍼티를 변경하거나 삭제하는 것은 불가능해서 프로토타입 프로퍼티인 sayHello는 삭제되지 않는다.(get 액세스는 허용되어도 set 액세스는 허용 안됨)

```javascript
delete Person.sayHello(); // 가능
```

### 19.9 프로토타입의 교체

프로토타입은 임의의 다른 객체로 변경할 수 있다. 이러한 특징으로 객체 간의 상속 관계를 동적으로 변경할 수 있다.

<br>

#### 19.9.1 생성자 함수에 의한 프로토타입의 교체

```javascript
const Person(function () {
	function Person(name) {
		this.name = name;
	}
        
	// Person.prototype에 객체 리터럴 할당
	// 객체 리터럴에는 constructor 프로퍼티가 없음
	// 따라서 me 객체의 생성자 함수를 검색하면 Person이 아닌 Object가 나온다. 
	Person.prototype = {
		sayHello() {
			console.log('안녕')
		}
	};
        
	return Person;
}());
    
const me = new Person('LEE');
    
console.log(me.constructor === Person); // false
console.log(me.constructor === Object); // true
// 프로토타입의 교체로 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴
```

- Person.prototype에 객체 리터럴 할당
- constructor 프로퍼티 사라짐
- me 객체 생성자 함수를 검색하면 Person이 아닌 Object
- constructor 프로퍼티와 생성자 함수 간의 연결이 파괴

##### 연결 되살리기

```javascript
const Person(function () {
	function Person(name) {
		this.name = name;
	}
        
	// Person.prototype에 객체 리터럴 할당
	// 객체 리터럴에는 constructor 프로퍼티가 없음
	// 따라서 me 객체의 생성자 함수를 검색하면 Person이 아닌 Object가 나온다. 
	Person.prototype = {
		constructor: Person,
		sayHello() {
			console.log('안녕')
		}
	};
        
	return Person;
}());
    
const me = new Person('LEE');
    
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false
```

<br>

#### 19.9.2 인스턴스에 의한 프로토타입의 교체

프로토타입은 생성자 함수의 prototype 프로퍼티뿐만 아니라 인스턴스의 `__proto__` 접근자 프로퍼티를 통해 접근할 수 있다.

<br>

**생성자 함수의 prototype 프로퍼티에 다른 임의의 객체를 바인딩하는 것은 미래에 생성할 인스턴스의 프로토타입을 교체**한다.

- Person prototype을 sayHello() {console.log("origin")} 로 변경
- Person 인스턴스로 me 생성
- Person prototype을 sayHello() {console.log("new")} 로 변경
- Person 인스턴스로 you 생성

위 예시의 경우 me.sayHello()를 실행하면 origin이, you.sayHello()를 실행하면 new가 console에 찍힌다. 즉, 기존에 존재하는 인스턴스의 프로토타입이 아닌 미래에 생성하는 인스턴스의 프로토타입을 교체한다.

<br>

**`__proto__` 접근자 프로퍼티를 통해 프로토타입을 교체하는 것은 이미 생성된 객체의 프로토타입을 교체**한다. 마찬가지로 프로토타입으로 교체한 객체에 constructor 프로퍼티가 없으므로 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.

```javascript
function Person(name) {
	this.name = name;
}
    
const me = new Person('Lee');
    
const parent = {
	sayHello() {
		console.log('안녕');
	}
};
    
Object.setPrototypeOf(me, parent);
// me.__proto__ = parent; (위 아래 코드 동일하게 동작)
    
me.sayHello(); // 안녕
```

<br>

##### 생성자 함수에 의한 프로토타입 교체 vs 인스턴스에 의한 프로토타입 교체

![image](https://user-images.githubusercontent.com/77482972/174558919-fab8fea0-7968-47c7-a450-1b9a7d92349f.png)

프로토타입은 직접 교체하는 것은 좋지 않다. 직접 상속과 같은 대안을 이용하도록 한다.

<br>

### 19.10 instanceof 연산자

`객체 instanceof 생성자 함수`

- 좌변: 객체를 가리키는 식별자
- 우변: 생성자 함수를 가리키는 식별자
- 우변의 피연산자가 함수가 아닌 경우 TypeError
- 우변의 생성자 함수의 prototype에 바인딩된 객체가 좌변 객체의 프로토타입 체인 상에 존재하면 true, 아닐 경우 false

<br>

##### 예시

```javascript
function Person(name) {
	this.name = name;
}
  
const me = new Person('Lee');

console.log(me instanceof Person); // true
console.log(me instanceof Object); // true

//////////////////////////////////////////////////

const parent = {};
Object.setPrototypeOf(me, parent);

console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person); // false
console.log(me instanceof Person); // false
console.log(me instanceof Object); // true

//////////////////////////////////////////////////

Person.prototype = parent;

console.log(me instanceof Person); // true
console.log(me instanceof Object); // true
```

instanceof 연산자는 constructor 프로퍼티가 가리키는 생성자 함수를 찾는게 아니라 **생성자 함수의 prototype에 바인딩된 객체가 프로토타입 체인 상에 존재하는지 확인**한다. 따라서, 생성자 함수에 의해 프로토타입이 교체되어 constructor 프로퍼티와 생성자 함수간의 연결이 파괴되어도 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결은 파괴되지 않으므로 instanceof는 영향을 받지 않는다.

<img width="398" alt="스크린샷 2023-01-12 오후 8 46 58" src="https://user-images.githubusercontent.com/77482972/212058849-96786438-0427-4baf-b190-acba4635166b.png">

<br>

### 19.11 직접 상속

#### 19.11.1 Object.create에 의한 직접 상속

`Object.create` 메서드는 명시적으로 프로토타입을 지정하여 새로운 객체를 생성한다.

##### Object.create

- OrdinaryObjectCreate 호출(다른 객체 생성 방식과 동일)
- 첫번째 매개변수: 생성할 객체의 프로토타입으로 지정할 객체
- 두번째 매개변수: 생성할 객체의 프로퍼티 키와 프로퍼티 디스크립터 객체로 이뤄진 객체 전달(생략 가능)
- 장점
	- new 연산자 없이 객체 생성 가능
	- 프로토타입을 지정하면서 객체 생성 가능
	- 객체 리터럴에 의해 생성된 객체도 상속 가능

<br>

##### 예시

<img width="485" alt="스크린샷 2023-01-12 오후 8 57 03" src="https://user-images.githubusercontent.com/77482972/212060646-a7ca6564-2fdc-4d23-97af-b288bfc30871.png">

<br>

#### 19.11.2 객체 리터럴 내부에서 `__proto__`에 의한 직접 상속

Object.create로 직접 상속을 구현하는 것은 많은 장점이 있으나, 두번째 인자로 프로퍼티를 정의하는 것은 번거롭다.

<br>

##### `__proto__` 접근자 프로퍼티 사용하여 직접 상속 구현하기

```javascript
const myProto = { x: 10 };

const obj = {
	y: 20;
	__proto__: myProto;
}

// 동일한 코드
// const obj = Object.create(myProto, {
//	y: { value: 20, writable: true, enumerable: true, configurable: true }
// });
```

<br>

### 19.12 정적 프로퍼티/메서드

정적 프로퍼티/메서드는 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 프로퍼티/메서드를 말한다. 생성자 함수는 자신의 프로퍼티/메서드를 소유할 수 있다. **정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스에서 참조/호출할 수 없다.**

<br>

##### 예시

Object.create 메서드는 Object 생성자 함수의 정적 메서드 → Object 생성자 함수가 생성한 객체(인스턴스)에서 호출 불가능<br>
Object.prototype.hasOwnProperty 메서드는 Object.prototype의 메서드 → 모든 객체가 호출 가능

<br>

다만, 인스턴스/프로토타입 메서드 내에서 this를 사용하지 않는다면 정적 메서드로 사용할 수 있다. this는 인스턴스를 가리키는데, this를 사용하지 않으면 인스턴스를 생성하지 않고 사용하는 정적 메서드로 쓸 수 있는 것이다.

<br>

### 19.13 프로퍼티 존재 확인

#### 19.13.1 in 연산자

`in 연산자`: 객체 내에 특정 프로퍼티가 존재하는지 여부를 확인

- 확인 대상 객체의 프로퍼티뿐만 아니라 상속받는 모든 프로토타입의 프로퍼티를 확인하므로 주의
- 프로토타입 체인 상에 존재하는 모든 프로토타입에서 프로퍼티를 검색하기 때문
- Reflect.has와 동일

<br>

#### 19.13.2 Object.prototype.hasOwnProperty 메서드

`Object.prototype.hasOwnProperty`: 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우 true, 상속 받은 프로토타입 프로퍼티 키인 경우 false

<br>

### 19.14 프로퍼티 열거

#### 19.14.1 for ...in 문

`for (변수 선언문 in 객체) {...}`

- 객체의 모든 프로퍼티를 순회하며 열거 가능
- 객체의 프로퍼티 개수만큼 순회
- 변수 선언문에서 선언한 변수에 프로퍼티 키 할당
- 프로퍼티 키가 심벌인 프로퍼티는 열거 x
- 순회 대상 객체의 프로퍼티뿐만 아니라 상속받은 프로토타입의 프로퍼티까지 열거
	- [[Enumerable]] 값이 true인 경우만 열거
	- 예) toString 메서드 → x
- 프로퍼티 열거 시 순서를 보장하지 x

<br>

#### 19.14.2 Object.keys/values/entries 메서드

객체 자신의 고유 프로퍼티만 열거하기 위해서는 Object.keys/values/entries 메서드 사용이 권장된다.

Object.keys 메서드: 객체 자신의 열거 가능한 프로퍼티 키를 배열로 반환
Object.values 메서드: 객체 자신의 열거 가능한 프로퍼티 값을 배열로 반환
Object.entries 메서드: 객체 자신의 열거 가능한 프로퍼티 키와 값의 쌍의 배열을 배열에 담아 반환