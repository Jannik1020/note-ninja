import { computed, type Ref, ref, watch } from 'vue'

class LooseRequired<T> {}

class ChoiceWheelProps {}


function wrapIndex(idx: number, max: number): number {
  //((i % length) + length) % length
  return ((idx % max) + max) % max
}

export function useEndlessWheel(
  selectedChoiceIdx: Ref<number>,
  choices: Ref<string[]>,
  amountDisplayedChoices: Ref<number>,
) {
  const displayedChoices = computed(() => {
    const odd = amountDisplayedChoices.value % 2 != 0

    const amountChoicesAboveSelected = odd
      ? (amountDisplayedChoices.value - 1) / 2 // odd amount => same above, same below
      : amountDisplayedChoices.value / 2 - 1 // even amount => one more below than above

    const amountChoicesBelowSelected = odd
      ? amountChoicesAboveSelected
      : amountChoicesAboveSelected + 1

    // can be negative
    const topMostDisplayedChoiceIdx = selectedChoiceIdx.value - amountChoicesAboveSelected

    // can exceed total amount of choices
    const bottomMostDisplayedChoiceIdx = selectedChoiceIdx.value + amountChoicesBelowSelected

    const displayedChoices: string[] = []

    for (let i = topMostDisplayedChoiceIdx; i <= bottomMostDisplayedChoiceIdx; i++) {
      const idx = wrapIndex(i, choices.value.length)
      displayedChoices.push(choices.value[idx]!) // index definitely in range
    }

    return displayedChoices
  })

  return { displayedChoices }
}

export function useClampedWheel(
  selectedChoiceIdx: Ref<number>,
  choices: Ref<string[]>,
  amountDisplayedChoices: Ref<number>,
) {
  const safeIndex = computed(() =>
    Math.min(Math.max(selectedChoiceIdx.value, 0), choices.value.length - 1),
  )
  const displayedChoices = computed(() => {
    const odd = amountDisplayedChoices.value % 2 != 0

    const amountChoicesAboveSelected = odd
      ? (amountDisplayedChoices.value - 1) / 2 // odd amount => same above, same below
      : amountDisplayedChoices.value / 2 - 1 // even amount => one more below than above

    const amountChoicesBelowSelected = odd
      ? amountChoicesAboveSelected
      : amountChoicesAboveSelected + 1

    const topMostDisplayedChoiceIdx = Math.max(safeIndex.value - amountChoicesAboveSelected, 0)

    const bottomMostDisplayedChoiceIdx = Math.min(
      safeIndex.value + amountChoicesBelowSelected,
      choices.value.length - 1,
    )

    const displayedChoices: string[] = choices.value.slice(topMostDisplayedChoiceIdx, bottomMostDisplayedChoiceIdx + 1);

    return displayedChoices
  })

  return { displayedChoices }
}
