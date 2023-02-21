### React Component-props

<br>

#### React Component 개요

<br>

![image](https://user-images.githubusercontent.com/77482972/152473249-8c2c1d67-54e5-41c1-85af-ff017bd1607f.png)

![image](https://user-images.githubusercontent.com/77482972/152473466-c6170ab6-c224-44d8-877c-003968953d2a.png)

<br>

##### 컴포넌트
- 사용자 ui 구성에 가장 기본이 되는 단위
- 클래스 기반 컴포넌트는 반드시 render 메소드가 필요하고 render 메소드는 react 엘리먼트를 리턴해야한다.

##### 클래스 기반 컴포넌트
- props
- state
- life cycle

<br>

#### props

<br>

![image](https://user-images.githubusercontent.com/77482972/152475725-ce26bca4-982b-45db-bffc-a598d82f1d51.png)

- 클래스 기반 component에서는 this.props로 접근 가능
- 받는 입장에서는 props에 저장된 data를 변경 불가능(불변)

![image](https://user-images.githubusercontent.com/77482972/152476212-2cd1c045-7c0b-4e07-bea4-0aae6302808c.png)

![image](https://user-images.githubusercontent.com/77482972/152476431-2783878c-14d3-4dd4-b12f-fe224a671fe8.png)

- 하위 컴포넌트에서 상위 컴포넌트에서 받은 것에 대해 검증하고 싶음(유효성 검사)
- 이럴 때 사용하는 것이 proptypes
- ts로 코드를 짜면서 잘 사용하지는 않게 됨
- 컴파일에는 문제가 없지만 개발자 도구에서 경고를 확인 할 수 있음

