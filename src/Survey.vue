<script setup lang="ts">
import { ref } from "vue";
import Welcome from "./components/Welcome.vue";
import ExampleQuestion from "./components/ExampleQuestion.vue";
import FactorOverview from "./components/FactorOverview.vue";
import QualityAspectsQuestion from "./components/QualityAspectsQuestion.vue";
import Demographics from "./components/Demographics.vue";
import Feedback from "./components/Feedback.vue";
import Modal from "./components/Modal.vue";
import ConnectionErrorModal from "./components/ConnectionErrorModal.vue";
import Mask from "./components/elements/Mask.vue";
import {
  checkIfExampleTriedLocally,
  saveExampleTriedLocally,
  loadLocallyStoredFactors,
  saveAllFactorsLocally,
  loadLocallyStoredDemographics,
  saveDemographicsLocally,
  submitDemographics,
  submitFactors,
  clearStoredSurveyData,
  saveFactorLocally,
  loadFactorLocally,
} from "./surveyHandling";
import { getEmptyImpacts } from "./aspectRating";
import type { Factor } from "./factors";
import { getRandomly } from "./factors";
import type { DemographicValues } from "./demographics";
import NavigationControls from "./components/elements/NavigationControls.vue";
import ProgressOverview from "./components/elements/ProgressOverview.vue"

export type SurveyState = "welcome" | "example" | "overview" | "question" | "demographics" | "done";

const props = defineProps<{
  isPilot: boolean;
  startTime: number;
}>();

// prepare factors: load if factors are already stored locally, otherwise initialize
let loadedFactors: Factor[] = loadLocallyStoredFactors();
if (loadedFactors.length == 0) {
  let newFactors = getRandomly(20, true); // maximum is currently 45
  for (const factor of newFactors) {
    if (factor.key) {
      loadedFactors.push({
        name: factor.name,
        description: factor.description,
        key: factor.key,
        impacts: getEmptyImpacts(),
        answered: false
      })
    }
  }
  saveAllFactorsLocally(loadedFactors);
}
const factors = loadedFactors;

const demographics = loadLocallyStoredDemographics();
function processDemographics(updatedDemographics: DemographicValues) {
  demographics.jobArea = updatedDemographics.jobArea;
  demographics.jobTitle = updatedDemographics.jobTitle;
  demographics.companySector = updatedDemographics.companySector;
  demographics.generalExperience = updatedDemographics.generalExperience;
  demographics.cloudExperience = updatedDemographics.cloudExperience;
  saveDemographicsLocally(demographics);
}

// initialize first factor
const currentFactor = ref(factors[0]);

// booleans to handle example hint
const showModal = ref(false);
const showCongratModal = ref(false);
let didExample = checkIfExampleTriedLocally();
let gotExampleHint = false;
let gotCongratulation = false;

function recognizeTriedExample() {
  didExample = true;
  saveExampleTriedLocally();
  if (gotExampleHint && !gotCongratulation) {
    showCongratModal.value = true;
    gotCongratulation = true;
  }
}

const loading = ref(false);
const showErrorModal = ref(false);
const showNoFactorsModal = ref(false);
const transitionDirection = ref("fadeToLeft");

function answerQuestion(factorIndex: number) {
  transitionDirection.value = "fadeToLeft";
  currentFactor.value = factors[factorIndex];
  currentState.value = "question";
}



const currentState = ref<SurveyState>("welcome");

function getNextState(currentState: SurveyState): SurveyState {
  switch (currentState) {
    case "welcome": return "example";
    case "example": return "overview";
    case "overview": return "demographics";
    case "question": return "overview";
    case "demographics": return "done";
    default: return "welcome";
  }
}

function next() {
  // check if the example has been tried, otherwise show a hint, but only once
  if (currentState.value === "example" && !didExample && !gotExampleHint) {
    showModal.value = true;
    gotExampleHint = true;
    return;
  }

  // send information for current page
  if (currentState.value === "question") {
    currentFactor.value.answered = true;
    saveFactorLocally(currentFactor.value);
    submitFactors([currentFactor.value]);
    proceed();
  } else if (currentState.value === "demographics") {
    // final submit! Try to submit all factors and then demographics, but block if submit is not possible
    if (factors.filter(factor => factor.answered === true).length <= 0) {
      // do not submit if no factors have been answered
      showNoFactorsModal.value = true;
      return;
    }
    loading.value = true;
    submitFactors(factors)
      .then((submittedFactors) => {
        return submitDemographics(demographics);
      })
      .then((submittedDemographics) => {
        loading.value = false;
        // also clear storage now, because survey is submitted
        clearStoredSurveyData();
        proceed();
      })
      .catch((error) => {
        loading.value = false;
        if (error instanceof Error) {
          showErrorModal.value = true;
        }
      });
  } else {
    proceed();
  }
}

function proceed() {
  transitionDirection.value = "fadeToLeft";
  currentState.value = getNextState(currentState.value);
}

function getPreviousState(currentState: SurveyState): SurveyState {
  switch (currentState) {
    case "welcome": return "welcome";
    case "example": return "welcome";
    case "overview": return "example";
    case "question": return "overview";
    case "demographics": return "overview";
    default: return "welcome";
  }
}

function previous() {
  if (currentState.value === "question") {
    let savedFactor = loadFactorLocally(currentFactor.value.key);
    if (savedFactor !== "not found") {
      // reset to lastly stored impacts
      currentFactor.value.impacts = savedFactor.impacts;
    } else {
      // reset impacts
      currentFactor.value.impacts = getEmptyImpacts();
    }
  }
  transitionDirection.value = "fadeToRight";
  currentState.value = getPreviousState(currentState.value);
}

