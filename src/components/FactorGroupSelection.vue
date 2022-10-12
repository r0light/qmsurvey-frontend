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
          <p>In which area are you interested in? Please select <span class="bold">at least one</span> area to filter the factors to rate.</p>
          <div class="groupOverview">
            <button class="groupButton" :class="selectedStyle(group.key)" v-for="group in groupData" @click="groupClicked(group.key)">
                {{group.name}}
                <span class="selectIcon" v-if="isSelected(group.key)"><font-awesome-icon icon="fa-solid fa-check" /></span>
                <span class="selectIcon" v-else><font-awesome-icon icon="fa-solid fa-xmark" /></span>
            </button>
          </div>
        </div>

</template>


<style>

.selectionWrapper {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

.groupOverview {
    display: flex;
    flex-direction: row;
    column-gap: 10px;
}

.groupButton {
    font-size: 1.1em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    padding-top: 0.8em;
    padding-bottom: 0.8em;
    min-width: 150px;
    border-style: solid;
    border-width: 1pt;
    border-radius: 3pt;
    border-color: var(--vt-c-indigo);
}

.selectIcon {
    margin-left: 1em;
}

.groupSelected {
    background-color: #99e699;
}

</style>