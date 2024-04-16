<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import RecipeInfo from './RecipeInfo.vue';

const endpoint = window.location.pathname || '';
const RecipeName = endpoint.split('/').pop();
const formattedRecipeName = RecipeName.replace(/%20/g, ' ');
const Recipe = ref<any>(null);

interface RecipeType {
  name: string;
  time: string;
  ingredients: string[];
  directions: string[];
}



onMounted(async () => {
  try {
    const response = await axios.get('https://bertakang.pythonanywhere.com/recipe');
    const RecipeInfo = response.data.recipe_info;
    let selectedRecipe = null;
    for (let i = 0; i < RecipeInfo.length; i++) {
      if (formattedRecipeName === RecipeInfo[i].name) {
        selectedRecipe = RecipeInfo[i];
        console.log("Selected recipe:", selectedRecipe.name, "fruitName from the API:", formattedRecipeName);
        break;
      }
    }
    Recipe.value = selectedRecipe;
  } catch (error) {
    console.error('Error fetching Recipe data:', error);
  }
});
</script>


<template>
<section class="recipepage">
    <div class="recipe-directions">
      <RecipeInfo v-if="Recipe" :name="Recipe.name" :time="Recipe.time" :ingredients="Recipe.ingredients"
        :directions="Recipe.directions" />
    </div>
</section>
</template>


<style scoped>
/* modal */
button {
  background-color: gray;
  color: white;
}

.modal {
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.container-image {
  display: flex;
  flex-direction: column;
  align-items: end;
  height: 64vh;
  width: 64vw;
  object-fit: contain;
  padding: 16px;
  border-radius: 24px;
}

.image-container {
  display: flex;
  height: 100%;
  width: 100%;
}

/* recipe content */
ul {
  list-style-type: circle;
  padding-left: 64px;
}

ol {
  list-style-type: decimal;
  padding-left: 64px;
}

h2 {
  font-weight: 700;
}

h4 {
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.header {
  margin: 0px 0px 32px 0px;
}

.ingredients-list {
  margin: 0px 0px 16px 0px;
}

.directions-list {
  margin: 0px 0px 16px 0px;
}

.recipe-directions {
  margin-top: 3.5rem;
  padding: 16px 32px 0px 32px;
  font-family: 'Lato', sans-serif;
  display: flex;
  flex-direction: column;
  flex: 2;
  background-color: #7E315D;
}

/* gallery */
.image-gallery {
  z-index: 1;
  flex: 1;
  background-color: #A78895;
  padding: 16px;

  margin-top: 3.5rem;
}

.image {
  display: flex;
  margin-bottom: 16px;
}

.image:hover {
  outline: 3px solid bisque;
}
</style>
