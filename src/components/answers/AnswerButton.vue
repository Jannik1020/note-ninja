<script setup lang="ts">
interface AnswerButtonProps {
  answerText: string
}

const props = defineProps<AnswerButtonProps>()
</script>

<template>
  <div>
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
  background-color: white;

  scroll-snap-align: center;
}
</style>
