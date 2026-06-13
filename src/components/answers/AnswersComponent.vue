<script setup lang="ts">
import AnswerButton from '@/components/answers/AnswerButton.vue'

interface Answer {
  text: string
  selected: boolean
}
interface AnswersProps {
  answers: Answer[]
}

const props = defineProps<AnswersProps>()
const emit = defineEmits<{
  (e: 'update:answers', value: Answer[]): void
}>()

function onSelect(index: number, value: boolean) {
  const updated = props.answers.map((answer, i) => (i === index ? { ...answer, selected: value } : answer))

  emit('update:answers', updated)
}
</script>

<template>
  <div class="answersContainer">
    <AnswerButton
      v-for="({ text, selected }, index) in props.answers"
      :key="index"
      :answerText="text"
      :selected="selected"
      @update:selected="onSelect(index, $event)"
    />
  </div>
</template>

<style scoped>
.answersContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5em;
  padding: 0 var(--horizontal-app-padding);

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
