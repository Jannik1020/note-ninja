import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface IntervalStats {
  wrongUntilCorrect: number[]
}

interface StoredInterval {
  semitones: number
  i18nKey: string
  statistics: {
    ascending: IntervalStats
    descending: IntervalStats
  }
}
export type ChallengeMode = "ascending" | "descending" | "melody";

export interface GameInterval {
  semitones: number
  displayNameKey: string
}

export const useIntervalsStore = defineStore('intervals', () => {
  const interval18NKeys = () => [
    'interval.answers.unison',
    'interval.answers.min2nd',
    'interval.answers.maj2nd',
    'interval.answers.min3rd',
    'interval.answers.maj3rd',
    'interval.answers.p4th',
    'interval.answers.tritone',
    'interval.answers.p5th',
    'interval.answers.min6th',
    'interval.answers.maj6th',
    'interval.answers.min7th',
    'interval.answers.maj7th',
    'interval.answers.octave',
  ]
  const intervals = ref<StoredInterval[]>(
    interval18NKeys().map((i18nKey, index) => ({
      semitones: index,
      i18nKey: i18nKey,
      statistics: {
        ascending: {
          wrongUntilCorrect: [],
        },
        descending: {
          wrongUntilCorrect: [],
        },
      },
    })),
  )
  const gameIntervals = computed(() =>
    intervals.value.map((interval) => ({
      semitones: interval.semitones,
      displayNameKey: interval.i18nKey
    }))
  );

  function updateStats(semitones: number, mode:ChallengeMode, wrongAnswersUntilCorrect: number) {
    const interval = intervals.value[semitones]
    if (!interval) {
      throw new Error(
        `Cannot update stats for interval with ${semitones} semitones, interval not found`,
      )
    }
    interval.statistics.ascending.wrongUntilCorrect.push(wrongAnswersUntilCorrect)
  }
  return { intervals, gameIntervals, updateStats }
})
