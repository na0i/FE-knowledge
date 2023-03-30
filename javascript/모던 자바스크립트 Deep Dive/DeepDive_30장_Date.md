## 30장 Date

표준 빌트인 객체인 Date는 날짜와 시간(연, 월, 일, 시, 분, 초, 밀리초)을 위한 메서드를 제공하는 빌트인 객체이면서 생성자 함수다. 

<br>

### 30.1 Date 생성자 함수

Date는 생성자 함수다.

##### Date 객체
- 내부적으로 날짜와 시간을 나타내는 정수값을 갖으며 이 값은 1970년 1월 1일을 기점으로 Date 객체가 나타내는 날짜와 시간까지의 밀리초를 나타낸다.
- Date 객체는 기본적으로 현재 날짜와 시간을 나타내는 정수값을 가진다.

<br>

Date 생성자 함수로 객체를 생성하는 방법은 4가지가 있다.

#### 30.1.1 new Date()

Date 생성자 함수를 인수 없이 new 연산자와 함께 호출하면 현재 날짜와 시간을 갖는 Date 객체를 반환한다.

- 내부적으로는 날짜와 시간을 나타내는 정수값을 갖고
- 기본적으로 날짜와 시간 정보를 출력한다.
- new 연산자 없이 호출하면 Date 객체를 반환하지 않고 날짜와 시간 정보를 나타내는 문자열을 반환한다.

```javascript
new Date(); // -> Mon Jul 06 2020 01:03:18 GMT+0900 (대한민국 표준시)
Date(); // -> "Mon Jul 06 2020 01:10:47 GMT+0900 (대한민국 표준시)"
```

<br>

#### 30.1.2 new Date(milliseconds)

숫자 타입의 밀리초를 인수로 전달하면 `1970년 1월 1일 00:00:00(UTC)`을 기점으로 인수로 전달된 밀리초만큼 경과한 날짜와 시간을 나타내는 Date 객체를 반환한다.

```javascript
new Date(0); // -> Thu Jan 01 1970 09:00:00 GMT+0900 (대한민국 표준시)
new Date(86400000); // -> Fri Jan 02 1970 09:00:00 GMT+0900 (대한민국 표준시)
```

<br>

#### 30.1.3 new Date(dateString)

Date 생성자 함수에 날짜와 시간을 나타내는 문자열을 인수로 전달하면 지정된 날짜와 시간을 나타내는 Date 객체를 반환한다.

- 인수는 Date.parse 메서드에 의해 해석 가능한 형식이어야 한다.
```javascript
new Date('May 26, 2020 10:00:00'); // -> Tue May 26 2020 10:00:00 GMT+0900 (대한민국 표준시)
new Date('2020/03/26/10:00:00'); // -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)
```

<br>

#### 30.1.4 new Date(year, month[, day, hour, minute, second, millisecond]))

Date 생성자 함수에 연, 월, 일, 시, 분, 초, 밀리초를 의미하는 숫자를 인수로 전달하면 지정된 날짜와 시간을 나타내는 Date 객체를 반환한다.

- 연, 월은 반드시 지정해야 한다.
- 지정하지 않은 인수는 0 또는 1로 초기화된다.

```javascript
new Date(2020, 2); // -> Sun Mar 01 2020 00:00:00 GMT+0900 (대한민국 표준시)
new Date(2020, 2, 26, 10, 00, 00, 0); // -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)
new Date('2020/3/26/10:00:00:00'); // -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)
```

<br>

### 30.2 Date 메서드

#### 30.2.1 Date.now

1970년 1월 1일 00:00:0(UTC)을 기점으로 현재 시간까지 경과한 밀리초를 숫자로 반환한다.

<br>

#### 30.2.2 Date.parse

1970년 1월 1일 00:00:0(UTC)을 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환한다.

- new Date(dateString)와 같은 형식의 인수를 사용해야 한다.

<br>

#### 30.2.3 Date.UTC

1970년 1월 1일 00:00:0(UTC)을 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환한다.

- new Date(year, month[, day, hour, minute, second, millisecond]))와 같은 형식의 인수를 사용해야 한다.
- 로컬 타임이 아닌 UTC로 인식된다.

<br>

#### 30.2.4 Date.prototype.getFullYear

Date 객체의 연도를 나타내는 정수를 반환한다.

<br>

#### 30.2.5 Date.prototype.setFullYear

Date 객체에 연도를 나타내는 정수를 설정한다.

- 연도 이외에 옵션 으로 월, 일도 설정할 수 있다.

<br>

#### 30.2.6 Date.prototype.getMonth

Date 객체의 월을 나타내는 정수를 반환한다.

- 0 ~ 11 사이의 값이다.(1월: 0, 12월: 11)

<br>

