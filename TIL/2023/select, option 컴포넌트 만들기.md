# select, option 커스텀 컴포넌트 만들기(ul 태그에 onChange 사용하기)

##### select와 option 커스텀 컴포넌트를 만들게 된 배경

select와 option 컴포넌트 개발을 맡게 됐는데, native한 select와 option은 디자인적으로 커스텀하기에 용이하지 않았다. 찾아보니 보통 두 가지 경우로 select와 option 태그를 만든다고 했다.

- div 태그로 만들기
- ul과 li 태그로 만들기

<br>

쉬운 태스크라고 생각했지만, typescript와 함께하면서 수많은 삽질(?) 과정을 겪게 됐고 그 과정이 생각보다 되게 재미있었어서 글로 남겨보려고 한다!

<br>

##### 필요했던 조건

일반적인 select와 조금 다른 과정을 거치게 됐던 건 우리 프로젝트 상 특정 조건이 있었기 때문이다.

<br>

기존에 존재했던 useInput훅과 함께 사용할 수 있어야 한다는 점이었다!

> 아래는 useInput 훅의 일부 코드
> ```javascript
> const onChange = useCallback(
>	(
>		e:
>			| React.ChangeEvent<HTMLInputElement>
>			| React.ChangeEvent<HTMLTextAreaElement>
>			| React.ChangeEvent<HTMLSelectElement>
>	) => {
>		const { name, value } = e.target;
>		setForm((form) => ({ ...form, [name]: value }));
>	},
>	[]
> );
>```

<br>

이게 왜 문제였냐면, 나는 select를 `div`나 `ul과 li`태그로 만들어야 하는데
 
1. div나 ul태그에는 onChange 이벤트 함수를 연결할 수가 없고
2. 우리가 사용중인 useInput의 onChange는 `React.ChangeEvent<HTMLInputElement>`, `React.ChangeEvent<HTMLTextAreaElement>`,  `React.ChangeEvent<HTMLSelectElement>` 타입만을 받기
때문이었다.

<br>

그러니까 이 글은 사실 다른 태그(div, ul)를 onChange와 함께 사용할 수 있는 select와 option 만든 후기라고 할 수 있겠다.

<br>

