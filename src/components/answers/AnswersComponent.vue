<script setup lang="ts">
import AnswerButton, {
  type AnswerButtonProps,
  type AnswerButtonState,
} from '@/components/answers/AnswerButton.vue'
import { useI18n } from 'vue-i18n'

export type AnswerButtonPropsI18N = Omit<AnswerButtonProps, "text"> & {i18nKey: string}
interface AnswersProps {
  answers: AnswerButtonPropsI18N[]
}

const {t} = useI18n();

const props = defineProps<AnswersProps>()
const emit = defineEmits<{
  (e: 'update:selected', value: { index: number; selected: boolean }): void
}>()
</script>

<template>
  <div class="answersContainer">
    <AnswerButton
      v-for="({ i18nKey, selected, state }, index) in props.answers"
      :key="index"
      :text="t(i18nKey)"
      :selected="selected"
      :state="state"
      @update:selected="emit('update:selected', { index: index, selected: $event })"
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
