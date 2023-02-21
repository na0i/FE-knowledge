### 220623

#### CSS reset with Styled Components

<br>

CSS reset은 HTML Element의 Default 값들을 없애주는 작업이다.

CSS reset을 하지 않으면 브라우저마다 다른 기본 값 때문에 다르게 보일 수가 있다.

<br>

즉, 초기화 작업이 필수적이다.

나는 이 초기화 작업을 styled-components를 이용해 수행했다.

순서는 아래와 같다.

1. styled-components 설치하기
2. styled-reset 설치하기
3. GlobalStyle.js 생성하기
4. GlobalStyle.js에 reset 관련 코드 작성하기
5. App.js에 GlobalStyle import하기

<br>

##### 1. styled-components 설치하기

> yarn add styled-components

> npm i styled-components

둘 중 하나를 사용한다.

<br>

##### 2. styled-reset 설치하기

> yarn add styled-reset

> npm install styled-reset

<br>

##### 3. GlobalStyle.js 생성하기

GlobalStyles.js의 위치는 크게 상관없다.

나중에 import만 잘 해주면 된다.

![image](https://user-images.githubusercontent.com/77482972/175299111-0d3b9087-dfff-4f45-b160-e709e42dea49.png)

<br>

##### 4. GlobalStyle.js에 reset 관련 코드 작성하기

GlobalStyle 적용에 관한 부분은 skip한다.

궁금하다면 아래 링크 클릭!



GlobalStyle 상단에

> import reset from 'styled-reset';

를 작성한다.

![image](https://user-images.githubusercontent.com/77482972/175299361-15173a5c-8a27-41dc-9354-2dc30ec136ea.png)

<br>

##### 5. App.js에 GlobalStyle import하기

App.js에 GlobalStyle을 import해서 사용한다.

밑줄 친 부분대로 사용하면 된다.

![image](https://user-images.githubusercontent.com/77482972/175299737-0dd6a698-a92e-4b54-8042-dbb96bdc6bc9.png)

<br>

##### 끝!
