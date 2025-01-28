import { defineStore } from 'pinia'

export const useVideoStore = defineStore('video', {
  state: () => ({
    isRecording: false,
    videoBlob: null,
    videoUrl: null,
    MediaRecorder: null,
  }),

  actions: {
    setRecordingStatus(status) {
      this.isRecording = status
    },

    saveVideoBlob(data) {
      this.videoBlob = new Blob(data, { type: "'video/webm'" })
      this.videoUrl = URL.createObjectURL(this.videoBlob)
    },
  },
})
