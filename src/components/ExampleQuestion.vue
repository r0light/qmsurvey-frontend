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
  firstTarget.value = "#factorTitleBox";
  secondTarget.value = "#qaDiagramBox";
  thirdTarget.value = "#interoperability";
}, 100);

setTimeout(() => {
  showFirstHint.value = true;
}, 500);

function checkedFirstHint() {
  showSecondHint.value = true;
}

function checkedSecondHint() {
  showThirdHint.value = true;
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
    <div class="firstHint" v-if="showFirstHint"  @mouseleave="checkedFirstHint()" @click="checkedFirstHint()">
      <div class="hintCircle" data-tooltip-hint="This is the product factor. It describes a property of a system. The extent to which a product factor is present can be measured.">
        1
      </div>
    </div>
    </Transition>
  </Teleport>
  <Teleport :to="secondTarget" v-if="showHintTeleporters">
    <Transition name="fade" mode="out-in">
    <div class="secondHint" v-if="showSecondHint" @mouseleave="checkedSecondHint()" @click="checkedSecondHint()">
      <div class="hintCircle" data-tooltip-hint="These are the quality aspects ordered by their top-level quality aspects. After reading the product factor think about which quality aspect the product factor impacts. The (?) describes a quality aspect.">
        2
      </div>
    </div>
    </Transition>
  </Teleport>
  <Teleport :to="thirdTarget" v-if="showHintTeleporters">
    <Transition name="fade" mode="out-in">
    <div class="thirdHint" v-if="showThirdHint">
      <div class="hintCircle" data-tooltip-hint-2="Click on a quality aspect to rate how the product factor impacts the quality aspect, if it is present.">
        3
      </div>
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

.firstHint {
  position: absolute;
  left: 50px;
  top: 5px;
}

.secondHint {
  position: absolute;
  left: -15px;
  top: -10px;
}

.thirdHint {
  position: absolute;
  top: 35px;
}

.hintCircle {
  width: 40px;
  height: 40px;
  border: 1px #000 solid;
  border-radius: 50%;
  font-size: 2em;
  font-family: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #75b3f0;
  z-index: 30;
}

.hintCircle:hover {
  background-color: #4799eb;
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


[data-tooltip-hint] {
  position: relative;
}

[data-tooltip-hint]::after {
  content: attr(data-tooltip-hint);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s;
  display: block;
  position: absolute;
  bottom: -5em;
  left: 1em;
  width: 23em;
  padding: 0.5em;
  margin-top: 0;
  z-index: 100;
  color: #000;
  background-color: #75b3f0;  
  border: solid 1px var(--vt-c-indigo);
  border-radius: 0.5em;
  font-size: 18pt;
}

[data-tooltip-hint]:hover::after, [data-tooltip-hint]:active::after {
  opacity: 1;
}

[data-tooltip-hint-2] {
  position: relative;
}

[data-tooltip-hint-2]::after {
  content: attr(data-tooltip-hint-2);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s;
  display: block;
  position: absolute;
  bottom: -3.5em;
  right: -4em;
  width: 21em;
  padding: 0.5em;
  margin-top: 0;
  z-index: 100;
  color: #000;
  background-color: #75b3f0;  
  border: solid 1px var(--vt-c-indigo);
  border-radius: 0.5em;
  font-size: 18pt;
}

@media (max-width: 1047px) {

  [data-tooltip-hint-2]::after {
    left: 0em;
  }
}

[data-tooltip-hint-2]:hover::after {
  opacity: 1;
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
