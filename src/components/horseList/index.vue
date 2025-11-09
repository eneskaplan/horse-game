<template>
  <div class="horse-list">
    <h2>Horse List</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Condition</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <HorseItem
            v-for="horse in horses"
            :key="horse.id"
            :horse="horse"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import HorseItem from "./horseItem.vue";

const store = useStore()
const horses = computed(() => store.getters.horses)

</script>

<style scoped>
.horse-list {
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

.horse-list h2 {
  margin: 0 0 16px 0;
  font-size: 1rem;
  color: #2d3748;
  font-weight: 600;
}

.table-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;
  -webkit-overflow-scrolling: touch;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

thead {
  background: #edf2f7;
  position: sticky;
  top: 0;
  z-index: 10;
}

th {
  padding: 10px 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #cbd5e0;
  color: #4a5568;
  font-size: 0.8rem;
}


.color-indicator {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 6px;
  vertical-align: middle;
  border: 1px solid #cbd5e0;
}
</style>

