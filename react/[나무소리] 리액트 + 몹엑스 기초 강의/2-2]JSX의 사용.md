### JSX의 사용

<br>

#### JSX

<br>

![image](https://user-images.githubusercontent.com/77482972/152461676-00f71f72-9253-46f7-8156-fad8e3f673ce.png)

- 자바스크립트 문법의 확장
- createElement 함수보다 element를 간편하게 만들 수 있음
- html 태그처럼 작성
- Transcompile 과정을 거쳐 js로 변환을 해줌
- 이 transcompile 과정에서 사용되는것이 babel(es6를 es5로 변환, jsx를 es5로 변환하는 등)

<br>

#### JSX 사용의 유의사항

![image](https://user-images.githubusercontent.com/77482972/152472072-9c08ec43-4944-4d8a-ad5d-f3a3f540278b.png)

- html tag: 소문자
- 컴포넌트: pascal case
- JSX 문법 내에서 자바스크립트 코드를 작성해야하는 경우에는 `{}`를 사용
- class, for과 같은 예약어는 className, htmlFor를 대신 사용