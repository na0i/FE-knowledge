### React Component-Lifecycle

<br>

#### Component Lifecycle 개요

<br>

![image](https://user-images.githubusercontent.com/77482972/153004342-c1834d06-2f4c-4382-91da-a106ead15804.png)

좌측: 전체 라이프사이클<br>
우측: 축약형 라이프사이클(빈번하게 사용되는 것들)

<br>

##### mount
컴포넌트가 생성돼서 사용자에게 보여지기까지의 전체 과정
- constructor
- getDrivedStateFromProps
- render
- componentDidMount

<br>

##### update
이미 마운트 되어있는 컴포넌트가 특정한 경우에 다시 렌더링 될 때 호출
> [특정한 경우의 예시] <br>
> 새로운 props값 <br>
> setState로 state 값의 변경<br>
> forceUpdate()
> - state나 props값 변경 없이 재렌더링 시킴
> - shouldComponentUpdate를 호출하지 않음
> - 사용이 권장되지 않음

- getDrivedStateFromProps
- shouldComponentUpdate
- render
- shouldComponentUpdate
- getSnapshotBeforeUpdate
- componentDidUpdate

<br>

##### unmount
컴포넌트가 보였다가 필요가 없어져서 사라져야하는 상황에 호출<br>
자주 사용하지는 않지만 정리 작업에 사용
- componentWillUnmount: 해당 컴포넌트가 이벤트 리스너를 달고있거나 특정 리소스를 가지고 있을 때 이를 반환 혹은 해제해야할 때 사용

<br>

#### 생성자와 ComponentDidMount()

![image](https://user-images.githubusercontent.com/77482972/153007309-f3397168-51db-42ad-bcb8-29a1663959ab.png)

##### 생성자
- state에 대한 초기화 작업
- this binding 작업

##### ComponentDidMount
- 데이터 로딩의 작업 진행
- 마운트 되고 난 직후에 바로 호출(렌더 메소드가 호출되고 리얼 돔 객체에 올라가는 것까지 된 상태, 화면에 올라가야할 것들은 다 올라간 상태, 그곳에 데이터를 붙이는 작업을 하는 것)

> [예시] <br>
> 리스트에 특정 아이템을 출력하려고 할 때<br>
> 그 아이템의 데이터들이 서버에 존재한다면<br>
> 서버에서 데이터를 읽어오는 데이터 작업이 필요해진다.<br>
> 그 데이터들이 state에 있는 데이터라면 읽어온 값을 세팅하는 작업이 필요해지는데<br>
> 그것을 componentDidMount에서 실행한다.<br>
> 

<br>

#### this binding
1. 생성자에서 전부 바인딩
2. 함수 바로 뒤에 바인딩
3. arrow function은 this 바인딩 필요하지 x
4. auto-bind라는 라이브러리 사용하기