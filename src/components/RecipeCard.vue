<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

interface RecipeCard {
  name: string;
  image: string;
  recipe_description: string;
}

const recipe_cards = ref<RecipeCard[]>([]);

const getRecipeCards = () => {
  const path = 'https://bertakang.pythonanywhere.com/';

  axios.get(path)
    .then((res) => {
      recipe_cards.value = res.data.recipe_cards;
    })
    .catch((err) => {
      console.error(err);
    });
};

getRecipeCards();
</script>


<template>
  <div class="RecipeCard">
    <ul class="card-wrapper-vertical">
      <Router-Link v-for="card in recipe_cards" :to="`/Recipe/${card.name}`" :key="card.id">
        <li>
          <div class="card-details">
            <div class="header">
              <h2> {{ card.name }}</h2>
              <h3> {{ card.time }}</h3>
            </div>
            <div class="card-image">
              <img src="../assets/images/recipes.jpg">
            </div>
            <p>{{ card.description }}</p>
            <div class="button-wrapper">
              <button>Details</button>
            </div>
          </div>
        </li>
      </Router-Link>
    </ul>
  </div>
</template>

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
  ;
  height: 100%;
  margin: 8px 0px;
}
</style>
