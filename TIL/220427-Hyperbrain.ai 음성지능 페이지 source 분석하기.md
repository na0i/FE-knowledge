###  220427

#### Hyperbrain.ai 음성지능 페이지 source 분석하기

##### https://hyperbrain.ai/old/asr/main.html



##### main.js

```javascript
ctr = new ctr_ws(ws_ip)
var ASR = new ASR_master(end_time, use_url) // asr_source.js 파일
let RecButton = document.getElementById("buttonImg") // 녹음버튼
let RecImg = document.getElementById("doing")

RecButton.onmouseover = function(){
    // dataset: 속성값 접근
    // data-ontoken: 0일 때 녹음 비활성화 svg
    // data-ontoken: 1일 때 녹음 활성화 svg
	if(this.dataset.ontoken == '0'){
		this.src = 'asset_asr/btn_record_noaml_hover.svg'
	}
	else{
		this.src = 'asset_asr/btn_record_active_hover.svg'
	}
}

RecButton.onmouseout = function(){
	if(this.dataset.ontoken == '0'){
		this.src = 'asset_asr/btn_record_nomal.svg'
	}
	else{
		this.src = 'asset_asr/btn_record_active.svg'
	}
}

RecButton.onclick= function(){
	if(this.dataset.ontoken == '0'){
		this.dataset.ontoken = '1'
		this.src = 'asset_asr/btn_record_active.svg'
		// asr_source.js의 startRecording 함수 실행
		ASR.startRecording()
	}
	else {
		this.dataset.ontoken = '0'
		this.src = 'asset_asr/btn_record_nomal.svg'
        // asr_source.js의 stopRecording 함수 실행
        ASR.stopRecording()
	}
}


function run(data, wakeup_flag, end_token, status_flag) {

	if (wakeup_flag === true) {

		_buffers.push(data[0]);
		_buffers_len += data[0].length;

		ctr.open_ws();
		var tmp_buffer = mergeBuffers(_buffers, _buffers_len)
		var _maxunit = getMax(_buffers_len, _igcd)
		var send_buffer = tmp_buffer.slice(0, _maxunit)
		var etc_buffer = tmp_buffer.slice(_maxunit, )

		// console.log(send_buffer);
		// console.log(data[0]);

		// ret = -1;

		ret = ctr.send_msg(waveResampler.resample(send_buffer, _samplerate, 16000));
		if(ret === 0){
			//		console.log('send msg');
			_buffers = [];
			_buffers_len = etc_buffer.length;
			_buffers.push(etc_buffer);
		}
		else if(ret === -1){
			//console.log('websocket init error');
		}
		else if(ret === 1){
			//console.log('connecting');
		}
		else if(ret === 2){
			//console.log('socket is closing or closed');
		}
	}
	else if (end_token === true && status_flag === true) {

		ctr.close_ws();

        // TODO
        var txt = document.getElementById("text").innerHTML
	//console.log(txt)

		_buffer = [];
		_buffer_len = 0;
		rec.clear();
	}
}

```

<br>

##### asr_source.js

