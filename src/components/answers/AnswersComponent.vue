<script setup lang="ts">
import AnswerButton from '@/components/answers/AnswerButton.vue'

interface AnswersProps {
  answers: string[]
}

const props = defineProps<AnswersProps>()
</script>

<template>
  <div class="answersContainer">
    <AnswerButton v-for="(answer, index) in props.answers" :key="index" :answerText="answer" />
  </div>
</template>

<style scoped>
.answersContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5em;
  padding: 0 1em;

  height: 100%;
  overflow-y: auto;

  scroll-snap-type: y mandatory;
}

/*necessary to display gap before first answers*/
.answersContainer::before {
  content: '';
  grid-column-start: 1;
  grid-column-end: 3;
}


.answersContainer::after {
  content: '';
  grid-column-start: 1;
  grid-column-end: 3;
  padding: 1em;
}
</style>
