### 220118
#### npm install, npm start 명령어 입력 중 마주한 문제

<br>

##### 내가 생각했던 순서
<br>

```
node.js 설치
git clone [레포이름]
git switch [브랜치 이름]
npm install
npm start
```

<br>

하지만 npm install 명령어를 입력했더니 <br>
<br>
npm ERR! code 1<br>
npm ERR! path ~~~~node_modules/node-sass<br>
npm ERR! command failed<br>
npm ERR! command sh -c node scripts/build.js<br>
-- 이하 생략 --<br>
<br>
등등 엄청난 오류와 마주함

<br>
참고 블로그 https://juntcom.tistory.com/167
<br>

```
npm uninstall node-sass
npm install -D sass
npm start
```

로 해결했다!