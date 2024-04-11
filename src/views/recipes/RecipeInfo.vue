<script setup lang="ts">
import { defineProps, ref, onBeforeMount } from 'vue';
import axios from 'axios';

const props = defineProps<{
  name?: string,
  gallery?: string
  time?: string,
  ingredients?: string,
  directions?: string
}>()

//ingredients list
const ingredients = props.ingredients;
const ingredientsList = ingredients.split(',').map(item => item.trim());

//directions list
const directions = props.directions;
const directionsList = directions.split(',').map(item => item.trim());

//toggle modal
const modalVisible = ref<boolean>(false);

const toggleModal = () => {
  modalVisible.value = !modalVisible.value;
};


const openModal = (filePath: string) => {
  selectedImage.value = getImageUrl(filePath);
  toggleModal(); // Open the modal
};

const getImageUrl = (filePath: string) => {
  return `https://www.pythonanywhere.com/user/bertakang/files/home/bertakang/mysite/${filePath}`;
};

onBeforeMount(async () => {
  try {
    const response = await axios.get(`https://bertakang.pythonanywhere.com/`);
    const recipe_cards = response.data.recipe_cards;
    
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="RecipeInfo">
    <div class="modal" v-if="modalVisible">
      <div class="container-image">
        <slot />
        <div><button class="exit" @click="toggleModal()">X</button></div>
        <div class="image-container"><img src="../../assets/cards/recipes.jpg"></div>
      </div>
    </div>
    <section class="recipespage">
      <div class="recipes-description">
        <modal v-if="modalVisible"></modal>
        <div class="header">
          <h2>{{ props.name }}</h2>
          <h3>{{ props.time }}</h3>
        </div>
        <div class="recipe-ingredients">
          <h4>Ingredients</h4>
          <ul>
            <li v-for="ingredient in ingredientsList" :key="ingredient">{{ ingredient }}</li>
          </ul>
        </div>
        <div class="recipe-directions">
          <h4>Directions</h4>
          <ol>
            <li v-for="direction in directionsList" :key="direction">{{ direction }}</li>
          </ol>
        </div>
      </div>
    </section>
  </div>
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
  margin-top: 16px;
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