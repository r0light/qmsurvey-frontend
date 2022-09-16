<script setup lang="ts">
import type { Factor } from "../factors";

const props = defineProps<{
    factor: Factor;
}>();

const emit = defineEmits<{
    (e: "clicked"): void;
}>();

function getStyleForStatus(answered: boolean): "todo" | "done" {
  if (answered) {
    return "done";
  } else {
    return "todo";
  }
}

</script>

<template>
    <button class="factorButton" :class="getStyleForStatus(factor.answered)" @click="emit('clicked')">
        <span class="buttonFactorName">{{ factor.name }}</span>
        <span class="buttonFactorIcon">
            <span class="award" v-if="factor.answered">
                <font-awesome-icon icon="fa-solid fa-award" />
            </span>
            <span v-else-if="!factor.answered">
                <font-awesome-icon icon="fa-solid fa-circle-question" />
            </span>
        </span>
    </button>
</template>

<style>
.factorButton {
  display: flex;
  font-size: 1.1em;
  padding: 0.4em;
  word-wrap: break-word;
  min-width: 150px;
  border-style: solid;
  border-width: 1pt;
  border-radius: 3pt;
  border-color: var(--vt-c-indigo);
}

.todo {
  background-color: var(--color-button);
}

.todo:hover {
  background-color: var(--color-button-hover);
}

.done {
  background-color: #f8c620;
  /* padding-right: 1.6em; */
}

.done:hover {
  background-color: #dfac07;
}

.buttonFactorName {
    width: 90%;
    margin-left: 0;
    text-align: left;
}

.buttonFactorIcon {
    width: 10%;
    margin-right: 0;
}

.award {
  position: absolute;
  top: -7px;
  right: 4px;
  font-size: 1.7em;
}
</style>