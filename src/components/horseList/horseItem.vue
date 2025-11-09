<template>
    <tr>
      <td>{{ horse.name }}</td>
      <td>{{ horse.condition }}</td>
      <td>
          <span 
          class="color-indicator" 
          :style="{ backgroundColor: getColorCode(horse.color) }"
          ></span>
          {{ horse.color }}
      </td>
    </tr>
</template>

<script>
import { defineComponent } from "vue"
import { getColorCode } from "../../utils/colors"

export default defineComponent({
  name: "HorseItem",
  props: {
    horse: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getColorCode
  }
})
</script>


<style scoped>
td {
  padding: 10px 12px;
  border-bottom: 1px solid #e2e8f0;
  color: #2d3748;
}

tbody tr:hover {
  background: #f7fafc;
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

