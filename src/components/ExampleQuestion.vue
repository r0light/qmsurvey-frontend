<script setup lang="ts">
import { ref } from "vue";
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

const state = ref<ExampleState>("");

const showHintTeleporters = ref<boolean>(false);
const firstTarget = ref<string>("");
const secondTarget = ref<string>("");
const thirdTarget = ref<string>("");
const showFirstHint = ref<boolean>(false);
const showSecondHint = ref<boolean>(false);
const showThirdHint = ref<boolean>(false);


setTimeout(() => {
  showHintTeleporters.value = true;
  firstTarget.value = "#factorHintAnchor";
  secondTarget.value = "#qaHintAnchor";
  thirdTarget.value = "#interoperability";
}, 100);

setTimeout(() => {
  showFirstHint.value = true;
}, 500);

setTimeout(() => {
  showSecondHint.value = true;
}, 1000);

setTimeout(() => {
  showThirdHint.value = true;
}, 1500);

function checkedFirstHint() {
  showFirstHint.value = !showFirstHint.value;
}

function checkedSecondHint() {
  showSecondHint.value = !showSecondHint.value;
}

function checkedThirdHint() {
  showThirdHint.value = !showThirdHint.value;
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
  <!--
  <p>
    The following <span class="bold">exemplary question</span> explains the
    concept:
    The <em>product factor</em> ({{ exampleFactor.name }}) is described at
    the top and you can click on any of the quality aspects (Confidentiality, Reusability, ...) below it to rate how it impacts that quality aspect if it is present in a system.
    The quality aspects mostly stem from the <a href="https://iso25000.com/index.php/en/iso-25000-standards/iso-25010">ISO25010 standard for software product quality</a> and for each a short explanation is provided by hovering over the question mark. 
    If you are ready, you can start on the next page where the actual product factors are listed.
  </p>
  -->
  <div class="exampleWrapper">
    <QualityAspectsQuestion v-bind:factor="exampleFactor" v-bind:isExample="true" v-bind:exampleState="state" />
  </div>
  <Teleport :to="firstTarget" v-if="showHintTeleporters">
    <Transition name="fade" mode="out-in">
      <div class="hint firstHint" :class="openOrNot(1)" @click="checkedFirstHint()">
        <div>
          1.
        </div>
        <div v-if="showFirstHint">This is the product factor. It describes a property of a system. The extent to which a
          product factor is present can be measured.</div>
        <button v-if="showFirstHint" class="modal-default-button close-button">
          <font-awesome-icon icon="fa-solid fa-circle-xmark" />
        </button>
      </div>
    </Transition>
  </Teleport>
  <Teleport :to="secondTarget" v-if="showHintTeleporters">
    <Transition name="fade" mode="out-in">
      <div class="hint secondHint" :class="openOrNot(2)" @click="checkedSecondHint()">
        <div>
          2.
        </div>
        <div v-if="showSecondHint">These are the quality aspects ordered by their top-level quality aspects. After
          reading the product factor think about which quality aspect the product factor impacts. The (?) describes a
          quality aspect.</div>
        <button v-if="showSecondHint" class="modal-default-button close-button">
          <font-awesome-icon icon="fa-solid fa-circle-xmark" />
        </button>
      </div>
    </Transition>
  </Teleport>
  <Teleport :to="thirdTarget" v-if="showHintTeleporters">
    <Transition name="fade" mode="out-in">
      <div class="hint thirdHint" :class="openOrNot(3)" @click="checkedThirdHint()" v-on:click.stop>
        <div>
          3.
        </div>
        <div v-if="showThirdHint">Click on a quality aspect to rate how the product factor impacts the quality aspect,
          if it is present.</div>
        <button v-if="showThirdHint" class="modal-default-button close-button">
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
}

.hint.open {
  background-color: #e9e9ed;
  border: 1px solid #000;
  border-radius: 5px;
  opacity: 0.9;
  width: 75%;
  height: 100%;
  font-size: 1.5em;
  color: #000;
  /*transition: width 1s, height 1s, font-size 1s;*/
}

.hint button {
  display: flex;
  padding: 5px;
  font-size: 1.2em;
  font-weight: 900;
  border-style: none;
  border-radius: inherit;
  background-color: inherit;
  color: #818198;
}

.hint button:hover {
  /*color: var(--vt-c-indigo);*/
  color: #505062;
}

.firstHint {
  left: 5px;
  top: 5px;
}

.secondHint {
  left: -15px;
  top: -10px;
}

.thirdHint {
  position: absolute;
  top: 35px;
  right: 30px;
  max-width: 300px;
}

.thirdHint.open {
  width: 500px;
  height: fit-content;
}

.closed {
  width: 40px;
  height: 40px;
  border: 1px #000 solid;
  border-radius: 50%;
  font-size: 2em;
  font-family: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e8e8e9;
  z-index: 30;
}

.closed:hover {
  background-color: #bebec1;
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

  .thirdHint.open {
      right: 0px;
      left: 20px;
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
