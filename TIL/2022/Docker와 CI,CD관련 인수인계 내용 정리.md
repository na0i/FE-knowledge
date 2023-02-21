### 221018

#### chatbot ver1 Docker 및 CI/CD관련 인수인계 내용 정리

<br>

##### 현재 Chatbot v1 CICD Flow

- 윤회님 컴퓨터로 서버(도커)를 돌리고 있음
- Docker 안에는 front, back, database, gitlab-runner 등 각각의 컨테이너가 돌아가고 있음
- 누군가 gitlab에 코드 push
- gitlab runner가 CICD 진행 후 docker hub에 반영
- docker hub에 올라간 내용을 다시 다시 윤회님 docker에 반영(docker compose를 이용)

<br>

![2A3A8A18-6B5F-40EB-81CB-F042AD327FC8](https://user-images.githubusercontent.com/77482972/196316553-dba1085a-e766-446d-9d00-54fcf95a3ad2.jpeg)


<br>

##### Docker 이해하기
- docker는 소프트웨어를 `컨테이너`라는 것으로 패키징한다.
- 이 컨테이너에는 라이브러리, 시스템 도구, 코드, 런타임 등 어쨌든 소프트웨어를 실행하는 데 필요한 모든 것이 포함된다.
- 즉, docker를 사용하면 환경에 구애받지 않고 애플리케이션을 신속하게 배포 및 확장 가능하다.
- 도커는 독립적으로 애플리케이션을 실행할 수 있도록 컨테이너를 만들고 관리하는 것을 도와주는 도구이다.

<br>


<b>docker 컨테이너</b>
- 기존의 가상화 방식이 OS 가상화였다면
- 컨테이너는 프로세스를 격리하는 방식으로 동작한다.
- 즉, 서버에 여러 컨테이너를 실행해도 독립적으로 실행되어 VM을 사용하는 느낌을 준다.

![스크린샷 2022-10-18 오전 11 07 07](https://user-images.githubusercontent.com/77482972/196318661-563b52e8-b7a6-4085-83a1-7edeebbe8f71.png)


<br>

<b>docker 이미지</b>
- 컨테이너를 정의한 읽기 전용의 템플릿이다.
- 컨테이너 실행에 필요한 파일과 설정을 포함
- 도커 컨테이너는 이미지가 실행된 상태
- 같은 이미지로 여러 개의 컨테이너를 만들 수 있다.
- 이미지는 불변 / 추가되거나 변하는 값은 컨테이너에 저장

<br>

<b>docker file</b>
- 도커 이미지를 만들기 위한 파일
- DSL(docker specific image) 언어를 이용해 이미지를 생성
- 서버에서 프로그램을 설치하려고 할 때 dockerfile을 통해서 관리

<br>

##### gitlab runner와 Docker를 사용해 CI/CD 구축하기 