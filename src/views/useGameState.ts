import { ref } from 'vue'
import type { AnswerButtonProps, AnswerButtonState } from '@/components/answers/AnswerButton.vue'

export interface Answer {
  text: string,
  correct: boolean,
}

export function useGameState(answers: Answer[]) {
  const choicesState = ref<({correct: boolean} & AnswerButtonProps)[]>(
    answers.map((answer) => ({ text: answer.text, correct: answer.correct }))
  )
  console.log(choicesState.value);
  function handleSelection({ index, value }: { index: number; value: boolean }) {
    if (value) {
      if (choicesState.value[index]!.correct) {
        choicesState.value[index]!.state = 'correct'
      } else {
        choicesState.value[index]!.state = 'incorrect'
      }
    } else {
      choicesState.value[index]!.state = ''
    }

    choicesState.value[index]!.selected = value
  }
  return {choicesState, handleSelection};
}
