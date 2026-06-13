<script setup lang="ts"></script>

<template>
  <div class="topAppBar">
    <div class="flexRow">
      <div>
        <p>Score</p>
        <p>13</p>
      </div>
      <div>
        <p>Score</p>
        <p>200</p>
      </div>
    </div>
    <span class="icon material-symbols-outlined">settings</span>
  </div>
</template>

<style scoped>
.flexRow {
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
</style>
