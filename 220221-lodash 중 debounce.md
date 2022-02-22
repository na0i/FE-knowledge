### 220221
#### Input 즉각적 입력 받기


##### debounce 란?
> debounce() 메소드는 이벤트에 의해 특정 함수가 여러번 반복 실행될 수 경우에 사용하며<br>
> 정해진 지연시간동안 반복된 호출을 딱 1번만 호출하도록 제어해줍니다.

<br>

##### debounce 사용 문법
`_.debounce(콜백함수, 시간)`

<br>

##### debounce가 자주 사용되는 예제
검색어를 입력할때 일정시간 동안 반복 입력된 경우 호출하지 않고 한 번만 호출하도록 도와준다.
예를들어, 검색창에 '디바운스 검색'을 입력한다면<br>

ㄷ, ㅣ, ㅂ, ㅏ, ㅇ, ㅜ, ㄴ, ㅅ ... 이하 생략

모든 이벤트 발생마다 api를 호출하게 된다.<br>
debounce를 사용하면 정해진 시간에 1번씩 호출할 수 있으므로 성능면에서 훨씬 효율적이다.

<br>

##### debounce 사용 코드

1초에 한번만 이벤트를 수행하게 하는 코드
```
import _ from 'lodash';

const handleInput = _.debounce((e) => {
  getAutoCompleteData(e.target.value);
}, 1000);
```
