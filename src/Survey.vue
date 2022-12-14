<script setup lang="ts">
import { ref } from "vue";
import Welcome from "./components/Welcome.vue";
import ExampleQuestion from "./components/ExampleQuestion.vue";
import FactorGroupSelection from "./components/FactorGroupSelection.vue";
import FactorOverview from "./components/FactorOverview.vue";
import QualityAspectsQuestion from "./components/QualityAspectsQuestion.vue";
import Demographics from "./components/Demographics.vue";
import Feedback from "./components/Feedback.vue";
import Modal from "./components/Modal.vue";
import ConnectionErrorModal from "./components/ConnectionErrorModal.vue";
import Mask from "./components/elements/Mask.vue";
import {
  saveLastStateLocally,
  loadLocallyStoredState,
  checkIfExampleTriedLocally,
  saveExampleTriedLocally,
  saveGroupsLocally,
  loadLocallyStoredGroups,
  loadLocallyStoredFactors,
  loadFactorLocally,
  saveAllFactorsLocally,
  saveFactorLocally,
  loadLocallyStoredDemographics,
  saveDemographicsLocally,
  clearStoredSurveyData,
  sendClientStateUpdate,
  submitFactors,
  submitDemographics,
} from "./surveyHandling";
import { getEmptyImpacts } from "./aspectRating";
import type { Factor, InitialFactor } from "./factors";
import { getByGroups } from "./factors";
import type { DemographicValues } from "./demographics";
import NavigationControls from "./components/elements/NavigationControls.vue";
import ProgressOverview from "./components/elements/ProgressOverview.vue"

export type SurveyState = "welcome" | "example" | "selection" | "overview" | "question" | "demographics" | "done";
const stateOrder: SurveyState[] = ["welcome", "example", "selection", "overview", "question", "demographics", "done"];

const props = defineProps<{
  isPilot: boolean;
  startTime: number;
}>();

let lastState = loadLocallyStoredState();

// prepare groups: load if groups are already stored locally, otherwise initialize
let loadedGroups: string[] = loadLocallyStoredGroups();
const selectedGroups = ref<string[]>(loadedGroups);

function addGroupToSelection(group: string) {
  if (!selectedGroups.value.includes(group)) {
    selectedGroups.value.push(group);
    saveGroupsLocally(selectedGroups.value);
  }
}

function removeGroupFromSelection(group: string) {
  if (selectedGroups.value.includes(group)) {
    selectedGroups.value = selectedGroups.value.filter(g => g !== group);
    saveGroupsLocally(selectedGroups.value);
  }
}

// prepare factors: load if factors are already stored locally, otherwise initialize
let loadedFactors: Factor[] = loadLocallyStoredFactors();
const factors = loadedFactors;

function updateLoadedFactors(newFactors: InitialFactor[]) {
  // keep already answered factors
  let factorsToKeep = loadedFactors.filter(loaded => loaded.answered);

  // update factors based on new selection
  for (let factor of newFactors) {
    if (factor.key) {
      if (!factorsToKeep.find(kept => kept.key === factor.key)) {
        factorsToKeep.push({
          name: factor.name,
          description: factor.description,
          key: factor.key,
          impacts: getEmptyImpacts(),
          answered: false
        })
      }
    }
  }
  // sort alphabetically
  factorsToKeep = factorsToKeep.sort(compareFactorName);

  // clear all factors
  loadedFactors.splice(0, loadedFactors.length);
  // and replace by new factor selection
  loadedFactors.push(...factorsToKeep);
  saveAllFactorsLocally(loadedFactors);
}

function compareFactorName(factorA: Factor, factorB: Factor) {
  if (factorA.name < factorB.name) {
    return -1;
  }
  if (factorA.name > factorB.name) {
    return 1;
  }
  return 0;
}

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
let emptyFactor: Factor = {
  name: "",
  description: "",
  key: "",
  impacts: {},
  answered: false,
}
const currentFactor = ref(factors.length === 0 ? emptyFactor : factors[0]);

