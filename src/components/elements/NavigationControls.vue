<script setup lang="ts">
import { computed } from 'vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps<{
    backwardText: string
    forwardText: string
    nextHint: string
}>()

const showBackward = computed<boolean>(() => (props.backwardText !== ""))
const showForward = computed<boolean>(() => (props.forwardText !== ""))

const emit = defineEmits<{
  (e: 'backwardClicked'): void
  (e: 'forwardClicked'): void
}>()

</script>

<template>
    <div class="navigation">
      <button class="previous" @click="emit('backwardClicked')" v-if="showBackward">
        <span>
          <font-awesome-icon icon="fa-solid fa-circle-left" /> {{ backwardText }}
        </span>
      </button>
      <div class="nextButtonWrapper">
        <span v-if="nextHint !== ''" v-html="nextHint"></span>
      <button class="next" @click="emit('forwardClicked')" v-if="showForward">
        <span>
            {{ forwardText }} <font-awesome-icon icon="fa-solid fa-circle-right" />
        </span>
      </button>
      </div>
    </div>
</template>

<style>
.navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 30px;
    align-items: flex-end;
}

.navigation button {
    font-size: 1.2em;
    width: 8em;
    height: 2.5em;
    padding: 0.5em;
    background-color: #e9e9ed;
    border: 1px solid #b9b9c6;
    border-radius: 5px;
}

.navigation button:hover {
    background-color: #d5d5dd;
}

.previous {
  margin-right: auto;
}

.next {
  margin-left: auto;
}

.nextButtonWrapper {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>