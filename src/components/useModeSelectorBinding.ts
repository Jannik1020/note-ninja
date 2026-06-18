import type { ChallengeMode } from '@/stores/intervals.ts'

export function useModeSelectorBinding() {
  const props = defineProps<{
    challengeMode: ChallengeMode
  }>()

  const emit = defineEmits<{
    (e: 'update:challengeMode', value: ChallengeMode): void
  }>()

  return {props, emit}
}
