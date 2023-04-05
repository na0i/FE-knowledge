## 31장 RegExp

### 31.1 정규 표현식이란?

**정규 표현식은 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어다.** 

<br>

##### 정규 표현식의 특징
- 자바스크립트 고유 문법이 아니라 대부분의 프로그래밍 언어와 에디터에 내장되어 있다.
- 문자열을 대상으로 패턴 매칭 기능(특정 패턴과 일치하는 문자열을 검색/추출/치환하는 기능)을 제공한다.
- 반복문과 조건문 없이 패턴을 정의하고 테스트할 수 있지만 가독성이 좋지 않다는 단점이 있다.

<br>

### 31.2 정규 표현식의 생성

정규 표현식은 정규 표현식 리터럴(일반적인 방법)과 RegExp 생성자 함수를 사용해 생성할 수 있다.

<br>

```javascript
const target = 'Is this all there is?';

// 정규 표현식 리터럴
const regexp1 = /is/i;
regexp1.test(target); // true

// RegExp 생성자 함수
const regexp2 = new RegExp(/is/i);
regexp2.test(target); //true

// RegExp 생성자 함수 + 변수를 사용해 동적으로 생성
const count = (str, char) => (str.match(new RegExp(char, 'gi')) ?? []).length;
count('Is this all there is?', 'is'); // 3
```

<br>

### 31.3 RegExp 메서드

##### 정규 표현식을 사용하는 메서드
- RegExp.prototype.exec
- RegExp.prototype.test
- String.prototype.match
- String.prototype.replace
- String.prototype.split

<br>

#### 31.3.1 RegExp.prototype.exec

`exec` 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 **매칭 결과를 배열로 반환**한다.

- 매칭 결과가 없는 경우 null을 반환한다.
- g플래그(문자열 내 모든 패턴 검색)를 지정해도 첫번째 매칭 결과만 반환한다.

```javascript
const target = 'Is this all there is';
const regExp = /is/;

regExp.exec(target); // ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

<br>

#### 31.3.2 RegExp.prototype.test

`test` 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 **매칭 결과를 boolean 값으로 반환**한다.

```javascript
const target = 'Is this all there is';
const regExp = /is/;

regExp.test(target); // true
```

<br>

#### 31.3.3 String.prototype.match

`match` 메서드는 **대상 문자열과 인수로 전달받은 정규 표현식과의 매칭 결과를 배열로 반환**한다.

- 매칭 결과가 없는 경우 null을 반환한다.
- g플래그를 지정할 경우 모든 매칭 결과를 배열로 반환한다.

```javascript
const target = 'Is this all there is';
const regExp1 = /is/;

target.match(regExp1); // ["is", index: 5, input: "Is this all there is?", groups: undefined]

const regExp2 = /is/g;

target.match(regExp2); // ["is", "is"]
```

<br>

### 31.4 플래그

플래그는 정규 표현식의 검색 방식을 설정하기 위해 사용한다.

#### i
- 의미: ignore case
- 대소문자를 구별하지 않고 검색한다.


#### g
- 의미: global
- 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색한다.

#### m
- 의미: multi line
- 문자열의 행이 바뀌더라도 패턴 검색을 계속한다.

<br>

#### 플래그의 특징
- 옵션이므로 선택적으로 사용 가능하다.
- 순서와 상관없이 하나 이상의 플래그를 동시에 설정할 수도 있다.
- 플래그를 사용하지 않으면 대소문자를 구별해서 패턴을 검색한다.
- 문자열의 패턴 검색 매칭 대상이 1개 이상이더라도 첫 번째 매칭 대상만 검색하고 종료한다.

<br>

예시
```javascript
const target = 'Is this all there is';

