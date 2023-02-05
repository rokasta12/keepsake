<script setup lang="ts">
import { addSeconds, format } from 'date-fns'
import { ref } from 'vue'

const props = defineProps({
  src: String,
})
const playing = ref(false)
const audio = ref<HTMLAudioElement | null>(null)
const audioDuration = ref(0)
const audioProgressPercentage = ref(0)
const progressRef = ref<HTMLDivElement | null>(null)

function playAudio() {
  if (!playing.value) {
    audio?.value?.play()
    playing.value = true
  }
  else {
    audio?.value?.pause()
    playing.value = false
  }
}

function updateAudioProgress() {
  audioProgressPercentage.value = (audio?.value?.currentTime || 0) / (audio?.value?.duration || 1) * 100
}

function updateAudioDuration() {
  audioDuration.value = audio?.value?.duration || 0
}

function formattedTime(seconds: number) {
  const helperDate = addSeconds(new Date(0), seconds)
  return format(helperDate, 'mm:ss')
}

onMounted(() => {
  audio.value?.addEventListener('timeupdate', updateAudioProgress)
  audio.value?.addEventListener('loadedmetadata', updateAudioDuration)
})

onUnmounted(() => {
  audio.value?.removeEventListener('timeupdate', updateAudioProgress)
  audio.value?.removeEventListener('loadedmetadata', updateAudioDuration)
})
function updateCurrentTime(event: MouseEvent) {
  const { offsetX } = event
  const width = progressRef.value?.clientWidth || 2
  const percentage = offsetX / width
  //  audio?.value?.currentTime = (audio?.value?.duration * percentage)
}
</script>

<template>
  <div class="flex items-center">
    <div class="flex-1">
      <div class="flex justify-center items-center gap-2">
        <span>{{ audio?.currentTime ? formattedTime(audio?.currentTime) : '00:00' }}</span>
        <div class="h-1 w-full bg-gray-200 rounded">
          <div
            ref="progressRef" class="h-1 bg-orange-500 rounded" :style="{ width: `${audioProgressPercentage}%` }"
            @click="updateCurrentTime"
          />
        </div>
        <span>{{ audioDuration ? formattedTime(audioDuration) : '??:00' }}</span>
      </div>
      <audio ref="audio" :src="props.src" />
      <button class="p-2 border border-gray-500 rounded flex items-center" @click="playAudio">
        {{ playing ? 'Pause' : 'Play' }}
        <div v-if="!playing" i-carbon-play inline-block />
        <div v-else i-carbon-pause inline-block />
      </button>
    </div>
  </div>
</template>
