1. RecButton 클릭

2. ASR.startRecording 함수 실행

> 입력장치 사용 권한 요청 → 사용 승인 확인 → AudioContext 생성  → Recorder 인스턴스(rec) 호출 → rec의 record 함수 실행 → this.recording이 true

3. Recorder

> audio process를 처리할 node 정의 → audio 입력 버퍼 준비 시작되면 onaudioprocess 이벤트 발생 → audio Input을 받고 → 잡음이 아니라고 판단되면 wakeupFlag(true), endToken(false) → worker에 message 전송

4. InlineWorker

> 