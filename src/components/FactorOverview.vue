<script setup lang="ts">
import type { Factor } from "../factors";
import FactorButton from "./FactorButton.vue";

const props = defineProps<{
    factors: Factor[];
}>();

const emit = defineEmits<{
    (e: "factorSelected", factorIndex: number): void;
}>();
</script>

<template>
  <p class="larger">
    From the list below, now <span class="bold">please rate</span> the <span class="bold">product factors that you feel familiar with</span>. You can rate as many as you want.
  </p>
<div class="factorOverview">
    <div class="factorColumn">
        <FactorButton  v-for="(factor, factorIndex) of factors" :key="factorIndex" :factor="factor" @click="emit('factorSelected', factorIndex)"></FactorButton>
    </div>
</div>
</template>

<style>

.factorOverview {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px 0 50px 0;
}

.factorColumn {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  width: 100%;
  min-width: 300px;
  row-gap: 0.9em;
  column-gap: 0.9em;
  padding: 0.5em;
}


</style>