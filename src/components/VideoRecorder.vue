<template>
  <div class="video-recording-container">
    <h1>Video Recorder</h1>
    <div>
      <video ref="video" autoplay muted></video>
      <div class="timer" v-if="videoStore.isRecording">{{ formattedTime }}</div>
      <div class="face-detection">
        {{
          videoStore.faceDetected
            ? ''
            : 'Face not detected. Please ensure your face is visible in the camera frame.'
        }}
      </div>
    </div>

    <div>
      <button
        class="record-button"
        :class="{ disabled: !videoStore.faceDetected }"
        v-if="!videoStore.isRecording"
        @click="startRecording"
        :disabled="!videoStore.faceDetected"
      >
        Start Recording
      </button>
      <button class="stop-button" v-else @click="stopRecording(videoStore.mediaRecorder)">
        Stop Recording
      </button>
    </div>
  </div>
</template>

<script>
import * as faceapi from 'face-api.js'
import { useVideoStore } from '@/stores/videoStore'
import { useRouter } from 'vue-router'
import { computed, onBeforeUnmount, onMounted, useTemplateRef } from 'vue'

export default {
  setup() {
    const videoStore = useVideoStore()
    const router = useRouter()
    const videoEl = useTemplateRef('video')

    onMounted(() => {
      startVideoStream()
      loadFaceApiModels()
    })

    const formattedTime = computed(() => {
      const minutes = Math.floor(videoStore.timer / 60)
        .toString()
        .padStart(2, '0')
      const seconds = (videoStore.timer % 60).toString().padStart(2, '0')
      return `${minutes}:${seconds}`
    })

    onBeforeUnmount(() => {
      if (videoStore.faceDetectionInterval) clearInterval(videoStore.faceDetectionInterval)
      if (videoStore.timerInterval) clearInterval(videoStore.timerInterval)
    })

    const startVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
        videoEl.value.srcObject = stream

        // Initialize MediaRecorder using the stream.
        videoStore.mediaRecorder = new MediaRecorder(stream)
        const recordedChunks = []

        // Handle data available event
        videoStore.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunks.push(event.data)
          }
        }

        videoStore.mediaRecorder.onstop = async () => {
          // Create blob from the recorded chunks
          videoStore.saveVideoBlob(recordedChunks)

          // Stop the video stream
          stream.getTracks().forEach((track) => track.stop())
          videoEl.value.srcObject = null

          // navigate to showvideo route
          router.push({ path: 'showvideo' })
        }
      } catch (error) {
        console.error('Error accessing media devices.', error)
      }
    }

    // Load the Tiny Face Detector model from the public models folder.
    const loadFaceApiModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
        await runFaceDetection()
      } catch (error) {
        console.error('face-api not loaded', error)
      }
    }

    const runFaceDetection = async () => {
      // Run face detection every 500ms.
      videoStore.faceDetectionInterval = setInterval(async () => {
        if (videoEl.value.paused || videoEl.value.ended) return

        const detections = await faceapi.detectAllFaces(
          videoEl.value,
          new faceapi.TinyFaceDetectorOptions(),
        )

        // Update the faceDetected flag.
        videoStore.faceDetected = detections.length > 0
      }, 500)
    }

    const startRecording = () => {
      videoStore.mediaRecorder.start()
      videoStore.setRecordingStatus(true)
      videoStore.timer = 0

      videoStore.timerInterval = setInterval(() => {
        videoStore.timer++
      }, 1000)
    }

    const stopRecording = (recorder) => {
      if (recorder && typeof recorder.stop === 'function') {
        recorder.stop()
        videoStore.setRecordingStatus(false)

        clearInterval(videoStore.timerInterval)
        videoStore.timerInterval = null
      } else {
        console.error('Invalid MediaRecorder instance.')
      }
    }

    return {
      videoStore,
      startRecording,
      stopRecording,
      runFaceDetection,
      loadFaceApiModels,
      startVideoStream,
      formattedTime,
    }
  },
}
</script>

<style scoped>
.video-recording-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

video {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  width: 100%;
  max-width: 640px;
  height: auto;
  margin-bottom: 10px;
}

.face-detection {
  width: 100%;
  height: 30px;
  margin: 20px;
}

.record-button {
  background: red;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 18px;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.8);
  transition:
    transform 0.2s ease,
    box-shadow 0.3s ease;
}

.record-button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 25px rgba(255, 0, 0, 1);
}

.record-button:active {
  transform: scale(1);
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
}

/* Disabled State */
.record-button.disabled {
  background: gray;
  color: #ccc;
  cursor: not-allowed;
  box-shadow: none;
  opacity: 0.6;
}

.stop-button {
  background: rgb(37, 99, 235);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 18px;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(37, 99, 235, 0.8);
  transition:
    transform 0.2s ease,
    box-shadow 0.3s ease;
}

.stop-button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 25px rgba(37, 99, 235, 1);
}

.stop-button:active {
  transform: scale(1);
  box-shadow: 0 0 10px rgba(37, 99, 235, 0.8);
}
</style>
