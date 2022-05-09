### 220506

#### Udacity git commit convention

##### 참고한 사이트

> https://haesoo9410.tistory.com/300
>
> https://github.com/dungsil/TIL/blob/master/git/190506__%EC%9C%A0%EB%8B%A4%EC%8B%9C%ED%8B%B0_%EC%BB%A4%EB%B0%8B%EB%A9%94%EC%8B%9C%EC%A7%80_%EC%8A%A4%ED%83%80%EC%9D%BC%EA%B0%80%EC%9D%B4%EB%93%9C.md



##### 메시지 구조

```
Message Type : Subject
// 작업 내용을 간단하게 요약해서 기술합니다.

Body
// 왜, 무엇을 변경하였는지 기술합니다. 작성하지 않아도 괜찮습니다.

Footer
// issue tracker를 사용하는 경우 참조한 issue tracker ID를 기술합니다. 작성하지 않아도 됩니다.
```

<br>

##### type

- feat : 새로운 기능과 관련된 것을 의미한다.

- fix : 오류와 같은 것을 수정했을 때 사용한다.

- docs : 문서와 관련하여 수정한 부분이 있을 때 사용한다.

- style : 코드의 변화와 관련없는 포맷이나 세미콜론을 놓친 것과 같은 부분들을 의미한다.

- refactor : 코드의 리팩토링을 의미한다.

- test : test를 추가하거나 수정했을 때를 의미한다.

- chore : build와 관련된 부분, 패키지 매니저 설정 등 여러가지 production code와 무관한 부분 들을 의미한다. 말 그대로 자질구레한 일들이다.