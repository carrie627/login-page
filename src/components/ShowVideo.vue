<template>
  <div class="video-container">
    <h2>Recorded Video</h2>
    <div class="video-links" v-if="videoStore.videoUrl">
      <video controls>
        <source :src="videoStore.videoUrl" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <a class="download-button" :href="videoStore.videoUrl" download="recording.webm">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 16l4-4H13V4h-2v8H8z"></path>
          <path d="M20 18H4v-2h16v2z"></path>
        </svg>
        Download
      </a>
    </div>

    <p v-else>No video recorded yet.</p>
  </div>
</template>

<script>
import { useVideoStore } from '@/stores/videoStore'

export default {
  name: 'ShowVideo',
  setup() {
    const videoStore = useVideoStore()

    return {
      videoStore,
    }
  },
}
</script>

<style scoped>
.video-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.video-links {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
}

.download-button {
  display: inline-flex;
  align-items: center;
  margin: 20px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #2563eb;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-decoration: none;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
}

.download-button:hover {
  background-color: #1d4ed8;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.download-button svg {
  margin-right: 8px;
  width: 20px;
  height: 20px;
  fill: currentColor;
}

video {
  max-width: 100%;
  height: auto;
  border: 2px solid #ccc;
  border-radius: 8px;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

video::-webkit-media-controls-enclosure {
  transform: scaleX(-1);
}
</style>
