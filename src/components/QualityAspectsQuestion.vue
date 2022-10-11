<script setup lang="ts">
import { onMounted } from "vue"
import Lines from "./elements/Lines.vue";
import SelectableAspect from "./SelectableAspect.vue";
import { getQualityAspects } from "../aspectRating";
import { saveFactorLocally } from "../surveyHandling";
import { addTooltips } from "../entities";
import type { Factor } from "../factors";

const qualityAspects = getQualityAspects();

const props = defineProps<{
  factor: Factor;
  isExample: boolean;
}>();

const emit = defineEmits(["triedExample"]);

function withTooltips(description: string): string {
  return addTooltips(description);
}

function processRating(aspectKey: string, rating: number) {
  //save rating
  if (props.factor.impacts) {
    props.factor.impacts[aspectKey] = rating;
  }
  if (props.isExample) {
    emit("triedExample");
  }
}
</script>

<template>
  <div class="quality-question">
    <div class="factorDescription">
      <h1>{{ factor.name }}</h1>
      <p v-html="withTooltips(factor.description)"></p>
    </div>
    <div v-if="isExample" class="drawnHint pfHint"><img src="/productfactor.svg" alt="product factor" width="275" /></div>
    <p>
      Please state at least one impact that <em>{{ factor.name }}</em> has on a quality aspect. You can state as
      many impacts as you want, but typically between one and three impacts is a
      reasonable number.
    </p>
    <div class="qa-diagram">
      <div
        v-for="(aspect, aspectKey) of qualityAspects"
        :key="aspectKey"
        class="qa-group"
      >
        <div class="top-aspect">
          {{ aspect.name }}
        </div>
        <div
          class="sub"
          v-for="(subAspect, subAspectKey, innerIndex) of aspect.aspects"
          :key="subAspectKey"
        >
          <Lines
            v-bind:lastOne="
              innerIndex == Object.keys(aspect.aspects).length - 1
            "
          />
          <SelectableAspect
            v-bind:aspectKey="(subAspectKey as string)"
            v-bind:aspectName="subAspect.name"
            v-bind:aspectDescription="subAspect.description"
            v-bind:factorName="factor.name"
            v-bind:passedRating="factor.impacts[subAspectKey]"
            @rated="processRating"
          />
        </div>
      </div>
    </div>
    <div v-if="isExample" class="drawnHint qaHint"><img src="/qualityaspects.svg" alt="quality aspects" width="420" /></div>
  </div>
</template>

<style>
@import "../assets/base.css";

.quality-question {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  max-width: 1024px;
  width: 100%;
}

.qa-diagram {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 1.1em;
  column-gap: 1em;
}

.qa-group {
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 160px;
}

.top-aspect {
  height: 3.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-weight: bold;
  text-align: center;
  border-style: solid;
  border-width: 1.5pt;
  border-color: var(--vt-c-indigo);
  border-radius: 6pt;
}

.sub {
  display: flex;
  flex-direction: row;
}

[data-tooltip] {
  position: relative;
}

[data-tooltip]::after {
  content: attr(data-tooltip);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s;

  display: block;
  position: absolute;
  bottom: -6em;
  left: -6em;
  width: 23em;
  padding: 0.5em;
  margin-top: 0;
  z-index: 100;
  color: #000;
  background-color: #e6e6e6;
  border: solid 1px var(--vt-c-indigo);
  border-radius: 0.5em;
}

[data-tooltip]:hover::after {
  opacity: 1;
}

.factorDescription {
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  border: #000 solid 1px;
  border-radius: 5px;
}

.factorDescription h1 {
  text-align: center;
}

.factorDescription p {
  font-size: 1.2em;

  padding: 0.5em;
}

@media (max-width: 1280px) {
  .drawnHint {
    display: none;
  }
}

.drawnHint {
  position: absolute;
  z-index: 5;
}

.pfHint {
  right: 1px;
}

.qaHint {
  bottom: 15px;
  right: 230px;
}
</style>
