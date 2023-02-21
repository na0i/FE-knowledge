### 리액트 동작 방식

<br>

#### React 동작 방식

![image](https://user-images.githubusercontent.com/77482972/152457638-2821f3e4-9c36-4fd0-b112-a3bcd2d99b88.png)

<br>

##### CSR(Client Side Rendering)
SPA에서 클라이언트는<br>
빈 응답페이지와 그곳에 담길 (요청한) 데이터 정보를 받는다.<br>
이를 이용해 클라이언트가 주체적으로 화면을 구성한다.

<br>

#### React Element

<br>

**Element** <br>
리액트가 화면을 구성하는 가장 작은 단위
<br>

![image](https://user-images.githubusercontent.com/77482972/152458121-548ef3f4-44a2-4ed4-979d-4046d72e4635.png)

createElement로 생성한 h1태그를<br>
render 함수(주체가 ReactDOM)에 전달해 화면에 출력<br>
<br>
react.js는 엘리먼트 혹은 컴포넌트를 만들어 낼 때 사용
react-dom.js는 그것들을 화면에 보여주는 역할

##### createElement
- 엘리먼트를 생성하는 메서드
- 3개의 파라미터(type, props, child)
- 이를 console에 찍으면 우측 사진과 같이 찍힘
- 주체가 React

<br>

이와 같이 createElement를 이용하고<br>
중첩시키는 과정이 복잡해짐으로써<br>
JSX 문법, 컴포넌트가 등장

<br>

#### Virtual DOM

<br>

![image](https://user-images.githubusercontent.com/77482972/152460684-17327ca0-0c07-4fc2-8c73-6865ed6817d3.png)

<br>

우리가 보고있는 것은 Real DOM<br>
리액트는 메모리상에 Virtual DOM 이라는 것을 두고 있다.<br>
그래서 Virtual DOM을 변경했을 때<br>
리액트는 Real DOM과 Virtual DOM을 비교하여<br>
바뀐 부분이 있다면 그 부분을 수정해 실제 돔을 바꾸어줌

<br>

버츄얼 돔을 구성하는 각각의 요소들이 리액트 엘리먼트<br>
그래서 리액트 엘리먼트가 가지고 있는 값의 형태는<br>
일반적으로 플레인 오브젝트(데이터의 형태만) 가지고 있다.

<br>

리액트 돔을 통해서 렌더링한다는 말은<br>
**버츄얼 돔의 바뀐 데이터를 실제 돔과 비교하고 수정해서 반영한다**<br>
어떻게 비교하고 패치하는 지는 라이브러리가 한다.