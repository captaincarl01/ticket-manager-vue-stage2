<template>
  <div style="height:220px">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { Chart } from 'chart.js/auto'

const props = defineProps({ tickets: { type: Array, default: () => [] } })
const canvas = ref(null)
let chart = null

function renderChart() {
  const open = props.tickets.filter(t => t.status === 'Open').length
  const closed = props.tickets.filter(t => t.status === 'Closed').length
  const ctx = canvas.value.getContext('2d')
  if (chart) chart.destroy()
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Open', 'Closed'],
      datasets: [{ data: [open, closed], backgroundColor: ['#4f46e5','#94a3b8'] }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: {legend: {position: 'bottom'}} }
  })
}

onMounted(renderChart)
watch(() => props.tickets, renderChart, { deep: true })
onBeforeUnmount(() => { if (chart) chart.destroy() })
</script>