#### 30.2.7 Date.prototype.setMonth

Date 객체에 월을 나타내는 정수를 설정한다.

- 0 ~ 11 사이의 정수를 설정한다.(1월: 0, 12월: 11)
- 월 이외에 옵션으로 일도 설정할 수 있다.

<br>

#### 30.2.8 Date.prototype.getDate

Date 객체의 날짜를 나타내는 정수를 반환한다.

- 0 ~ 31 사이의 값이다.

<br>

#### 30.2.9 Date.prototype.setDate

Date 객체에 날짜를 나타내는 정수를 설정한다.

- 0 ~ 31 사이의 정수를 설정한다.

<br>

#### 30.2.10 Date.prototype.getDay

Date 객체의 요일을 나타내는 정수를 반환한다.

- 0 ~ 6 사이의 값이다.
- 일월화수목금토 순서로 0 ~ 6의 값이다.

<br>

#### 30.2.11 Date.prototype.getHours

Date 객체의 시간을 나타내는 정수를 반환한다.

- 0 ~ 23 사이의 값이다.

<br>

#### 30.2.12 Date.prototype.setHours

Date 객체에 시간을 나타내는 정수를 설정한다.

- 0 ~ 23 사이의 정수를 설정한다.
- 시간 이외에 옵션으로 분, 초, 밀리초도 설정할 수 있다.

<br>

#### 30.2.13 Date.prototype.getMinutes

Date 객체의 분을 나타내는 정수를 반환한다.

- 0 ~ 59 사이의 값이다.

<br>

#### 30.2.14 Date.prototype.setMinutes

Date 객체에 분을 나타내는 정수를 설정한다.

- 0 ~ 59 사이의 정수를 설정한다.
- 분 이외에 옵션으로 초, 밀리초도 설정할 수 있다.

<br>

#### 30.2.15 Date.prototype.getSeconds

Date 객체의 초를 나타내는 정수를 반환한다.

- 0 ~ 59 사이의 값이다.

<br>

#### 30.2.16 Date.prototype.setSeconds

Date 객체에 초를 나타내는 정수를 설정한다.

- 0 ~ 59 사이의 정수를 설정한다.
- 분 이외에 옵션으로 초밀리초도 설정할 수 있다.

<br>

#### 30.2.17 Date.prototype.getMilliSeconds

Date 객체의 밀리초를 나타내는 정수를 반환한다.

- 0 ~ 999 사이의 값이다.

<br>

#### 30.2.18 Date.prototype.setMilliSeconds

Date 객체에 밀리초를 나타내는 정수를 설정한다.

- 0 ~ 999 사이의 정수를 설정한다.


<br>

#### 30.2.19 Date.prototype.getTime

1970년 1월 1일 00:00:0(UTC)을 기점으로 Date 객체의 시간까지 경과된 밀리초를 반환한다.

<br>

#### 30.2.20 Date.prototype.setTime

Date 객체에 1970년 1월 1일 00:00:0(UTC)을 기점으로 시간까지 경과된 밀리초를 반환한다.

<br>

#### 30.2.21 Date.prototype.getTimezoneOffset

UTC와 Date 객체에 지정된 locale 시간과의 차이를 분 단위로 반환한다.

- ex: UTC = KST - 9h

<br>

#### 30.2.22 Date.prototype.toDateString

사람이 읽을 수 있는 형식의 문자열로 Date 객체의 날짜를 반환한다.

```javascript
const today = new Date('2020/7/24/12:30');
today.toDateString(); // -> Fri Jul 24 2020
```

<br>

#### 30.2.23 Date.prototype.toTimeString

사람이 읽을 수 있는 형식의 문자열로 Date 객체의 시간을 표현한 문자열을 반환한다.

```javascript
const today = new Date('2020/7/24/12:30');
today.toTimeString(); // -> 12:30:00 GMT+0900 (대한민국 표준시)
```

<br>

#### 30.2.24 Date.prototype.toISOString

ISO 8601 형식으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환한다.

```javascript
const today = new Date('2020/7/24/12:30');
today.toISOString(); // -> 2020-07-24T03:30:00.000Z
```

<br>

#### 30.2.25 Date.prototype.toLocaleString

인수로 전달한 locale을 기준으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환한다.

- 인수가 생략될 경우 브라우저가 동작 중인 시스템의 locale을 적용한다. 

```javascript
const today = new Date('2020/7/24/12:30');
today.toLocaleString(); // -> 2020. 7. 24. 오후 12:30:00
today.toLocaleString('ko-KR'); // -> 2020. 7. 24. 오후 12:30:00
today.toLocaleString('en-US'); // -> 7/24/2020, 12:30:00 PM
today.toLocaleString('ja-JP'); // -> 2020/7/24 12:30:00
```

