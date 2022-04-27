### 220427

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
				
				rec.record();
				sr=context.sampleRate
				// console.log('recording');
	
			})
			.catch(function (err) {
				console.log(err);
			});
	
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
            if (!this.recording) return; // record 상태가 아니라면 return;

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

                if(voiceCnt > this.wakeUpThreshold) {
                    _wakeupFlag = true;
                    _endToken = false;
                }
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

        source.connect(this.node);
        this.node.connect(this.context.destination);    //this should not be necessary

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
			// var resampled = waveResampler.resample(e.data.buffer, this.config.sr, 16000);
                        // record(resampled, e.data.wakeup_flag, e.data.end_token);
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
                initBuffers();
            }

            function record(inputBuffer, wakeupFlag, endToken) {

                _wakeupFlag_old = _wakeupFlag;
                _wakeupFlag = wakeupFlag;
                _endToken = endToken;

                recBuffers[0].push(inputBuffer[0]);
                recLength += inputBuffer[0].length;

                if(_wakeupFlag === false && recBuffers[0].length > 10){
                    tmp = recBuffers[0].shift();
                    recLength -= tmp.length;
                }
            }
       
            function getBuffer() {
		// var step_len = 1486
		var step_len = 4096

                let buffers = [];
                if(_wakeupFlag === true && _statusFlag === false){ // start asr
                    _statusFlag = true;

                    _startIndex = 0;
                    _endIndex = recBuffers[0].length;                
                    buffers.push(mergeBuffers(recBuffers[0], (_endIndex - _startIndex) * step_len, _startIndex, _endIndex));

                    this.postMessage({command: 'getBuffer', data: buffers, wakeup_flag: _wakeupFlag, end_token:_endToken,
                    status_flag: _statusFlag});
                }
                else if(_endToken === false && _statusFlag === true){ // ongoing
   
                    _startIndex = _endIndex;
                    _endIndex = recBuffers[0].length;
                    buffers.push(mergeBuffers(recBuffers[0], (_endIndex - _startIndex) * step_len, _startIndex, _endIndex));
                    
                    this.postMessage({command: 'getBuffer', data: buffers, wakeup_flag: _wakeupFlag, end_token:_endToken,
                    status_flag: _statusFlag});
                }
                else if(_endToken === true && _statusFlag === true){ // stop end

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
                    
                let result = new Float32Array(recLength);
                let offset = 0;
                for (let i=start; i < end; i++) {
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