</script>

<template>
  <header></header>

  <main class="main">
    <ProgressOverview :currentState="currentState"></ProgressOverview>
    <div class="pilotHint" v-if="isPilot">Pilot study</div>
    <Transition :name="transitionDirection" mode="out-in">
      <div v-if="currentState === 'welcome'" key="1" class="page">
        <Welcome />
        <NavigationControls :backwardText="''" :forwardText="'Example'" @forwardClicked="next()" />
      </div>
      <div v-else-if="currentState === 'example'" key="2" class="page">
        <ExampleQuestion @triedExample="recognizeTriedExample" />
        <NavigationControls :backwardText="'Previous'" @backwardClicked="previous()" :forwardText="'Let\'s start!'"
          @forwardClicked="next()" />
      </div>
      <div v-else-if="currentState === 'overview'" key="3" class="page">
        <FactorOverview :factors="factors" @factorSelected="factorIndex => answerQuestion(factorIndex)"></FactorOverview>
        <NavigationControls :backwardText="'Previous'" @backwardClicked="previous()" :forwardText="'Finish'"
          @forwardClicked="next()" />
      </div>
      <div v-else-if="currentState === 'question'" key="4" class="page">
        <QualityAspectsQuestion v-bind:factor="currentFactor" v-bind:isExample="false" />
        <NavigationControls :backwardText="'Cancel'" @backwardClicked="previous()" :forwardText="'Save'"
          @forwardClicked="next()" />
      </div>
      <div v-else-if="currentState === 'demographics'" key="5" class="page">
        <Demographics @updatedDemographics="processDemographics" />
        <NavigationControls :backwardText="'Previous'" @backwardClicked="previous()" :forwardText="'Submit'"
          @forwardClicked="next()" />
      </div>
      <div v-else-if="currentState === 'done'" key="6" class="page">
        <Feedback v-bind:isPilotFeedback="isPilot" v-bind:factorsForFeedback="factors" />
      </div>
    </Transition>
  </main>

  <Teleport to="body">
    <Modal :show="showModal" @close="showModal = false">
      <template #body>
        <div class="exampleHint">
          <h3>Are you sure you want to start?</h3>
          <p>
            You haven't tried the example yet. Please try to click on a quality
            aspect to state an impact.
          </p>
          <button class="okButton" @click="showModal = false">OK</button>
        </div>
      </template>
    </Modal>
  </Teleport>
  <Teleport to="body">
    <Modal :show="showCongratModal" @close="showCongratModal = false">
      <template #body>
        <div class="exampleHint">
          <h3>Great!</h3>
          <p>That's how to do it.</p>
          <button class="okButton" @click="
            {
              showCongratModal = false;
              next();
            }
          ">
            Start now
          </button>
        </div>
      </template>
    </Modal>
  </Teleport>
  <ConnectionErrorModal :show="showErrorModal" :confirmText="'Try again'" @close="showErrorModal = false" @confirmed="
    {
      showErrorModal = false;
      next();
    }
  " />
  <Teleport to="body">
    <Modal :show="showNoFactorsModal" @close="showNoFactorsModal = false">
      <template #body>
        <div class="exampleHint" >
          <h3>No Impact(s) stated</h3>
          <p>You have not rated any impact(s) for any factor. Please do so for at least one factor before submitting.</p>
          <button class="okButton" @click="showNoFactorsModal = false">
            OK
          </button>
        </div>
      </template>
    </Modal>
  </Teleport>
  <Teleport to="body">
    <Mask :show="loading" />
  </Teleport>
</template>

<style>
@import "./assets/base.css";

#app {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-self: stretch;
  align-items: center;
  margin: 0 auto;
  font-weight: normal;
  align-items: center;
  width: 100%;
}

.pilotHint {
  position: absolute;
  z-index: 100;
  top: 18px;
  right: 10px;
  transform: rotate(20deg);
  background-color: #ffb3b3;
  border-radius: 10%;
  border: 1px solid #ff4d4d;
  font-size: 1.2em;
  padding: 0px 5px;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.steelblue {
  text-decoration: none;
  /*color: hsla(160, 100%, 37%, 1);*/
  color: var(--vt-c-steelblue-5);
  transition: 0.4s;
}

input:focus,
button:focus {
  outline: none;
}

.bold {
  font-weight: 700;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1280px;
  width: 100%;
  row-gap: 10px;
  padding: 1rem 0 2rem 0;
}

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 0 1rem 0 1rem;
  row-gap: 1.5em;
  margin-top: 10px;
}

.buttonNameIcon {
  margin-right: 0.5em;
}

.fadeToLeft-enter-active {
  transition: all 0.4s ease;
}

.fadeToLeft-leave-active {
  transition: all 0.4s ease;
}

.fadeToLeft-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.fadeToLeft-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.fadeToRight-enter-active {
  transition: all 0.4s ease;
}

.fadeToRight-leave-active {
  transition: all 0.4s ease;
}

.fadeToRight-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.fadeToRight-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.okButton {
  font-size: 1em;
  width: fit-content;
  padding: 0.5em;
  align-self: flex-end;
}

.exampleHint {
  font-size: 1.2em;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
}

.exampleHint h3 {
  font-size: 1.3em;
}

@media (hover: hover) {
  a:hover {
    /*background-color: hsla(160, 100%, 37%, 0.2);*/
    background-color: var(--vt-c-steelblue-0);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    /*place-items: center;*/
    align-items: flex-start;
    justify-content: center;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
