<template>
  <div class="race-program">
    <h2>Program</h2>
    <div class="program-container">
      <div 
        v-for="(round, index) in raceSchedule" 
        :key="index"
        class="round-section"
      >
        <h3>{{ getRoundNumber(index + 1) }} Lap - {{ round.distance }}m</h3>
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(horse, horseIndex) in round.horses" :key="horse.id">
              <td>{{ horseIndex + 1 }}</td>
              <td>{{ horse.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { getRoundNumber } from '../../utils'

const store = useStore()
const raceSchedule = computed(() => store.getters.raceSchedule)
</script>

<style scoped>
.race-program {
  background: #ffffff;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.race-program h2 {
  margin: 0 0 16px 0;
  font-size: 1rem;
  color: #2b6cb0;
  font-weight: 600;
  padding: 10px 14px;
  background: #bee3f8;
  border-radius: 6px;
  border: 1px solid #90cdf4;
}

.program-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;
  -webkit-overflow-scrolling: touch;
}

.round-section {
  margin-bottom: 16px;
  background: #f7fafc;
  border-radius: 6px;
  padding: 12px;
  border: 1px solid #e2e8f0;
}

.round-section h3 {
  margin: 0 0 10px 0;
  font-size: 0.8rem;
  color: #2d3748;
  background: #edf2f7;
  padding: 6px 10px;
  font-weight: 600;
  border-radius: 4px;
}
</style>

