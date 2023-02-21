import React, { useState, useEffect } from 'react';

let url_worklet = URL.createObjectURL(
	new Blob(
		[
			'(',
			function () {
				class WorkletProcessor extends AudioWorkletProcessor {
					_volume;
					_updateIntervalInMS;
					_nextUpdateFrame;

					constructor(options) {
						super();
						this._volume = 0;
						this._updateIntervalInMS = 25;
						this._nextUpdateFrame = 25;
					}

					get intervalFrames() {
						return (this._updateIntervalInMS / 1000) * 48000;
					}

					process(inputs, outputs) {
						const input = inputs[0];

						// Note that the input will be down-mixed to mono; however, if no inputs are
						// connected then zero channels will be passed in.
						if (0 < input.length) {
							const samples = input[0];
							let sum = 0;
							let rms = 0;

							// Update and sync the volume property with the main thread.
							this._nextUpdateFrame -= samples.length;
							if (0 > this._nextUpdateFrame) {
								// Calculated the squared-sum.
								for (let i = 0; i < samples.length; i += 1) {
									sum += samples[i] * samples[i];
								}
								// Calculate the RMS level and update the volume.
								rms = Math.sqrt(sum / samples.length);
								this._volume = Math.max(rms, this._volume * 0.8);
								this._nextUpdateFrame += 1800;
								this.port.postMessage({ volume: this._volume * 200 });
							}
						}
						return true;
					}
				}
				registerProcessor('worklet-processor', WorkletProcessor);
			}.toString(),
			')()',
		],
		{ type: 'application/javascript' },
	),
);

export const useMic = () => {
	useEffect(() => {}, []);

	const getDevices = async () => {
		if (navigator.mediaDevices) {
			return navigator.mediaDevices
				.enumerateDevices()
				.then(function (devices) {
					// console.log(devices);
					return devices.filter(
						(item) =>
							item.kind === 'audioinput' &&
							item.deviceId !== 'default' &&
							item.deviceId !== 'communications',
					);
				})
				.catch(function (err) {
					console.log(err.name + ': ' + err.message);
				});
		}
	};

	const connect = () => {};

	const disConnection = () => {};

	const micTest = async ({ setVolume }) => {
		const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		await audioCtx.audioWorklet.addModule(url_worklet);

		if (navigator.mediaDevices) {
			navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
				const microphone = audioCtx.createMediaStreamSource(stream);
				const node = new AudioWorkletNode(audioCtx, 'worklet-processor');
				setInterval(() => {
					node.port.postMessage(audioCtx.sampleRate);
				}, 200);
				node.port.onmessage = (e) => {
					setVolume(e.data.volume);
				};
				microphone.connect(node).connect(audioCtx.destination);
			});
		}
		// const analyser = audioCtx.createAnalyser();
		// analyser.smoothingTimeConstant = 0.8;
		// analyser.fftSize = 1024;
		// if (navigator.mediaDevices) {
		// 	navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
		// 		const micStream = audioCtx.createMediaStreamSource(stream);
		// 		const jsNode = new AudioWorkletNode(audioCtx, 'worklet-processor');
		// 		// const javascriptNode = audioCtx.createScriptProcessor(2048, 1, 1);

		// 		micStream.connect(analyser);
		// 		analyser.connect(jsNode);
		// 		jsNode.connect(audioCtx.destination);

		// jsNode.onaudioprocess = () => {

		// };
		// const Recorder = new MediaRecorder(stream);
		// Recorder.ondataavailable = (e) => {
		// 	console.log(e.data);
		// };
		// // Recorder.start(100);
		// ref.srcObject = stream;

		// console.log(mediaStreamSrc);
		// 	});
		// }
	};

	return { getDevices, micTest };
};
