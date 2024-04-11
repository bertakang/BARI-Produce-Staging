<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import GrapeInfo from './GrapeInfo.vue';

const endpoint = window.location.pathname; // Get the current endpoint
const GrapeName = endpoint.split('/').pop(); // Extract the Grape name from the endpoint
const Grape = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('https://bertakang.pythonanywhere.com/grape');
    const GrapeInfo = response.data.grape_info;
    
    let selectedGrape = null;

    for (let i = 0; i < GrapeInfo.length; i++) {
      if (GrapeName === GrapeInfo[i].name) {
        selectedGrape = GrapeInfo[i];
        
        break; // Exit the loop once the Grape is found
      }
    }

    Grape.value = selectedGrape; 
  } catch (error) {
    console.error('Error fetching Grape data:', error);
  }
});
</script>

<template>
  <div class="GrapesView">
    <!-- Render the GrapeInfo component with the selected Grape object -->
    <GrapeInfo v-if="Grape" :name="Grape.name" :generalinfo="Grape.generalinfo" :healthbenefits="Grape.healthbenefits"
      :PLUinfo="Grape.PLUinfo" :gallery="Grape.gallery" />
  </div>
</template>
