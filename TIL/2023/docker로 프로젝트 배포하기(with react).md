### 230515

# docker로 웹사이트 배포하기

### docker란?

#### docker

docker는 격리된 공간에서 프로세스가 동작하는 방식이다.

<br>

#### docker container

격리된 공간에서 동작하는 프로세스가 컨테이너다.

- 각각 독립적으로 실행되며
- 백그라운드로 돌릴 수 있다.

<br>

#### docker image

컨테이너 실행에 필요한 파일/설정 등을 포함한 하나의 객체다.

- 직접 만들 수도 있고(Dockerfile)
- 만들어 둔 것을 사용할 수도 있다.(hub.docker.com - 이미지들이 저장된 저장소)

<br>

### docker 명령어를 알아보자

- docker image ls: 이미지 목록 보기
- docker pull [이미지]: 이미지 가져오기
- docker run [옵션] [이미지명]: 컨테이너 실행
- docker exec -it [컨테이너명/id] /bin/bash: 컨테이너 접속
	- /bin/bash : bash 쉘 사용
- 등등이 있는데 필요할 때 찾아서 사용하면 될 듯

<br>

### react + docker로 배포하기

#### 실행순서
- ssh 주소 접근(ai3-2@192.168.155.115)
- git clone [프로젝트]
- cd [프로젝트]
- `npm run build` or `yarn build`
- docker run --name `이름` -p `8100:80` -v `/home/ai3-2/frontend/keit09/build:/var/www/html/:ro` -d nginx:latest
- vscode docker extension 켜서 해당 프로젝트 파일 열기 및 설정(etc/nginx/conf.d/default.conf)

<br>

#### docker run --name `이름` -p `8100:80` -v `/home/ai3-2/frontend/keit09/build:/var/www/html/:ro` -d nginx:latest를 자세히 알아보자

##### `-p 8100:80`

호스트에서 8100 포트로 접속하면 도커 컨테이너의 80 포트로 포워딩한다는 뜻이다. 

##### `/home/ai3-2/frontend/keit09/build`

배포할 프로젝트 빌드 파일 경로다. index.html이 들어있다.

##### `:/var/www/html/:ro`

- **:/var**
	- docker run의 `-v` 옵션에서 사용되는 옵션
	- 호스트 머신의 디렉토리를 컨테이너 내부의 디렉토리와 연결하는데 사용된다.
	- 즉 /home/ai3-2/frontend/keit09/build 디렉토리를 컨테이너 내부의 /var/www/html/ 경로에 마운트하는 것
- **:ro**
	- docker run의 `-v` 옵션에서 사용되는 옵션
	- '/home/ai3-2/frontend/keit09/build' 디렉토리를 컨테이너 내부의 'var/www/html/' 경로에 읽기 전용으로 마운트 한다는 뜻
	- :ro를 사용함으로써 컨테이너 내부에서 해당 볼륨의 파일이나 디렉토리를 수정할 수 x(읽기 전용)

##### `-d nginx:latest`

- **-d**: 도커 이미지를 기반으로 컨테이너를 백그라운드 모드로 실행하는 것을 의미

nginx의 최신 이미지를 기반으로 컨테이너를 백그라운드 모드로 실행하게 된다.

<br>

즉, docker run --name keit09 -p 8100:80 -v /home/ai3-2/frontend/keit09/build:/var/www/html/:ro -d nginx:latest 명령어를 통해 nignx 서버가 해당 디렉토리 파일을 서빙할 수 있다.


##### `etc/nginx/conf.d/default.conf` 파일열어 nginx 설정하기

```
server {
	listen 80 default_server;
	listen [::]:80 default_server;

	root /var/www/html;
	index index.html index.htm index.nginx-debian.html;
	server_name _;
	location / {
		try_files $uri $uri/ /index.html =404; 
	}
}
```

<br>

### docker 이미지를 생성하지 않은 이유는?

일반적으로는 dockerFile을 생성해서 이미지를 생성하고 말아서 dockerhub에 올리고 관리하지만 현재 상태는 이미지 관리가 필요 없이 배포 자체가 목적이기 때문에 container 만을 생성하였다.
