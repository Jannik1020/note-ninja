<script setup lang="ts">
const props = defineProps<{ prompt: string }>()
</script>

<template>
  <div class="challengeContainer">
    <h1>{{ props.prompt }}</h1>
    <div id="btnPlayAudio">
      <p>Play Audio</p>
      <span class="material-symbols-outlined">play_arrow</span>
      <div class="padding"></div>
    </div>
  </div>
</template>

<style scoped>
.challengeContainer {
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
}
h1 {
  flex-grow: 1;
  display: flex;
  align-items: center;
  text-align: center;

  background: white;
  border-radius: 0.3rem;
  margin: 0.3rem 0;
  border: 4px solid black;
}
#btnPlayAudio {
  background-color: black;
  color: white;
  border-radius: 0.3em;

  display: flex;
  flex-direction: row;
  justify-content: stretch;

  position: relative;
}

#btnPlayAudio p {
  font-weight: bold;
  padding: 0.5rem 1rem;
}

#btnPlayAudio span {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.padding {
  height: 100%;
}
</style>
