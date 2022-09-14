<script setup lang="ts">
export type PilotFeedback = {
  technicalFeedback: string;
  lengthFeedback: string;
  contentFeedback: string;
  factorFeedback: FactorFeedbackWrapper;
  email: string;
};

export type FactorFeedback = {
  key: string;
  name: string;
  description?: string;
  feedback: string;
  focus?: boolean;
};

export type FactorFeedbackWrapper = {
  [key: string]: FactorFeedback;
};

import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { submitContact, submitPilotFeedback } from "../surveyHandling";
import ConnectionErrorModal from "./ConnectionErrorModal.vue";
import Mask from "./elements/Mask.vue";
import type { Factor } from "../factors";

const props = defineProps<{
  isPilotFeedback: boolean;
  factorsForFeedback: Factor[];
}>();

const sent = ref(false);
const email = ref("");

const pilotFeedbackSent = ref(false);
const pilotFeedback: PilotFeedback = {
  technicalFeedback: "",
  lengthFeedback: "",
  contentFeedback: "",
  factorFeedback: {},
  email: "",
};

const technicalFeedback = ref(pilotFeedback.technicalFeedback);
const lengthFeedback = ref(pilotFeedback.lengthFeedback);
const contentFeedback = ref(pilotFeedback.contentFeedback);
const factorFeedback = ref(pilotFeedback.factorFeedback);
const pilotEmail = ref(pilotFeedback.email);
const selectedFactor = ref({ key: "", name: "", description: "" });

const loading = ref(false);
const showErrorModal = ref(false);

function sendContactEmail() {
  loading.value = true;
  submitContact(email.value)
    .then((emailSubmitted) => {
      loading.value = false;
      email.value = "";
      sent.value = true;
    })
    .catch((error) => {
      loading.value = false;
      if (error instanceof Error) {
        showErrorModal.value = true;
      }
    });
}

function selectFactor() {
  if (!factorFeedback.value[selectedFactor.value.key]) {
    const newFactorFeedback: FactorFeedback = {
      key: selectedFactor.value.key,
      name: selectedFactor.value.name,
      description: selectedFactor.value.description,
      feedback: "",
      focus: false,
    };
    factorFeedback.value[selectedFactor.value.key] = newFactorFeedback;
    selectedFactor.value = { key: "", name: "", description: "" };
  }
}

function removeFactorFeedback(factorKey: string) {
  delete factorFeedback.value[factorKey];
}

function sendFeedback() {
  const essentialFactorFeedbacks: FactorFeedbackWrapper = {};
  for (const feedbackEntryKey in factorFeedback.value) {
    if (factorFeedback.value.hasOwnProperty(feedbackEntryKey)) {
      const feedbackEntry = factorFeedback.value[feedbackEntryKey];
      essentialFactorFeedbacks[feedbackEntry.key] = {
        key: feedbackEntry.key,
        name: feedbackEntry.name,
        feedback: feedbackEntry.feedback,
      };
    }
  }
  const pilotFeedback: PilotFeedback = {
    technicalFeedback: technicalFeedback.value,
    lengthFeedback: lengthFeedback.value,
    contentFeedback: contentFeedback.value,
    factorFeedback: essentialFactorFeedbacks,
    email: pilotEmail.value,
  };
  loading.value = true;
  submitPilotFeedback(pilotFeedback)
    .then((feedbackSubmitted) => {
      loading.value = false;
      pilotFeedbackSent.value = true;
    })
    .catch((error) => {
      loading.value = false;
      if (error instanceof Error) {
        showErrorModal.value = true;
      }
    });
}

function tryAgain() {
  showErrorModal.value = false;
  if (props.isPilotFeedback) {
    sendFeedback();
  } else {
    sendContactEmail();
  }
}
</script>

