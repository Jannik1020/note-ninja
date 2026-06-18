import { type Ref, ref } from 'vue'
import type { AnswerButtonProps, AnswerButtonState } from '@/components/answers/AnswerButton.vue'
import type { AnswerButtonPropsI18N } from '@/components/answers/AnswersComponent.vue'

export interface Answer {
  i18nKey: string,
  correct: boolean,
}

export function useGameState(answers: Ref<Answer[]>, onCorrect: () => void, onWrong: () => void) {
  const choices = ref<({correct: boolean} & AnswerButtonPropsI18N)[]>(
    []
  )

  function startGameRound() {
    choices.value = answers.value.map((a) => ({
      ...a,
      selected: false,
      state: '' as AnswerButtonState,
    }))
  }

  function handleSelection({ index, selected }: { index: number; selected: boolean }) {
    const choice = choices.value[index];
    if (selected) {
      if (choice!.correct) {
        choice!.state = 'correct'
        onCorrect()
      } else {
        choice!.state = 'incorrect'
        onWrong()
      }
    } else {
      choice!.state = ''
    }
    choice!.selected = selected
  }

  return { choices: choices, startGameRound, handleSelection};
}
