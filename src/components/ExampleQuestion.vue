<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import QualityAspectsQuestion from "./QualityAspectsQuestion.vue";
import { getEmptyImpacts } from "../aspectRating";

export type ExampleState = "" | "productFactor" | "qualityAspects" | "done";

const exampleFactor = {
  name: "Using Easter Eggs in API Responses",
  description:
    "Easter Eggs (small, hidden, humorous features in software that are intended to amuse users who discover them) are hidden in API responses returned from endpoints of a service for special inputs so that others who develop a service with a link to the respective endpoint can find them.",
  key: "exampleKey",
  impacts: getEmptyImpacts(),
  answered: false
};

const emit = defineEmits<{
  (e: "triedExample"): void;
}>();

function propagateTriedExample() {
  emit("triedExample");
}

const showHintTeleporters = ref<boolean>(false);
const firstTarget = ref<string>("");
const secondTarget = ref<string>("");
const thirdTarget = ref<string>("");
const showFirstHint = ref<boolean>(false);
const firstHintTextSwitch = ref<boolean>(false);
const showSecondHint = ref<boolean>(false);
const secondHintTextSwitch = ref<boolean>(false);
const showThirdHint = ref<boolean>(false);
const thirdHintTextSwitch = ref<boolean>(false);

setTimeout(() => {
  showHintTeleporters.value = true;
  firstTarget.value = "#factorHintAnchor";
  secondTarget.value = "#qaHintAnchor";
  thirdTarget.value = "#interoperability";
}, 100);

setTimeout(() => {
  toggleFirstHint();
}, 500);

setTimeout(() => {
  toggleSecondHint();
}, 2000);

setTimeout(() => {
  toggleThirdHint();
}, 3500);

function toggleFirstHint() {
  toggleHintAndTextDelayed(showFirstHint, firstHintTextSwitch);
}

function toggleSecondHint() {
  toggleHintAndTextDelayed(showSecondHint, secondHintTextSwitch);
}

function toggleThirdHint() {
  toggleHintAndTextDelayed(showThirdHint, thirdHintTextSwitch);
}

function toggleHintAndTextDelayed(showHint: Ref<boolean>, showText: Ref<boolean>) {
  if (showHint.value) {
    showHint.value = false;
    setTimeout(() => {
      if (!showHint.value) { // because of the animation delay, only set to false if still false
        showText.value = false
      }
    }, 1000);
  } else {
    showHint.value = true;
    showText.value = true;
  }
}

function openOrNot(hintNumber: number): string {
  switch (hintNumber) {
    case 1:
      if (showFirstHint.value) {
        return "open";
      } else {
        return "closed";
      }
    case 2:
      if (showSecondHint.value) {
        return "open";
      } else {
        return "closed";
      }
    case 3:
      if (showThirdHint.value) {
        return "open";
      } else {
        return "closed";
      }
    default:
      return "closed";
  }
}

</script>

<template>
  <div class="exampleWrapper">
    <QualityAspectsQuestion v-bind:factor="exampleFactor" v-bind:isExample="true"
      @triedExample="propagateTriedExample" />
  </div>
  <Teleport :to="firstTarget" v-if="showHintTeleporters">
    <Transition name="fade" mode="out-in">
      <div class="hint firstHint" :class="openOrNot(1)" @click="toggleFirstHint()">
        <span v-show="!firstHintTextSwitch" class="closedText" :class="openOrNot(1)">
          1.
        </span>
        <span v-show="firstHintTextSwitch" class="openText" :class="openOrNot(1)">
          1. This is the product factor. It describes a measurable property of a system.
        </span>
        <button v-show="showFirstHint">
          <font-awesome-icon icon="fa-solid fa-circle-xmark" />
        </button>
      </div>
    </Transition>
  </Teleport>
  <Teleport :to="secondTarget" v-if="showHintTeleporters">
    <Transition name="fade" mode="out-in">
      <div class="hint secondHint" :class="openOrNot(2)" @click="toggleSecondHint()">
        <span v-show="!secondHintTextSwitch" class="closedText" :class="openOrNot(2)">
          2.
        </span>
        <span v-show="secondHintTextSwitch" class="openText" :class="openOrNot(2)">
          2. These are the quality aspects ordered by their top-level quality aspects. Think about which quality aspect the product factor above impacts. 
        </span>
        <button v-show="showSecondHint" class="modal-default-button close-button">
          <font-awesome-icon icon="fa-solid fa-circle-xmark" />
        </button>
      </div>
    </Transition>
  </Teleport>
  <Teleport :to="thirdTarget" v-if="showHintTeleporters">
    <Transition name="fade" mode="out-in">
      <div class="hint thirdHint" :class="openOrNot(3)" @click="toggleThirdHint()" v-on:click.stop>
        <span v-show="!thirdHintTextSwitch" class="closedText" :class="openOrNot(3)">
          3.
        </span>
        <span v-show="thirdHintTextSwitch" class="openText" :class="openOrNot(3)">
          3. Click on a quality aspect to rate how it is impacted if a system features this product factor.
        </span>
        <button v-show="showThirdHint" class="modal-default-button close-button">
          <font-awesome-icon icon="fa-solid fa-circle-xmark" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.exampleWrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 5px 0 5px 0;
  /*border-top: 2px solid var(--vt-c-indigo);*/
}

.exampleText {
  align-self: flex-start;
  font-size: 1.1em;
}

.hint {
  position: relative;
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  padding: 10px;
  z-index: 10;
  background-color: #cde5d3;
  border: 1px solid #000;
  color: #000;
  font-family: inherit;
}

.hint.open {
  border-radius: 5px;
  opacity: 0.95;
  width: 75%;
  height: 100%;
  overflow: hidden;
  font-size: 1.3em;
  transition: width 1s, height 1s, font-size 1s;
}

.hint button {
  display: flex;
  padding: 5px;
  font-size: 1.2em;
  font-weight: 900;
  border-style: none;
  border-radius: inherit;
  background-color: inherit;
  color: #6d7e67;
}

.hint button:hover {
  /*color: var(--vt-c-indigo);*/
  color: #556250;
}

.closedText {
  transition: opacity 1s;
}

.openText {
  transition: opacity 1s;
}

.closedText.closed {
  opacity: 1;
}

.closedText.open {
  opacity: 0;
}

.openText.closed {
  opacity: 0;
}

.openText.open {
  opacity: 1;
}

.firstHint {
  left: 5px;
  top: 5px;
  max-height: 100px;
}

.secondHint {
  left: -15px;
  top: -10px;
  max-height: 90px;
}

.thirdHint {
  position: absolute;
  top: 35px;
  right: 30px;
  max-width: 400px;
  max-height: 100px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.thirdHint.open {
  width: 500px;
  height: fit-content;
  font-size: 1.24em;
}

.hint.closed {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.7em;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: width 1s, height 1s, font-size 1s, border-radius 2.5s;
}

.hint.closed:hover {
  background-color: #abd4b5;
  cursor: pointer;
}


.hintDescription {
  width: 22px;
  height: 22px;
  border: 1px #000 solid;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #75b3f0;
  z-index: 30;
}

@media (max-width: 1069px) {

  .hint.open {
    width: 90%;
    max-height: 100%;
  }

  .thirdHint.open {
    right: 0px;
    left: 20px;
    width: 300px;
    height: fit-content;
    max-height: fit-content;
  }
}

.fade-leave-active {
  transition: opacity 1.5s ease;
}

.fade-enter-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
