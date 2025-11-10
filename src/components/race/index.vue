<template>
  <div class="race-track">
    <div>
      <div v-if="showRoundTransition" class="round-transition-overlay">
        <div class="round-transition-content">
          <div class="round-number">Round {{ currentRoundIndex + 1 }}</div>
          <div class="round-distance">{{ currentRound?.distance }}m</div>
        </div>
      </div>
    </div>

    <div class="track-container">
      <div class="lanes">
        <div 
          v-for="(lane, index) in lanes" 
          :key="index" 
          class="lane"
        >
          <div class="lane-number">{{ lane.horse ? lane.horse.name : index + 1 }}</div>
          <div class="lane-content">
            <div 
              v-if="lane.horse" 
              class="horse"
              :style="{
                left: `${horsePositions[lane.horse.id] || 0}%`,
                backgroundColor: getColorCode(lane.horse.color)
              }"
            >
            <img :src="horseIcon" class="horse-icon" />
            </div>
            <div class="track-line"></div>
          </div>
        </div>
      </div>
      <div class="finish-line">
        <div class="finish-line-mark">FINISH</div>
      </div>
    </div>
    <div class="round-info" v-if="currentRound">
      {{ currentRoundIndex + 1 }}st Lap {{ currentRound.distance }}m
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { getColorCode } from "../../utils/colors"
import { calculateRaceResult } from "../../utils/gameLogic"
import horseIcon2 from '../../assets/horse.svg'

const store = useStore()

const currentRound = computed(() => store.getters.currentRound)
const currentRoundIndex = computed(() => store.getters.currentRoundIndex)
const horsePositions = computed(() => store.getters.horsePositions)
const isRacing = computed(() => store.getters.isRacing)
const isPaused = computed(() => store.getters.isPaused)
const roundDistances = computed(() => store.getters.roundDistances)

const showRoundTransition = ref(false)

const lanes = computed(() => {
  if (!currentRound.value) {
    return Array(10).fill(null).map((_, i) => ({ id: i + 1, horse: null }))
  }
  
  return currentRound.value.horses.map((horse, index) => ({
    id: index + 1,
    horse
  }))
})

let rafId = null
let startTimestamp = 0
let pauseTimestamp = 0
let activeResult = null
let activeDistance = 0
const horseDurations = new Map()
const BASE_ANIMATION_MS = 8000

watch([isRacing, currentRound], ([racing, round]) => {
  if (!racing) {
    stopAnimation()
    return
  }

  if (round && !isPaused.value) {
    startRoundAnimation()
  }
}, { immediate: true })

watch(isPaused, (paused) => {
  if (!activeResult) {
    return
  }

  if (paused) {
    pauseTimestamp = performance.now()
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    return
  }

  if (pauseTimestamp) {
    startTimestamp += performance.now() - pauseTimestamp
    pauseTimestamp = 0
  }

  if (!rafId) {
    rafId = requestAnimationFrame(stepAnimation)
  }
})

function startRoundAnimation() {
  stopAnimation()
  store.commit('SET_PAUSE_STATUS', true)

  const round = currentRound.value
  if (!round) {
    return
  }

  showRoundTransition.value = true

  setTimeout(() => {
    showRoundTransition.value = false
    store.commit('SET_PAUSE_STATUS', false)
    setTimeout(() => {
      activeDistance = roundDistances.value[currentRoundIndex.value]
      activeResult = calculateRaceResult(round.horses, activeDistance)
      buildHorseDurations(activeResult)

      startTimestamp = performance.now()
      pauseTimestamp = 0
      rafId = requestAnimationFrame(stepAnimation)
    }, 300)
  }, 2000)
}

function stepAnimation(timestamp) {
  if (!activeResult) {
    rafId = null
    return
  }

  if (!isRacing.value) {
    finishRound()
    return
  }

  if (isPaused.value) {
    rafId = null
    return
  }

  const elapsed = timestamp - startTimestamp
  let allFinished = true

  activeResult.forEach((horseResult) => {
    const finishTime = horseDurations.get(horseResult.id) || BASE_ANIMATION_MS
    const progress = Math.min(1, elapsed / finishTime)

    if (progress < 1) {
      allFinished = false
    }

    store.commit('UPDATE_HORSE_POSITION', {
      horseId: horseResult.id,
      position: Math.min(100, Math.max(0, progress * 100))
    })
  })

  if (allFinished) {
    finishRound()
    return
  }

  rafId = requestAnimationFrame(stepAnimation)
}

function buildHorseDurations(result) {
  horseDurations.clear()

  result.forEach((horseResult) => {
    horseDurations.set(horseResult.id, horseResult.time)
  })
}

function finishRound() {
  if (!activeResult) {
    stopAnimation()
    return
  }

  activeResult.forEach((horseResult) => {
    store.commit('UPDATE_HORSE_POSITION', {
      horseId: horseResult.id,
      position: 100
    })
  })

  store.commit('SET_PAUSE_STATUS', true)

  store.dispatch('setRaceResult', {
    round: currentRoundIndex.value + 1,
    distance: activeDistance,
    horses: activeResult
  })

  setTimeout(() => {
    store.dispatch('moveToNextRound')
  }, 1000)

  stopAnimation()
}

function stopAnimation() {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  startTimestamp = 0
  pauseTimestamp = 0
  activeResult = null
  activeDistance = 0
  horseDurations.clear()
}

onUnmounted(() => {
  stopAnimation()
})

</script>

<style scoped>
.race-track {
  background: #ffffff;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  position: relative;
}

.track-container {
  flex: 1;
  display: flex;
  position: relative;
  margin-bottom: 16px;
  min-height: 0;
  background: #f7fafc;
  border-radius: 6px;
  padding: 12px;
}

.lanes {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.lane {
  display: flex;
  align-items: center;
  height: 48px;
  background: #48bb78;
  position: relative;
  border-radius: 4px;
  border: 1px solid #38a169;
}

.lane-number {
  min-width: 120px;
  max-width: 150px;
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2f855a;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
  border-radius: 4px 0 0 4px;
  padding: 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

.lane-content {
  flex: 1;
  height: 100%;
  position: relative;
  margin-right: 100px;
}

.track-line {
  width: 100%;
  height: 2px;
  background-image: repeating-linear-gradient(
    to right,
    rgba(255, 255, 255, 0.9) 0px,
    rgba(255, 255, 255, 0.9) 25px,
    transparent 25px,
    transparent 50px
  );
  background-size: 50px 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.horse {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border: 3px solid #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

.horse-icon {
  width: 25px;
  height: 25px;
}

.finish-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100px;
  background: rgba(255, 0, 0, 0.20);
  border-left: 3px solid #e53e3e;
  display: flex;
  align-items: center;
  justify-content: center;
}

.finish-line-mark {
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-weight: 700;
  color: #e53e3e;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

.round-info {
  text-align: center;
  padding: 10px;
  background: #edf2f7;
  border-radius: 6px;
  font-weight: 600;
  color: #2d3748;
  font-size: 0.9rem;
  border: 1px solid #e2e8f0;
}

.round-transition-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  border-radius: 8px;
}

.round-transition-content {
  text-align: center;
  color: white;
}

.round-number {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: #21e122;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: pulse 1s ease-in-out infinite;
}

.round-distance {
  font-size: 1.5rem;
  font-weight: 600;
  color: #cbd5e0;
  letter-spacing: 1px;
}

.round-transition-enter-active {
  animation: zoomIn 0.5s ease-out;
}

.round-transition-leave-active {
  animation: zoomOut 0.3s ease-in;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes zoomOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(1.2);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
</style>

