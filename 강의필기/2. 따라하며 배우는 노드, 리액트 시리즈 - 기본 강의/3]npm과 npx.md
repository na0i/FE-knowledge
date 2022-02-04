### npm과 npx

<br>

#### npm
- node package manager의 줄임말
- 저장소 역할(라이브러리를 담고있는 레지스트리)
- npm에 관한 것은 package.json에 정리되어있음(버전이나 디펜던시 같은 것들)
- local로 받느냐 global로 받느냐의 차이가 있음(명령어 '-g'의 유무)
    > local: ./node_modules/.bin에 위치<br>
    > global: %Appdata%/npm에 위치<br>
    > install 할 npm을 다른 프로젝트에 쓰지 않는다면 global로 install 할 필요 X

#### npx

원래 create-react-app을 할 때에
```
npm install -g create-react-app
```
과 같이 했었지만, 이제는 **npx**를 사용하여 create-react-app을 그냥 이용할 수 있다.

#### npx의 장점
npx가 npm registry에서 create-react-app을 찾아서 다운로드 없이 실행시켜줌
- disk space를 낭비하지 않아도 되고
- 항상 최신 버전을 사용할 수 있다


##### npx create-react-app .