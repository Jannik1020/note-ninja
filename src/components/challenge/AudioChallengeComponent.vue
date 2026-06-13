<script setup lang="ts">
const props = defineProps<{ prompt: string }>()

let audioContext: AudioContext | null = null

function getAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext()
  }
  return audioContext;
}

async function handleClickPlayAudio() {
  const ctx = getAudioContext();

  await ctx.resume()

  const response = await fetch('audio/C4v10.mp3')
  const buffer = await response.arrayBuffer()
  const sample = await ctx.decodeAudioData(buffer)

  const source = ctx.createBufferSource()
  source.buffer = sample
  source.connect(ctx.destination)
  source.start(0)
}
</script>

<template>
  <div class="challengeContainer">
    <h1>{{ props.prompt }}</h1>
    <div id="btnPlayAudio" @click="handleClickPlayAudio">
      <p>Play Audio</p>
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
