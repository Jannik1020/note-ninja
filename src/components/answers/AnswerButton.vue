<script setup lang="ts">
import { computed, ref } from 'vue'

interface AnswerButtonProps {
  answerText: string
  selected?: boolean
  lockSelection?: boolean
  correct?: 'correct' | 'incorrect' | ''
}

const props = withDefaults(defineProps<AnswerButtonProps>(), {
  selected: false,
  lockSelection: false,
  correct: '',
})

const emit = defineEmits<{
  (e: 'update:selected', value: boolean): void
}>()

function handleClick() {
  console.log(`clicked ${props.answerText}`)
  if (props.lockSelection) {
    if (props.selected) {
      return
    }
    emit('update:selected', true)
  } else {
    console.log(`emitted ${!props.selected}`)
    emit('update:selected', !props.selected)
  }
}

const className = computed(() => {
  let str = ''
  if (props.selected) {
    str += 'selected '
  }
  str += props.correct
  return str
})
</script>

<template>
  <div :class="className" @click="handleClick">
    <p>{{ props.answerText }}</p>
  </div>
</template>

<style scoped>
p {
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
}
div {
  border: 4px solid black;
  border-radius: 0.1em;
  background-color: white;

  scroll-snap-align: center;

  transition: 0.2s;
}
div:hover {
  cursor: pointer;
  transform: scale(1.01);
  transition: 0.2s;
}

div.selected {
  background-color: turquoise; /* palegreen; honeydew;*/
  color: white;
  transition: color 0.3s;
}
div.correct {
  background-color: #90d890;
  color: white;
}

div.incorrect {
  background-color: #db7070;
  color: white;
}

div:is(.selected, .correct, .incorrect) > p {
  transform: rotateY(360deg);
  transition: transform 0.7s;
}
</style>
