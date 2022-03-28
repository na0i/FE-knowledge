### 220328

#### useRef

##### useRef를 사용하는 경우는?

`JavaScript` → 특정 DOM 을 선택해야 하는 상황에 getElementById, querySelector 같은 DOM Selector 함수를 사용해서 DOM 을 선택

`리액트` → DOM 을 선택할 때 ref 를 사용(함수형 컴포넌트에서 ref 를 사용할 때는 useRef 라는 Hook 함수를 사용)

1. 컴포넌트에 focus 위치시킬 필요가 있을 때

```
//InputTest.js

import React, { useState, useRef } from 'react';

function InputTest() {
  const [text, setText] = useState('');
  const nameInput = useRef();

  const onChange = e => {
    setText(e.target.value)
  };

  const onReset = () => {
    setText('');
    nameInput.current.focus();
  };

  return (
    <div>
      <input
        name="name"
        onChange={onChange}
        value={text}
        ref={nameInput}
      />

      <button onClick={onReset}>초기화</button>
      <div>
        <b>내용: </b>
        {text}
      </div>
    </div>
  );
}

export default InputTest;
```

2. 컴포넌트의 속성 정보를 조회 & 수정할 때 (리 렌더링을 하지 않으면서)

<br>

##### useRef 특징

- useRef 로 관리하는 변수는 값이 바뀐다고 해서 컴포넌트가 리렌더링되지 않습니다.
- useRef 로 관리하는 변수는 값이 바뀐다고 해서 컴포넌트가 리렌더링되지 않으므로 리렌더링 방지에 활용할 수 있습니다.

<br>

##### useRef 사용법

useRef() 를 사용하여 Ref 객체를 만들고, 이 객체를 선택하고 싶은 DOM 에 ref 값으로 설정합니다. 그러면, Ref 객체의 .current 값은 DOM 을 가리키게 됩니다.

<br>

##### 참고한 블로그

https://mnxmnz.github.io/react/what-is-use-ref/
