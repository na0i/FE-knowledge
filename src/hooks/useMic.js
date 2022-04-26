export const useMic = () => {
	const record = (startRef, stopRef) => {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			const constraints = { audio: true };
			const starter = startRef.current;
			const stoper = stopRef.current;
			let chunks = [];

			let onSuccess = function (stream) {
				const mediaRecorder = new MediaRecorder(stream);

				starter.onclick = function () {
					// console.log('녹음 시작');
					mediaRecorder.start();
				};

				stoper.onclick = function () {
					// console.log('녹음 끝');
					mediaRecorder.stop();
				};

				mediaRecorder.ondataavailable = function (e) {
					// 녹음한 data 연결
					chunks.push(e.data);
				};
			};

			let onError = function (err) {
				console.log(err);
			};

			navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
		}
	};

	const record2 = async () => {
		const audioContext = new (window.AudioContext || window.webkitAudioContext)();
		// await audioContext.audioWorklet.addModule('worklet/processor.js');
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
				const source = audioContext.createMediaStreamSource(stream);
				if (window.Worker) {
					const worker = new Worker('worklet/recordWorker.js');
					worker.postMessage('워커실행');
					worker.onmessage = function (e) {
						console.log(e.data);
					};
					worker.terminate();
				}
			});
		}
	};

	return { record, record2 };
};
