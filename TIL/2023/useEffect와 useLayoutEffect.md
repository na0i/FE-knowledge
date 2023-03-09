### 230309

> 이 글은 Kent C.Dodds의 useEffect vs useLayoutEffect 글과 Jaewang Lee의 [React] useEffect 와 useLayoutEffect 의 차이는 무엇일까? 글을 참고하여 작성되었습니다.<br> https://kentcdodds.com/blog/useeffect-vs-uselayouteffect <br> https://medium.com/@jnso5072/react-useeffect-%EC%99%80-uselayouteffect-%EC%9D%98-%EC%B0%A8%EC%9D%B4%EB%8A%94-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C-e1a13adf1cd5



<br>

### useEffect

대부분의 경우 `useEffect`를 사용합니다. 클래스 컴포넌트의 `componentDidMount`와 `componentDidUpdate`, `componentWillUnmount`를 대체합니다.

<br>

한가지 주의할 점은 componentDidMount와 componentDidUpdate는 렌더링 이후 동기적으로 실행되지만 useEffect는 React가 컴포넌트를 렌더링한 후 실행되며 effect 콜백은 브라우저 페인팅을 막지 않는다는 것입니다. 이는 성능적으로 유리하며 당신이 의도한 바와 부합할 확률이 높습니다.

<br>

그러나, 렌더된 시점으로부터 effect 콜백이 DOM과 상호작용하는 그 사이의 시간동안 당신의 effect 콜백이 (DOM node ref를 이용해) DOM과 상호작용을 하고 이 DOM과의 상호작용이 DOM node의 외관을 변화시킨다면 당신은 **useLayoutEffect**를 사용해야 합니다. 그렇지 않으면 유저는 당신의 DOM 변화가 적용될 때마다 화면이 깜빡거리는 것을 볼 수 있게 될 겁니다. 이 순간만이 당신이 useEffect가 아니라 useLayoutEffect를 써야하는 순간입니다.

<br>

`state 변화 → 컴포넌트 렌더 → 페인트 → useEffect`

<br>

### useLayoutEffect

useLayoutEffect는 리액트가 모든 DOM 상호작용을 끝낸 직후 동기적으로 실행됩니다. 만약 (scroll position이나 다른 style 요소들이 필요한 순간과 같이) 당신이 DOM 측정을 수행한 다음 DOM 변경 혹은 상태 업데이트를 통해 동기적으로 재렌더링해야 하는 경우 유용할 수 있습니다.

<br>

스케줄링 관점에서 이는 componentDidMount와 componentDidUpdate와 동일하게 동작합니다. 당신의 코드는 DOM이 업데이트 된 직후, 그리고 브라우저가 그러한 변화를 그릴 기회를 paint하기 전에 실행될 것입니다.(사용자는 브라우저가 리페인트되기 전까지 변화를 볼 수 없습니다.)

<br>

`state 변화 → 컴포넌트 렌더 → useLayoutEffect → 페인트`

<br>

useLayoutEffect는 내부 코드가 모두 실행된 후 painting 작업을 하므로 로직이 복잡할 경우 사용자가 레이아웃을 보는데까지 오랜 시간이 걸릴 수 있다는 단점이 있습니다. 그래서 기본적으로는 useEffect만을 사용하기가 권장됩니다.

<br>

### 요약
- useEffect: DOM이랑 상호작용 할 필요가 없거나 당신의 DOM 변화가 관찰 불가능할 경우(대부분의 경우에 useEffect를 사용합니다)
- useLayoutEffect: DOM과 상호작용 해야하거나 DOM 측정을 해야 할 경우

<br>

#### 참고

>Render: DOM Tree 를 구성하기 위해 각 엘리먼트의 스타일 속성을 계산하는 과정<br>
> Paint: 실제 스크린에 Layout을 표시하고 업데이트하는 과정
