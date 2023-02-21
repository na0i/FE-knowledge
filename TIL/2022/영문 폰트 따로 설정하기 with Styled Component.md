### 220512

#### 영문 폰트 따로 설정하기 with Styled Component

##### 참고한 사이트

> https://jineecode.tistory.com/104

<br>

한글 폰트는 Noto Sans KR, 영문 폰트는 Montserrat를 사용하고 싶었다.

<br>

##### GlobalStyles 전체 코드

```javascript
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import MontserratRegular from '../assets/font/Montserrat-Regular.ttf';
import MontserratBold from 'src/assets/font/Montserrat-Bold.ttf';

const globalStyles = createGlobalStyle`
    ${reset};
	@font-face {
		font-family: "Noto Sans KR";
		src: local("MontserratBold"),
		url(${MontserratBold}) format('truetype');
		font-weight: bold;
		unicode-range: U+0041-005A, U+0061-007A;
	}

	@font-face {
		font-family: 'Noto Sans KR';
		src: local("MontserratRegular"),
		url(${MontserratRegular}) format('truetype');
		font-weight: normal;
		unicode-range: U+0041-005A, U+0061-007A;
	}
`
```

<br>

##### 순서

1. src/assets/font에 폰트 파일을 넣는다.(다른 곳에 넣어도 상관없다. 경로만 잘 지정해줄 것)
2. GlobalStyles 파일에 @font-face에 코드작성

```javascript
import MontserratBold from 'src/assets/font/Montserrat-Bold.ttf';

@font-face {
    font-family: "Noto Sans KR";
    // 내가 사용할 이름
    // 나는 한글 폰트가 Noto Sans KR이고 App.js 전체에 Noto Sans KR로 폰트 스타일을 줄 예정이었으므로
    // Montserrat 대신 Noto Sans KR로 대신 작성
    
    src: local("MontserratBold"),
        url(${MontserratBold}) format('truetype');
	// local에 MontserratBold가 있는지 찾고 없다면
	// 다운 받을 수 있는 URL 지정
	
	font-weight: bold;
	// 폰트 굵기

	unicode-range: U+0041-005A, U+0061-007A;
	// 사용할 문자의 유니코드 범위를 적어주기
	// 대문자: U+0041-005A
	// 소문자: U+0061-007A
}
```

3. 사용할 곳에 스타일 적용

```javascript
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from '../styles/GlobalStyle';
import * as Pages from 'src/pages';
import styled from 'styled-components';

function App() {
	return (
		<FontDefault>
			<BrowserRouter>
				<GlobalStyles />
				<Routes>
					<Route path="/" element={<Pages.Home />} />
					<Route path="/stt" element={<Pages.STTDemo />} />
					<Route path="/tts" element={<Pages.TTSDemo />} />
				</Routes>
			</BrowserRouter>
		</FontDefault>
	);
}

export default App;

const FontDefault = styled.div`
	font-family: 'Roboto', 'Noto Sans kr';
`;
// 나는 Noto Sans KR 하나로 모든 폰트를 적용시킬 생각이었어서
// Montserrat을 따로 적어줄 필요가 없었다.
// GlobalStyles를 잘 불러와서 사용만 하면 끝!
```

