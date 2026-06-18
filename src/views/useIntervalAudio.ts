import { computed, onMounted, type Ref, watch } from 'vue'
import type { Note } from '@/views/useIntervalChallengeEngine.ts'
import { useAudioEngine } from '@/views/useAudioEngine.ts'
import type { Direction } from '@/stores/intervals.ts'

export function useIntervalAudio(firstNote: Ref<Note>, secondNote: Ref<Note>, intervalDirection: Ref<Direction>) {

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


  const buffers = new Map<string, AudioBuffer>()

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
    samples.forEach((sample) => {load(sample.fileName, `audio/${sample.fileName}`)})
    //await load(fileNameFirstNoteSample.value, `audio/${fileNameFirstNoteSample.value}`)
    //await load(fileNameSecondNoteSample.value, `audio/${fileNameSecondNoteSample.value}`)
  }

  async function playIntervalChallenge() {
    if(intervalDirection.value == "ascending") {
      playPitchShifted(fileNameFirstNoteSample.value, firstNote.value.semitonesFromC, 0)
      playPitchShifted(fileNameSecondNoteSample.value, secondNote.value.semitonesFromC, 1)
    } else if (intervalDirection.value == "descending") {
      playPitchShifted(fileNameSecondNoteSample.value, secondNote.value.semitonesFromC, 0)
      playPitchShifted(fileNameFirstNoteSample.value, firstNote.value.semitonesFromC, 1)
    } else if(intervalDirection.value === "simultaneous") {
      playPitchShifted(fileNameSecondNoteSample.value, secondNote.value.semitonesFromC, 0)
      playPitchShifted(fileNameFirstNoteSample.value, firstNote.value.semitonesFromC, 0)
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