```javascript
class ASR_master{
    // constructor
    // - 클래스의 인스턴스 객체를 생성하고 초기화하는 메서드
    // - 다른 모든 메서드 호출보다 앞선 시점인, 인스턴스 객체를 초기화할 때 수행할 초기화 코드를 정의
	constructor(_use_url) {
		this.init = true;
		this.intervalId = null;
		_use_url_flag = _use_url;
	}

    // startRecording 함수
	startRecording() {
        // media 입력장치 사용 권한 요청
		navigator.getUserMedia = ( navigator.getUserMedia ||
	                       navigator.webkitGetUserMedia ||
	                       navigator.mozGetUserMedia ||
	                       navigator.msGetUserMedia);
	
		navigator.mediaDevices.getUserMedia({audio: true})
			.then(function (stream) { // 요청한 미디어 종류의 트랙(audio)을 포함한 mediaStream 반환
				
				let context = new AudioContext(), // WebAudioAPI는 모든 작업을 AudioContext 에서 처리하므로 AudioContext 생성
					bufSize = 4096,
                    // 이벤트가 전달되는 빈도 audioprocess와 각 호출을 처리해야 하는 샘플 프레임 수를 제어
                    // 지정되지 않으면 구현할 때 최적의 버퍼 크기 선택
					microphone = context.createMediaStreamSource(stream), // 설치된 마이크 등에서 실시간으로 음원 데이터를 받아옴
					processor = context.createScriptProcessor(bufSize, 1, 1),
                    // scriptprocess할 node 생성
                    // buffersize, inputChannel(노드 입력에 대한 채널 수 지정), outputChannel(출력에 대한 채널 수 지정)
					bufferArray = [];
	
				gumStream = stream;
				rec = new Recorder(microphone, end_time, context.sampleRate);
            	// recorder_wakeup.js에 microphone(음원데이터), end_time(20), context.sampleRate 전달
            	// context.sampleRate: 오디오 컨텍스트의 샘플 속도(초당 샘플 수)를 나타내는 부동 소수점 숫자(새 컨텍스트에 사용할 샘플 속도)
				_samplerate=context.sampleRate;
				_igcd = _samplerate / getGCD(_samplerate, 16000)
				
            	// recorder_wakeup.js의 record 함수 실행
				rec.record();
				sr=context.sampleRate
	
			})
			.catch(function (err) {
				console.log(err);
			});
		
        // setInterval: 주기적으로 이벤트 발생
        // 0.1초마다 recorder_wakeup.js의 getBuffer 함수 실행
		this.intervalId = setInterval(this.startRec, 100);

	
	}

	stopRecording() {
		// console.log('stopRecording');

		ctr.close_ws()
		_buffers = [];
		_buffers_len = 0;
		_triggerFlag = false;
		_triggerFlag_old = false;
		start_frame = [];
		clearInterval(this.intervalId);
		rec.stop();
		gumStream.getAudioTracks()[0].stop();
	}

	startRec(){
		if(rec === 0)
			return;
		rec.getBuffer(run);
	}
}


```

<br>

##### recorder_wakeup.js

