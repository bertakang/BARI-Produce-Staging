<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter();

interface GrapeCard {
  name: string;
  type: string;
  description: string;
}

const grape_cards = ref<GrapeCard[]>([]);

const getGrapeCards = () => {
  const path = 'https://bari-produce-project.wl.r.appspot.com/';

  axios.get(path)
    .then((res) => {
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
      <Router-Link v-for="card in grape_cards" :to="`/Grape/${card.name}`" :key="card.id">
        <li>
          <div class="card-details">
            <div class="header">
              <h2>{{ card.name }}</h2>
              <h3>{{ card.type }}</h3>
            </div>
            <div class="card-image">
              <img src="../assets/images/grapes.jpg" alt="Grape Image">
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
  flex-grow: 1;
  height: 100%;
}

li {
  height: 100%;
}

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

.card-wrapper-horizontal {
  display: flex;
  max-height: 86vh;
  flex-direction: row;
}

.header {
  height: 64px;
  width: auto;
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
