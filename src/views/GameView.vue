<script setup lang="ts">
import AnswersComponent from '@/components/answers/AnswersComponent.vue'
import AudioChallengeComponent from '@/components/challenge/AudioChallengeComponent.vue'
import TopAppBar from '@/components/TopAppBar.vue'
import { useGameState } from '@/views/useGameState.ts'
import { useAudioEngine } from '@/views/useAudioEngine.ts'
import { onMounted } from 'vue'

interface PianoSampleFile {
  octave: number
  fileName: string
}

const samples: PianoSampleFile[] = [
  'C2v10.mp3',
  'C3v10.mp3',
  'C4v10.mp3',
  'C5v10.mp3',
  'C6v10.mp3',
  'C7v10.mp3',
].map((path, index) => ({ octave: index + 2, fileName: path }))

const choices = [
  'Same Note',
  'Minor 2nd',
  'Major 2nd',
  'Minor 3rd',
  'Major 3rd',
  'Perfect 4th',
  'Tritone',
  'Perfect 5th',
  'Minor 6th',
  'Major 6th',
  'Minor 7th',
  'Major 7th',
  'Octave',
]

const { load, play, playPitchShifted } = useAudioEngine()

interface Interval {
  semitones: number
  displayName: string
}

const intervals: Interval[] = choices.map((intervalName, index) => ({
  semitones: index,
  displayName: intervalName,
}))
const challengeInterval: Interval = intervals[Math.floor(Math.random() * intervals.length)]!

const octaveFirstNote = Math.floor(Math.random() * 5) + 2
const firstNote = Math.floor(Math.random() * 12)

const octaveSecondNote =
  firstNote + challengeInterval.semitones >= 12 ? octaveFirstNote + 1 : octaveFirstNote
const secondNote = (firstNote + challengeInterval.semitones) % 12

console.log(
  `${firstNote} ${octaveFirstNote} => ${secondNote} ${octaveSecondNote} (${challengeInterval.displayName})`,
)

const sampleFileFirstNote = (
  samples.find((value) => value.octave == octaveFirstNote) ?? { octave: 0, fileName: 'C2v10.mp3' }
).fileName

const sampleFileSecondNote = (
  samples.find((value) => value.octave == octaveSecondNote) ?? { octave: 0, fileName: 'C2v10.mp3' }
).fileName

onMounted(async () => {
  await load(sampleFileFirstNote, `audio/${sampleFileFirstNote}`)
  await load(sampleFileSecondNote, `audio/${sampleFileSecondNote}`)
})

async function playIntervalChallenge() {
  await playPitchShifted(sampleFileFirstNote, firstNote)
  setTimeout(() => {
    playPitchShifted(sampleFileSecondNote, secondNote)
  }, 1000)
}

const { choicesState, handleSelection } = useGameState(
  choices.map((value, index) => ({
    text: value,
    correct: index === challengeInterval.semitones,
  })),
)
</script>

<template>
  <div class="container">
    <TopAppBar id="topAppBar" />
    <AudioChallengeComponent id="challenge" prompt="Identify the interval..." @play="playIntervalChallenge"/>
    <div class="divider"></div>
    <AnswersComponent id="answers" :answers="choicesState" @update:selected="handleSelection" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;

  height: 100vh;
  padding: 0.5rem 0;

  background-color: #fff1ac;
}
.divider {
  background-color: black;
  padding: 1px;
  /*margin: 0.3rem 0;*/
}
#topAppBar {
}
#challenge {
  flex: 5;
}
#answers {
  flex: 6;
}
</style>
