## 16장 프로퍼티 어트리뷰트

### 16.1 내부 슬롯과 내부 메서드

내부 슬롯과 내부 메서드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티와 의사메서드이다. 내부 슬롯과 내부 메서드는 자바스크립트 엔진에서 실제로 동작하지만 개발자가 직접 접근할 수 있도록 외부로 공개된 객체의 프로퍼티는 아니다. 단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공한다.

<br>

### 16.2 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.

<br>

**프로퍼티 상태**: 프로퍼티의 값(value), 값의 갱신 가능 여부(writable), 열거 가능 여부(enumerable), 재정의 가능 여부(configurable)

<br>

프로퍼티 어트리뷰트는 자바스크립트 엔진이 관리하는 내부 슬롯 `[[Value]]`, `[[Writable]]`, `[[Enumerable]]`, `[[Configurable]]`이다. 따라서 프로퍼티 어트리뷰트에는 직접 접근할 수 없지만 `Object.getOwnPropertyDescriptor` 메서드를 사용하여 간접적으로 확인할 수 있다.

```javascript
const person = {
	name: 'Lee'
}

console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// { value: "Lee", writable: true, enumerable: true, configurable: true}
```
<br>


##### Object.getOwnPropertyDescriptor

- 첫번째 매개변수에는 객체의 참조를, 두번째 매개변수에는 프로퍼티 키를 문자열로 전달한다.
- Object.getOwnPropertyDescriptor는 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
- 하나의 프로퍼티에 대해 프로퍼티 디스크립터 객체를 반환
- Object.getOwnPropertyDescriptors는 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공

<br>

### 16.3 데이터 프로퍼티와 접근자 프로퍼티

프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분할 수 있다.
- 데이터 프로퍼티: 키와 값으로 구성된 일반적인 프로퍼티
- 접근자 프로퍼티: 자체적으로 값을 갖지않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자함수로 구성된 프로퍼티

<br>

#### 16.3.1 데이터 프로퍼티

프로퍼티 어트리뷰트는 자바스크립트 엔진이 프로퍼티를 생성할 때 기본값으로 자동 정의 된다. 프로퍼티가 생성될 때 [[Value]]는 프로퍼티 값으로 초기화 되며, 나머지 3개는 true로 초기화 된다.

1. [[Value]]
	- 값에 접근하면 반환되는 값

2. [[Writable]]
	- 값의 변경 가능 여부
    - false일 경우 value 값을 변경할 수 
3. [[Enumerable]]
	- 열거 가능 여부
    - false일 경우 for...in 문이나 Object.keys 등으로 열거할 수 없다.
4. [[Configurable]]
	- 재정의 가능 여부
    - false일 경우 해당 프로퍼티를 삭제, 재정의할 수 없다.
	- 단, writable이 true인 경우 [[Value]]의 변경과 [[Writable]]을 false로 바꾸는 것은 허용

<br>

#### 16.3.2 접근자 프로퍼티

자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티다. 접근자 함수는 getter/setter 함수라고도 부른다.

1. [[Get]]
	- 접근자 프로퍼티를 통해 데이터 프로퍼티 값을 읽을 때 호출되는 접근자 함수
	- getter 함수가 호출되고 그 결과가 프로퍼티 값으로 반환
2. [[Set]]
	- 접근자  프로퍼티를 통해 데이터 프로퍼티 값을 저장할 때 호출되는 접근자 함수
	- setter 함수가 호출되고 그 결과가 프로퍼티 값으로 저장
3. [[Enumerable]], [[Configurable]]은 데이터 프로퍼티와 동일

<br>


```javascript
const person = {
  firstName: 'Nayoung',
  lastName: 'Park',
}    

get fullName() {
  return `${this.firstName} ${this.lastName}`
}
      
set fullName(name) {
  [this.firstName, this.lastName] = name.split(' ');
}
  
// setter 함수 호출(프로퍼티 값 저장)
person.fullName = 'Gayoung Park';
console.log(person); // {firstName: 'Gayoung', lastName: 'Park'}
  
// getter 함수 호출(프로퍼티 값 참조)
console.log(person.fullName); // Gayoung Park
```

