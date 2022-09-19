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
<p>Please click on as many of the following product factors as you want to rate their impact(s) on quality aspects.
    The product factors are listed alphabetically and you can choose randomly or click on those which interest you. You can finish any time by clicking on the Finish button on the bottom right.
    While answering the questions, please use your personal experience and think about applications that you have (recently) worked on which fit the context of cloud-native in a broader sense.
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