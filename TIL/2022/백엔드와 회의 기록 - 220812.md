### 220812

#### chatbot 회의 with 백엔드

<br>

- status 코드가 상세하면 좋다<br>
  error 출력할 때 message 그대로 출력할 수 있으니까

- api 성공했을 때 body에서 데이터를 그냥 바로 출력하는게 아니라 semantic하게 한번 더 wrapping 해주면 좋겠다.
- post 요청 시 응답 방식

  - 200만 주기
  - 수정한 애에 대해서만 돌려주기
  - 전체를 다시 리턴해주기
    1. response 에 전체를 다시 리턴받기
    2. **200을 받고 get을 다시 호출하기**: crud 방식에 어긋나지 않게 하면서 동시편집과 같은 상황에서 새로운 리스트를 전부 다 받아오는게 맞을듯(a와 b가 각각 다른 부분을 편집중일때 b가 업데이트 한 것을 a도 전부 받아오는게 좋으니까)

- 로그인은 session Id를 이용
- 로그인 validation을 front와 back 에서 double check를 하는게 맞다.(프론트는 실시간으로 백엔드는 최종적으로)
- undo 기능은 백엔드 아니고 프론트단에서 지원하는게 맞다
- front와 engine 서버 직접 연결 보다는 front - back - engine이 나은게 front 코드 다 까보면 engine 서버 주소 다 뜨고 잘못된 요청 보낼 수도 있기 때문
