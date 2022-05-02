### 220501

#### getter와 setter

##### 참고한 사이트

> https://velog.io/@bigbrothershin/JavaScript-%EC%A0%91%EA%B7%BC%EC%9E%90-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0-getter-setter

<br>

##### 1. 프로퍼티의 종류

- 데이터 프로퍼티: 일반적으로 객체에 속해있는 프로퍼티

  ```
  const obj = {
    id: 1, // 데이터 프로퍼티
    name: 'Obj' // 데이터 프로퍼티
  }
  ```

- 접근자 프로퍼티

  - 접근자 프로퍼티의 본질은 함수
  - 이 함수는 값을 획득(get)하고 설정(set)하는 역할을 담당
  - 외부 코드에서는 함수가 아닌 일반적인 프로퍼티처럼 보임
  - 접근자 프로퍼티는 'getter(획득자)'와 ‘setter(설정자)’ 메서드로 표현
  - 객체 리터럴 안에서 getter와 setter 메서드는 get과 set으로 나타낼 수 있음

<br>

##### 2. getter 메서드

접근자 프로퍼티를 사용하면 함수처럼 호출 하지 않고, **일반 프로퍼티에서 값에 접근하는 것처럼** 평범하게 user.fullName을 사용해 프로퍼티 값을 얻을 수 있음

```javascript
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};
```

한편, 위 예시의 fullName은 getter 메서드만 가지고 있기 때문에 user.fullName=을 사용해 값을 할당하려고 하면 에러가 발생

<br>

##### 3. settter 메서드

```javascript
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
  
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

// 주어진 값을 사용해 set fullName이 실행됩니다.
user.fullName = "Alice Special"
```

<br>

##### 정리

- get: 인수가 없는 함수로, 프로퍼티를 읽을 때 동작함
- set: 인수가 하나인 함수로, 프로퍼티에 값을 쓸 때 호출됨