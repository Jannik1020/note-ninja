<script setup lang="ts">
import AnswersComponent from '@/components/answers/AnswersComponent.vue'
import ChallengeComponent from '@/components/challenge/ChallengeComponent.vue'
import AudioChallengeComponent from '@/components/challenge/AudioChallengeComponent.vue'

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
  <div class="container">
    <AudioChallengeComponent id="challenge" prompt="Identify the intervall..." />
    <div class="divider"></div>
    <AnswersComponent id="answers" :answers="choices" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;

  height: 100vh;

  background-color: #fff1ac;
}
.divider {
  background-color: black;
  padding: 1px;
  margin: 0.3rem 0;
}
#challenge{
  flex: 3;
}
#answers {
  flex: 2;
}
</style>
