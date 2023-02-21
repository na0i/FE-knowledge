# Internet

### 2022.03.31 DNS and how it works?

#### What is DNS?

<br>

##### 참고한 사이트

> https://www.cloudflare.com/en-gb/learning/dns/what-is-dns/ > <br> https://hanamon.kr/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B8%B0%EB%B3%B8-%EB%8F%84%EB%A9%94%EC%9D%B8%EA%B3%BC-dns-%EB%84%A4%EC%9E%84%EC%84%9C%EB%B2%84%EB%9E%80-%EA%B0%9C%EB%85%90%ED%8E%B8/ > https://kyun2da.dev/CS/dns%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80/

##### DNS

- Domain Name System의 줄임말로, 데이터베이스 시스템
- DNS 시스템 안에서 이어주는 역할을 하는 서버를 풀네임으로 DNS 서버라 한다.
- 사람 → 도메인 이름을 통해 정보에 액세스
- 웹 브라우저 → IP 주소를 통해 상호작용
- DNS는 브라우저가 인터넷 리소스를 로드할 수 있도록 **도메인 주소를 IP 주소로 변환**

<br>

##### How does DNS work?

- 도메인 이름을 컴퓨터 친화적인 IP 주소로 변환하는 작업이 포함됨
- IP 주소는 인터넷 각 장치에 지정되고 해당 주소는 인터넷 장치를 찾는데 필요

<br>

##### 웹페이지 로드와 관련된 4개의 DNS 서버

1. `DNS recursor`

- 도서관 어딘가에서 특정 책을 찾으러 가라는 요청을 받는 사서
- 클라이언트 시스템에서 쿼리를 수신하도록 설계된 서버
- 클라이언트의 DNS 쿼리를 충족하기 위해 추가 요청을 수행

2. `Root nameserver`

- 사람이 읽을 수 있는 호스트 이름을 IP 주소로 변환하는 1st 단계
- 도서관의 색인
- 다른 특정 위치에 대한 참조 역할

3. `TLD nameserver`

- 최상위 도메인 서버
- 도서관에 있는 특정 책
- 호스트 이름의 마지막 부분을 호스팅

4. `Authoritative nameserver`

- 책꽃이에 있는 사전
- 서버 쿼리의 마지막 단계

##### Recursive Query

![image](https://user-images.githubusercontent.com/77482972/161179613-7fd46a3c-8ea5-4479-8a5c-a474391163a8.png)

##### 기지국 DNS서버 (Local DNS Server)

- URL에 Domain Name을 입력했을 때 해당 IP를 찾기위해 가장먼저 찾는 DNS서버
- 기본적으로 컴퓨터의 LAN선을 통해 인터넷이 연결되면, 인터넷을 사용할 수 있게 IP를 할당해주는 통신사(KT, SK, LG 등...) 에 해당되는 각 통신사의 DNS서버가 등록
