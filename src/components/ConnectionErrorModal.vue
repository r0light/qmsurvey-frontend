<script setup lang="ts">
import Modal from "./Modal.vue";

const props = defineProps<{
  show: boolean
  confirmText: string
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "confirmed"): void;
}>();
</script>

<template>
  <Teleport to="body">
    <Modal :show="show" @close="emit('close')">
      <template #body>
        <div class="errorHint" >
          <h3>Connection Error</h3>
          <p>Is your network connection working? Please check and try again</p>
          <button class="hintButton" @click="emit('confirmed')">
            {{ confirmText }}
          </button>
        </div>
      </template>
    </Modal>
  </Teleport>
</template>

<style>
.errorHint {
  font-size: 1.2em;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
}

.errorHint h3 {
  font-size: 1.3em;
}

.hintButton {
  font-size: 1em;
  width: fit-content;
  padding: 0.5em;
  align-self: flex-end;
}
</style>
