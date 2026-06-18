import { ref, type Ref } from 'vue'
import { useAudioEngine } from '@/views/useAudioEngine.ts'

export interface Interval {
  semitones: number
}

export interface Note {
  octave: number,
  semitonesFromC: number
}

export function useIntervalChallengeEngine(selectedIntervals: Ref<Interval[]>) {
  const challengeInterval: Ref<Interval> = ref<Interval>({semitones: 0})
  const firstNote = ref<Note>({ octave: 0, semitonesFromC: 0 })
  const secondNote = ref<Note>({ octave: 0, semitonesFromC: 0 })

  function nextIntervalChallenge() {
    const _challengeInterval = selectedIntervals.value[Math.floor(Math.random() * selectedIntervals.value.length)]!
    const octaveFirstNote = Math.floor(Math.random() * 5) + 2
    const firstNoteSemitonsFromC = Math.floor(Math.random() * 12)
    const octaveSecondNote = firstNoteSemitonsFromC + _challengeInterval.semitones >= 12 ? octaveFirstNote + 1 : octaveFirstNote
    const secondNoteSemitonsFromC = (firstNoteSemitonsFromC + _challengeInterval.semitones) % 12

    challengeInterval.value = _challengeInterval;
    firstNote.value = { octave: octaveFirstNote, semitonesFromC: firstNoteSemitonsFromC }
    secondNote.value = { octave: octaveSecondNote, semitonesFromC: secondNoteSemitonsFromC }

    console.log("New challenge interval: ", challengeInterval.value.semitones);
  }

  nextIntervalChallenge();

  return { challengeInterval, firstNote, secondNote, nextIntervalChallenge: nextIntervalChallenge, }
}
