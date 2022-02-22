### 220222

#### url에서 query값 가져오기(useLocation)

http://localhost:3000/search?q=afdaf 과 같은 방식을 다룬다.<br>
검색창 등에서 query문을 날렸을 때 그 query값을 가져오는 방법으로 useLocation을 사용한다.<br>

##### 예시 코드
```
... 이하 생략...
import { useLocation, useParams } from 'react-router';

const SearchList = () => {
	const location = useLocation();
	console.log(location);

... 이하 생략...
```

결과<br>
![image](https://user-images.githubusercontent.com/77482972/155051793-32b2ec86-bb28-49f7-aebc-f335c36fc7cd.png)

<br>
console로 확인한 바와 같이<br>
query값만 가져오기 위해서는 location.search를 이용한다.<br>
다만 한국어 query값이 이상한 문자로 변형되는 문제가 있다...