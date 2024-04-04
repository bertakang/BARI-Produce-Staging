import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FruitsView from '../views/fruits/FruitsView.vue';
import GrapesView from '../views/grapes/GrapesView.vue';
import axios from 'axios';

const fruitPath = 'https://bertakang.pythonanywhere.com/fruit';
const grapePath = 'https://bertakang.pythonanywhere.com/grape';
// Fetch fruit data from the backend
const fetchFruitData = async () => {
  try {
    const response = await axios.get(fruitPath);
    return response.data.fruit_info;
  } catch (error) {
    console.error('Error fetching fruit data:', error);
    return [];
  }
};

const fetchGrapeData = async () => {
  try {
    const response = await axios.get(grapePath);
    return response.data.grape_info;
  } catch (error) {
    console.error('Error fetching fruit data:', error);
    return [];
  }
};

// Define the routes dynamically based on fetched fruit data
const createRoutes = async () => {
  const fruitData = await fetchFruitData();
  const grapeData = await fetchGrapeData();

  const fruitRoutes = fruitData.map(fruit => ({
    path: `/Fruit/${fruit.name}`,
    name: fruit.name,
    component: FruitsView,
    props: { fruit },   
  }));

  const grapeRoutes = grapeData.map(grape => ({
    path: `/Grape/${grape.name}`,
    name: grape.name,
    component: GrapesView,
    props: { grape },   
  }));

  return [...fruitRoutes, ...grapeRoutes];
};

// Create the router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/Fruit/:name',
      name: 'fruit',
      component: FruitsView,
    },
    {
      path: '/Grape/:name',
      name: 'grape',
      component: GrapesView,
    }
  ]
});

// Add dynamic routes after the router is created
createRoutes().then(routes => {
  routes.forEach(route => {
    router.addRoute(route);
  });
});

export default router;
