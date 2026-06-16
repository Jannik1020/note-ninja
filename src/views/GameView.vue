<script setup lang="ts">
import AnswersComponent from '@/components/answers/AnswersComponent.vue'
import AudioChallengeComponent from '@/components/challenge/AudioChallengeComponent.vue'
import TopAppBar from '@/components/TopAppBar.vue'
import { useGameState } from '@/views/useGameState.ts'
import { useAudioEngine } from '@/views/useAudioEngine.ts'
import { computed, onMounted, ref, watch } from 'vue'
import { type Interval, useIntervalChallengeEngine } from '@/views/useIntervalChallengeEngine.js'
import { useI18n } from 'vue-i18n'

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

const { t, locale } = useI18n()

// const choices = [
//   'Same Note',
//   'Minor 2nd',
//   'Major 2nd',
//   'Minor 3rd',
//   'Major 3rd',
//   'Perfect 4th',
//   'Tritone',
//   'Perfect 5th',
//   'Minor 6th',
//   'Major 6th',
//   'Minor 7th',
//   'Major 7th',
//   'Octave',
// ]

const getChoices = () => [
  t('interval.answers.unison'),
  t('interval.answers.min2nd'),
  t('interval.answers.maj2nd'),
  t('interval.answers.min3rd'),
  t('interval.answers.maj3rd'),
  t('interval.answers.p4th'),
  t('interval.answers.tritone'),
  t('interval.answers.p5th'),
  t('interval.answers.min6th'),
  t('interval.answers.maj6th'),
  t('interval.answers.min7th'),
  t('interval.answers.maj7th'),
  t('interval.answers.octave'),
]
const choices = ref(getChoices())

const { load, playPitchShifted } = useAudioEngine()

const intervals = ref<Interval[]>(
  choices.value.map((intervalName, index) => ({
    semitones: index,
    displayName: intervalName,
  })),
)

const { challengeInterval, firstNote, secondNote, nextChallenge } = useIntervalChallengeEngine(intervals)

const sampleFileFirstNote = computed(
  () =>
    (
      samples.find((value) => value.octave == firstNote.value.octave) ?? {
        octave: 0,
        fileName: 'C2v10.mp3',
      }
    ).fileName,
)

const sampleFileSecondNote = computed(
  () =>
    (
      samples.find((value) => value.octave == secondNote.value.octave) ?? {
        octave: 0,
        fileName: 'C2v10.mp3',
      }
    ).fileName,
)

async function loadIntervalSamples() {
  await load(sampleFileFirstNote.value, `audio/${sampleFileFirstNote.value}`)
  await load(sampleFileSecondNote.value, `audio/${sampleFileSecondNote.value}`)
}

onMounted(async () => {
  await loadIntervalSamples()
})

async function playIntervalChallenge() {
  await playPitchShifted(sampleFileFirstNote.value, firstNote.value.semitonesFromC)
  setTimeout(() => {
    playPitchShifted(sampleFileSecondNote.value, secondNote.value.semitonesFromC)
  }, 1000)
}

const answers = computed(() =>
  choices.value.map((value, index) => ({
    text: value,
    correct: index === challengeInterval.value.semitones,
  })),
)

function handleCorrectSelection() {
  setTimeout(async () => {
    nextChallenge()
    await loadIntervalSamples()
    nextRound(answers.value)
  }, 1000)
}

const { choicesState, handleSelection, nextRound, replaceAnswers } = useGameState(
  answers.value,
  handleCorrectSelection,
)

watch(locale, () => {
  choices.value = getChoices()
  replaceAnswers(answers.value)
})
</script>

<template>
  <div class="container">
    <TopAppBar id="topAppBar" />
    <AudioChallengeComponent
      id="challenge"
      :prompt="t('interval.challenge.title')"
      @play="playIntervalChallenge"
    />
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
@media (min-width: 1000px) and (min-aspect-ratio: 4/3) {
  .container {
    flex-direction: row;
  }
  #topAppBar {
    flex-direction: column;
  }
  .statsContainer {
    flex-direction: column;
  }
}
</style>
