<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  value: number
  max: number
  quarter: number
}>();

const range = computed(() => {
  switch (props.quarter) {
    case 0:
      return "firstRange";
    case 1:
      return "secondRange";
    case 2:
      return "thirdRange";
    case 3:
      return "fourthRange";
    case 4:
      return "doneRange";
  }
});
</script>

<template>
  <progress :class="range" v-bind:value="value" v-bind:max="max"></progress>
</template>

<style>
progress {
  width: 100%;
  height: 15px;
  border-radius: 7px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}

progress::-webkit-progress-bar {
  background-color: #e6e6e6;
  border-radius: 7px;
}

progress::-webkit-progress-value,
progress::-moz-progress-bar {
  box-shadow: 1px 1px 5px 3px rgba(0, 0, 0, 0.2);
}

.firstRange::-webkit-progress-value {
  /*background-color: var(--vt-c-steelblue-5);*/
  border-radius: 7px;
  background-color: rgba(255, 186, 51, 0.7);
}

.firstRange::-moz-progress-bar {
  /*background-color: var(--vt-c-steelblue-5);*/
  border-radius: 7px;
  background-color: rgba(255, 186, 51, 0.7);
}

.secondRange::-webkit-progress-value {
  border-radius: 7px;
  background-color: rgba(255, 237, 51, 0.72);
}

.secondRange::-moz-progress-bar {
  border-radius: 7px;
  background-color: rgba(255, 237, 51, 0.72);
}

.thirdRange::-webkit-progress-value {
  border-radius: 7px;
  background-color: rgba(222, 255, 51, 0.73);
}

.thirdRange::-moz-progress-bar {
  border-radius: 7px;
  background-color: rgba(222, 255, 51, 0.73);
}

.fourthRange::-webkit-progress-value {
  border-radius: 7px;
  background-color: rgba(171, 255, 51, 0.74);
}

.fourthRange::-moz-progress-bar {
  border-radius: 7px;
  background-color: rgba(171, 255, 51, 0.74);
}

.doneRange::-webkit-progress-value {
  border-radius: 7px;
  background-color: rgba(120, 255, 51, 0.75);
}

.doneRange::-moz-progress-bar {
  border-radius: 7px;
  background-color: rgba(120, 255, 51, 0.75);
}
</style>