target.match(/is/); //is 문자열을 대소문자 구별하여 한 번만 검색
target.match(/is/i); // is 문자열을 대소문자 구별하지 않고 한 번만 검색
target.match(/is/g); // is 문자열을 대소문자 구별하여 전역 검색
target.match(/is/ig); // is 문자열을 대소문자 구별하지 않고 전역 검색
```

<br>

### 31.5 패턴

정규 표현식은 패턴과 플래그로 구성된다.

- 패턴: 문자열의 일정한 규칙을 표현하기 위해 사용
- 플래그: 정규 표현식의 검색 방식을 설정하기 위해 사용

<br>

##### 패턴의 특징
- `/`로 열고 닫으며 따옴표는 생략한다.(따옴표를 포함하면 따옴표까지 검색된다.)
- 메타문자 또는 기호로 표현할 수 있다.
- 패턴과 일치하는 문자열이 존재할 때 정규 표현식과 match한다고 표현한다.

<br>

#### 31.5.1 문자열 검색

정규 표현식의 패턴에 문자열을 지정하면 검색 대상 문자열에서 패턴으로 지정한 문자열을 검색한다.

<br>

#### 31.5.2 임의의 문자열 검색

`.`은 임의의 문자 한 개를 의미한다.

```javascript
const target = 'Is this all there is';

const regExp1 = /.../g;
target.match(regExp1); // ['Is ', 'thi', 's a', 'll ', 'the', 're ']

const regExp2 = /./g;
target.match(regExp2); // ['I', 's', ' ', 't', 'h', 'i', 's', ' ', 'a', 'l', 'l', ' ', 't', 'h', 'e', 'r', 'e', ' ', 'i', 's']
```

<br>

#### 31.5.3 반복 검색

`{m,n}`은 앞선 패턴이 최소 m번, 최대 n번 반복되는 문자열을 의미한다.(콤마 뒤에 공백이 있을 경우 정상 동작하지 않는다.)<br>

`{n}`은 `{n, n}`과 같다. 즉 최소 n번, 최대 n번이므로 n번 반복되는 문자열을 의미한다.<br>

`{n,}`은 패턴이 최소 n번 이상 반복되는 문자열을 의미한다.<br>

`+`는 패턴이 최소 한 번 이상 반복되는 문자열을 말한다. 즉 {1,}과 같다. <br>


`?`는 패턴이 최대 한 번 반복되는 문자열을 말한다. 즉 {0,1}과 같다.

```javascript
const target = 'A AA B BB Aa Bb AAA';

const regExp1 = /A{1,2}/g;
target.match(regExp1); // ['A', 'AA', 'A', 'AA', 'A']

const regExp2 = /A{2}/g;
target.match(regExp2); // ['AA', 'AA']

const regExp3 = /A{2,}/g;
target.match(regExp3); // ['AA', 'AAA']

const regExp4 = /A+/g;
target.match(regExp4); // ['A', 'AA', 'A', 'AAA']

// color 다음 u가 최대 1번(0~1) 반복되고 r이 이어지는 문자열을 전역 검색한다. ???
const target2 = 'color colour colouur';
const regExp5 = /colou?r/g;
target2.match(regExp5); // ['color', 'colour']
```

<br>

#### 31.5.4 OR 검색

`|`는 or의 의미를 갖는다.<br>

`+`를 함께 사용하면 분해되지 않은 단어 레벨로 검색할 수 있다.

```javascript
const target = 'A AA B BB Aa Bb';

const regExp1 = /A|B/g;
target.match(regExp1); // ["A", "A", "A", "B", "B", "B", "A",
"B"]

const regExp2 = /A+|B+/g;
target.match(regExp2); // ["A", "AA", "B", "BB", "A", "B"]
```

<br>

`[]`내의 문자는 or로 동작하고 그 뒤에 `+`를 사용하면 패턴을 한 번 이상 반복한다.

```javascript
const target = 'A AA B BB Aa Bb';

const regExp = /[AB]+/g;
target.match(regExp); // ["A", "AA", "B", "BB", "A", "B"]
```

<br>

[] 안에 `-`를 사용하여 범위를 지정한다.

```javascript
const target = 'A AA BB ZZAa Bb';

