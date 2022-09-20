<script setup lang="ts">
import QualityAspectsQuestion from "./QualityAspectsQuestion.vue";
import { getEmptyImpacts } from "../aspectRating";

const exampleFactor = {
  name: "Using Easter Eggs in API Responses",
  description:
    "Easter Eggs are small, hidden, humorous features in software that are intended to amuse users who discover them. In a cloud-native application easter eggs can be hidden in API responses returned from endpoints of a service for special inputs so that others who develop a service with a link to the respective endpoint can find them.",
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
</script>

<template>
  <p>
    The following <span class="bold">exemplary question</span> explains the
    concept:
    The <em>product factor</em> ({{ exampleFactor.name }}) is described at
    the top and you can click on any of the quality aspects (Confidentiality, Reusability, ...) below it to rate how it impacts that quality aspect if it is present in a system.
    The quality aspects mostly stem from the <a href="https://iso25000.com/index.php/en/iso-25000-standards/iso-25010">ISO25010 standard for software product quality</a> and for each a short explanation is provided by hovering over the question mark. 
    If you are ready, you can start on the next page where the actual product factors are listed.
  </p>

  <div class="exampleWrapper">
    <QualityAspectsQuestion
      v-bind:factor="exampleFactor"
      v-bind:isExample="true"
      @triedExample="propagateTriedExample"
    />
  </div>
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
</style>
