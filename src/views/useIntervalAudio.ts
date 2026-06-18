import { computed, onMounted, ref, type Ref, watch, watchEffect } from 'vue'
import type { Note } from '@/views/useIntervalChallengeEngine.ts'
import { useAudioEngine } from '@/views/useAudioEngine.ts'
import type { ChallengeMode } from '@/stores/intervals.ts'

export function useIntervalAudio(firstNote: Ref<Note>, secondNote: Ref<Note>, challengeMode: Ref<ChallengeMode>) {

  interface PianoSampleFile {
    octave: number
    fileName: string
  }


  const samples: PianoSampleFile[] = [
    'C2v10.mp3',
    'C3v10.mp3',
    'C4v10.mp3',
    'C5v10.mp3',
    'C6v10.mp3',
    'C7v10.mp3',
  ].map((path, index) => ({ octave: index + 2, fileName: path }))

  const fileNameFirstNoteSample = computed(
    () =>
      (
        samples.find((value) => value.octave == firstNote.value.octave) ?? {
          octave: 0,
          fileName: 'C2v10.mp3',
        }
      ).fileName,
  )

  const fileNameSecondNoteSample = computed(
    () =>
      (
        samples.find((value) => value.octave == secondNote.value.octave) ?? {
          octave: 0,
          fileName: 'C2v10.mp3',
        }
      ).fileName,
  )

  const { load, playPitchShifted } = useAudioEngine()

  async function loadIntervalSamples() {
    await load(fileNameFirstNoteSample.value, `audio/${fileNameFirstNoteSample.value}`)
    await load(fileNameSecondNoteSample.value, `audio/${fileNameSecondNoteSample.value}`)
  }

  async function playIntervalChallenge() {
    if(challengeMode.value == "ascending") {
      await playPitchShifted(fileNameFirstNoteSample.value, firstNote.value.semitonesFromC)
      setTimeout(() => {
        playPitchShifted(fileNameSecondNoteSample.value, secondNote.value.semitonesFromC)
      }, 1000)
    } else {
      await playPitchShifted(fileNameSecondNoteSample.value, secondNote.value.semitonesFromC)
      setTimeout(() => {
        playPitchShifted(fileNameFirstNoteSample.value, firstNote.value.semitonesFromC)
        }, 1000)
    }
  }

  onMounted(async () => {
    await loadIntervalSamples()
  })

  watch([firstNote, secondNote], async () => {
    await loadIntervalSamples()
    console.log("loaded new samples");
  });

  return {playIntervalChallenge}
}
