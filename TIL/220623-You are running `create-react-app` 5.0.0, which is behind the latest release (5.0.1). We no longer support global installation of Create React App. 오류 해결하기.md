### 220623

#### You are running `create-react-app` 5.0.0, which is behind the latest release (5.0.1). We no longer support global installation of Create React App. 오류 해결하기

<br>

```bash
npx create-react-app .
```

를 입력했더니



> You are running `create-react-app` 5.0.0, which is behind the latest release (5.0.1). We no longer support global installation of Create React App.

<br>

라는 오류가 발생했다.



아래는 오류 전문

![image](https://user-images.githubusercontent.com/77482972/175301706-98475caa-7a9e-46f3-b932-f4a6bce3bdbe.png)

<br>

오류에 쓰여있던 대로

- npm uninstall -g create-react-app
- yarn global remove create-react-app

둘 다 시도해봤는데 여전히 안됨..

<br>

**npm add create-react-app**

을 입력해주고 다시

**npx create-react-app .**

를 하면 잘 된다!

<br>

##### 참고한 사이트

> https://velog.io/@estell/error