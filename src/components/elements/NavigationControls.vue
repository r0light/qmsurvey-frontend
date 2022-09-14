<script setup lang="ts">
import { computed } from 'vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps<{
    backwardText: string
    forwardText: string
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
      <button class="next" @click="emit('forwardClicked')" v-if="showForward">
        <span>
            {{ forwardText }} <font-awesome-icon icon="fa-solid fa-circle-right" />
        </span>
      </button>
    </div>
</template>

<style>
.navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}

.navigation button {
    font-size: 1.2em;
    width: 8em;
    padding: 0.5em;
}

.previous {
  margin-right: auto;
}

.next {
  margin-left: auto;
}
</style>