<script setup lang="ts">
import AnswersComponent from '@/components/answers/AnswersComponent.vue'
import ChallengeComponent from '@/components/challenge/ChallengeComponent.vue'

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
</script>

<template>
  <div>
    <ChallengeComponent />
    <hr/>
    <AnswersComponent :answers="choices" />
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;

  height: 100vh;

  background-color: #fff1ac;
}
hr {
  margin: 0.5em 0;
}
div > * {
  //flex: 1;
}
</style>
