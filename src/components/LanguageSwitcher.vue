<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import I18nManager from '@/i18n/manager'

const { locale } = useI18n()

const supportedLocales = I18nManager.supportedLocales

function handleClick() {
  locale.value = supportedLocales[(supportedLocales.indexOf(locale.value) + 1) % supportedLocales.length] ?? "de"
  console.log(locale.value);
}
</script>

<template>
  <span class="material-symbols-outlined" @click="handleClick">language</span>
</template>

<style scoped></style>
