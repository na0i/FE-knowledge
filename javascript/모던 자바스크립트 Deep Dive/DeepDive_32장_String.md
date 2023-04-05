## 32장 String

### 32.1 String 생성자 함수

String 객체는 생성자 함수 객체이므로 new 연산자와 함께 호출하여 String 인스턴스를 생성할 수 있다.

<br>

#### String 생성자 함수 

- 인수로 문자열을 전달 + new 연산자: [[StringData]] 내부 슬롯에 인수로 전달받은 문자열을 할당한 String 래퍼 객체를 생성
- 인수를 전달하지 않으면 + new 연산자: [[StringData]] 내부 슬롯에 빈 문자열을 할당한 String 래퍼 객체를 생성
- 인수로 문자열이 아닌 값을 전달 + new 연산자: 인수를 문자열로 강제 변환 후, [StringData]] 내부 슬롯에 변환된 문자열을 할당한 String 래퍼 객체를 생성
- new 연산자를 사용하지 않고 호출: String 인스턴스가 아닌 문자열을 반환

<br>

##### String 래퍼 객체
- 배열과 마찬가지로
- length 프로퍼티와 / 인덱스를 나타내는 숫자 형식의 문자열을 프로퍼티 키로 / 각 문자를 프로퍼티 값으로 갖는
- 유사 배열 객체이자 이터러블이기 때문에
- 인덱스를 사용하여 각 문자에 접근 가능하다.

<br>

문자열은 원시값이므로 변경할 수 없다.

```javascript
const strObj = new String('Lee');
console.log(strObj[0]); // L

strObj[0] = 'S';
console.log(strObj); // 'Lee'
```

<br>

### 32.2 length 프로퍼티

문자열의 문자 개수를 반환한다.

<br>

### 32.3 String 메서드

String 객체의 메서드는 언제나 새로운 문자열을 반환한다.(원본 String 래퍼 객체를 직접 변경하는 메서드는 없다)

<br>

문자열은 변경 불가능한 원시값이기 떄문에 String 래퍼 객체도 읽기 전용 객체로 제공된다.(writable 프로퍼티 어트리뷰트 값이 false다.)

<br>

#### 32.3.1 String.prototype.indexOf

`indexOf` 메서드는 인수로 전달받은 문자열을 검색하여 첫 번째 인덱스를 반환한다.

- 검색에 실패하면 -1을 반환한다.
- 2번째 인수로 검색을 시작할 인덱스를 전달할 수 있다.
- includes 메서드를 사용하면 가독성이 더 좋다.

```javascript
const str = 'Hello World';
str.indexOf('l'); // -> 2
```

<br>

#### 32.3.2 String.prototype.search

`search` 메서드는 인수로 전달받은 정규 표현식과 매치하는 문자열을 검색하여 일치하는 문자열의 인덱스를 반환한다.

- 검색에 실패하면 -1을 반환한다.

```javascript
const str = 'Hello world';

str.search(/o/); // -> 4
str.search(/x/); // -> -1
```

<br>

#### 32.3.3 String.prototype.includes

`includes` 메서드는 인수로 전달받은 문자열이 포함되어 있는지 확인하여 boolean 값으로 반환한다.

- 2번째 인수로 검색을 시작할 인덱스를 전달할 수 있다.

```javascript
const str = 'Hello world';

str.includes('Hello'); // -> true
str.includes('');      // -> true
str.includes();        // -> false
str.includes('H', 3); // -> false
```

<br>

#### 32.3.4 String.prototype.startsWith

`startsWith` 메서드는 인수로 전달받은 문자열로 시작하는지 확인하여 boolean 값으로 반환한다.

- 2번째 인수로 검색을 시작할 인덱스를 전달할 수 있다.

```javascript
const str = 'Hello world';

str.startsWith('He'); // -> true
str.startsWith('x'); // -> false
str.startsWith(' ', 5); // -> true
```

<br>

#### 32.3.5 String.prototype.endsWith

`endsWith` 메서드는 인수로 전달받은 문자열로 끝나는지 확인하여 boolean 값으로 반환한다.

- 2번째 인수로 검색할 문자열의 길이를 전달할 수 있다.

```javascript
const str = 'Hello world';

str.endsWith('ld'); // -> true
// 문자열 str의 처음부터 5자리까지('Hello')가 'lo'로 끝나는지 확인
str.endsWith('lo', 5); // -> true
```

<br>

#### 32.3.6 String.prototype.charAt

`charAt` 메서드는 인수로 전달받은 인덱스에 위치한 문자를 검색하여 반환한다.

- 인덱스는 0 ~ (문자열 길이 -1) 사이의 정수여야 한다.
- 인덱스가 범위를 벗어났을 경우 빈 문자열을 반환한다.

