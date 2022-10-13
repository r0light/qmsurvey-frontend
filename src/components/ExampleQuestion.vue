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

setTimeout(() => {
  state.value = "productFactor";
  showFactorOverlay.value = true;
}, 500)

setTimeout(() => {
  showFactorOverlay.value = false;
}, 5000)

setTimeout(() => {
  state.value = "qualityAspects";
  showQaOverlay.value = true;
}, 7000)


setTimeout(() => {
  state.value = "done"
  showQaOverlay.value = false;
}, 12000)

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
    <QualityAspectsQuestion v-bind:factor="exampleFactor" v-bind:isExample="true" v-bind:exampleState="state"/>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <div class="exampleOverlay factorOverlay" v-if="showFactorOverlay">
        <p class="factorExplanation">This is a product factor. It describes a characteristic of a system and the extent
          to
          which it is present can be measured.</p>
      </div>
    </Transition>
  </Teleport>
  <Teleport to="body">
    <Transition name="fade">
      <div class="exampleOverlay qaOverlay" v-if="showQaOverlay">
        <p class="qaExplanation">These are the quality aspects. You can click on one of them to rate how the presence of the product factor impacts it.</p>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.exampleWrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px 0 10px 0;
  border-top: 2px solid var(--vt-c-indigo);
  border-bottom: 2px solid var(--vt-c-indigo);
}

.fade-leave-active {
  transition: opacity 2s ease;
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
  z-index: 10;
}

.qaOverlay {
  z-index: 20;
}

.factorExplanation {
  color: #fff;
  font-size: 1.8em;
  font-weight: 600;
  position: relative;
  top: 250px;
  max-width: 1080px;
  margin: auto;
  text-align: center;
}

.qaExplanation {
  color: #fff;
  font-size: 1.8em;
  font-weight: 600;
  position: relative;
  top: 170px;
  max-width: 1080px;
  margin: auto;
  text-align: center;
}

@media (max-width: 900px) {
  .factorExplanation {
    top: calc(800px + (100vw * -0.6))
  }
}
</style>
