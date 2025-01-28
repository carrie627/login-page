<template>
  <div>
    <div v-if="videoStore.isRecorder">
      <h1>Video Recorder</h1>
      <div>
        <video ref="video" autoplay muted></video>
      </div>

      <div>
        <button @click="startRecording($refs.video)" :disabled="videoStore.isRecording">
          Start Recording
        </button>
        <button
          @click="stopRecording(videoStore.mediaRecorder)"
          :disabled="!videoStore.isRecording"
        >
          Stop Recording
        </button>
      </div>
    </div>

    <div v-else>
      <ShowVideo />
    </div>
  </div>
</template>

<script>
import { useVideoStore } from '@/stores/videoStore'
import ShowVideo from './ShowVideo.vue'

export default {
  components: {
    ShowVideo,
  },

  setup() {
    const videoStore = useVideoStore()

    const startRecording = async (videoRef) => {
      try {
        // Access the user's webcam
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        videoRef.srcObject = stream

        // Set up the media recorder
        videoStore.mediaRecorder = new MediaRecorder(stream)
        const recordedChunks = []

        // Handle data available event
        videoStore.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunks.push(event.data)
          }
        }

        // Start Recording
        videoStore.mediaRecorder.start()
        videoStore.setRecordingStatus(true)

        videoStore.mediaRecorder.onstop = async () => {
          // Create blob from the recorded chunks
          videoStore.saveVideoBlob(recordedChunks)

          // Stop the video stream
          stream.getTracks().forEach((track) => track.stop())
          videoRef.srcObject = null
        }
      } catch (error) {
        console.error('Error accessing media devices:', error)
        alert('Could not access the camera. Please check permissions.')
      }
    }

    const stopRecording = (recorder) => {
      if (recorder && typeof recorder.stop === 'function') {
        recorder.stop()
        videoStore.setRecordingStatus(false)
        videoStore.isRecorder = false
      } else {
        console.error('Invalid MediaRecorder instance.')
      }
    }

    return {
      videoStore,
      startRecording,
      stopRecording,
    }
  },
}
</script>

<style scoped>
video {
  width: 100%;
  max-width: 640px;
  height: auto;
  margin-bottom: 10px;
}

button {
  margin-right: 10px;
}
</style>
