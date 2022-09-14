<script setup lang="ts">
const props = defineProps<{
  show: boolean
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper" @click.stop="emit('close')">
        <div class="modal-container" @click.stop="">
          <div class="modal-header">
            <button
              class="modal-default-button close-button"
              @click="$emit('close')"
            >
              <font-awesome-icon icon="fa-solid fa-circle-xmark" />
            </button>
          </div>

          <div class="modal-body">
            <slot name="body">default body</slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  padding: 5px;
}

.modal-container {
  max-width: 400px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 5px 0;
}

.modal-default-button {
  float: right;
}

.close-button {
  font-size: 1.2em;
  font-weight: 900;
  border-style: none;
  background-color: inherit;
  color: #818198;
}

.close-button:hover {
  /*color: var(--vt-c-indigo);*/
  color: #505062;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
