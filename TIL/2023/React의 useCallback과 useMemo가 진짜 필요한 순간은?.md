### 230316

# React의 useCallback과 useMemo가 진짜 필요한 순간은?

### useCallback과 useMemo란?

아래는 리액트 공식문서에 나와있는 useCallback과 useMemo에 대한 설명입니다.

<br>

#### useCallback: 메모이제이션된 콜백을 반환합니다.

콜백의 메모이제이션된 버전을 반환할 것입니다. 그 메모이제이션된 버전은 콜백의 의존성이 변경되었을 때에만 변경됩니다. 이것은, **불필요한 렌더링을 방지하기 위해 참조의 동일성에 의존적인 최적화된 자식 컴포넌트에 콜백을 전달할 때 유용**합니다.

<br>

#### useMemo: 메모이제이션된 값을 반환합니다.

useMemo는 의존성이 변경되었을 때에만 메모이제이션된 값만 다시 계산 할 것입니다. **이 최적화는 모든 렌더링 시의 고비용 계산을 방지하게 해 줍니다.** 배열이 없는 경우 매 렌더링 때마다 새 값을 계산하게 될 것입니다.

<br>

### 그렇다면 useCallback과 useMemo는 정말 성능 향상에 도움이 될까?


> https://haragoo30.medium.com/usememo-usecallback%EC%9D%84-%EC%96%B8%EC%A0%9C-%EC%8D%A8%EC%95%BC%EB%90%98%EB%82%98-6a5e6f30f759

위 글의 결론은 작은 규모에서 useMemo, useCallback을 사용했을 떄 성능이 오히려 나빠지거나 미미하게 좋아졌고, 규모가 커질 때는 조금씩 성능상의 이점이 늘어났지만 그 효과가 미비했습니다.

> https://velog.io/@hyunjine/React-Rendering-Optimization

또다른 예시를 보여주는 블로그에서도 useCallback으로 감싼 함수는 그렇지 않은 함수보다 더 많은 일(함수를 정의하는 일, 의존성 배열의 값을 정의하는 일)을 하기 때문에 초기 렌더링에 더 느리게 실행되며, 그 이후에는 의존성 배열의 참조 동일성 체크 때문에 함수를 새로 만드는 것과 결국엔 비슷한 시간이 걸렸습니다.

<br>

즉, 저희가 사용해온 대부분의 방식의 useCallback과 useMemo는 쓸모가 없습니다..!

<br>

#### 진짜 필요한 순간은 언제일까?

컴포넌트가 렌더링 되는 순간은 3가지입니다.

1. state가 바뀔 때
2. props가 바뀔 때
3. **부모가 렌더링 될 때**

<br>

부모 컴포넌트의 렌더링은 자식 컴포넌트의 렌더링을 초래합니다.

```jsx
const App = () => {
  const [state, setState] = useState(1);

  return (
    <div>
      <button onClick={() => setState(state + 1)}>{state}</button>
      <Page />
    </div>
  );
};

const Page = () => <Item />;
```

위 예시에서 Page는 state도 props도 없지만 부모 컴포넌트가 렌더링 되었다는 이유만으로 렌더링됩니다.

<br>

이런 순간이 `React.memo()`가 필요한 순간입니다.


```jsx
const PageMemoized = React.memo(Page);

const App = () => {
  const [state, setState] = useState(1);
  const onClick = () => {
    console.log('Do something on click');
  };

  return (
    <div>
      <PageMemoized onClick={onClick} />
    </div>
  );
};
```

하지만, 위 예시에서도 아쉬운 점이 있습니다. 

<br>

아래는 부모 컴포넌트인 App이 리렌더링 될 경우의 순서입니다.

1. App 리렌더링
2. onClick 새로 생성
3. PageMemoized 컴포넌트의 props가 바뀌었는지 체크
4. onClick은 새로 생성된 함수이므로 props가 바뀌었다고 생각하여
5. PageMemoized가 리렌더링

<br>

의도한 바와 다르게 Page 컴포넌트는 리렌더링 되었습니다. 이 때 필요한 것이 `useCallback`입니다.

<br>

```jsx
const PageMemoized = React.memo(Page);

const App = () => {
  const [state, setState] = useState(1);
  const onClick = useCallback(() => {
    console.log('Do something on click');
  }, []);

  return (
    <PageMemoized onClick={onClick} />
  );
};
```

**위처럼 사용했을 때가 되어서야 onClick은 새로 생성되지 않고 memo된 Page 또한 렌더링되지 않습니다.**

<br>

React에서 무거운 계산은 컴포넌트를 리렌더링하고 업데이트하는 계산입니다. 따라서 React가 의도한 useMemo는 renderTree 내부의 특정 부분을 메모할 때 사용하는 것입니다. 

<br>

useMemo와 useCallback은 첫 렌더링 때 React가 그 값을 캐시해야 합니다. **따라서, 초기 렌더링에 유리하도록 필요없는 useMemo와 useCallback을 없애고 리렌더링은 변경되어야하는 부분에만 일어나게 만드는 것이 애플리케이션을 최적화 하는 좋은 방식입니다.**

<br>

이 글은 아래 글들을 참조하여 작성되었습니다.

> https://velog.io/@hyunjine/React-Rendering-Optimization

> https://haragoo30.medium.com/usememo-usecallback%EC%9D%84-%EC%96%B8%EC%A0%9C-%EC%8D%A8%EC%95%BC%EB%90%98%EB%82%98-6a5e6f30f759