```javascript
class Recorder {
    // microphone(음원데이터), end_time(20), context.sampleRate 전달 받음
    constructor(source, end_time, sr) {
        this.config = {
            bufferLen: 4096,
            numChannels: 1,
            mimeType: 'audio/wav',
            end_time: end_time,
	    sr: sr
        };

        this.recording = false;

        this.callbacks = {
            getBuffer: [],
            exportWAV: []
        };
        this.context = source.context;
        // microphone의 context
        // AudioContext {baseLatency: 0.01, destination: AudioDestinationNode, currentTime: 0.10133333333333333, sampleRate: 48000, listener: AudioListener, …}
        
        this.variationThreshold = 40; // sensitivity to noise //6 for 16k
        this.endOfVoiceLength = this.config.end_time; // endOfVoiceLength * (4096 / 44000)
        this.wakeUpThreshold = 3; // wakeupThreshold * 93ms
        let voiceCnt = 0;
        let notVoiceCnt = 0;
        let _wakeupFlag=false,
            _endToken=false; // 0 nothing 1 end 2 false
        
        // scriptprocess할 node 생성
        // source(microphone)와 동일한 context를 this로 넘김, input과 output 채널은 1개(numChannels)
        this.node = (this.context.createScriptProcessor ||
            this.context.createJavaScriptNode).call(this.context,
            this.config.bufferLen, this.config.numChannels, this.config.numChannels);
		
        // scriptprocess의 입력 버퍼가 처리될 준비가 되면 시작하는 이벤트를 나타냄
        this.node.onaudioprocess = (e) => {
            if (!this.recording) return; // 녹음 버튼 클릭하면 record() 함수 실행되고 recording = true;

            // numChannel: 1
            var buffer = [];
            for (var channel = 0; channel < this.config.numChannels; channel++) {
                var _data = e.inputBuffer.getChannelData(channel);
                var _resampled_data = _data;
                // e.inputBuffer: load 된 오디오
                // getChannelData
                // - PCM 데이터(channel과 관련된)를 포함하고 있는 Float 32 Array를 반환
                // - 첫번째 채널은 parameter가 0이다.
                
                // waveResampler.resample(_data, this.config.sr, 16000); //res.resample(_data); // resample 44100 -> 16000
		   
                // ---------------------------- 잡음 제거 기능 ---------------------------- //
                // _resampled_data 절댓값을 더해
                // variationThreshold(40) 보다 클 경우에는 voice,
                // variationThreshold(40) 보다 작을 경우에는 notVoice로 판단
                
                var _variation = 0;
                for (var i = 0; i < _resampled_data.length;i++){
                    _variation += Math.abs(_resampled_data[i]);
                }

                // if variance is less than threshold, return impossible case
                if (_variation > this.variationThreshold){
                    voiceCnt += 1;
                    notVoiceCnt = 0;
                }
                else{
                    voiceCnt = 0;
                    notVoiceCnt += 1;
                }
                buffer.push(_resampled_data)
				
                // voiceCnt가 3을 넘으면 = 말을 하고 있으면
                // wakeupFlag는 True
                if(voiceCnt > this.wakeUpThreshold) {
                    _wakeupFlag = true;
                    _endToken = false;
                }
                
                // notVoiceCnt(잡음보다 작은 소리)가 20보다 작다면
                // endToken은 True
                else if(_endToken === false && notVoiceCnt > this.endOfVoiceLength){
                    _endToken = true;
                    _wakeupFlag = false;
                }
            }
			
            // worker에 message 전송
            this.worker.postMessage({
                command: 'record',
                buffer: buffer,
                wakeup_flag: _wakeupFlag,
                end_token: _endToken
            });
        };

        // source(microphone)에 node를 연결
        // node를 destination(출력)에 연결
        source.connect(this.node);
        this.node.connect(this.context.destination);    //this should not be necessary

        // worker
        let self = {};
        this.worker = new InlineWorker(function () {
            let recLength = 0,
                recBuffers = [],
                _wakeupFlag,
                _statusFlag = false,
                _endToken;
                _wakeindex = 0;
                _wakelen = 0;
                _startIndex = 0;
                _endIndex = 0;

            this.onmessage = function (e) {
                switch (e.data.command) {
                    case 'init':
                        init(e.data.config);
                        break;
                    case 'record':
                         record(e.data.buffer, e.data.wakeup_flag, e.data.end_token);
                        break;
                    case 'getBuffer':
                        getBuffer();
                        break;
                    case 'clear':
                        clear();
                        break;
                }
            };

            function init(config) {
                sampleRate = config.sampleRate;
                numChannels = config.numChannels;
                initBuffers(); // recBuffers[0] 비우기
            }

            function record(inputBuffer, wakeupFlag, endToken) {

                _wakeupFlag_old = _wakeupFlag;
                _wakeupFlag = wakeupFlag;
                _endToken = endToken;
				
                // recBuffers[0]에 inputBuffer[0](=AUDIO INPUT)을 push
                recBuffers[0].push(inputBuffer[0]);
                recLength += inputBuffer[0].length;

                if(_wakeupFlag === false && recBuffers[0].length > 10){
                    // wakeupFlag === false: 잡음이라면
                    // recBuffer에서 shift하고 length에서도 빼주자
                    // shift: 배열에서 첫번째 요소를 제거하고 제거된 요소를 반환
                    tmp = recBuffers[0].shift();
                    recLength -= tmp.length;
                }
            }
       
            function getBuffer() {
                var step_len = 4096

                let buffers = [];
                // _wakeupFlag === true: (잡음이 아닌) 정상적인 녹음 상태 시작이고
                // _statusFlag === false: 녹음 중이 아니었을 때
                // => 녹음을 시작했을 때
                if(_wakeupFlag === true && _statusFlag === false){
                    _statusFlag = true;

                    _startIndex = 0;
                    _endIndex = recBuffers[0].length;
                    
                    // mergeBuffers: 빈 배열을 만들어 recBuffers[0]의 정보를 복사해 반환
                    buffers.push(mergeBuffers(recBuffers[0], (_endIndex - _startIndex) * step_len, _startIndex, _endIndex));

                    this.postMessage({command: 'getBuffer', data: buffers, wakeup_flag: _wakeupFlag, end_token:_endToken,
                    status_flag: _statusFlag});
                }
                
                // _endToken === false: 녹음 상태 시작
                // _statusFlag === true: 녹음 중인 상태
                // => 녹음 중
                else if(_endToken === false && _statusFlag === true){
   
                    _startIndex = _endIndex;
                    _endIndex = recBuffers[0].length;
                    buffers.push(mergeBuffers(recBuffers[0], (_endIndex - _startIndex) * step_len, _startIndex, _endIndex));
                    
                    this.postMessage({command: 'getBuffer', data: buffers, wakeup_flag: _wakeupFlag, end_token:_endToken,
                    status_flag: _statusFlag});
                }
                
                // _endToken === true: (잡음만 들리거나 말이 없는 상태) 녹음 상태 아님 
                // _statusFlag === true: 녹음 중인 상태
                // => 녹음 중지
                else if(_endToken === true && _statusFlag === true){

                    _startIndex = _endIndex;
                    _endIndex = recBuffers[0].length;
                    buffers.push(mergeBuffers(recBuffers[0], (_endIndex - _startIndex) * step_len, _startIndex, _endIndex));
                
                    this.postMessage({command: 'getBuffer', data: buffers, wakeup_flag: _wakeupFlag, end_token:_endToken,
                    status_flag: _statusFlag});
                    _statusFlag = false;
                }    
            }

            function clear() {
                recLength = 0;
                _lastindex = 0;
                recBuffers = [];
                initBuffers();
            }

            function initBuffers() {
                recBuffers[0] = [];
            }

            function mergeBuffers(recBuffers, recLength, start, end) {
                    
                let result = new Float32Array(recLength); // recLength 바이트 크기의 internal array buffer 생성 
                let offset = 0;
                for (let i=start; i < end; i++) {
                    // set: offset 인덱스부터 recBuffers[i]의 배열을 복사해 저장
                    result.set(recBuffers[i], offset);
                    offset += recBuffers[i].length;
                }
                return result;
            }

        }, self);

        this.worker.postMessage({
            command: 'init',
            config: {
                sampleRate: this.context.sampleRate,
                numChannels: this.config.numChannels
            }
        });

        this.worker.onmessage = (e) => {
            let cb = this.callbacks[e.data.command].pop();
            if (typeof cb == 'function') {
                cb(e.data.data, e.data.wakeup_flag, e.data.end_token, e.data.status_flag);
            }
        };
    }

    record() {
        this.recording = true;
    }

    stop() {
        this.recording = false;
    }

    clear() {
        this.worker.postMessage({command: 'clear'});
    }

    getBuffer(cb) {
        cb = cb || this.config.callback;
        if (!cb) throw new Error('Callback not set');

        this.callbacks.getBuffer.push(cb);

        this.worker.postMessage({command: 'getBuffer'});
    }
}

```

