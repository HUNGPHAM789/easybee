export class AudioHandler {
  audioContext: AudioContext | null = null;
  stream: MediaStream | null = null;
  processor: ScriptProcessorNode | null = null;
  source: MediaStreamAudioSourceNode | null = null;
  analyser: AnalyserNode | null = null;
  dataArray: Uint8Array | null = null;
  animationFrameId: number = 0;
  
  playbackQueue: AudioBufferSourceNode[] = [];
  nextPlayTime: number = 0;
  
  onVolumeChange?: (volume: number) => void;

  async startRecording(onAudioData: (base64: string, sampleRate: number) => void) {
    this.audioContext = new AudioContext({ sampleRate: 16000 });
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    console.log("AudioContext state:", this.audioContext.state, "sample rate:", this.audioContext.sampleRate);
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.source = this.audioContext.createMediaStreamSource(this.stream);
    this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);
    
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    
    this.source.connect(this.analyser);
    
    const updateVolume = () => {
      if (this.analyser && this.dataArray) {
        this.analyser.getByteTimeDomainData(this.dataArray);
        let sum = 0;
        for (let i = 0; i < this.dataArray.length; i++) {
          const val = (this.dataArray[i] - 128) / 128;
          sum += val * val;
        }
        const rms = Math.sqrt(sum / this.dataArray.length);
        if (this.onVolumeChange) this.onVolumeChange(rms);
      }
      this.animationFrameId = requestAnimationFrame(updateVolume);
    };
    updateVolume();

    this.processor.onaudioprocess = (e) => {
      const inputData = e.inputBuffer.getChannelData(0);
      const sampleRate = this.audioContext!.sampleRate;
      const targetRate = 16000;
      
      let resampledData: Float32Array;
      if (sampleRate === targetRate) {
        resampledData = inputData;
      } else {
        const ratio = sampleRate / targetRate;
        const newLength = Math.round(inputData.length / ratio);
        resampledData = new Float32Array(newLength);
        for (let i = 0; i < newLength; i++) {
          resampledData[i] = inputData[Math.floor(i * ratio)];
        }
      }

      const pcm16 = new Int16Array(resampledData.length);
      for (let i = 0; i < resampledData.length; i++) {
        pcm16[i] = Math.max(-1, Math.min(1, resampledData[i])) * 0x7FFF;
      }
      const buffer = new ArrayBuffer(pcm16.length * 2);
      const view = new DataView(buffer);
      for (let i = 0; i < pcm16.length; i++) {
        view.setInt16(i * 2, pcm16[i], true);
      }
      let binary = '';
      const bytes = new Uint8Array(buffer);
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      onAudioData(btoa(binary), targetRate);
    };
    
    this.source.connect(this.processor);
    this.processor.connect(this.audioContext.destination);
    this.nextPlayTime = this.audioContext.currentTime;
  }

  playAudio(base64Audio: string) {
    if (!this.audioContext) return;
    
    try {
      const binaryString = atob(base64Audio);
      const byteLength = binaryString.length - (binaryString.length % 2); // Ensure even length
      const bytes = new Uint8Array(byteLength);
      for (let i = 0; i < byteLength; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const pcm16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(pcm16.length);
      for (let i = 0; i < pcm16.length; i++) {
        float32[i] = pcm16[i] / 0x7FFF;
      }
      
      const audioBuffer = this.audioContext.createBuffer(1, float32.length, 24000);
      audioBuffer.getChannelData(0).set(float32);
      
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      
      if (this.analyser) {
        source.connect(this.analyser);
      }
      source.connect(this.audioContext.destination);
      
      if (this.nextPlayTime < this.audioContext.currentTime) {
        this.nextPlayTime = this.audioContext.currentTime + 0.1;
      }
      
      source.start(this.nextPlayTime);
      this.playbackQueue.push(source);
      
      source.onended = () => {
        const index = this.playbackQueue.indexOf(source);
        if (index > -1) {
          this.playbackQueue.splice(index, 1);
        }
      };
      
      this.nextPlayTime += audioBuffer.duration;
    } catch (e) {
      console.error("Error playing audio:", e);
    }
  }

  stopPlayback() {
    this.playbackQueue.forEach(source => {
      try { source.stop(); } catch (e) {}
    });
    this.playbackQueue = [];
    if (this.audioContext) {
      this.nextPlayTime = this.audioContext.currentTime;
    }
  }

  stopRecording() {
    cancelAnimationFrame(this.animationFrameId);
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    if (this.analyser) {
      this.analyser.disconnect();
      this.analyser = null;
    }
    this.dataArray = null;
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
      this.stream = null;
    }
    // Stop playback BEFORE closing context — stopPlayback needs audioContext alive
    this.stopPlayback();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}