<template>
  <div  class="feedbackWrapper" v-if="isPilotFeedback">
    <div class="pilotFeedback" v-if="!pilotFeedbackSent">
      <h1>Thank you for your support!</h1>
      <h2>
        Please take another minute to provide a small feedback on the survey you
        just completed.
      </h2>
      <div class="feedbackEntry">
        <label class="areaLabel" for="technicalFeedback">Do you have any feedback on the ease of use of the survey tool?
          Was
          the introduction and guidance suitable?</label>
        <textarea class="feedbackArea" type="text" id="technicalFeedback" name="technicalFeedback"
          v-model="technicalFeedback" cols="100" rows="5"></textarea>
      </div>
      <div class="feedbackEntry">
        <label class="areaLabel" for="lengthFeedback">What is your opinion on the length of the survey?</label>
        <textarea class="feedbackArea" type="text" id="lengthFeedback" name="lengthFeedback" v-model="lengthFeedback"
          cols="100" rows="3"></textarea>
      </div>
      <div class="feedbackEntry">
        <label class="areaLabel" for="contentFeedback">Do you have any feedback on the content of the survey, such as
          the explanations and terminology throughout the survey?</label>
        <textarea class="feedbackArea" type="text" id="contentFeedback" name="contentFeedback" v-model="contentFeedback"
          cols="100" rows="5"></textarea>
      </div>
      <div class="feedbackEntry">
        <p>If you have any feedback specific to one of the factors, you can include it here:</p>
        <select class="factorSelection" name="factors" id="factors" v-model="selectedFactor" @change="selectFactor">
          <option v-for="(factor, factorKey) of factorsForFeedback" :key="factorKey" :value="factor">
            {{ factor.name }}
          </option>
        </select>
        <TransitionGroup name="vertical-slide">
          <div class="factorFeedback" v-for="(feedbackFactor, factorKey) of factorFeedback" :key="factorKey">
            <div>
              <label class="areaLabel" :for="feedbackFactor.key"> Feedback for: {{ feedbackFactor.name }}</label>
              <button class="remove-button" @click="removeFactorFeedback(feedbackFactor.key)">
                <font-awesome-icon icon="fa-solid fa-circle-xmark" />
              </button>
            </div>
            <Transition name="vertical-slide">
              <div class="factorFeedbackDescription" v-show="feedbackFactor.focus">
                {{ feedbackFactor.description }}
              </div>
            </Transition>
            <textarea class="feedbackArea" type="text" :id="feedbackFactor.key" :name="feedbackFactor.key"
              v-model="feedbackFactor.feedback" cols="100" rows="5" @focus="feedbackFactor.focus = true"
              @blur="feedbackFactor.focus = false"></textarea>
          </div>
        </TransitionGroup>
      </div>
      <div class="feedbackEntry">
        <label class="areaLabel" for="pilotEmail">If you are interested in the topic and would either like to share
          additional feedback or are interested in the results of the survey,
          please provide your email address:</label>
        <input class="textInput" type="text" id="pilotEmail" name="pilotEmail" v-model="pilotEmail"
          placeholder="Email address" />
      </div>
      <button class="submitButton" @click="sendFeedback">
        Submit Feedback
      </button>
    </div>
    <div v-if="pilotFeedbackSent">
      <h1>Thanks again! You can close this window now.</h1>
    </div>
  </div>
  <div v-else>
    <h1 class="thankyou">
      Thank you for participating in this survey! You can close this window now.
    </h1>
    <div class="contact" v-if="!sent">
      <p>
        If you are interested in the results of this survey, you can also submit
        your email address here and we will send a report to you after the
        survey is finished: <br>
        (The email address is stored separately from your answers)
      </p>
      <input class="textInput" type="text" id="email" name="email" v-model="email" placeholder="Email address" /><br>
      <button class="submitButton" @click="sendContactEmail"> Submit Email </button>
    </div>
    <div class="contact" v-if="sent">
      <p>
        Great! We will get back to you
        <font-awesome-icon icon="fa-regular fa-face-smile" />
      </p>
    </div>
  </div>

  <ConnectionErrorModal :show="showErrorModal" :confirmText="'Try again'" @close="showErrorModal = false"
    @confirmed="tryAgain" />
  <Teleport to="body">
    <Mask :show="loading"></Mask>
  </Teleport>
</template>

<style>
.thankyou {
  text-align: center;
  padding: 0 1rem 0 1rem;
}

.contact {
  margin-top: 1em;
  padding: 0 1rem 0 1rem;
  font-size: 1.1em;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  row-gap: 10px;
  justify-content: left;
  align-items: flex-start;
}

.textInput {
  max-width: 500px;
  width: 100%;
  font-size: 1em;
  font-family: inherit;
}

.submitButton {
  margin-top: 10px;
  font-size: 1em;
  padding: 0.7em;
}

.feedbackWrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.pilotFeedback {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 15px;
  font-size: 1.2em;
  padding: 10px;
  max-width: 1000px;
  width: 100%;
}

.feedbackEntry {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.factorFeedbackDescription {
  font-style: italic;
  margin: 10px 0;
}

.areaLabel {
  width: 100%;
}

.remove-button {
  font-size: 1.2em;
  font-weight: 900;
  border-style: none;
  background-color: inherit;
  color: #818198;
  margin: 0 5px;
}

.remove-button:hover {
  color: #505062;
}

.feedbackArea {
  font-family: inherit;
  min-width: 100%;
  max-width: 100%;
}

.factorSelection {
  font-size: 1em;
  font-family: inherit;
  width: fit-content;
  margin-top: 15px;
}

.factorFeedback {
  margin-top: 25px;
}

.vertical-slide-enter-from {
  transform: scaleY(0);
}

.vertical-slide-enter-active {
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.3s ease;
}

.vertical-slide-enter-to {
  transform: scaleY(1);
}

.vertical-slide-leave-active {
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.3s ease;
}

.vertical-slide-leave-to {
  transform: scaleY(0);
}
</style>
