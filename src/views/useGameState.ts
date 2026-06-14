import { ref } from 'vue'
import type { AnswerButtonProps, AnswerButtonState } from '@/components/answers/AnswerButton.vue'

export interface Answer {
  text: string,
  correct: boolean,
}

export function useGameState(answers: Answer[], handleCorrectSelection: () => void) {
  const choicesState = ref<({correct: boolean} & AnswerButtonProps)[]>(
    [...answers]
  )
  console.log(choicesState.value);
  function handleSelection({ index, value }: { index: number; value: boolean }) {
    if (value) {
      if (choicesState.value[index]!.correct) {
        choicesState.value[index]!.state = 'correct'
        handleCorrectSelection()
      } else {
        choicesState.value[index]!.state = 'incorrect'
      }
    } else {
      choicesState.value[index]!.state = ''
    }

    choicesState.value[index]!.selected = value
  }

  function normalizeAnswers(answers: Answer[]) {
    return answers.map(a => ({
      text: a.text,
      correct: a.correct,
      selected: false,
      state: '' as AnswerButtonState,
    }))
  }

  function nextRound(answers: Answer[]) {
    choicesState.value = normalizeAnswers(answers);
  }

  return {choicesState, handleSelection, nextRound};
}
