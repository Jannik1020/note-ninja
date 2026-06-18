<script setup lang="ts">
import type { ChallengeMode } from '@/stores/intervals.ts'
import { computed } from 'vue'

const challengeMode = defineModel<ChallengeMode>({
  required: true,
})

const nextModeMapping: Record<ChallengeMode, ChallengeMode> = {
  ascending: 'descending',
  descending: 'both',
  both: 'simultaneous',
  simultaneous: 'ascending',
}
const modeIconMapping: Record<ChallengeMode, string> = {
  ascending: 'north',
  descending: 'south',
  both: 'sync_alt',
  simultaneous: 'equal',
}
const rotateIcon = computed(() => {
  return challengeMode.value in ['both', "simultaneous"]
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