<br>

##### inline_worker.js

```javascript
function InlineWorker(func, self) {
  var _this = this;
  var functionBody;

  self = self || {};

  if (WORKER_ENABLED) {
    functionBody = func
      .toString() // 문자열 반환
      .trim() // 공백 제거
      // match() 메서드
      // - 문자열이 정규식과 매치되는 부분을 검색
      // - 실행결과 일치하는 모든 문자열은 배열로 저장
      
      // ^: 입력 시작 문자열 매칭: function으로 시작함
      // $: 입력 끝 문자열에 매칭
      // ?: 0~1번 반복되는 문자열에 매칭
      // *: 0번 이상 반복되는 문자열에 매칭
      // \s: space를 표현(공백문자)
      // \w: 알파벳, 숫자, _ 중 한 문자
      // (): 그룹을 표현하며, 그룹으로 처리함
      // [abc]: a 또는 b 또는 c와 일치, 점(.)이나 별표(*) 같은 특수 문자는 []안에서 특수 문자가 아님
      
      // function _ _ _ (_ _ _) {_ _ _}
      .match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1];

    return new global.Worker(
      // Blob: Blob: Binary Large Object의 줄임말로서 이미지, 사운드 파일과 같이 하나의 큰 파일을 의미
      // URL.createObjectURL: 주어진 객체(여기선 Blob)를 가리키는 URL을 DOMString으로 변환하는 기능
      // 예: http://localhost:1234/28ff8746-94eb-4dbe-9d6c-2443b581dd30
        
      global.URL.createObjectURL(
        new global.Blob([functionBody], { type: "text/javascript" })
      )
      // 인자로 받은 func을 blob 객체로 그리고 다시 DOMString으로 변환해 return
    );
  }

  
  function postMessage(data) {
    setTimeout(function () {
      _this.onmessage({ data: data });
    }, 0);
  }

  this.self = self;
  this.self.postMessage = postMessage;

  // setTimeout에 객체 내부 함수를 전달할 때 객체와 분리된 상태의 함수가 전달되는 문제가 있음
  // 즉, this 가 사라지게 됨
  // this를 수정할수 있는 bind 메서드를 사용
  // 1번째 인자는 this 키워드를 설정하고, 나머지 인자들은 그 함수의 인자로 전달
  setTimeout(func.bind(self, self), 0);
}

// 워커 내장 postMessage 함수 대체
InlineWorker.prototype.postMessage = function postMessage(data) {
  var _this = this;

  setTimeout(function () {
    _this.self.onmessage({ data: data });
  }, 0);
};

```

