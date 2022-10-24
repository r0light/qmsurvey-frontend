<script setup lang="ts">
import type { SurveyState } from '../../Survey.vue';

const props = defineProps<{
    currentState: SurveyState;
}>();

function getBackgroundForWelcome() {
    switch(props.currentState) {
        case "welcome":
            return "inactiveState";
        case "example":
            return "activeState";
        default:
            return "doneState";
    }
}

function getStyleForWelcome() {
    switch(props.currentState) {
        case "welcome": 
            return "activeState";
        default:
            return "doneState";
    }
}

function getBackgroundForExample() {
    switch(props.currentState) {
        case "welcome":
        case "example":
            return "inactiveState";
        case "selection":
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

function getBackgroundForSelection() {
    switch(props.currentState) {
        case "welcome":
        case "example":
        case "selection":
            return "inactiveState";
        case "overview":
        case "question":
            return "activeState";
        default:
            return "doneState";
    }
}

function getStyleForSelection() {
    switch(props.currentState) {
        case "welcome": 
        case "example": 
            return "inactiveState";
        case "selection":
            return "activeState";
        default:
            return "doneState";
    }
}

function getBackgroundForFactorRating() {
    switch(props.currentState) {
        case "welcome":
        case "example":
        case "selection":
        case "overview":
        case "question":
            return "inactiveState";
        case "demographics":
            return "activeState";
        default:
            return "doneState";
    }
}

function getStyleForFactorRating() {
    switch(props.currentState) {
        case "welcome": 
        case "example": 
        case "selection":
            return "inactiveState";
        case "overview":
        case "question":
            return "activeState";
        default:
            return "doneState";
    }
}

function getBackgroundForDemographics() {
    switch(props.currentState) {
        case "done":
            return "doneState";
        default:
            return "inactiveState";
    }
}


function getStyleForDemographics() {
    switch(props.currentState) {
        case "welcome": 
        case "example": 
        case "selection":
        case "overview":
        case "question":
            return "inactiveState";
        case "demographics":
            return "activeState";
        default:
            return "doneState";
    }
}

function getBackgroundForDone() {
    switch(props.currentState) {
        case "done":
            return "doneState";
        default:
            return "inactiveState";
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
    <div class="progressElement smallBox" :class="getBackgroundForWelcome()">
        <div class="leftPart leftestPart"></div>
        <div class="bodyPart" :class="getStyleForWelcome()">
            <span class="progressText">
                <span class="progressTextInner">Hello</span> 
            </span>
        </div>
        <div class="rightPart" :class="getStyleForWelcome()"></div>
    </div>
    <div class="progressElement smallBox" :class="getBackgroundForExample()">
        <div class="leftPart" :class="getStyleForExample()"></div>
        <div class="bodyPart" :class="getStyleForExample()">
            <span class="progressText">
                <span class="progressTextInner" v-if="getStyleForExample() !== 'inactiveState'">Example</span>
            </span>
        </div>
        <div class="rightPart" :class="getStyleForExample()"></div>
    </div>
    <div class="progressElement smallBox" :class="getBackgroundForSelection()">
        <div class="leftPart" :class="getStyleForSelection()"></div>
        <div class="bodyPart" :class="getStyleForSelection()">
            <span class="progressText">
                <span class="progressTextInner" v-if="getStyleForSelection() !== 'inactiveState'">Interests</span>
            </span>
        </div>
        <div class="rightPart" :class="getStyleForSelection()"></div>
    </div>
    <div class="progressElement bigBox" :class="getBackgroundForFactorRating()">
        <div class="leftPart" :class="getStyleForFactorRating()"></div>
        <div class="bodyPart" :class="getStyleForFactorRating()">
            <span class="progressText">
                <span class="progressTextInner" v-if="getStyleForFactorRating() !== 'inactiveState'">Product factor rating</span>
            </span>
        </div>
        <div class="rightPart" :class="getStyleForFactorRating()"></div>
    </div>
    <div class="progressElement midiBox" :class="getBackgroundForDemographics()">
        <div class="leftPart" :class="getStyleForDemographics()"></div>
        <div class="bodyPart" :class="getStyleForDemographics()">
            <span class="progressText">
                <span class="progressTextInner" v-if="getStyleForDemographics() !== 'inactiveState'">Demographics</span>
            </span>
        </div>
        <div class="rightPart" :class="getStyleForDemographics()"></div>
    </div>
    <div class="progressElement miniBox rightest">
        <div class="leftPart" :class="getStyleForDone()"></div>
        <div class="bodyPart" :class="getStyleForDone()">
            <span class="progressText">
                <span class="progressTextInner" v-if="getStyleForDone() !== 'inactiveState'">Done</span>
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
    background-color: #e9e9ed;
}

.smallBox {
    width: 12%;
}

.bigBox {
    width: 40%;
}

.midiBox {
    width: 18%;
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
    background-color: #e9e9ed;
    z-index: 5;
}

.leftestPart {
    background-color: #fff;
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
    font-size: 1.1em;
}

@media (max-width: 940px) {
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

.rightest {
    background-color: #fff;
}

.activeState {
    background-color: #ccd8e5;
}

.rightPart.doneState {
    /*border-top: 1px solid #2c3e50;*/
    border-top: 1px solid #89a5c2;
    border-right: 1px solid #89a5c2;
}

.doneState {
    background-color: #abbfd4;
}

.inactiveState {
    background-color: #e9e9ed;
}

</style>