const loading = ref(false);
const showErrorModal = ref(false);
const showNoFactorsModal = ref(false);
const transitionDirection = ref("fadeToLeft");
const didExample = ref(checkIfExampleTriedLocally());
const exampleNextHint = ref(didExample.value ? "You are ready!" : "Try the example first!");
let gotExampleHint = false;
const showExampleModal = ref(false);

function recognizeTriedExample() {
  didExample.value = true;
  saveExampleTriedLocally();
  exampleNextHint.value = "You are ready!";
}

function answerQuestion(factorIndex: number) {
  transitionDirection.value = "fadeToLeft";
  currentFactor.value = factors[factorIndex];
  currentState.value = "question";
  syncLastState();
}

const currentState = ref<SurveyState>("welcome");

function getNextState(currentState: SurveyState): SurveyState {
  switch (currentState) {
    case "welcome": return "example";
    case "example": return "selection";
    case "selection": return "overview";
    case "overview": return "demographics";
    case "question": return "overview";
    case "demographics": return "done";
    default: return "welcome";
  }
}

function syncLastState() {
  let lastStateIndex = stateOrder.indexOf(lastState);
  let newState = currentState.value;
  let newStateIndex = stateOrder.indexOf(newState);

  if (newStateIndex > lastStateIndex) {
    sendClientStateUpdate(newState).then(response => {
      if (newState !== "done") {
        // only save in local storage if it is not the last state ("done")
        saveLastStateLocally(newState);
      }
      lastState = newState;
    })
  }
}

const showNoGroupsModal = ref(false);

