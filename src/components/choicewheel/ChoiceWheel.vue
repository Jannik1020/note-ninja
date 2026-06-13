<script setup lang="ts">
import ChoiceWheelItem from '@/components/choicewheel/ChoiceWheelItem.vue'
import { useClampedWheel, useEndlessWheel } from '@/components/choicewheel/composables.ts'
import { toRefs } from 'vue'

interface ChoiceWheelProps {
  choices: string[]
  endlessWheel?: boolean
  amountDisplayedChoices?: number
  selectedChoice?: number
}

const props = withDefaults(defineProps<ChoiceWheelProps>(), {
  endlessWheel: true,
  amountDisplayedChoices: 3,
  selectedChoice: 0,
})

const emit = defineEmits<{
  (e: 'update:selectedChoice', value: number): void
}>()
const { selectedChoice, choices, amountDisplayedChoices } = toRefs(props)

const { displayedChoices } = props.endlessWheel
  ? useEndlessWheel(selectedChoice, choices, amountDisplayedChoices)
  : useClampedWheel(selectedChoice, choices, amountDisplayedChoices)

function onWheel(e: WheelEvent) {
  e.preventDefault()

  const delta = Math.sign(e.deltaY)

  console.log(delta)
  emit('update:selectedChoice', selectedChoice.value + delta)
}
</script>

function onWheel(

<template>
  <div class="container">
    <ChoiceWheelItem style = "scroll-snap-align: center;" v-for="(choice, index) in choices" :key="index" :choiceText="choice" />
  </div>
</template>

<style scoped>
.container {
  height: 200px;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}
</style>
