# select, option 커스텀 컴포넌트 만들기(ul 태그에 onChange 사용하기)

### select와 option 커스텀 컴포넌트를 만들게 된 배경

select와 option 컴포넌트 개발을 맡게 됐는데, native한 select와 option은 디자인적으로 커스텀하기에 용이하지 않았다. 찾아보니 보통 두 가지 경우로 select와 option 태그를 만든다고 했다.

- div 태그로 만들기
- ul과 li 태그로 만들기

<br>

쉬운 태스크라고 생각했지만, typescript와 함께하면서 수많은 삽질(?) 과정을 겪게 됐고 그 과정이 생각보다 되게 재미있었어서 글로 남겨보려고 한다!

<br>

### 커스텀 select 태그를 onChange와 함께?

보통 다른 블로그의 커스텀 select를 보면 div나 ul 태그는 onChange 이벤트 함수를 연결할 수 없기 때문에 onClick을 연결해서 사용하고 있다.

<br>

**하지만, native한 select나 mui의 select는 `onChange`를 사용하는데..** <br>
**내가 만든 select 태그는 어쩔 수 없으니 다른 팀원들에게 `onClick`을 사용하세요 라고 한명한명 말해줄 수도 없는 노릇이고 팀원들이 코드 보고 알아서 이해하게 쓰게 하는 건 더욱 안될 노릇이었다..** 

<br>

그래서 나는 select 태그를 커스텀하되 onChange를 연결해서 사용할 수 있도록 만들기로 했다.

<br>

사실 이렇게 조금 다른 과정을 거치게 됐던 건 우리 프로젝트 상 특정 조건이 더 있었는데.. 

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

이게 왜 문제였냐면, 우리가 사용중인 useInput의 onChange는 `React.ChangeEvent<HTMLInputElement>`, `React.ChangeEvent<HTMLTextAreaElement>`,  `React.ChangeEvent<HTMLSelectElement>` 타입만을 받기
때문이었다.

<br>

그러니까 요약하자면 나는
- select 태그를 사용하는 사람들이 onChange를 그대로 사용할 수 있어야 하고
- 그 타입 또한 `React.ChangeEvent<HTMLSelectElement>`에 맞게 변환해주어야 했다.

<br>

### onClick에 onChange 연결하기

일단 시도했던 방법은 

1. onClick에 onChange를 연결하고
2. onChange에 event를 전달해주자

였다.

```javascript



return (
<SelectButton> // div 태그
	<Input 
		type="text"
		disabled
		placeholder={placeholder}
		value={selected}
		onChange={handleChange}
	/> // input 태그
</SelectButton>

<Options onClick={handleClick}> // ul 태그
	{isOpen && children}
</Options>
)
```

<br>

```javascript
interface SelectProps {
	// ...생략...
	selectValue: string | number;
	children?: React.ReactElement[];
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = ({
	// ...생략...
	selectValue,
	children,
	onChange,
}: SelectProps) => {

	const handleClick = (event: React.MouseEvent<HTMLUListElement>) => {
		handleChange(event);
	};

	const handleChange = (event) => {}; // 생략

	return (
		<SelectComponent> // section 태그와 동일
			<SelectButton> // div 태그와 동일
				<Input
					value={selected}
					onChange={handleChange}
				/> // input 태그와 동일
			</SelectButton>

			<Options onClick={handleClick}> // ul 태그와 동일
				{isOpen && children}
			</Options>
		</SelectComponent>
	);
};
```

