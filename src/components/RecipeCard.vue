<template>
  <div class="RecipeCard">
    <ul class="card-wrapper-vertical">
      <li v-for="card in recipe_cards" :key="card.name">
        <router-link :to="`/Recipe/${formatRecipeName(card.name)}`">
          <div class="card-details">
            <div class="header">
              <h2> {{ card.name }}</h2>
              <h3>{{ card.time }}</h3>
            </div>
            <div class="card-image">
              <img :src="'https://www.pythonanywhere.com/user/bertakang/files/home/bertakang/mysite/' + card.file_path">
            </div>
            <p>{{ card.description }}</p>
            <div class="button-wrapper">
              <button>Details</button>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

interface RecipeCard {
  name: string;
  file_path: string;
  description: string;
  time: string;
}

const recipe_cards = ref<RecipeCard[]>([]);

const getRecipeCards = () => {
  const mainPath = 'https://bertakang.pythonanywhere.com/';
  const imagePath = 'https://bertakang.pythonanywhere.com/images';

  axios.all([
    axios.get(mainPath),
    axios.get(imagePath)
  ])
  .then(axios.spread((mainRes, imageRes) => {
    const recipeCardsData = mainRes.data.recipe_cards;
    const recipeImagesData = imageRes.data.recipe_images;

    const mergedData = recipeCardsData.map((recipe: any) => {
      const correspondingImage = recipeImagesData.find((image: any) => image.recipe_option === recipe.name);
      return {
        name: recipe.name,
        file_path: correspondingImage ? correspondingImage.file_path : '',
        description: recipe.description,
        time: recipe.time
      };
    });

    recipe_cards.value = mergedData;
  }))
  .catch((error) => {
    console.error('Error fetching recipe cards:', error);
  });
};

const formatRecipeName = (name: string) => name.replace(/ /g, '%20');

getRecipeCards();
</script>

<style scoped>


h2 {
  font-size: 22px;
  font-weight: 600;
}

h3 {
  font-size: 20px;
}

p {
  font-size: 20px;
}

.button-wrapper {
  display: flex;
  flex-grow: 1;
  align-items: end;
  justify-content: end;
}

.header {
  height: 64px;
  width: auto;
}

.card-wrapper-vertical {
  display: flex;
  flex-direction: column;
  margin-top: 3.5rem;
}

.card-image {
  height: 200px;
  width: auto;
  object-fit: contain;
}

.card-details {
  font-family: 'Lato', sans-serif;
  display: flex;
  flex-direction: column;
  background-color: bisque;
  border: 1px solid black;
  color: black;
  border-radius: 16px;
  padding: 16px;
  width: 100%;
  height: 100%;
  margin: 8px 0px;
}
</style>
