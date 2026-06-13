<script setup lang="ts">
interface Props {
  choiceText: string;
}
const props = defineProps<Props>();
</script>

<template>
  <div>
    <p>{{props.choiceText}}</p>
  </div>
</template>

<style scoped>
div {
  text-align: center;
  padding: 20px 0;
}
</style>
