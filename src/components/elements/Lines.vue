<script setup lang="ts">

const props = defineProps<{
  lastOne: boolean
}>();
</script>

<template>
  <div class="lines">
    <div class="upper-line"></div>
    <div class="lower-line" v-bind:class="{ hidden: lastOne }"></div>
  </div>
</template>

<style>
@import "../../assets/base.css";

.lines {
  display: flex;
  flex-direction: column;
  margin-left: 1em;
}

.lines .upper-line {
  border-style: none none solid solid;
  border-left-color: var(--vt-c-indigo);
  width: 1em;
  flex: 1;
}

.lines .lower-line {
  border-style: none none none solid;
  border-left-color: var(--vt-c-indigo);
  flex: 1;
}

.lines .lower-line.hidden {
  border-style: none;
}
</style>
