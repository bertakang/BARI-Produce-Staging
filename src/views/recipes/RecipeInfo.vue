<script setup lang="ts">
import { defineProps, ref } from 'vue';

const props = defineProps<{
  name?: string,
  generalinfo?: string,
  healthbenefits?: string,
  PLUinfo?: string,
  gallery?: string
}>()
</script>

<template>
  <div class="RecipeInfo">
  </div>
</template>


<style scoped>
</style>
