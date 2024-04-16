<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter();

interface FruitCard {
  name: string;
  type: string;
  file_path: string;
  description: string;
}

const fruit_cards = ref<FruitCard[]>([]);

const getFruitCards = () => {
  const mainPath = 'https://bertakang.pythonanywhere.com/';
  const imagePath = 'https://bertakang.pythonanywhere.com/images';

  axios.all([
    axios.get(mainPath),
    axios.get(imagePath)
  ])
  .then(axios.spread((mainRes, imageRes) => {
    const fruitCardsData = mainRes.data.fruit_cards;
    const fruitImagesData = imageRes.data.fruit_images;

    const mergedData = fruitCardsData.map((fruit: any) => {
      const correspondingImage = fruitImagesData.find((image: any) => image.fruit_options === fruit.name);
      return {
        name: fruit.name,
        file_path: correspondingImage ? correspondingImage.file_path : '',
        description: fruit.description,
        type: fruit.type
      };
    });

    fruit_cards.value = mergedData;
  }))
  .catch((error) => {
    console.error('Error fetching fruit cards:', error);
  });
};

getFruitCards();
</script>



<template>
  <div class="FruitCard">
    <ul class="card-wrapper-horizontal">
      <Router-Link v-for="card in fruit_cards" :to="`/Fruit/${card.name}`" :key="card.name">
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

a :hover {
  
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
