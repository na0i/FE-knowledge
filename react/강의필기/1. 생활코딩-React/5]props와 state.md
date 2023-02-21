### props와 state

##### props
- read only
- cannot be modified


> props로 전달받은 것을 component 내에서 수정하려고 하면<br>
> ex) this.props.title = 'hi';<br>
> 에러 발생

> 위에서(상위 컴포넌트) 수정은 가능

<br>

##### state
- state changes can be asynchronous
- can be modified(this.setState)


<br>

##### 공통점
- 둘다 render 함수 호출

<br>

##### 그림으로 이해하기
![image](https://user-images.githubusercontent.com/77482972/150939240-aeff3ed1-557e-4019-9df4-3eafd37040f4.png)

- 상위 컴포넌트 > 하위 컴포넌트: props를 이용
- 하위 컴포넌트 > 상위 컴포넌트: 이벤트를 트리거로 사용