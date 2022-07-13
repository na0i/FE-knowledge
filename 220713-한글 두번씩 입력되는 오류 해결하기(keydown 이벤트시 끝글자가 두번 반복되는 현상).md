### 220713

#### 한글 두번씩 입력되는 오류 해결하기(keydown 이벤트 시 끝글자가 두번 반복되는 현상)

![ezgif com-gif-maker](https://user-images.githubusercontent.com/77482972/178648694-69a64ff2-361b-4049-9144-1a65855e9de7.gif)


input에서 keydown 이벤트를 달아놓았는데

이상하게 영어는 괜찮은데 한글만 위처럼

끝글자가 두번씩 반복되는 이상한 문제와 마주쳤다.

<br>

##### KeyboardEvent.isComposing?

`KeyboardEvent.isComposing`은 입력한 문자가 조합문자인지 아닌지를 판단한다.<br>

한글은 자음 + 모음의 조합으로 음절이 만들어지는 조합문자이고<br>

영어는 조합문자가 아니다.

<br>

한글은 글자가 조합 중인 건지, 조합이 끝난 상태인지 파악하기 어렵기 때문에<br>

해당 이슈는, 영어를 입력할 때는 발생하지 않고 한글을 입력할 때만 발생하는 것이었다!

<br>

##### onKeyPress 사용하기

간단한 해결방법으로는<br>

onkeydown 대신 onkeypress를 사용하는 방법이 있다.<br>

하지만 onkeypress는 shift키와 delete 키를 인식하지 못한다는 단점이 있다..!

<br>

##### event.nativeEvent.isComposing === false 추가하기

조건식에 e.nativeEvent.isComposing  === false를 추가하면 된다고 한다.

다른 분이 짜놓은 코드 가져오기 ㅎㅎ<br>

![image](https://user-images.githubusercontent.com/77482972/178648507-34d6acf8-042a-47ad-8805-846c709beeae.png)

<br>

##### 참고한 사이트

> https://kwangsunny.tistory.com/33

> https://velog.io/@corinthionia/JS-keydown%EC%97%90%EC%84%9C-%ED%95%9C%EA%B8%80-%EC%9E%85%EB%A0%A5-%EC%8B%9C-%EB%A7%88%EC%A7%80%EB%A7%89-%EC%9D%8C%EC%A0%88%EC%9D%B4-%EC%A4%91%EB%B3%B5-%EC%9E%85%EB%A0%A5%EB%90%98%EB%8A%94-%EA%B2%BD%EC%9A%B0-%ED%95%A8%EC%88%98%EA%B0%80-%EB%91%90-%EB%B2%88-%EC%8B%A4%ED%96%89%EB%90%98%EB%8A%94-%EA%B2%BD%EC%9A%B0