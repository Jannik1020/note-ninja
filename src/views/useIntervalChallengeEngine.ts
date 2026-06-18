import { ref, type Ref } from 'vue'
import type { ChallengeMode, Direction } from '@/stores/intervals.ts'
import { getSecureRandomInRange } from '@/utils.ts'

export interface Interval {
  semitones: number
}

export interface Note {
  octave: number,
  semitonesFromC: number
}


export function useIntervalChallengeEngine(selectedIntervals: Ref<Interval[]>, challengeMode: Ref<ChallengeMode>) {
  const challengeInterval: Ref<Interval> = ref<Interval>({semitones: 0})
  const firstNote = ref<Note>({ octave: 0, semitonesFromC: 0 })
  const secondNote = ref<Note>({ octave: 0, semitonesFromC: 0 })
  const challengeIntervalDirection = ref<Direction>('ascending')

  function nextIntervalChallenge() {
    const _challengeInterval = selectedIntervals.value[getSecureRandomInRange(0, selectedIntervals.value.length - 1)]!
    const octaveFirstNote = getSecureRandomInRange(2, 6);
    const firstNoteSemitonsFromC = getSecureRandomInRange(0, 11);
    const octaveSecondNote = firstNoteSemitonsFromC + _challengeInterval.semitones >= 12 ? octaveFirstNote + 1 : octaveFirstNote
    const secondNoteSemitonsFromC = (firstNoteSemitonsFromC + _challengeInterval.semitones) % 12


    challengeInterval.value = _challengeInterval;
    firstNote.value = { octave: octaveFirstNote, semitonesFromC: firstNoteSemitonsFromC }
    secondNote.value = { octave: octaveSecondNote, semitonesFromC: secondNoteSemitonsFromC }
    challengeIntervalDirection.value = challengeMode.value === "both"
      ? (getSecureRandomInRange(0, 1) === 0 ? 'ascending' : 'descending')
      : challengeMode.value;

    console.log("New challenge interval: ", challengeInterval.value.semitones);
  }

  nextIntervalChallenge();

  return {
    challengeInterval,
    challengeIntervalDirection,
    firstNote,
    secondNote,
    nextIntervalChallenge: nextIntervalChallenge,
  }
}
