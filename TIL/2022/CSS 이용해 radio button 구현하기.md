### 220410

#### CSS로 radio button 구현하기

##### radio button 특징

- type이 input인 태그 필요
- label 태그도 필요
- checked 속성을 이용해 onoff를 구현
- checked 속성은 on Change함수와 함께 사용

<br>

##### 내 코드(styled-component 사용)

```html
[HTML]
<OptionSelectBtn
    type="radio"
    value={option.id}
    checked={modeId === option.id}
    onChange={(event) => selectMode(event)}
    />
<BtnLabel />
    
    
[CSS]
const BtnLabel = styled.label`
	position: absolute;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background: white;
	border: 1px solid #bebebe;
`;

const OptionSelectBtn = styled.input`
	opacity: 0;
	z-index: 1;
	border-radius: 50%;
	margin-right: 10px;
	&:hover ~ ${BtnLabel} {
		background: #bebebe;
		&::after {
			content: '';
			display: block;
			border-radius: 50%;
			width: 12px;
			height: 12px;
			margin: 5px;
			background: #ffffff;
		}
	}
	&:checked + ${BtnLabel} {
		background: #000000;
		border: 1px solid #000000;
		&::after {
			content: '';
			display: block;
			border-radius: 50%;
			width: 12px;
			height: 12px;
			margin: 5px;
			box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
			background: white;
		}
	}
`;

```