const regExp1 = /[A-Z]+/g; // // 'A'~'Z'가 한 번 이상 반복되는 문자열을 전역 검색
const regExp2 = /[A-Za-z]+/g; // 'A'~'Z' 또는 'a'~'z'가 한 번 이상 반복되는 문자열을 전역 검색

target.match(regExp1); // -> ["A", "AA", "BB", "ZZ", "A", "B"]
target.match(regExp2); // -> ["AA", "BB", "Aa", "Bb"]
```

<br>

숫자를 검색할 수도 있다.

<br>

`\d`는 숫자를 의미한다.<br>
`\D`는 숫자가 아닌 문자를 의미한다.

```javascript
const target = 'AA BB 12,345';

const regExp1 = /[0-9]+/g; // '0'~'9'가 한 번 이상 반복되는 문자열을 전역 검색
const regExp2 = /[\d,]+/g; // '0'~'9' 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색

target.match(regExp1); // -> ["12", "345"]
target.match(regExp2); // -> ["12,345"]
```

<br>

`\w`는 알파벳, 숫자, 언더스코어를 의미한다.([A-Za-z0-9_]와 같다.) <br>
`\W`는 알파벳, 숫자, 언더스코어가 아닌 문자를 의미한다.

```javascript
const target = 'Aa Bb 12,345 _$%&';


const regExp1 = /[\w,]+/g; // 알파벳, 숫자, 언더스코어, ','가 한 번 이상 반복되는 문자열을 전역 검색
const regExp2 = /[\W,]+/g; // 알파벳, 숫자, 언더스코어가 아닌 문자 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색

target.match(regExp1); // -> ["Aa", "Bb", "12,345", "_"]
target.match(regExp2); // -> [" ", " ", ",", " $%&"]
```

<br>

#### 31.5.5 NOT 검색

[...] 내의 `^`은 not의 의미를 갖는다.

```javascript
const target = 'AA BB 12 Aa Bb';

const regExp = /[^0-9]+/g; // 숫자를 제외한 문자열을 전역 검색
target.match(regExp); // -> ["AA BB ", " Aa Bb"]
```

<br>

#### 31.5.6 시작 위치로 검색

[...] 밖의 `^`은 문자열의 시작을 의미한다.

```javascript
const target = 'https://poiemaweb.com';

const regExp = /^https/; // 'https'로 시작하는지 검사
regExp.test(target); // -> true
```

<br>

#### 31.5.7 마지막 위치로 검색

`$`는 문자열의 마지막을 의미한다.

```javascript
const target = 'https://poiemaweb.com';


const regExp = /com$/; // 'com'으로 끝나는지 검사
regExp.test(target); // -> true
```

<br>

### 31.6 자주 사용하는 정규 표현식

```javascript
// 특정 단어로 시작하는지 검사
const url = 'https://example.com';

// 'http://' 또는 'https://'로 시작하는지 검사
// ? 왜 중간에 \를 사용할까
/^https?:\/\//.test(url); // -> true


// 특정 단어로 끝나는지 검사
const fileName = 'index.html';
/html$/.test(fileName); // -> true

// 숫자로만 이루어졌는지 검사
const target = '12345';
/^\d+$/.test(target); // -> true

// 하나 이상의 공백으로 시작하는지 검사
// \s는 여러가지 공백문자를 의미한다.
const target = ' Hi!';
/^[\s]+/.test(target); // -> true

// 아이디로 사용가능한지 검사
// 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4 ~ 10자리인지 검사한다.
// {4,10}은 앞선 패턴(알파벳대소문자 또는 숫자)이 최소 4번, 최대 10번 반복되 문자열을 의미
/^[A-Za-z0-9]{4,10}$/.test(id); // -> true

// 메일 주소 형식이 맞는지 검사
/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(email); // -> true

// 핸드폰 번호 형식이 맞는지 검사
/^\d{3}-\d{3,4}-\d{4}$/.test(cellphone); // -> true

// 특수문자 포함 여부 검사
// A-Za-z0-9 이외의 문자가 있는지 검사한다.
(/[^A-Za-z0-9]/gi).test(target); // -> true
```