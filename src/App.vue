<script setup lang="ts">
import Survey from "./Survey.vue";
import { ref } from "vue";
import { checkTokenValidity } from "./surveyHandling";
import { startPause, stopPause, resetTimeState } from "./timerManagement";
import ConnectionErrorModal from "./components/ConnectionErrorModal.vue";
import LoadingIcon from "./components/elements/LoadingIcon.vue";

const validation = ref("loading");
const pilot = ref(false);
const startTime = ref(-1);
const showErrorModal = ref(false);

checkTokenValidity()
  .then((ok) => {
    validation.value = "valid";
    pilot.value = ok.isPilot;
    startTime.value = ok.startTime;
  })
  .catch((invalid) => {
    if (invalid instanceof Error) {
      showErrorModal.value = true;
    }
    validation.value = "invalid";
  });

function reload() {
  location.reload();
}
</script>

<template>
  <header></header>
  <div v-if="validation == 'loading'">
    <LoadingIcon />
  </div>
  <Survey v-if="validation == 'valid'" :isPilot="pilot" :startTime="startTime" />
  <div v-if="validation == 'invalid'">
    <div class="invalid">
      <h1>There currently is no survey to answer!</h1>
    </div>
  </div>
  <footer>
    <div class="footer-content">
      <div>Cloud-native Quality Model Survey |</div>
      <div>
        <a href="https://www.uni-bamberg.de/en/pi/"
          >Distributed Systems Group, University of Bamberg</a
        >
        |
      </div>
      <div>
        Contact:
        <a
          href="mailto:robin.lichtenthaeler@uni-bamberg.de?subject=About%20the%20survey%20on%20the%20Quality%20Model%20for%20Cloud-native%20Applications"
          >robin.lichtenthaeler@uni-bamberg.de</a
        >
        |
      </div>
      <div>
        <a href="https://www.uni-bamberg.de/en/legal/"
          >Legal Notice / Impressum</a
        >
      </div>
    </div>
  </footer>

  <ConnectionErrorModal
    :show="showErrorModal"
    :confirmText="'Reload'"
    @close="showErrorModal = false"
    @confirmed="
      {
        showErrorModal = false;
        reload();
      }
    "
  />
</template>

<style>
@import "./assets/base.css";

.invalid {
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 20px;
}

.invalid h1 {
  margin-top: 2em;
}

footer {
  display: flex;
  background-color: rgb(33, 37, 41);
  color: #fff;
  width: 100%;
  margin-top: auto;
}

@media (max-width: 800px) {
  footer {
    position: static;
    margin-top: auto;
  }
}

.footer-content {
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;
  column-gap: 5px;
  row-gap: 5px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 10px;
}
</style>