위 예시에서 firstName과 lastName은 데이터 프로퍼티, fullName은 접근자 프로퍼티다.

##### fullName 접근 동작 방식
1. 프로퍼티 키 유효한지 확인
2. 프로토타입 체인에서 프로퍼티 검색
3. 검색된 fullName 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인
4. 접근자 프로퍼티이므로 getter 함수 호출하여 그 결과 반환

<br>

### 16.4 프로퍼티 정의

프로퍼티 정의란 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나, 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의하는 것을 말한다.

<br>

`Object.defineProperty`메서드를 사용하면 프로퍼티의 어트리뷰트를 정의할 수 있다. 이 때, 생략된 프로퍼티는 기본값이 적용된다.

```javascript
const person = {};
  
Object.defineProperty(person, 'firstName', {
  value: 'Nayoung',
  writable: true,
  enumerable: true,
  configurable: true,
})
  
Object.defineProperty(person, 'fullName', {
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  set(name) {
    [this.firstName, this.lastName] = name.split('');
  },
  enumerable: true,
   configurable: true,
})
```

<br>

Object.defineProperty 메서드는 한번에 하나의 프로퍼티만을 정의하지만 `Object.defineProperties` 메서드는 여러개의 프로퍼티를 한 번에 정의할 수 있다.


```javascript
const person = {};
  
Object.defineProperties(person, {
  firstName: {
    value: 'Ungmo',
    writable: true,
    enumerable: true,
    configurable: true,
  },
  lastName: {
    value: 'Lee',
    writable: true,
    enumerable: true,
    configurable: true,
  },
  fullName: {
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(name) {
      [this.firstName, this.lastName] = name.split(' ');
    },
    enumerable: true,
    configurable: true,
  }
})
```

<br>

### 16.5 객체 변경 방지

객체는 변경 가능한 값이므로 재할당 없이 직접 변경 가능하다. 따라서 프로퍼티를 추가하거나 삭제할 수 있고 값을 갱신할 수 있으며 Object.defineProperty와 Object.defineProperties 메서드를 사용하여 프로퍼티 어트리뷰트를 재정의할 수 도 있다. 이 때, 자바스크립트는 객체의 변경을 방지하는 다양한 메서드를 제공한다.

<img width="475" alt="스크린샷 2023-01-05 오전 8 24 05" src="https://user-images.githubusercontent.com/77482972/210668697-abf4988a-bed8-4b40-a169-0e35300fbaad.png">
 
<br>

#### 16.5.1 객체 확장 금지

`Object.preventExtensions` 메서드는 객체의 확장을 금지한다.

- 확장이 금지된 객체는 프로퍼티 추가가 금지된다.
- 프로퍼티 동적 추가와, Object.defineProperty 메서드 모두 금지된다.
- 확장이 가능한 객체인지 여부는 `Object.isExtensible` 메서드로 확인 가능

<br>

#### 16.5.2 객체 밀봉

`Object.seal` 메서드는 객체를 밀봉한다.

- 프로퍼티 추가 및 삭제, 프로퍼티 어트리뷰트 재정의가 금지된다.
- 읽기와 쓰기만 가능
- 프로퍼티 값 갱신은 가능
- 밀봉된 객체는 configurable이 false이다.
- `Object.isSealed` 메서드로 밀봉된 객체인지 확인 가능

<br>

#### 16.5.3 객체 동결

`Object.freeze` 메서드는 객체를 동결한다.

- 프로퍼티 추가 및 삭제, 어트리뷰트 재정의 금지, 프로퍼티 값 갱신 금지
- 읽기만 가능
- `Object.isFrozen` 메서드로 동결된 객체인지 확인 가능

<br>

#### 16.5.4 불변 객체

위에서 본 변경 방지 메서드들은 얕은 변경 방지로 중첩 객체까지 영향을 줄 수 없다. Object.freeze 메서드로 객체를 동결하여도 중첩 객체까지 동결할 수 없다. 중첩 객체까지 동결하려면 모든 프로퍼티에 대해 재귀적으로 Object.freeze 메서드를 호출해야한다.