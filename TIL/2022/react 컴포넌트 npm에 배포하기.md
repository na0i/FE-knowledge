### 220404

#### react 컴포넌트 npm에 배포하기

##### 진행순서

1. repository 생성 및 components 작성
- lib 폴더 안에 배포할 내용을 두는 경우가 많습니다.(외부 파일을 참조하지 못할 가능성이 높아서)
<br>

2. (babel 설치)
- 블로그마다 조금씩 다르긴 합니다.

```
npm install -D @babel/cli @babel/preset-react --save
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install cross-env @babel/cli @babel/preset-env @babel/preset-react --save-dev
```

- `@babel/cli` : command line을 통해 코드를 transpile
- `@babel/preset-react` : react transpile에 필요한 plugin을 포함한 preset 설치, 바벨 설정만으로 plugin 설치가 자동으로 된다.

<br>

3. (bable.config.js 작성)

- 프로젝트 최상단에 위치(package.json과 같은 위치)
- 이 부분도 사람마다 조금씩 다르네요.
- `@babel/env` :브라우저의 어떤 버전을 target으로 할지
- `@babel/preset-react`: 바벨이 JSX를 compile 하도록 함

```
{
 "presets": [
  [
   "@babel/env",
    {
     "targets": {
     "edge": "17",
     "firefox": "60",
     "chrome": "67",
     "safari": "11.1"
      },
   "useBuiltIns": "usage",
   "corejs": "3.6.5"
    }
],
   "@babel/preset-react"
]
}
```

<br>

4. package.json 파일 수정

- 이 부분도 사람마다 조금씩 다르네요..
- name 수정
- version 수정: 파일 수정 후 재배포 시 version 값을 수정해야 다른 파일이라 인식하고 배포한다.
- main, module 수정: 빌드 후의 파일 경로로 작성
- private: false로 (true일 경우 과금)
- scripts 부분 수정: `"publish:npm": "rm -rf dist && mkdir dist && babel src/lib -d dist --copy-files"`(src/lib에 있는 파일을 복사해 dist경로에 babel로 컴파일한 결과물을 저장하겠다는 의미라서 components 파일을 다른 곳에 작성했다면 달라질수도)
- (dependencies를 peerDependencies로 이동): 똑같은 dependencies를 갖고 있기를 원하는게 아니라면 굳이..?
- (babel 설정)

<br>

5. gitignore에 업로드 제외할 파일 설정
- 필수적이지 않은 src , public, 기타 설정파일
<br>

6. 빌드

```
npm run publish:npm
```

<br>

7. 배포

```
npm publish
```

<br>

#### sinopia와 verdaccio로 npm 저장소 구축하기

##### sinopia

- sinopia 는 private/caching npm repository server 
- `npm install --registry {sinopia 서버 주소}` 로 package 를 요청할때, 만약 패키지가 존재하지 않으면 NPM 저장소에서 sinopia 저장소에 package 를 가져와 cache 하고, package 를 전달
- 이미 cache 한 package 는 NPM 저장소 가 동작하지 않더라도 이미 cache 한 package 를 전달해주기 때문에, 안정적으로 서비스를 운영할 수 있다.
- `npm public --registry {sinopia 서버 주소}` 로 package 를 등록 하면, 공개된 NPM 저장소에 등록되지 않고, sinopia 저장소에 등록하여, 원하는 사용자만 접근할 수 있도록 접근을 제한할 수 있다.
- 내부에서만 사용하는 비공개 package 를 쉽게 관리 가능
- NPM 저장소에 등록&배포 하기전에 sinopia 저장소를 활용해서 테스트 진행 가능
- 2015년 기준으로 유지보수가 멈춰 있음.

<br>

##### verdaccio

- sinopia를 기반으로 조금 더 발전한 형태로 구성, 현재까지 활발하게 유지보수
- sinopia 사용 환경 100% 지원, sinopia의 환경 정보와 파일 위치, 파일명 등 동일하게 사용 가능
- sinopia보다 다양한 plugin 지원과 보안
  - 사용자 가입제한: max_users로 npm adduser 수를 제한해 사용자 가입을 제한
  - npm publish로 배포될 때마다 알림 전송 가능
  - jwt 지원(verdaccio v4부터)
  - ssh 인증서 추가 가능