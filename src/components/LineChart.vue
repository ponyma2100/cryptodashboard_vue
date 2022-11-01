<template>
    <div>
        <h1>CHART</h1>
    </div>
</template>

<script setup>
import { Line } from "vue-chartjs";
import { Chart, registerables, Title, Tooltip } from "chart.js";
import getCrypto from '../composables/getCrypto'

Chart.register(...registerables, Tooltip);

const {getHistory, coinHistory} = getCrypto()
getHistory()


console.log("🚀 ~ file: LineChart.vue ~ line 13 ~ coinHistory", coinHistory)

</script>

<style lang="scss" scoped>

</style>