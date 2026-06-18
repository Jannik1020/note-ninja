<script setup lang="ts">
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import ModeSelector from '@/components/ModeSelector.vue'
import type { ChallengeMode } from '@/stores/intervals.ts'

const challengeMode = defineModel<ChallengeMode>({
  required: true,
})


</script>

<template>
  <div class="topAppBar">
    <div class="statsContainer barGroup">
      <div>
        <p>Score</p>
        <p>13</p>
      </div>
      <div>
        <p>Score</p>
        <p>200</p>
      </div>
    </div>
    <div class="settingsContainer barGroup">
      <ModeSelector class="icon" v-model="challengeMode"/>
      <LanguageSwitcher class="icon" />
      <span class="icon material-symbols-outlined">settings</span>
    </div>
  </div>
</template>

<style scoped>
.barGroup {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.topAppBar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 var(--horizontal-app-padding) 0.5rem /*top left/right bottom*/;
  font-size: 0.8rem;
}
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

@media (min-width: 1000px) and (min-aspect-ratio: 4/3) {
  .barGroup {
    flex-direction: column;
  }
}
</style>
