<template>
    <div class="horse-racing-game">
      <header class="game-header">
        <h1>Horse Racing</h1>
        <div class="controls">
          <button 
            @click="handleGenerateProgram" 
            :disabled="!canGenerateSchedule"
            class="btn btn-primary"
          >
            GENERATE PROGRAM
          </button>
          <button 
            @click="handleStartPause" 
            :disabled="!canStartRace && !isRacing"
            class="btn btn-secondary"
          >
            START / PAUSE
          </button>
        </div>
      </header>
  
      <div class="game-content">
        <div class="left-panel">
          <HorseList />
        </div>
        
        <div class="center-panel">
          <RaceTrack />
        </div>
        
        <div class="right-panel">
          <div class="right-columns">
            <div class="program-column">
              <RaceProgram />
            </div>
            <div class="results-column">
              <RaceResults />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import HorseList from '../../components/horseList/index.vue'
  import RaceTrack from '../../components/race/index.vue'
  import RaceProgram from '../../components/raceProgram/index.vue'
  import RaceResults from '../../components/raceResults/index.vue'
  
  const store = useStore()
  
  const canGenerateSchedule = computed(() => store.getters.canGenerateSchedule)
  const canStartRace = computed(() => store.getters.canStartRace)
  const isRacing = computed(() => store.getters.isRacing)
  const isPaused = computed(() => store.getters.isPaused)
  
  onMounted(() => {
    if (store.getters.horses.length === 0) {
      store.dispatch('generateHorses')
    }
  })
  
  function handleGenerateProgram() {
    try {
      store.dispatch('generateRaceSchedule')
    } catch (error) {
      alert(error.message)
    }
  }
  
  function handleStartPause() {
    if (!isRacing.value) {
      try {
        store.dispatch('startRace')
      } catch (error) {
        alert(error.message)
      }
    } else {
      store.dispatch('pauseRace')
    }
  }
  </script>
  
  <style scoped>
  .horse-racing-game {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    background: #f7fafc;
    padding: 20px;
    overflow: hidden;
  }
  
  .game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    padding: 18px 24px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
    border: 1px solid #e2e8f0;
  }
  
  .game-header h1 {
    margin: 0;
    font-size: 1.5rem;
    color: #2d3748;
    font-weight: 600;
  }
  
  .controls {
    display: flex;
    gap: 10px;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  .btn:active {
    transform: scale(0.98);
  }
  
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  .btn-primary {
    background: #4299e1;
    color: white;
  }
  
  .btn-primary:hover:not(:disabled) {
    background: #3182ce;
    box-shadow: 0 2px 4px rgba(66, 153, 225, 0.3);
  }
  
  .btn-secondary {
    background: #48bb78;
    color: white;
  }
  
  .btn-secondary:hover:not(:disabled) {
    background: #38a169;
    box-shadow: 0 2px 4px rgba(72, 187, 120, 0.3);
  }
  
  .game-content {
    display: grid;
    grid-template-columns: 300px 1fr 620px;
    gap: 20px;
    flex: 1;
    min-height: 0;
    overflow: hidden;
    position: relative;
  }
  
  .left-panel {
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
  }
  
  .center-panel {
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
  }
  
  .right-panel {
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
  }
  
  .right-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    height: 100%;
    min-height: 0;
  }
  
  .program-column,
  .results-column {
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
  }
  
  @media (max-width: 1600px) {
    .game-content {
      grid-template-columns: 280px 1fr 580px;
    }
  }
  
  @media (max-width: 1400px) {
    .game-content {
      grid-template-columns: 260px 1fr 540px;
    }
  }
  
  @media (max-width: 1200px) {
    .game-content {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto;
      height: auto;
    }
    
    .right-columns {
      grid-template-columns: 1fr;
    }
    
    .left-panel,
    .center-panel,
    .right-panel {
      height: 500px;
    }
  }
  </style>
  
  