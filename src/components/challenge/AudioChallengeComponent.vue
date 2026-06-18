<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const props = defineProps<{ prompt: string }>()
const emit = defineEmits<{ (e: 'play'): void }>()

const {t} = useI18n();
</script>

<template>
  <div class="challengeContainer">
    <h1>{{ props.prompt }}</h1>
    <div id="btnPlayAudio" @click="emit('play')">
      <p>{{t("interval.challenge.play")}}</p>
      <span class="material-symbols-outlined">play_arrow</span>
      <div class="padding"></div>
    </div>
  </div>
</template>

<style scoped>
.challengeContainer {
  display: flex;
  flex-direction: column;

  padding: 0 var(--horizontal-app-padding) 0.5rem;
}
h1 {
  flex-grow: 1;
  display: flex;
  align-items: center;
  text-align: center;

  background: white;
  border-radius: 0.3rem;
  margin-bottom: 0.3rem;
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

  transition: 0.2s;
}

#btnPlayAudio:hover {
  cursor: pointer;
  transform: scale(1.01);

  transition: 0.2s;
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
