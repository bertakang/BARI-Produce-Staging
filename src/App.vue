<script setup lang="ts">
import '@fortawesome/fontawesome-free/css/all.css'
import navbar from './components/NavBar.vue';
import contact from './components/Contact.vue';
</script>

<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <contact></contact>
  </div>
</template>

<style scoped>

</style>