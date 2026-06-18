import { ref, type Ref } from 'vue'
import { useAudioEngine } from '@/views/useAudioEngine.ts'
import type { ChallengeMode } from '@/stores/intervals.ts'

export interface Interval {
  semitones: number
}

export interface Note {
  octave: number,
  semitonesFromC: number
}

function getSecureRandomInRange(min: number, max: number) {
  const range = max - min
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return min + (array[0]! % (range + 1))
}



export function useIntervalChallengeEngine(selectedIntervals: Ref<Interval[]>) {
  const challengeInterval: Ref<Interval> = ref<Interval>({semitones: 0})
  const firstNote = ref<Note>({ octave: 0, semitonesFromC: 0 })
  const secondNote = ref<Note>({ octave: 0, semitonesFromC: 0 })
  const challengeMode = ref<ChallengeMode>("ascending");

  function nextIntervalChallenge() {
    const _challengeInterval = selectedIntervals.value[getSecureRandomInRange(0, selectedIntervals.value.length - 1)]!
    const octaveFirstNote = getSecureRandomInRange(2, 6);
    const firstNoteSemitonsFromC = getSecureRandomInRange(0, 11);
    const octaveSecondNote = firstNoteSemitonsFromC + _challengeInterval.semitones >= 12 ? octaveFirstNote + 1 : octaveFirstNote
    const secondNoteSemitonsFromC = (firstNoteSemitonsFromC + _challengeInterval.semitones) % 12


    challengeInterval.value = _challengeInterval;
    firstNote.value = { octave: octaveFirstNote, semitonesFromC: firstNoteSemitonsFromC }
    secondNote.value = { octave: octaveSecondNote, semitonesFromC: secondNoteSemitonsFromC }
    challengeMode.value = getSecureRandomInRange(0,1) === 0 ? "ascending" : "descending";

    console.log("New challenge interval: ", challengeInterval.value.semitones);
  }

  nextIntervalChallenge();

  return { challengeInterval, challengeMode, firstNote, secondNote, nextIntervalChallenge: nextIntervalChallenge, }
}
