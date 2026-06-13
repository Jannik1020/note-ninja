<script setup lang="ts">
import AnswersComponent from '@/components/answers/AnswersComponent.vue'
import AudioChallengeComponent from '@/components/challenge/AudioChallengeComponent.vue'
import TopAppBar from '@/components/TopAppBar.vue'
import { ref } from 'vue'
import type { AnswerButtonState } from '@/components/answers/AnswerButton.vue'
import { useGameState } from '@/views/useGameState.ts'

const choices = [
  'Same Note',
  'Minor 2nd',
  'Major 2nd',
  'Minor 3rd',
  'Major 3rd',
  'Perfect 4th',
  'Perfect 5th',
  'Minor 6th',
  'Major 6th',
  'Minor 7th',
  'Major 7th',
  'Octave',
]
/*
const choicesState = ref(
  choices.map((value) => ({ text: value, selected: false, state: '' as AnswerButtonState })),
)
function handleSelection({ index, value }: { index: number; value: boolean }) {
  if (value) {
    if (index === choicesState.value.length - 1) {
      choicesState.value[index]!.state = 'correct'
    } else {
      choicesState.value[index]!.state = 'incorrect'
    }
  } else {
    choicesState.value[index]!.state = ''
  }

  choicesState.value[index]!.selected = value;
}*/

const {choicesState, handleSelection} = useGameState(choices.map(value => ({
  text: value,
  correct: ["Octave", "Minor 3rd"].includes(value)
})));

</script>

<template>
  <div class="container">
    <TopAppBar id="topAppBar" />
    <AudioChallengeComponent id="challenge" prompt="Identify the interval..." />
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
