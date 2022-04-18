# HTML

### 2022.04.15 Forms and Validations

<br>

##### 참고한 사이트

> https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation

<br>

##### Client-side form validation

- 서버에 데이터를 제출하기 전 모든 필수 양식 컨트롤이 올바른 형식으로 채워졌는지 확인하는 것이 중요
- 초기 확인 단계일 뿐 철저한 보안 조치는 X
- 클라이언트 측에서 잘못된 데이터를 포착해 사용자가 즉시 수정할 수 있도록 함(서버에 도착한 후 거절될 경우 왕복 이동 시간만큼의 지연이 발생하기 때문)

<br>

##### What is form validation?

![image](https://user-images.githubusercontent.com/77482972/163334365-a331f43b-bf09-4eed-9c54-5c445292a831.png)

- 데이터를 입력하면 브라우저 및 또는 웹 서버에서 데이터가 올바른 형식이고 설정한 제약 조건 내에 있는지 확인
- 정보의 형식이 올바르지 않으면 사용자에게 수정해야할 사항을 설명하는 오류 메시지가 표시되고 다시 시도 하도록 함
- 왜 form validation을 확인해야할까?
  - 올바른 형식으로 올바른 데이터를 얻기 위해
  - 사용자의 데이터 보호를 위해(사용자에게 보안 암호를 입력하도록 해 계정 정보를 보호)
  - 악의적인 사용자로부터의 보호

<br>

##### Different types of client-side validation

1. Built-in form validation

- html5 form validation 검사 기능 사용
- javascript validation 보다 성능이 우수하지만 커스텀화 정도는 javascript validation이 더 뛰어남

2. Javascript validation

- javascript를 사용하여 코딩
- 사용자가 완전히 정의 할 수 있지만 대신 모두 생성하거나
- 라이브러리를 사용해야 함

<br>

##### Using Built-in form validation

- `required`: 양식 필드를 채워야하는지 여부
- `minlength` 과 `maxlenth`: 문자열의 최소 및 최대 길이
- `min` 과 `max`: 숫자 입력 유형의 최솟값 및 최댓값
- `type`: 숫자, 이메일 주소와 같이 특정 사전 설정 유형이어야 하는지 여부를 지정
- `pattern`: 입력된 데이터가 따라야하는 패턴(정규식)을 지정

<br>

javascript에 의존하지 않고 사용자 데이터를 검증<br>
위의 속성에 지정된 모든 규칙을 따르는 경우 유효한 것으로 간주

<br>

<b>
요소가 유효할 경우 적용되는 내용

</b>

- 사용자가 데이터를 보내려고 할 때 브라우저가 양식을 제출
- CSS pseudo-class 중 `:valid`와 일치해, valid한 요소에 특정 스타일을 적용할 수 있다.

<br>

요소가 유효하지 않을 경우 적용되는 내용

- 사용자가 데이터를 보내려고 하면 브라우저가 양식을 차단하고 오류 메시지를 표시
- CSS pseudo-class 중 `:invalid`와 일치해(`:out-of-range`와 같이 에러에 따라 다른 UI pseudo-classes와 일치할 수도 있음), invalid한 요소에 특정 스타일을 적용할 수 있다.

<br>
