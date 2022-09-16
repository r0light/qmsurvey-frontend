<script setup lang="ts">
import type { Factor } from "../factors";
import FactorButton from "./FactorButton.vue";

const props = defineProps<{
    factors: Factor[];
}>();

const numberOfFactors = props.factors.length;
const columnLength = Math.ceil(numberOfFactors / 4);

const emit = defineEmits<{
    (e: "factorSelected", factorIndex: number): void;
}>();
</script>

<template>
<p>Please click on as many of the following product factors as you want to rate their impact(s) on quality aspects.
    The product factors are simply listed alphabetically and you can just choose randomly or click on those
    which interest you. When the time is up you will be informed, but you can also finish earlier by clicking on the
    Finish button on the bottom right.<br>
    While answering the questions, please use your personal experience and think about applications that you have
    (recently) worked on which fit the context of cloud-native in a broader sense.
</p>
<div class="factorOverview">
    <div class="factorColumn notLast">
        <FactorButton  v-for="(factor, factorIndex) of factors.slice(0, columnLength)" :key="factorIndex" :factor="factor" @click="emit('factorSelected', factorIndex)"></FactorButton>
    </div>

    <div class="factorColumn notLast">
        <FactorButton  v-for="(factor, factorIndex) of factors.slice(columnLength, columnLength * 2)" :key="factorIndex" :factor="factor" @click="emit('factorSelected', factorIndex + columnLength)"></FactorButton>
    </div>

    <div class="factorColumn notLast">
        <FactorButton  v-for="(factor, factorIndex) of factors.slice(columnLength * 2, columnLength * 3)" :key="factorIndex" :factor="factor" @click="emit('factorSelected', factorIndex + columnLength * 2)"></FactorButton>
    </div>

    <div class="factorColumn">
        <FactorButton  v-for="(factor, factorIndex) of factors.slice(columnLength * 3, numberOfFactors)" :key="factorIndex" :factor="factor" @click="emit('factorSelected', factorIndex + columnLength * 3)"></FactorButton>
    </div>
</div>
</template>

<style>

.factorOverview {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  /*row-gap: 0.9em;
  column-gap: 1em; */
}

.factorColumn {
  display: flex;
  flex-direction: column;
  
  width: 25%;
  min-width: 300px;
  row-gap: 0.9em;
  padding: 0.5em;
}

.notLast {
    justify-content: space-between;
}

@media (max-width: 1280px) {
  .factorColumn {
    justify-content: space-between;
  }
}

</style>