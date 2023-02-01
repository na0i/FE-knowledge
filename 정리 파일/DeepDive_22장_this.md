## 22장 this

### 22.1 this 키워드

생성자 함수 방식으로 인스턴스를 생성할 때 프로퍼티나 메서드를 추가하기 위해 자신이 생성할 인스턴스를 참조할 수 있어야 한다. 하지만, 생성자 함수를 정의하는 시점에는 인스턴스를 생성하기 이전이므로 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.

<br>

따라서, **자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 식별자가 필요하며 자바스크립트는 이를 위해 this라는 특수한 식별자를 제공**한다.

<br>

##### this
- 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수
- this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.
- 단, this 바인딩은 함수 호출 방식에 의해 동적으로 결정된다.

> this 바인딩<br>
> this와 this가 가리킬 객체를 바인딩

<br>

##### this는 함수가 호출되는 방식에 따라 this 바인딩이 동적으로 결정된다.

```javascript
console.log(this);
// window
// 전역에서 this는 전역 객체 window를 가리킨다.

function square(number) {
	console.log(this);
	// window
	// 일반 함수 내부에서 this는 전역 객체 window를 가리킨다.
	return number * number;
}
square(2);
  
const person = {
	name: 'Lee',
	getName() {
		console.log(this);
		// {name: 'Lee', getName: f}
		// 객체 리터럴의 메서드이므로 this는 메서드를 호출한 객체(person)을 가리킨다.
		return this.name;
	}
};

console.log(person.getName()); // Lee
  
function Person(name) {
	this.name = name;
	console.log(this);
	// Person {name: 'Lee'}
	// 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
}
  
const me = new Person('Lee');
```

<br>

### 22.2 함수 호출 방식과 this 바인딩

#### 22.2.1 일반 함수 호출

기본적으로 this에는 전역 객체가 바인딩된다. 그래서 **일반 함수로 호출하면 함수 내부의 this에는 전역 객체가 바인딩**된다. 또한, this는 일반적으로 객체 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 객체를 생성하지 않는 일반 함수에서 this는 별 의미가 없다.

<br>

메서드 내부에서 일반 함수로 호출하든, 콜백 함수가 일반 함수로 호출되든 **어떠한 함수라도 일반 함수로 호출되면 this에 전역 객체가 바인딩**된다. 화살표 함수를 사용하거나, this 바인딩을 다른 변수에 할당한 후 그 변수를 참조, Function.prototype.apply, Function.prototype.call, Function.prototype.bind 메서드를 통해 this를 명시적으로 바인딩 시켜 this 바인딩을 일치시킬 수 있다.

<br>

#### 22.2.2 메서드 호출

메서드 내부의 this에는 메서드를 **호출**한 객체(마침표 연산자(.) 앞에 기술한 객체)가 바인딩된다. 

![image](https://user-images.githubusercontent.com/77482972/174796825-f869eaf8-c8ee-4117-b6b8-0d3e094abae5.png)

위 사진의 getName 프로퍼티에 바인딩된 함수는 person 객체에 포함된 것이 아니라 독립적으로 존재하는 별도의 객체다. 따라서, getName 메서드는 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 되거나 일반 변수에 할당되어 일반 함수로 호출될 수도 있다. 

<br>

프로토타입 메서드 내부에서 사용된 this도 동일하게 해당 메서드를 호출한 객체에 바인딩된다.

<br>

##### 22.2.3 생성자 함수 호출

생성자 함수 내부의 this에는 **생성자 함수가 생성할 인스턴스가 바인딩**된다.

<br>

##### 22.2.4 Function.prototype.apply / call / bind 메서드에 의한 간접 호출

apply, call, bind 메서드는 Function.prototype의 메서드기 때문에, 모든 함수가 상속받아 사용 가능하다.

<br>

##### apply, call

apply와 call은 this로 사용할 객체와 전달할 인수를 인자로 받아 함수를 호출한다. 두 메서드는 인수 전달 방식만 다르고 동일하게 동작한다. 

```javascript
getThisBinding.apply(thisArg, [1, 2, 3]);
getThisBinding.call(thisArg, 1, 2, 3);
```

<br>

bind 메서드는 첫번째 인수로 전달한 값으로 this 바인딩이 교체된 함수를 새롭게 생성해 반환한다. bind 함수는 메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결할 때 유용하게 사용된다.

<br>

![image](https://user-images.githubusercontent.com/77482972/174804353-e9c21c57-f389-4108-8264-22fc68d2aada.png)