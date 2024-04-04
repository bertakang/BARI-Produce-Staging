<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';


interface GrapeCard {
  grape: string;
  grape_type: string;
  grape_description: string;
}


const grape_cards = ref<GrapeCard[]>([]);

const getGrapeCards = () => {
  const path = 'https://bertakang.pythonanywhere.com/';

  axios.get(path)
    .then((res) => {
      console.log('Response data (grape cards):', res.data.grape_cards);
      grape_cards.value = res.data.grape_cards;
    })
    .catch((err) => {
      console.error(err);
    });
};

getGrapeCards();
</script>

<template>
  <div class="GrapeCard">
    <ul class="card-wrapper-horizontal">
      <li v-for="card in grape_cards">
        <div class="card-details">
          <div class="header">
            <h2> {{ card.grape }}</h2>
            <h3>{{ card.type }}</h3>
          </div>
          <div class="card-image">
            <img src="../assets/images/tablegrapes.png">
          </div>
          <div class="description">
            <p>{{ card.description }}</p>
          </div>
          <div class="button-wrapper">
            <div class="button">
              <button>Details</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
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
  flex-direction: row;
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
  background-color: bisque;
  border: 1px solid black;
  color: black;
  border-radius: 16px;
  padding: 16px;
  width: 384px;
  height: 100%;
  margin: 0px 8px;
}
</style>
