### 220228

#### Local Storage와 Session Storage

- 두 기술 모두 데이터를 브라우저 상에 저장
- 데이터가 어떤 범위 내에서 얼마나 오래 보존되느냐의 차이
- 자바스크립트 API가 완전히 동일한 형태

<br>

##### Local Storage
- 오리진이 같은 경우 데이터가 모든 탭과 창에서 공유(저장한 데이터는 브라우저 세션 간 공유)
- 브라우저나 OS가 재시작 하더라도 데이터가 파기되지 X

<br>

##### Session Storage
- 페이지 세션이 끝날 때(페이지를 닫을 때) 데이터가 사라짐
- 같은 웹사이트를 여러 탭이나 창에 띄우면 여러 개의 세션 스토리지에 데이터가 서로 격리되어 저장되며, 각 탭이나 창이 닫힐 때 저장해 둔 데이터도 함께 소멸

<br>

##### API
- key-value 값으로 이루어진 데이터를 저장할 수 있다.
- setItem, getItem, removeItem, clear, length 등

<br>

##### 객체로 저장하는 방법
**JSON.stringfy(object)**와 **JSON.parse**를 이용하기
```
var object - {'name': 'na0i'};

// 저장하기
localStorage.setItem('info', JSON.stringfy(object));

// 가져오기
JSON.parse(localStorage.getItem('info'));
```