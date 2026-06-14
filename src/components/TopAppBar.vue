<script setup lang="ts">
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
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
}

@media (min-width: 1000px) {
  .barGroup {
    flex-direction: column;
  }
}
</style>
