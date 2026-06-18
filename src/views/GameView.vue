<script setup lang="ts">
import AnswersComponent from '@/components/answers/AnswersComponent.vue'
import AudioChallengeComponent from '@/components/challenge/AudioChallengeComponent.vue'
import TopAppBar from '@/components/TopAppBar.vue'
import { type Answer, useGameState } from '@/views/useGameState.ts'
import { useAudioEngine } from '@/views/useAudioEngine.ts'
import { computed, onMounted, ref, watch } from 'vue'
import { type Interval, useIntervalChallengeEngine } from '@/views/useIntervalChallengeEngine.js'
import { useI18n } from 'vue-i18n'
import { useIntervalsStore } from '@/stores/intervals.ts'
import { storeToRefs } from 'pinia'
import { useIntervalAudio } from '@/views/useIntervalAudio.ts'


const { t, locale } = useI18n()

const intervalStore = useIntervalsStore()
const {intervals} = storeToRefs(intervalStore)

const { challengeInterval, challengeMode, firstNote, secondNote, nextIntervalChallenge } =
  useIntervalChallengeEngine(intervals)
const {playIntervalChallenge} = useIntervalAudio(firstNote, secondNote, challengeMode);

const answers = computed(() => {
  return intervals.value.map((i) => ({
    i18nKey: i.i18nKey,
    correct: i.semitones === challengeInterval.value.semitones
  }))
})
const { choices, handleSelection, startGameRound } = useGameState(
  answers,
  handleCorrectSelection,
  handleWrongSelection,
)

onMounted(() => {
  startGameRound()
  console.log(choices.value)
})

const wrongAnswers = ref<number>(0)

function handleCorrectSelection() {
  setTimeout(async () => {
    intervalStore.updateStats(challengeInterval.value.semitones, 'ascending', wrongAnswers.value)
    console.log(
      intervalStore.intervals.map(
        (i) => `${i.i18nKey}: ${i.statistics.ascending.wrongUntilCorrect.toString()}`,
      ),
    )
    wrongAnswers.value = 0

    nextIntervalChallenge()
    //await loadIntervalSamples()

    startGameRound()
  }, 1000)
}

function handleWrongSelection() {
  wrongAnswers.value++
}

// TODO remember unselect is still possible
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
    <AnswersComponent id="answers" :answers="choices" @update:selected="handleSelection" />
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