```javascript
const str = 'Hello';

for (let i = 0; i < str.length; i++) {
  console.log(str.charAt(i)); // H e l l o
}
```

<br>

#### 32.3.7 String.prototype.substring

`substring` 메서드는
- 첫 번째 인수로 전달받은 인덱스에 위치하는 문자부터
- 두 번째 인수로 전달받은 인덱스에 위치하는 문자의 바로 이전 문자까지의

부분 문자열을 반환한다.

- 두 번째 인수는 생략 가능하며 생략될 경우 마지막 문자까지의 부분 문자열을 반환한다.
- 첫 번째 인수 < 두 번째 인수여야 한다.
- 하지만 다음 경우에도 정상 동작한다.
	- 첫 번째 인수 > 두 번째 인수라면 두 인수는 교환된다.
	- 인수가 음수이거나 NaN이면 0으로 취급된다.
	- 인수가 문자열의 길이보다 클 경우 문자열 길이로 취급된다.

```javascript
const str = 'Hello World';

str.substring(1, 4); // -> ell
str.substring(4, 1); // -> 'ell'
str.substring(-2); // -> 'Hello World'
str.substring(1, 100); // -> 'ello World'
```

<br>

#### 32.3.8 String.prototype.slice

`slice` 메서드는 substring 메서드와 동일하게 동작하지만 slice 메서드는 음수를 전달할 수 있다.

- 음수인 인수를 전달하면 문자열 가장 뒤부터 시작하여 문자열을 잘라내어 반환한다.

```javascript
const str = 'hello world';

str.slice(0, 5); // -> 'hello'

str.substring(-5); // -> 'hello world'
str.slice(-5); // ⟶ 'world'
```

<br>

#### 32.3.9 String.prototype.toUpperCase

`toUpperCase` 메서드는 문자열을 모두 대문자로 변경한 문자열을 반환한다.

<br>

#### 32.3.10 String.prototype.toLowerCase

`toLowerCase` 메서드는 문자열을 모두 소문자로 변경한 문자열을 반환한다.

<br>

#### 32.3.11 String.prototype.trim

`trim` 메서드는 문자열 앞뒤에 공백 문자가 있을 경우 이를 제거한 문자열을 반환한다.

<br>

#### 32.3.12 String.prototype.repeat

`repeat` 메서드는 인수로 전달받은 정수만큼 반복해 연결한 새로운 문자열을 반환한다.

- 인수가 0이면 빈 문자열을 반환한다.
- 인수가 음수면 RangeError를 발생시킨다.
- 인수는 생략 가능하며 기본값은 0이다.

```javascript
const str = 'abc';

str.repeat(1);   // -> 'abc'
str.repeat(2);   // -> 'abcabc'
str.repeat(2.5); // -> 'abcabc' (2.5 → 2)
str.repeat(-1);  // -> RangeError: Invalid count value
```

<br>

#### 32.3.13 String.prototype.replace

`replace` 메서드는 
- 첫 번째 인수로 전달받은 문자열/정규표현식 을 검색하여
- 두 번째 인수로 전달한 문자열로

치환한 문자열을 반환한다.

- 검색된 문자열이 여럿일 경우 첫 번째 검색된 문자열만 치환한다.
- 특수한 교체 패턴을 사용할 수 있다. ($& => 검색된 문자열)
- 두 번째 인수로 치환 함수를 전달할 수 있다.

```javascript
const str = 'Hello world world';

str.replace('world', 'Lee'); // 'Hello Lee world'
str.replace('world', '<strong>$&</strong>'); // 'Hello <strong>world</strong>'
```

```javascript
function snakeToCamel(snakeCase) {
  return snakeCase.replace(/_[a-z]]/g, match => {
    return match[1].toUpperCase();
  });
}
snakeToCamel('hello_world'); // -> 'helloWorld'
```

<br>

#### 32.3.14 String.prototype.split

`split` 메서드는 첫 번째 인수로 전달한 문자열/정규 표현식을 검색하여 문자열을 구분한 후 분리된 각 문자열로 이루어진 배열을 반환한다.

- 인수로 빈 문자열을 전달하면 각 문자를 모두 분리한다.
- 인수를 생략하면 문자열 전체를 단일 요소로 하는 배열을 반환한다.
- 두 번째 인수로 배열의 길이를 지정할 수 있다.

```javascript
const str = 'How are you doing?';

str.split(' '); // -> ["How", "are", "you", "doing?"]
str.split(/\s/); // -> ["How", "are", "you", "doing?"] // \s는 공백 문자str.split(); // -> ["How are you doing?"]
str.split(' ', 2); // -> ["How", "are"]
```