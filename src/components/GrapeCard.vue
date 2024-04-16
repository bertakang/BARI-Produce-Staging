<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter();

interface GrapeCard {
  name: string;
  type: string;
  file_path: string;
  description: string;
}

const grape_cards = ref<GrapeCard[]>([]);

const getGrapeCards = () => {
  const mainPath = 'https://bertakang.pythonanywhere.com/';
  const imagePath = 'https://bertakang.pythonanywhere.com/images';

  axios.all([
    axios.get(mainPath),
    axios.get(imagePath)
  ])
  .then(axios.spread((mainRes, imageRes) => {
    const grapeCardsData = mainRes.data.grape_cards;
    const grapeImagesData = imageRes.data.grape_images;

    const mergedData = grapeCardsData.map((grape: any) => {
      const correspondingImage = grapeImagesData.find((image: any) => image.grape_options === grape.name);
      return {
        name: grape.name,
        file_path: correspondingImage ? correspondingImage.file_path : '',
        description: grape.description,
        type: grape.type
      };
    });

    grape_cards.value = mergedData;
  }))
  .catch((error) => {
    console.error('Error fetching grape cards:', error);
  });
};

getGrapeCards();
</script>



<template>
  <div class="GrapeCard">
    <ul class="card-wrapper-horizontal">
      <Router-Link v-for="card in grape_cards" :to="`/Grape/${card.name}`" :key="card.name">
        <li>
          <div class="card-details">
            <div class="header">
              <h2>{{ card.name }}</h2>
              <h3>{{ card.type }}</h3>
            </div>
            <div class="card-image">
              <img :src="'https://www.pythonanywhere.com/user/bertakang/files/home/bertakang/mysite/' + card.file_path">
            </div>
            <p>{{ card.description }}</p>
            <div class="button-wrapper">
              <div class="button">
                <button>Details</button>
              </div>
            </div>
          </div>
        </li>
      </Router-Link>
    </ul>
  </div>
</template>


<style scoped>
router-link {
  display: flex;
  flex-grow:1;
  height:100%;
}

a{
  flex: 0 0 33.33%; 
  color: #7E315D;
}

li {
  height:100%;
}

h2 {
  font-size: 22px;
  font-weight:600;
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

.card-wrapper-horizontal {
  display: flex;
  max-height:86vh;
  flex-direction: row;
  justify-content: space-between; 
}

.header {
  height: 64px;
  width:auto;
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
  background-color:bisque;
  border: 1px solid lightgray;
  border-radius: 20px;
  padding: 16px;
  height:100%;
  margin: 0px 8px;
  flex: 0 0 33.33%; 
}


@media screen and (max-width: 667px) {
  h2 {
  font-size: 18px;
  font-weight: 600;
}

h3 {
  font-size: 16px;
}

p {
  font-size: 14px;
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
    padding: 8px;
    width: 256px;
    height: 100%;
  }
}
</style>
