### 230301

# React의 이벤트 핸들러 네이밍

개발을 하다보면 내가 생각하기에 보기 좋은 함수 이름을 정하게 되는 경우가 많다. "handler나 event 이름은 이렇게 지어야해!" 라는 무조건적인 규칙이 없기도 하고, 팀 내에서 팀원들끼리 이렇게 하자고 정한다 해도 앞부분만 규칙을 따라가고 뒷부분은 각자 쓰고싶은 대로 쓰게 됐는데..

<br>

내 눈에는 보기 좋은 함수 이름이 누군가의 눈에는 좋지 못한 이름이고, 내 눈에는 보기 좋지 않은 함수 이름이 누군가의 눈에는 좋은 이름이라니! 정확한 답이 없을 때 의견을 좁히는 건 너무나 힘든 일이다.

<br>

#### 티끌모아 태..산....?

이러한 의견 대립이 생길 때마다 자주 등장하는 결론은 **"사소한 문제니 넘어가죠"** 였는데, 이런 사소함이 쌓여서 프로젝트 내 전체 코드의 통일성이나 가독성을 저하시키는 게 되는건 아닐까? 라는 생각이 마음 한구석에 자리잡고 있었다. 

<br>

**우연히 읽게 된 좋은 글 등장!**

Jake Trent라는 분에 의해 쓰인 글이다. 이 글의 모든 저작권은 이 분께 있음을 밝힌다.

> https://jaketrent.com/

<br>

> https://github.com/jaketrent


## Event Handler Naming in React (2017.03.09)

<br>

### FOR PROPS

props 이름을 정할 때에는 보통 onClick처럼 built-in 이벤트 핸들러 컨벤션과 맞춰서 on을 prefix로 사용한다.

<br>

이벤트 핸들러 컨벤션과 동일하게 on을 접두사로 사용함으로써, 우리는 이벤트 핸들러 함수를 감싼 것이라고 선언하는 것이다.

<br>

### FOR FUNCTION NAMES

함수 이름도 동일한 패턴을 따르되, prefix를 on 대신 handle을 사용한다.

<br>

#### 예시
```html
<MyComponent onAlertClick={handleAlertClick} />
```

이렇게 하면<br>
**on**은 실제 이벤트가 여기에 연결되어 있음을 알 수 있고,<br>
**handle**은 이벤트가 실행될 때 호출되는 것임을 알 수 있다.

<br>

> 이 때, 다른 동사를 사용하지 않고 click이라는 동사를 사용했는데, 이는 다른 동사와 함께 쓰여도 무관하다. click 대신 handleAlertDismiss와 같이 사용해도 된다는 말인데 사용하는 동사가 실제 동작에 있어서 더 나은 방식이라면 꼭 click이 아닌 다른 동사를 mapping 시켜도 좋다는 뜻이다.

<br>

### MORE COMPLICATED NAMING

네이밍은 더 복잡해질 수도 있다. 필자는 보통 `**명사 > 동사**` 순으로 함수를 작성한다고 한다. 그룹화해서 보기 쉽기 때문이라고 하는데 아래 예시를 보면 더 이해가 쉽다.

#### 예시
```html
<MyComponent1
	onClickAlert={handleClickAlert}
	onHoverAlert={handleHoverAlert}
/>

<MyComponent2
	onAlertClick={handleAlertClick}
	onAlertHover={handleAlertHover}
/>
```

MyComponent1의 props보다 MyComponent2의 props를 보는게 alert에 관련된 props를 한 눈에 볼 수 있어서 훨씬 더 편하다. 알파벳 순으로 정렬까지 해주면 더 좋다.

<br>

### COMPONENT SPLITTING

컴포넌트를 어디서 어떻게 자를지에 대해서는 수많은 논의를 가져올 수 있는 주제이고, 각자의 방식을 찾는 예술이다. 

<br>

네이밍과 관련지어 생각했을 때, 만약 당신이 한 모듈 안에서 많은 이벤트 핸들러를 정의하고 있다면 당신이 추상화를 잘 했는지에 대해 다시 한번 생각해보고 더 나은 캡슐화를 위해 나눠볼 수 있겠다.

<br>

예를 들어, form.js라는 파일에서 onRegisterSubmit, onLoginSubmit이라는 함수를 갖게 됐을 때 이는 <br>

- registeration-form.js의 onSubmit
- login-form.js의 onSubmit

위 예시와 같이 좀 더 단순해진 이름을 사용하는 두개의 파일로 나뉠 수 있다.

<br>

### USING BUILT-IN HANDLER NAMES

onClick과 onSubmit 같은 리액트 내장 이벤트 핸들러 이름을 그대로 갖다 쓰는 것은 실수를 유발할 수 있으므로 조심해야한다.

```html

// props로 onClick={handleClick}을 내려준 상황이라고 가정
const MyComponent = (props) => {
	return <div {...props}><button>이 버튼의 onClick은 어떻게 될까..?</button></div>
}
```

위 예시 같은 상황에서는 onClick에 이벤트 버블링이 일어나게 되고 예기치 않은 동작이 실행될 수 있다.

<br>

### 마치며

내 코드를 처음 봐도 쉽게 이해할 수 있었으면 좋겠다. 유지보수가 쉬운 코드였으면 좋겠다. 가독성이 좋은 코드였으면 좋겠다. 나는 좋은 코드를 쓰는 개발자가 되었으면 좋겠다!