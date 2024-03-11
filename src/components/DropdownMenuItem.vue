<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps<{
  category: string,
  link?: string
}>()

// Dropdown menu
const dropdownOpen = ref<boolean>(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
}
</script>

<template>
  <div class="dropdown-menu-item">
    <a v-if="props.link" :href="`/${props.category}/${props.link}`" class="dropdown-link">{{ props.link }}</a>
  </div>
</template>

<style scoped>
.dropdown-menu-item {
  display: flex;
  top: 0;
}

.dropdown-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
}

.dropdown-link {
  padding: 8px 16px 8px 16px;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 20px;
}

@media screen and (max-width: 667px) {
  .dropdown-link {
  padding: 8px 16px 8px 16px;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 20px;
  text-indent:64px;
}
}
</style>
