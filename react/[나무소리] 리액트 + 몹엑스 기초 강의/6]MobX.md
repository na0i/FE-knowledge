### MobX

<br>

#### State 관리 개요

![image](https://user-images.githubusercontent.com/77482972/153107045-ba80bdba-1452-4b99-a201-b4b32307e8c1.png)

<br>

#### Flux 아키텍쳐

![image](https://user-images.githubusercontent.com/77482972/153107414-200eab22-dfde-41d2-ac58-218cf8deff03.png)
![image](https://user-images.githubusercontent.com/77482972/153107854-a9e27389-81f3-4ac5-8799-914c4888cee6.png)

- 단방향 데이터 흐름
- Store는 View에서 사용되는 데이터(state)를 관리
- View는 리액트의 컴포넌트
- Dispatcher: Action과 state의 매핑(action이 어떤 특정 state를 변경할 것인지 매핑)
- Action: store가 가지고 있는 data를 변경

<br>

#### MobX 개요

![image](https://user-images.githubusercontent.com/77482972/153108623-4e8a51a3-d773-44bf-9ad5-3cf047ae15d9.png)

<br>

![image](https://user-images.githubusercontent.com/77482972/153108882-a6f6e6bd-5bd5-4ac5-aff6-3736e1ec6411.png)

이 API를 사용하기 위해서는 2가지 라이브러리를 설치해야한다.<br>
1. MobX (Library): react와 연결해서 사용, 실제로 스토어를 관리
2. MobX React (Library): MobX로 react를 적용하기 위해 사용

##### observable
- 관찰되어지는 데이터
- MobX를 통해 관리되는 state

##### observer
- observable이라는 데이터를 바라보는 View
- 컴포넌트 = observer

##### action
- 기본적으로 많이 사용하는 것은 action
- 그러나 비동기 형태의 작업이 진행될 때에는 runInAction을 사용
- observable 데이터를 변경할 때에는 action 함수의 파라미터로 변경하는 함수를 보내줘야 한다.
- action 데코레이터를 이용하지 않으면 action을 호출할 때마다 렌더링이 일어나게 된다.

<br>

![image](https://user-images.githubusercontent.com/77482972/153130515-a60d43b7-6436-4694-817a-3b9427f627aa.png)

##### computed
- 성능 때문에 사용하는 API
- observable한 데이터를 가지고 어떤 연산을 수행하는 get 메소드에 붙인다.
- computed가 붙은 메서드는 캐싱(caching) 작업을 함
> [예시]
> observable data: x = 10, y = 5<br>
> get 메서드: x * y 일때<br>
> get 메서드 위에 @computed를 붙인다.<br>
> <br>
> get 메서드가 10번이 호출된다고 가정하고, x와 y값이 변하지 않는다면<br>
> 캐싱된 값을 가져와(연산하지 않고) 반환한다.

<br>

![image](https://user-images.githubusercontent.com/77482972/153134469-22d4094d-759e-4b31-b6d5-9e2837ead7aa.png)

##### inject
- store 객체를 컴포넌트에 주입해 줄 때 사용
- 해당 스토어를 주입할 때 그 스토어를 사용하는 리액트 컴포넌트에 인젝트라는 API를 통해 주입
- inject를 통해 주입된 스토어 객체들은 props에서 꺼내서 사용
- inject 주입을 받기 위해서는 provider를 통해서 전체 스토어들이 제공되어야하는 게 전제됨

##### observer
- 모든 리액트 컴포넌트에 적용해야 한다.(권장사항)
  > why?<br>
  > observable한 데이터가 객체 속 객체의 형태일 때<br>
  > observer를 모든 컴포넌트에 사용하지 않으면<br>
  > 변화를 캐치하지 못할 가능성이 있다.(바로바로 반영이 안될 수 있다.)
- observable 데이터를 관찰하는 컴포넌트에 적용하는 API
- 데이터가 변경되면 render가 다시 수행
- mobx의 autorun을 이용, observable한 데이터가 변경됐을 때 렌더링을 다시 한다.
- autorun(render)와 유사

<br>

#### MobX의 적용

![image](https://user-images.githubusercontent.com/77482972/153135515-43f50fc1-f874-4dd4-af46-762c3eda124f.png)

1. container: 리액트의 컴포넌트가 위치
2. view: 리액트의 컴포넌트가 위치
3. repository or API: 서버와 통신을 하는 자바스크립트 객체들이 위치하는 패키지
4. store: mobx를 이용해 state를 관리하는 객체들이 위치하는 자리
5. model: 서버로부터 받은 데이터를 변환해줄 때 사용하는 클래스들이 존재

<br>

![image](https://user-images.githubusercontent.com/77482972/153135980-abd62c21-f1ea-40b6-b960-26d2d0afe8a0.png)