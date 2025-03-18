<template>
  <div class="video-player">
    <video ref="videoRef" :src="src" @timeupdate="handleTimeUpdate" @loadedmetadata="handleLoadedMetadata">
      您的浏览器不支持 video 标签。
    </video>

    <div class="controls">
      <!-- 播放/暂停按钮 -->
      <button @click="togglePlay">
        {{ isPlaying ? '暂停' : '播放' }}
      </button>

      <!-- 进度条 -->
      <input
        type="range"
        v-model="progress"
        min="0"
        :max="duration"
        @input="handleSeek"
      />

      <!-- 倍速选择 -->
      <select v-model="playbackRate">
        <option value="0.5">0.5x</option>
        <option value="1">1x</option>
        <option value="1.5">1.5x</option>
        <option value="2">2x</option>
      </select>

      <!-- 音量控制 -->
      <input
        type="range"
        v-model="volume"
        min="0"
        max="1"
        step="0.1"
        @input="handleVolumeChange"
      />

      <!-- 全屏按钮 -->
      <button @click="toggleFullscreen">
        全屏
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const progress = ref(0)
const duration = ref(0)
const playbackRate = ref(1)
const volume = ref(1)

// 播放/暂停切换
const togglePlay = () => {
  if (videoRef.value) {
    if (isPlaying.value) {
      videoRef.value.pause()
    } else {
      videoRef.value.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

// 更新进度条
const handleTimeUpdate = () => {
  if (videoRef.value) {
    progress.value = videoRef.value.currentTime
  }
}

// 跳转到指定时间
const handleSeek = (event: Event) => {
  if (videoRef.value) {
    videoRef.value.currentTime = (event.target as HTMLInputElement).valueAsNumber
  }
}

// 获取视频总时长
const handleLoadedMetadata = () => {
  if (videoRef.value) {
    duration.value = videoRef.value.duration
  }
}

// 倍速变化
watch(playbackRate, (newRate) => {
  if (videoRef.value) {
    videoRef.value.playbackRate = newRate
  }
})

// 音量变化
const handleVolumeChange = (event: Event) => {
  if (videoRef.value) {
    videoRef.value.volume = (event.target as HTMLInputElement).valueAsNumber
  }
}

// 全屏切换
const toggleFullscreen = () => {
  if (videoRef.value) {
    if (!document.fullscreenElement) {
      videoRef.value.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }
}
</script>

<style scoped>
.video-player {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

video {
  width: 100%;
  display: block;
}

.controls {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
}

input[type="range"] {
  flex: 1;
}

button {
  cursor: pointer;
}
</style>