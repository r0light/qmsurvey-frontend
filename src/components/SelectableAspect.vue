<script setup lang="ts">
import { ref } from "vue";
import ImpactModal from "./Modal.vue";

const props = defineProps<{
  aspectKey: string;
  aspectName: string;
  aspectDescription: string;
  factorName: string;
  passedRating: number;
}>();

const emit = defineEmits<{
  (e: "rated", aspectKey: string, rating: number): void;
}>();

const showModal = ref(false);
const rating = ref(0);
if (props.passedRating) {
  rating.value = props.passedRating;
}

function rateImpact(newRating: number) {
  rating.value = newRating;
  showModal.value = false;
  emit("rated", props.aspectKey, newRating);
}

type RatingOption = {
  styleClass: string;
  symbol: string;
};

type RatingOptionsWrapper = {
  [key: string]: RatingOption;
};

const ratingOptions: RatingOptionsWrapper = {
  "2": {
    styleClass: "strongly-positive",
    symbol: "++",
  },
  "1": {
    styleClass: "slightly-positive",
    symbol: "+",
  },
  "0": {
    styleClass: "neutral",
    symbol: "o",
  },
  "-1": {
    styleClass: "slightly-negative",
    symbol: "-",
  },
  "-2": {
    styleClass: "strongly-negative",
    symbol: "--",
  },
};

function getStyleForRating(rating: number) {
  if (ratingOptions[rating.toString()]) {
    return ratingOptions[rating.toString()].styleClass;
  } else {
    return "";
  }
}

function getSymbolForRating(rating: number) {
  if (ratingOptions[rating.toString()]) {
    return ratingOptions[rating.toString()].symbol;
  } else {
    return "";
  }
}
</script>

<template>
  <button
    class="aspect"
    v-bind:class="getStyleForRating(rating)"
    id="show-modal"
    @click="showModal = true"
  >
    {{ aspectName }}
    <br />
    {{ getSymbolForRating(rating) }}
  </button>
  <button class="help tooltip" v-bind:data-tooltip="aspectDescription">
    <font-awesome-icon icon="fa-solid fa-question" />
  </button>
  <Teleport to="body">
    <ImpactModal :show="showModal" @close="showModal = false">
      <template #body>
        <div class="rating">
          <p>{{ factorName }} <br />has</p>
          <button class="rateButton strongly-positive" @click="rateImpact(2)">
            a positive impact (++)
          </button>
          <button class="rateButton slightly-positive" @click="rateImpact(1)">
            a slightly positive impact (+)
          </button>
          <button class="rateButton neutral" @click="rateImpact(0)">
            no impact (o)
          </button>
          <button class="rateButton slightly-negative" @click="rateImpact(-1)">
            a slightly negative impact (-)
          </button>
          <button class="rateButton strongly-negative" @click="rateImpact(-2)">
            a negative impact (--)
          </button>
          <p>on<br />{{ aspectName }}</p>
        </div>
      </template>
    </ImpactModal>
  </Teleport>
</template>

<style>
.aspect {
  padding: 0.2em 0.5em 0.2em 0.5em;
  font-size: 1em;
  flex: 1;
  margin-top: 0.4em;
  margin-bottom: 0.1em;
  text-align: center;
  border-style: solid;
  border-width: 1.5pt;
  border-color: var(--vt-c-indigo);
  border-radius: 6pt;
}

.help {
  position: absolute !important;
  top: -1px;
  right: -16px;
  border-radius: 50%;
  color: var(--color-text);
  font-size: 0.9em;
  border-style: solid;
  border-color: var(--color-text);
  padding: 3px 6px 3px 6px;
}

.help:hover {
  background-color: #d0d0d7;
}

.strongly-positive {
  background-color: #70db70;
}

.strongly-positive:hover {
  background-color: #47d147;
}

.slightly-positive {
  background-color: #c2f0c2;
}

.slightly-positive:hover {
  background-color: #99e699;
}

.neutral {
  background-color: var(--color-button);
}

.neutral:hover {
  background-color: var(--color-button-hover);
}

.slightly-negative {
  background-color: #ffb3b3;
}

.slightly-negative:hover {
  background-color: #ff8080;
}

.strongly-negative {
  background-color: #ff4d4d;
}

.strongly-negative:hover {
  background-color: #ff1a1a;
}

.rating {
  display: flex;
  flex-direction: column;
  font-size: 1.5em;
  text-align: center;
  row-gap: 10px;
}

.rateButton {
  font-size: 0.8em;
  padding: 0.5em;
  color: var(--color-text);
  border-color: var(--color-text);
  border-radius: 5px;
}
</style>
