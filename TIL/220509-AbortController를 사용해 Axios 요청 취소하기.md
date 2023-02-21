### 220509

#### AbortController를 사용해 Axios 요청 취소하기

##### 참고한 사이트

> https://velog.io/@dudtjr913/axios-cancel-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%B2%98%EB%A6%AC

<br>

나는 취소버튼을 눌렀을 때 보내던 axios 요청을 취소하고 싶었다.

<br>

요청 취소에는<br>

1. cancelToken
2. AbortController

두가지 방법이 있다고 한다.

<br>

cancelToken은 deprecated 되었다고 하여 나는 AbortController를 사용하기로 결정

<br>

공식문서에서는 선언과 동시에 AbortController를 호출하고 있다.

```javascript
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});

// cancel the request
controller.abort()
```

하지만 위와 같은 방식으로 코드를 작성해보니<br>

취소 후 요청을 다시 보내면<br>

이미 취소된 요청이라 다시 요청이 가지를 않았다<br>

**요청이 같은 controller를 사용하게 되어 요청이 불가능해진 상황**

<br>

```javascript
import axios from "axios";

class ContentRepository {
  controller; // request handler

  // 타 컴포넌트에서 request 호출
  request(id, data) {
    this.controller = new AbortController();
    return axios.post(URL 주소, data, {
      signal: this.controller.signal,
    });
  }

  // 타 컴포넌트에서 stopRequest 호출
  stopRequest() {
    this.controller.abort();
  }
}

export default new ContentRepository();
```

그래서 나는 먼저 controller를 선언만 해둔 후<br>

요청을 보낼 때마다 새로 생성하여 사용하도록 했다.

<br>

![image](https://user-images.githubusercontent.com/77482972/167407329-0e42e439-1463-41b9-8618-ac37085ec28c.png)

console.log(e)하면 위와 같이 canceled라는 message를 받을 수 있고<br>

나는 return으로 e.message를 받아<br>

함수 반환값으로 e.message가 오면<br>

취소되었을 때 작동할 로직을 따로 작성해 사용했다.

```javascript
async loadContent(id) {
    try {
        const response = await contentRepository.findOne(id, this.project);
        runInAction(() => {
            this.project = response.data;
        });
    } catch (e) {
        console.log(e);
        return e.message;
    }
```

