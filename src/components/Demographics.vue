<script setup lang="ts">
import { ref } from "vue";
import { loadLocallyStoredDemographics } from "../surveyHandling";

const demographics = loadLocallyStoredDemographics();

const jobArea = ref(demographics.jobArea);
const jobTitle = ref(demographics.jobTitle);
const companySector = ref(demographics.companySector);
const generalExperience = ref(demographics.generalExperience);
const cloudExperience = ref(demographics.cloudExperience);

function notInIndustry() {
  return jobArea.value !== "industry";
}

function isAStudent() {
  return jobArea.value !== "industry" && jobArea.value !== "academia";
}

const emit = defineEmits(["updatedDemographics"]);
function updateValue() {
  emit("updatedDemographics", {
    jobArea: jobArea.value,
    jobTitle: jobTitle.value,
    companySector: companySector.value,
    generalExperience: generalExperience.value,
    cloudExperience: cloudExperience.value
  });
}
</script>

<template>
  <div class="questions">
    <h3>
      Great! You are nearly finished, as a final question, please also provide a
      few facts about yourself.
    </h3>
    <div>
      <p>
        Based on your current (primary) job, would you introduce yourself rather as
        working in industry or academia?
      </p>
      <input
        type="radio"
        id="industry"
        name="jobArea"
        value="industry"
        v-model="jobArea"
        @input="updateValue"
      />
      <label class="radioLabel" for="industry">Industry</label><br />
      <input
        type="radio"
        id="academia"
        name="jobArea"
        value="academia"
        v-model="jobArea"
        @input="updateValue"
      />
      <label class="radioLabel" for="academia">Academia</label><br />
      <input
        type="radio"
        id="student"
        name="jobArea"
        value="student"
        v-model="jobArea"
        @input="updateValue"
      />
      <label class="radioLabel" for="student">Student</label><br />
    </div>
    <div>
      <label for="title" v-bind:class="{ disabled: isAStudent() }">What is your current job title? (only if not a student)</label><br />
      <input
        class="textInput"
        type="text"
        id="title"
        name="jobTitle"
        list="titles"
        v-model="jobTitle"
        v-bind:disabled="isAStudent()"
        @input="updateValue"
        placeholder="Job title"
      /><br />
      <datalist id="titles">
        <option value="Software Developer" />
        <option value="Consultant" />
        <option value="Administrator" />
        <option value="Manager" />
        <option value="Software Architect" />
      </datalist>
    </div>
    <div>
      <label for="sector" v-bind:class="{ disabled: notInIndustry() }"
        >To which type of industry would you assign the company that you
        currently work for? <br> (only if Industry is selected)</label
      ><br />
      <input
        class="textInput"
        type="text"
        id="sector"
        name="companySector"
        list="sectors"
        v-model="companySector"
        v-bind:disabled="notInIndustry()"
        @input="updateValue"
        placeholder="Type of industry"
      /><br />
      <datalist id="sectors">
        <!-- based on https://en.wikipedia.org/wiki/International_Standard_Industrial_Classification -->
        <option value="Agriculture, forestry and fishing" />
        <option value="Mining and quarrying" />
        <option value="Manufacturing" />
        <option value="Electricity, gas, and oil supply" />
        <option value="Water supply, sewerage, waste management" />
        <option value="Construction" />
        <option value="Wholesale and retail trade" />
        <option value="Transportation and storage" />
        <option value="Accommodation and food service activities" />
        <option value="Information and communication" />
        <option value="Financial and insurance activities" />
        <option value="Real estate activities" />
        <option value="Professional, scientific and technical activities" />
        <option value="Administrative and support service activities" />
        <option value="Public administration and defence" />
        <option value="Education" />
        <option value="Human health and social work activities" />
        <option value="Arts, entertainment and recreation" />
        <option value="Other service activities" />
      </datalist>
    </div>
    <div>
      <label for="generalExperience"
        >How many years of experience do you have in software development in
        general?</label
      ><br />
      <input
        class="rangeSlider"
        type="range"
        id="generalExperience"
        name="generalExperience"
        min="0"
        max="60"
        v-model="generalExperience"
        step="1"
        @input="updateValue"
      /><br />
      <input
        class="directExperienceInput"
        type="number"
        id="generalExperienceInput"
        name="generalExperience"
        min="0"
        max="60"
        v-model="generalExperience"
        @input="updateValue"
      />
    </div>
    <div>
      <label for="cloudExperience"
        >How many years of experience do you have with cloud platforms, such as
        Amazon Web Services, Google Cloud Platform, or Microsoft Azure?</label
      ><br />
      <input
        class="rangeSlider"
        type="range"
        id="cloudExperience"
        name="cloudExperience"
        min="0"
        max="60"
        v-model="cloudExperience"
        step="1"
        @input="updateValue"
      /><br />
      <input
        class="directExperienceInput"
        type="number"
        id="cloudExperienceInput"
        name="cloudExperience"
        min="0"
        max="60"
        v-model="cloudExperience"
        @input="updateValue"
      />
    </div>
  </div>
</template>

<style>
.questions {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  max-width: 75%;
  font-size: 1.2em;
}

.radioLabel {
  margin-left: 10px;
}

.textInput {
  max-width: 500px;
  width: 100%;
  font-size: 1em;
  font-family: inherit;
}

.disabled {
  opacity: 0.6;
}

.rangeSlider {
  max-width: 600px;
  width: 100%;
  accent-color: var(--vt-c-steelblue-5);
}

.directExperienceInput {
  width: 3.5em;
  font-size: 1em;
  font-family: inherit;
}
</style>
