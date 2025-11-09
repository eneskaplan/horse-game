<template>
  <div class="race-results">
    <h2>Results</h2>
    <div class="results-container">
      <div 
        v-for="result in raceResults" 
        :key="result.round"
        class="round-section"
      >
        <h3>{{ getRoundNumber(result.round) }} Lap - {{ result.distance }}m</h3>
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="horse in result.horses" 
              :key="horse.id"
              :class="{ 'winner': horse.position === 1 }"
            >
              <td>{{ horse.position }}</td>
              <td>{{ horse.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="raceResults.length === 0" class="no-results">
        No results yet. Start the race to see results.
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { getRoundNumber } from '../../utils'

const store = useStore()
const raceResults = computed(() => store.getters.raceResults)
</script>

<style scoped>
.race-results {
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

.race-results h2 {
  margin: 0 0 16px 0;
  font-size: 1rem;
  color: #2f855a;
  font-weight: 600;
  padding: 10px 14px;
  background: #c6f6d5;
  border-radius: 6px;
  border: 1px solid #9ae6b4;
}

.results-container {
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 0;
  font-size: 0.8rem;
}

thead {
  background: #48bb78;
  color: white;
}

th {
  padding: 8px 10px;
  text-align: left;
  font-weight: 600;
  font-size: 0.75rem;
}

td {
  padding: 8px 10px;
  border-bottom: 1px solid #e2e8f0;
  color: #2d3748;
}

tbody tr:hover {
  background: #edf2f7;
}

tbody tr.winner {
  background: #fefcbf;
  font-weight: 600;
  color: #744210;
}

.no-results {
  text-align: center;
  padding: 30px 20px;
  color: #a0aec0;
  font-style: italic;
  font-size: 0.8rem;
  background: #f7fafc;
  border-radius: 6px;
  border: 1px dashed #cbd5e0;
}
</style>

