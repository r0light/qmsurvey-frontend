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

const showFactorOverlay = ref<boolean>(false);
const showQaOverlay = ref<boolean>(false);

// remember all animation so that they can be skipped
const animations: number[] = [];
animations.push(
  setTimeout(() => {
    state.value = "productFactor";
    showFactorOverlay.value = true;
  }, 500)
)

animations.push(
  setTimeout(() => {
    showFactorOverlay.value = false;
  }, 8000)
)

animations.push(
  setTimeout(() => {
    state.value = "qualityAspects";
    showQaOverlay.value = true;
  }, 9000)
)

animations.push(
  setTimeout(() => {
    state.value = "done"
    showQaOverlay.value = false;
  }, 15000)
)

function skipExplanations() {
  animations.forEach(timeoutId => {
    clearTimeout(timeoutId);
  })
  showFactorOverlay.value = false;
  showQaOverlay.value = false;
  state.value = "done";
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
  <p class="exampleText">Try out the <span class="bold">example</span> below and start once you feel ready:</p>
  <div class="exampleWrapper">
    <QualityAspectsQuestion v-bind:factor="exampleFactor" v-bind:isExample="true" v-bind:exampleState="state" />
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <div class="exampleOverlay factorOverlay" v-if="showFactorOverlay">
        <p class="factorExplanation">This is a product factor. <br>It describes a property of a system. <br>The extent
          to which a product factor is present can be measured.</p>
      </div>
    </Transition>
  </Teleport>
  <Teleport to="body">
    <Transition name="fade">
      <div class="exampleOverlay qaOverlay" v-if="showQaOverlay">
        <p class="qaExplanation">These are the quality aspects. You can click on one of them to rate how a product factor impacts it, if it is present.</p>
      </div>
    </Transition>
  </Teleport>
  <Teleport to="body">
      <div v-if="showFactorOverlay || showQaOverlay">
        <button class="skipButton" @click="skipExplanations()">
          <font-awesome-icon icon="fa-solid fa-circle-xmark"/> Skip
        </button>
      </div>
  </Teleport>
</template>

<style>
.exampleWrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px 0 10px 0;
  border-top: 2px solid var(--vt-c-indigo);
}

.exampleText {
  align-self: flex-start;
  font-size: 1.1em;
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

.exampleOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
}

.factorOverlay {
  z-index: 15;
}

.qaOverlay {
  z-index: 25;
}

.skipButton {
  z-index: 40;
  position: fixed;
  top: 30px;
  right: 50px;
  background-color: initial;
  color: #fff;
  border: none;
  font-size: 1.5em;
}

.skipButton:hover {
  color: var(--vt-c-steelblue-2);
}

.factorExplanation {
  color: #fff;
  font-size: 2em;
  font-weight: 600;
  position: relative;
  top: 300px;
  max-width: 1080px;
  margin: auto;
  text-align: center;
}

.qaExplanation {
  color: #fff;
  font-size: 2em;
  font-weight: 600;
  position: relative;
  top: 130px;
  max-width: 1080px;
  margin: auto;
  text-align: center;
}

@media (max-width: 900px) {
  .factorExplanation {
    top: calc(870px + (100vw * -0.6))
  }
}
</style>
