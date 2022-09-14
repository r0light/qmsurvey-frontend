<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  step: string;
  text: string;
}>();

const splashColor = computed(() => {
  switch (props.step) {
    case "first":
      return "firstSplash";
    case "second":
      return "secondSplash";
    case "third":
      return "thirdSplash";
    case "fourth":
      return "fourthSplash";
  }
});
</script>

<template>
  <div class="wrap" :class="props.step">
    <div class="splash" :class="splashColor">{{ text }}</div>
  </div>
</template>

<style>
.wrap {
  position: absolute;
  top: 35px;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.first {
  left: 25%;
}

.second {
  left: 50%;
}

.third {
  left: 75%;
}

.fourth {
  left: 100%;
}

.splash {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 6px solid #4e7297;
  position: absolute;
  animation: ring 2s linear forwards;
}

.firstSplash {
  border: 6px solid rgba(255, 237, 51, 0.72);
}

.secondSplash {
  border: 6px solid rgba(222, 255, 51, 0.73);
}

.thirdSplash {
  border: 6px solid rgba(171, 255, 51, 0.74);
}

.fourthSplash {
  border: 6px solid rgba(120, 255, 51, 0.75);
}

@keyframes ring {
  0% {
    display: flex;
    width: 30px;
    height: 30px;
    opacity: 1;
    font-size: 1em;
  }
  100% {
    display: flex;
    width: 300px;
    height: 300px;
    opacity: 0;
    font-size: 5em;
  }
}
</style>
