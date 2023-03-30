## 29장 Math

Math는 수학적인 상수와 함수를 위한 프로퍼티와 메서드를 제공한다. Math는 생성자 함수가 아니다. 따라서 Math는 정적 프로퍼티와 정적 메서드만 제공한다.

### 29.1 Math 프로퍼티

#### 29.1.1 Math.PI

원주율 PI값을 반환한다.

<br>

### 29.2 Math 메서드

#### 29.2.1 Math.abs

Math.abs 메서드는 인수로 전달된 숫자의 절대값을 반환한다.

```javascript
Math.abs(-1);        // -> 1
Math.abs('-1');      // -> 1
Math.abs('');        // -> 0
Math.abs([]);        // -> 0
Math.abs(null);      // -> 0
Math.abs(undefined); // -> NaN
Math.abs({});        // -> NaN
Math.abs('string');  // -> NaN
Math.abs();          // -> NaN
```

<br>

#### 29.2.2 Math.round

Math.round 메서드는 인수로 전달된 숫자의 소수점 이하를 반올림한 정수를 반환한다.

```javascript
Math.round(1.4);  // -> 1
Math.round(1.6);  // -> 2
Math.round(-1.4); // -> -1
Math.round(-1.6); // -> -2
Math.round();     // -> NaN
```

<br>

#### 29.2.3 Math.ceil

Math.ceil 메서드는 인수로 전달된 숫자의 소수점 이하를 올림한 정수를 반환한다.

- 소수점 이하를 올림하면 더 큰 정수가 된다.

```javascript
Math.ceil(1.4);  // -> 2
Math.ceil(1.6);  // -> 2
Math.ceil(-1.4); // -> -1
Math.ceil(-1.6); // -> -1
Math.ceil();     // -> NaN
```

<br>

#### 29.2.4 Math.floor

Math.floor 메서드는 인수로 전달된 숫자의 소수점 이하를 내림한 정수를 반환한다.

- Math.ceil 메서드의 반대 개념이다.

```javascript
Math.floor(1.9);  // -> 1
Math.floor(9.1);  // -> 9
Math.floor(-1.9); // -> -2
Math.floor(-9.1); // -> -10
Math.floor();     // -> NaN
```

<br>

#### 29.2.5 Math.sqrt

Math.sqrt 메서드는 인수로 전달된 숫자의 제곱근을 반환한다.

```javascript
Math.sqrt(9);  // -> 3
Math.sqrt(-9); // -> NaN
Math.sqrt(2);  // -> 1.414213562373095
Math.sqrt();   // -> NaN
```

<br>

#### 29.2.6 Math.random

Math.random 메서드는 임의의 난수(랜덤 숫자)를 반환한다. 

- Math.random 메서드가 반환한 난수는 0 이상 1 미만의 실수다.(1 포함 x)

<br>

#### 29.2.7 Math.pow

Math.pow 메서드는 첫번째 인수를 밑으로, 두번째 인수를 지수의로 거듭제곱한 결과를 반환한다.

- ES7에서 도입된 지수연산자(`**`)를 사용하면 가독성이 더 좋다.

<br>

#### 29.2.8 Math.max

Math.max 메서드는 전달받은 인수 중에서 가장 큰 수를 반환한다.

- 인수가 전달되지 않으면 -Infinity를 반환한다.

<br>

#### 29.2.9 Math.min

Math.min 메서드는 전달받은 인수 중에서 가장 작은 수를 반환한다.

- 인수가 전달되지 않으면 Infinity를 반환한다.

<br>

> 배열을 인수로 전달받아 최댓값/최솟값을 구하려면?
>```javascript
>Math.max.apply(null, [1, 2, 3]); // -> 3
>Math.max(...[1, 2, 3]); // -> 3

Math.min.apply(null, [1, 2, 3]); // -> 1
Math.min(...[1, 2, 3]); // -> 1
>```