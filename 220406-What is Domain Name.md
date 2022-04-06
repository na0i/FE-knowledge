# Internet

### 2022.04.06 What is Domain Name?

#### What is a Domain Name?

<br>

##### 참고한 사이트

> https://blog.naver.com/PostView.naver?blogId=ghdalswl77&logNo=222331240558&redirect=Dlog&widgetTypeCall=true&directAccess=false

<br>

##### Domain Name

- 클라이언트 소프트웨어에서 웹사이트에 액세스하는 데 사용되는 숫자 IP 주소 에 매핑되는 텍스트 문자열
- 사람이 읽을 수 있는 주소를 제공
- 인터넷에 연결된 모든 컴퓨터 는 IPv4 주소 또는 IPv6 주소와 같은 공용 IP 주소 를 통해 연결
- 도메인 이름은 점으로 구분되고 오른쪽에서 왼쪽으로 읽는 여러 부분으로 구성
- ![image](https://user-images.githubusercontent.com/77482972/161875762-8ed48ce5-d814-4465-926c-3897517920f6.png)

  - TLD
    - .com, .org, .net
    - 서비스의 일반적인 목적을 알려줌(.com은 최상위 도메인으로 영리 목적의 기업이나 단체나 서비스)
    - 일부 TLD는 엄격한 정책으로 목적을 명확하게 할 때가 있음(ex. `.us`, `)
    - ![image](https://user-images.githubusercontent.com/77482972/161881399-cebed20d-23fb-4c7e-868d-632ad7ecabe5.png)
  - label
    - 레이블은 TLD 다음에 오는 것
    - TLD 바로 앞에 있는 레이블을 SLD(여기에서 2차 도메인과 같이 3차/4차 도메인 영역도 존재하지만 단순하게 콤마를 기준으로 어느 위치에 있는지를 나타내는 것일 뿐 특별한 의미는 없음)
    - 도메인 이름에는 많은 레이블(또는 구성 요소)이 있을 수 있음

<br>

##### DNS 요청의 작동 방식

1. 브라우저 위치 표시줄에 도메인 이름 입력
2. 로컬 DNS 캐시를 이용해 이 도메인 이름으로 식별되는 IP 주소를 알고있는지 확인
3. 모를 경우 DNS 서버에 요청

<br>

##### Domain Name vs URL

- URL: 도메인을 포함한 경로
  ![image](https://user-images.githubusercontent.com/77482972/161876605-382ddf49-44d3-403c-8380-adf3119f83b2.png)

<br>

##### 루트 도메인

- 도메인 공급업체로부터 구매할 수 있는 도메인 이름

##### 서브 도메인

![image](https://user-images.githubusercontent.com/77482972/161879962-364426b7-22e7-4f88-b283-050a48a23555.png)

- 특정 컨텐츠 등을 보조로 운영할 때 활용
- 하나의 도메인이 여러개의 IP를 가리키게 함
- 도메인 구입 비용 절약

<br>

##### 도메인 계층 관계

![image](https://user-images.githubusercontent.com/77482972/161877332-00fbdf39-e10c-4a7d-8e74-252ccadcf5a1.png)
