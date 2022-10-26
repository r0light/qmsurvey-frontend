<script setup lang="ts">
import type { Group } from "../factors";
import { listGroups } from "../factors";

const props = defineProps<{
    groups: String[];
}>();

const groupData = listGroups();

const emit = defineEmits<{
    (e: "groupSelected", groupKey: string): void;
    (e: "groupDeselected", groupKey: string): void;
}>();

function isSelected(groupKey: string): boolean {
    return props.groups.includes(groupKey);
}

function groupClicked(groupKey: string): void {
    if (isSelected(groupKey)) {
        emit("groupDeselected", groupKey);
    } else {
        emit("groupSelected", groupKey);
    }
}

function selectedStyle(groupKey: string): string {
    if (isSelected(groupKey)) {
        return "groupSelected";
    } else {
        return "";
    }
}

</script>


<template>
        <div class="selectionWrapper">
          <p class="larger">First of all, please tell us your areas of expertise from the topics below. Our subsequent survey will then focus on these.</p>
          <div class="groupOverview">
            <button class="groupButton" :class="selectedStyle(group.key)" v-for="group in groupData" @click="groupClicked(group.key)">
                {{group.name}}
                <span class="selectIcon" v-if="isSelected(group.key)"><font-awesome-icon icon="fa-solid fa-check" /></span>
                <span class="selectIcon" v-else></span>
            </button>
          </div>
        </div>

</template>


<style>

.selectionWrapper {
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    margin-bottom: 100px;
}

.groupOverview {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 10px;
    column-gap: 10px;
    justify-content: flex-start;
    align-self: center;
}

.groupButton {
    display: flex;
    flex-direction: row;
    font-size: 1.1em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    padding-top: 0.8em;
    padding-bottom: 0.8em;
    min-width: 150px;
    background-color: #eaede9;
    border-style: solid;
    border-width: 1pt;
    border-radius: 3pt;
    border-color: var(--vt-c-indigo);
}

.groupButton:hover {
    background-color: #6fdc6f;
}

.selectIcon {
    display: flex;
    align-items: center;
    margin-left: 1em;
    width: 17px;
}

.groupSelected {
    background-color: #99e699;
}

.groupSelected:hover {
    background-color: #6fdc6f;
}

</style>