<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import FruitInfo from './FruitInfo.vue';

const endpoint = window.location.pathname; // Get the current endpoint
const fruitName = endpoint.split('/').pop(); // Extract the fruit name from the endpoint
const fruit = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('https://bari-produce-project.wl.r.appspot.com/fruit');
    const fruitInfo = response.data.fruit_info;
    
    let selectedFruit = null;

    for (let i = 0; i < fruitInfo.length; i++) {
      if (fruitName === fruitInfo[i].name) {
        selectedFruit = fruitInfo[i];
        console.log("Selected fruit:", selectedFruit.name, "fruitName from the API:", fruitName);
        
        break; // Exit the loop once the fruit is found
      }
    }

    fruit.value = selectedFruit; 
    console.log(fruit.value)
  } catch (error) {
    console.error('Error fetching fruit data:', error);
  }
});
</script>

<template>
  <div class="FruitsView">
    <!-- Render the FruitInfo component with the selected fruit object -->
    <FruitInfo v-if="fruit" :name="fruit.name" :generalinfo="fruit.generalinfo" :healthbenefits="fruit.healthbenefits"
      :PLUinfo="fruit.PLUinfo" :gallery="fruit.gallery" />
  </div>
</template>
