class MyAudioProcessor extends AudioWorkletProcessor {
	constructor() {
		super();
	}

	process(inputList, outputList) {
		const input = inputList[0];
		const output = outputList[0];

		return true;
	}
}

registerProcessor('my-audio-processor', MyAudioProcessor);
