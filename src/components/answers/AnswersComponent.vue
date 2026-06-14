<script setup lang="ts">
import AnswerButton, {
  type AnswerButtonProps,
  type AnswerButtonState,
} from '@/components/answers/AnswerButton.vue'

interface AnswersProps {
  answers: AnswerButtonProps[]
}

const props = defineProps<AnswersProps>()
const emit = defineEmits<{
  (e: 'update:selected', value: { index: number; value: boolean }): void
}>()
</script>

<template>
  <div class="answersContainer">
    <AnswerButton
      v-for="({ text, selected, state }, index) in props.answers"
      :key="index"
      :text="text"
      :selected="selected"
      :state="state"
      @update:selected="emit('update:selected', { index: index, value: $event })"
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

@media (min-width: 700px) {
  .answersContainer {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .answersContainer::before {
    grid-column-end: 4;
  }

  .answersContainer::after {
    grid-column-end: 4;
  }
}
</style>