function next() {

  // check if the example has been tried, otherwise show a hint, but only once
  if (currentState.value === "example" && !didExample.value && !gotExampleHint) {
    showExampleModal.value = true;
    gotExampleHint = true;
    return;
  }

  if (currentState.value === "selection") {
    if (selectedGroups.value.length <= 0) {
      // do not proceed if no group has been selected
      showNoGroupsModal.value = true;
      return;
    }
    let numberOfFactors = 15 + selectedGroups.value.length * 4; // 19, 23, 27, 31, 35 depending on the number of areas selected
    let newFactors = getByGroups(selectedGroups.value, numberOfFactors, true);// maximum is currently 45
    updateLoadedFactors(newFactors);
    proceed();
  } else if (currentState.value === "question") {
    // send information for current page
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
  syncLastState();
}

function getPreviousState(currentState: SurveyState): SurveyState {
  switch (currentState) {
    case "welcome": return "welcome";
    case "example": return "welcome";
    case "selection": return "example";
    case "overview": return "selection";
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
    <Transition name="fadeFromTop">
      <ProgressOverview v-if="currentState !== 'welcome'" :currentState="currentState"></ProgressOverview>
    </Transition>
    <div class="pilotHint" v-if="isPilot">Pilot study</div>
    <Transition :name="transitionDirection" mode="out-in">
      <div v-if="currentState === 'welcome'" key="1" class="page">
        <Welcome />
        <NavigationControls :backwardText="''" :forwardText="'Start'" @forwardClicked="next()" nextHint=""/>
        <p class="newParagraph detailInfo">
          <span class="bold">Background & Privacy Policy</span><br>
          This survey is part of our general effort of creating a quality model for cloud-native application
          architectures, focusing on design time aspects.
          With the survey, we want to empirically investigate relationships within the model.
          The target audience are software and IT professionals (developers, engineers, architects) who have experience with implementing web-based applications that run in the cloud. <br>
          All responses are collected anonymously and we only ask for basic demographic data at the end of the survey
          which is voluntary to enter.
          Collected data in aggregated form will possibly be included in publications such as research reports,
          articles, and dissertations.
        </p>
      </div>
      <div v-else-if="currentState === 'example'" key="2" class="page">
        <ExampleQuestion @triedExample="recognizeTriedExample"/>
        <NavigationControls :backwardText="'Previous'" @backwardClicked="previous()" :forwardText="'Let\'s start!'"
          @forwardClicked="next()" :nextHint="exampleNextHint"/>
      </div>
      <div v-else-if="currentState === 'selection'" key="3" class="page">
        <FactorGroupSelection :groups="selectedGroups" @groupSelected="addGroupToSelection"
          @groupDeselected="removeGroupFromSelection" />
        <NavigationControls :backwardText="'Previous'" @backwardClicked="previous()" :forwardText="'Next'"
          @forwardClicked="next()" nextHint=""/>
      </div>
      <div v-else-if="currentState === 'overview'" key="4" class="page">
        <FactorOverview :factors="factors" @factorSelected="factorIndex => answerQuestion(factorIndex)">
        </FactorOverview>
        <NavigationControls :backwardText="'Previous'" @backwardClicked="previous()" :forwardText="'Finish'"
          @forwardClicked="next()" nextHint=""/>
      </div>
      <div v-else-if="currentState === 'question'" key="5" class="page">
        <QualityAspectsQuestion v-bind:factor="currentFactor" v-bind:isExample="false" v-bind:exampleState="''" />
        <NavigationControls :backwardText="'Cancel'" @backwardClicked="previous()" :forwardText="'Save'"
          @forwardClicked="next()" nextHint=""/>
      </div>
      <div v-else-if="currentState === 'demographics'" key="6" class="page">
        <Demographics @updatedDemographics="processDemographics" />
        <NavigationControls :backwardText="'Previous'" @backwardClicked="previous()" :forwardText="'Submit'"
          @forwardClicked="next()" nextHint=""/>
      </div>
      <div v-else-if="currentState === 'done'" key="7" class="page">
        <Feedback v-bind:isPilotFeedback="isPilot" v-bind:factorsForFeedback="factors" />
      </div>
    </Transition>
  </main>

  <ConnectionErrorModal :show="showErrorModal" :confirmText="'Try again'" @close="showErrorModal = false" @confirmed="
    {
      showErrorModal = false;
      next();
    }
  " />
  <Teleport to="body">
    <Modal :show="showExampleModal" @close="showExampleModal = false">
      <template #body>
        <div class="exampleHint">
          <h3>Are you sure you want to start?</h3>
          <p>
            You haven't tried the example yet. Please try to click on a quality
            aspect to state an impact.
          </p>
          <button class="okButton" @click="showExampleModal = false">OK</button>
        </div>
      </template>
    </Modal>
  </Teleport>
  <Teleport to="body">
    <Modal :show="showNoGroupsModal" @close="showNoGroupsModal = false">
      <template #body>
        <div class="exampleHint">
          <h3>No Area selected </h3>
          <p>You have not selected any area. Please select at least one area.
          </p>
          <button class="okButton" @click="showNoGroupsModal = false">
            OK
          </button>
        </div>
      </template>
    </Modal>
  </Teleport>
  <Teleport to="body">
    <Modal :show="showNoFactorsModal" @close="showNoFactorsModal = false">
      <template #body>
        <div class="exampleHint">
          <h3>No Impact(s) stated</h3>
          <p>You have not rated any impact(s) for any factor. Please do so for at least one factor before submitting.
          </p>
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

.larger {
  font-size: 1.1em;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1280px;
  width: 100%;
  row-gap: 10px;
  padding: 1rem 0 1rem 0;
}

.page {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  flex: 1;
  padding: 0 1rem 0 1rem;
  row-gap: 10px;
  margin-top: 25px;
}

.buttonNameIcon {
  margin-right: 0.5em;
}

.detailInfo {
  font-size: 1em;
  background-color: #f2f2f2;
  border: #000 solid 1px;
  border-radius: 3px;
  margin: 40px 0 5px 0;
  padding: 5px 10px 5px 10px;
}

.fadeFromTop-enter-active {
  transition: all 0.3s ease-out;
}

.fadeFromTop-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.fadeFromTop-enter-from,
.fadeFromTop-leave-to {
  transform: translateY(-20px);
  opacity: 0;
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
