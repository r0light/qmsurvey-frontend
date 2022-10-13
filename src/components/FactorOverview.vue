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
<p class="larger">Please answer as many of the listed product factors as you like. Even just a few answers already support our research. Please use your personal experience and think about applications that you have (recently) worked on.
  To finish, click on the Finish button on the bottom right.
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

@media (max-width: 1280px) {
  .factorColumn {
    justify-content: center;
  }
}

</style>