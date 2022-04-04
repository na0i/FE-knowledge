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
