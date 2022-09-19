<script setup lang="ts">
import type { SurveyState } from '../../Survey.vue';

const props = defineProps<{
    currentState: SurveyState;
}>();

function getStyleForWelcome() {
    switch(props.currentState) {
        case "welcome": 
            return "activeState";
        default:
            return "doneState";
    }
}

function getStyleForExample() {
    switch(props.currentState) {
        case "welcome": 
            return "inactiveState";
        case "example": 
            return "activeState";
        default:
            return "doneState";
    }
}

function getStyleForFactorRating() {
    switch(props.currentState) {
        case "welcome": 
            return "inactiveState";
        case "example": 
            return "inactiveState";
        case "overview":
        case "question":
            return "activeState";
        default:
            return "doneState";
    }
}

function getStyleForDemographics() {
    switch(props.currentState) {
        case "welcome": 
            return "inactiveState";
        case "example": 
            return "inactiveState";
        case "overview":
        case "question":
            return "inactiveState";
        case "demographics":
            return "activeState";
        default:
            return "doneState";
    }
}

function getStyleForDone() {
    switch(props.currentState) {
        case "done": 
            return "doneState";
        default:
            return "inactiveState";
    }
}

</script>

<template>
<div class="progressContainer">
    <div class="progressElement smallBox">
        <div class="leftPart"></div>
        <div class="bodyPart" :class="getStyleForWelcome()">
            <span class="progressText">
                <span class="progressTextInner">Hello</span> 
                <font-awesome-icon v-if="getStyleForWelcome() === 'doneState'" icon="fa-regular fa-circle-check" />
                <font-awesome-icon v-if="getStyleForWelcome() === 'activeState'" icon="fa-regular fa-circle-down" />
            </span>
        </div>
        <div class="rightPart" :class="getStyleForWelcome()"></div>
    </div>
    <div class="progressElement midiBox">
        <div class="leftPart"></div>
        <div class="bodyPart" :class="getStyleForExample()">
            <span class="progressText">
                <span class="progressTextInner">Example</span>
                <font-awesome-icon v-if="getStyleForExample() === 'doneState'" icon="fa-regular fa-circle-check" />
                <font-awesome-icon v-if="getStyleForExample() === 'activeState'" icon="fa-regular fa-circle-down" />
            </span>
        </div>
        <div class="rightPart" :class="getStyleForExample()"></div>
    </div>
    <div class="progressElement bigBox">
        <div class="leftPart"></div>
        <div class="bodyPart" :class="getStyleForFactorRating()">
            <span class="progressText">
                <span class="progressTextInner">Product factor rating</span>
                <font-awesome-icon v-if="getStyleForFactorRating() === 'doneState'" icon="fa-regular fa-circle-check" />
                <font-awesome-icon v-if="getStyleForFactorRating() === 'activeState'" icon="fa-regular fa-circle-down" />
            </span>
        </div>
        <div class="rightPart" :class="getStyleForFactorRating()"></div>
    </div>
    <div class="progressElement midiBox">
        <div class="leftPart"></div>
        <div class="bodyPart" :class="getStyleForDemographics()">
            <span class="progressText">
                <span class="progressTextInner">Demographics</span>
                <font-awesome-icon v-if="getStyleForDemographics() === 'doneState'" icon="fa-regular fa-circle-check" />
                <font-awesome-icon v-if="getStyleForDemographics() === 'activeState'" icon="fa-regular fa-circle-down" />
            </span>
        </div>
        <div class="rightPart" :class="getStyleForDemographics()"></div>
    </div>
    <div class="progressElement miniBox">
        <div class="leftPart"></div>
        <div class="bodyPart" :class="getStyleForDone()">
            <span class="progressText">
                <span class="progressTextInner">Done</span>
                <font-awesome-icon v-if="getStyleForDemographics() === 'doneState'" icon="fa-regular fa-circle-check" />
            </span>
        </div>
        <div class="rightPart" :class="getStyleForDone()"></div>
    </div>
</div>

</template>

<style>
.progressContainer {
    display: flex;
    flex-direction: row;
    height: fit-content;
}

.progressElement {
    min-width: 100px;
    height: 31.8px;
}

.smallBox {
    width: 10%;
}

.bigBox {
    width: 45%;
}

.midiBox {
    width: 20%;
}

.miniBox {
    width: 5%;
}

.leftPart {
    position: absolute;
    width: 15px;
    height: 15px;
    /*border-top: 1px solid #000;
    border-right: 1px solid #000;*/
    transform: scale(0.9, 1.5) rotate(45deg) translateY(9.3px) translateX(-1.5px);
    background-color: #fff;
    z-index: 5;
}

.bodyPart {
    position: absolute;
    height: 31.8px;
    width: calc(100% - 14.2px);
    /*border-top: 1px solid #000;
    border-bottom: 1px solid #000;*/
    display: flex;
    justify-content: center;
}

.progressText {
    margin: auto;
    padding-left: 10%;
    display: flex;
    align-items: center;
}

.progressTextInner {
    margin-right: 3px;
}

@media (max-width: 890px) {
  .progressElement {
    min-width: 60px;
  }
  .progressTextInner {
    display: none;
  }
}

.rightPart {
    position: absolute;
    right: 0;
    width: 15px;
    height: 15px;
    /*border-top: 1px solid #000;
    border-right: 1px solid #000;*/
    transform: scale(0.9, 1.5) rotate(45deg) translateY(9.3px) translateX(-1.5px);
    z-index: 10;
}

.activeState {
    background-color: #ccd8e5;
}

.doneState {
    background-color: #abbfd4;
}

.inactiveState {
    background-color: #e9e9ed;
}

</style>