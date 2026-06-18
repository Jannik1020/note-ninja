<script setup lang="ts">
import type { ChallengeMode } from '@/stores/intervals.ts'
import { computed } from 'vue'

const challengeMode = defineModel<ChallengeMode>({
  required: true,
})

const nextModeMapping: Record<ChallengeMode, ChallengeMode> = {
  ascending: 'descending',
  descending: 'random',
  random: 'simultaneous',
  simultaneous: 'ascending',
}
const modeIconMapping: Record<ChallengeMode, string> = {
  ascending: 'north',
  descending: 'south',
  random: 'sync_alt',
  simultaneous: 'equal',
}
const rotateIcon = computed(() => {
  return challengeMode.value === "random"
})

function handleClick() {
  challengeMode.value = nextModeMapping[challengeMode.value]
}
</script>

<template>
  <span
    class="material-symbols-outlined"
    :style="rotateIcon ? { transform: 'rotate(90deg)' } : {}"
    @click="handleClick"
    >{{ modeIconMapping[challengeMode] }}</span
  >
</template>

<style scoped></style>
