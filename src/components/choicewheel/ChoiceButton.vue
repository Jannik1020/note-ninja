<script setup lang="ts">
interface Props {
  choiceText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  choiceText: "choice"
});

</script>

<template>
  <div>
    <p>{{props.choiceText}}</p>
  </div>
</template>

<style scoped></style>
