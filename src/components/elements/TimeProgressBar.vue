<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { generateSecondsTimeStamp, startPause, stopPause, resetTimeState, getTimeState } from "../../timerManagement";

const props = defineProps<{
    start: number
    maxTime: number
    paused: boolean
    increaseTrigger: number
}>();

const emit = defineEmits<{
    (e: "timeUp"): void;
}>();

const start = ref(0);
const paused = ref(false);
const current = ref(0);
const max = ref(600);
const minutes = ref(asPaddedString(calculateMinutes()))
const seconds = ref(asPaddedString(calculateSeconds()))
const range = ref(determineRange(current.value / max.value));

const watchForIncrease = computed(() => props.increaseTrigger);

watch(watchForIncrease, (newVal) => {
    let updated = getTimeState();
    max.value = updated.currentTimeLimit;
    refreshProgressBar();
    resume(); // call resume, because pause() was called when time was up
});

var intervalRef: number = NaN;

onMounted(() => {
    start.value = props.start;
    max.value = props.maxTime;
    paused.value = props.paused;
    current.value = generateSecondsTimeStamp() - start.value;
    refreshProgressBar();
    if (paused.value === false) {
        play();
    }
})

function pause() {
    stop();
    let afterPaused = startPause();
    paused.value = afterPaused.currentlyPaused;
}

function resume() {
    let updated = stopPause();
    paused.value = updated.currentlyPaused;
    start.value = updated.adjustedStartTime
    current.value = generateSecondsTimeStamp() - start.value;
    play();
}

function play() {
    intervalRef = window.setInterval(updateTime, 1000);
}

function stop() {
    if (intervalRef) {
        clearInterval(intervalRef)
        intervalRef = NaN;
    }
}

function updateTime() {
    if (!isDone()) {
        current.value = current.value + 1;
        refreshProgressBar();
    } else {
        emit("timeUp")
        pause();
    }
}

function reset() {
    let updated = resetTimeState();
    start.value = updated.adjustedStartTime;
    max.value = updated.currentTimeLimit;
    paused.value = updated.currentlyPaused;
    current.value = generateSecondsTimeStamp() - start.value;
    refreshProgressBar();
    if (!paused.value && isNaN(intervalRef)) {
        play();
    }
}

function isDone() {
    return current.value >= max.value;
}

function refreshProgressBar() {
    minutes.value = asPaddedString(calculateMinutes());
    seconds.value = asPaddedString(calculateSeconds());
    range.value = determineRange(current.value / max.value);
}

function calculateMinutes() {
    if (!isDone()) {
        return Math.floor((max.value - current.value) / 60)
    } else {
        return 0;
    }
}

function calculateSeconds() {
    if (!isDone()) {
        return (max.value - current.value) % 60
    } else {
        return 0;
    }
}

function asPaddedString(numericValue: number): string {
    let asString = numericValue.toString();
    if (asString.length == 1) {
        return "0" + asString;
    } else {
        return asString;
    }
}

function determineRange(fraction: number) {
    if (fraction < 0.25) {
        return "firstRange";
    } else if (fraction < 0.5) {
        return "secondRange";
    } else if (fraction < 0.75) {
        return "thirdRange";
    } else if (fraction < 1) {
        return "fourthRange";
    } else if (fraction >= 1) {
        return "doneRange"
    } else {
        return "doneRange"
    }
}
</script>
    
<template>
    <div class="progressWrapper">
        <progress :class="range" v-bind:value="current" v-bind:max="max"></progress>
        <div class="progressLabel">
            <span>{{ minutes }}:{{ seconds }}</span>
            <button class="timerControl" v-show="!paused && !isDone()" @click="pause()"><font-awesome-icon icon="fa-solid fa-pause" /></button>
            <button class="timerControl" v-show="paused && !isDone()" @click="resume()"><font-awesome-icon icon="fa-solid fa-play" /></button> 
            <button class="timerControl" @click="reset()"><font-awesome-icon icon="fa-solid fa-arrow-rotate-left" /></button>
        </div>
    </div>
</template>
    
<style>
.progressWrapper {
    display: flex;
    flex-direction: row;
}

progress {
    width: 100%;
    height: 25px;
    border-radius: 7px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}

progress::-webkit-progress-bar {
    background-color: #e6e6e6;
    border-radius: 7px;
}

progress::-webkit-progress-value,
progress::-moz-progress-bar {
    box-shadow: 1px 1px 5px 3px rgba(0, 0, 0, 0.2);
}

.progressLabel {
    position: absolute;
    z-index: 100;
    width: 100%;
    text-align: center;
    font-size: 1em;
}

.timerControl {
    border: none;
    background: none;
    margin-left: 0.3em;
}

.timerControl:hover {
    background: none;
    color: #344d95;
}

.firstRange::-webkit-progress-value {
    /*background-color: var(--vt-c-steelblue-5);*/
    border-radius: 7px;
    background-color: rgba(255, 186, 51, 0.7);
}

.firstRange::-moz-progress-bar {
    /*background-color: var(--vt-c-steelblue-5);*/
    border-radius: 7px;
    background-color: rgba(255, 186, 51, 0.7);
}

.secondRange::-webkit-progress-value {
    border-radius: 7px;
    background-color: rgba(255, 237, 51, 0.72);
}

.secondRange::-moz-progress-bar {
    border-radius: 7px;
    background-color: rgba(255, 237, 51, 0.72);
}

.thirdRange::-webkit-progress-value {
    border-radius: 7px;
    background-color: rgba(222, 255, 51, 0.73);
}

.thirdRange::-moz-progress-bar {
    border-radius: 7px;
    background-color: rgba(222, 255, 51, 0.73);
}

.fourthRange::-webkit-progress-value {
    border-radius: 7px;
    background-color: rgba(171, 255, 51, 0.74);
}

.fourthRange::-moz-progress-bar {
    border-radius: 7px;
    background-color: rgba(171, 255, 51, 0.74);
}

.doneRange::-webkit-progress-value {
    border-radius: 7px;
    background-color: rgba(120, 255, 51, 0.75);
}

.doneRange::-moz-progress-bar {
    border-radius: 7px;
    background-color: rgba(120, 255, 51, 0.75);
}
</style>
    