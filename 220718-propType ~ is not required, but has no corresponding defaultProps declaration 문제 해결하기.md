### 220718

#### propType "~~" is not required, but has no corresponding defaultProps declaration 문제

1. defaultProps: 함수형 컴포넌트에서는 deprecated된 방법
2. export the interface: 왜 해결되는지 알 수 없는 방법
3. React.FC functional typing pattern: 불완전한 방법

결론적으로 현재 eslint rule off가 최선
<br>

##### 참고한 사이트

> https://stackoverflow.com/questions/69687167/proptype-name-is-not-required-but-has-no-corresponding-defaultprops-declarati
