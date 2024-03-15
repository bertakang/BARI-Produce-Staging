import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FruitsView from '../views/fruits/FruitsView.vue';
import GrapesView from '../views/grapes/GrapesView.vue';
import RecipesView from '../views/recipes/RecipesView.vue';
import axios from 'axios';

const fruitPath = 'https://bertakang.pythonanywhere.com/fruit';
const grapePath = 'https://bertakang.pythonanywhere.com/grape';
const recipePath = 'https://bertakang.pythonanywhere.com/recipe';

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
    console.error('Error fetching grape data:', error);
    return [];
  }
};

const fetchRecipeData = async () => {
  try {
    const response = await axios.get(recipePath);
    return response.data.recipe_info;
  } catch (error) {
    console.error('Error fetching recipe data:', error);
    return [];
  }
};

const sanitizeName = (name) => {
  // Replace apostrophes with a safe character, such as underscore
  return name.replace(/'/g, '_');
};


// Define the routes dynamically based on fetched fruit data
const createRoutes = async () => {
  const fruitData = await fetchFruitData();
  const grapeData = await fetchGrapeData();
  const recipeData = await fetchRecipeData();

  const fruitRoutes = fruitData.map(fruit => ({
    path: `/Fruit/${sanitizeName(fruit.name)}`,
    name: fruit.name,
    component: FruitsView,
    props: { fruit },   
  }));

  const grapeRoutes = grapeData.map(grape => ({
    path: `/Grape/${sanitizeName(grape.name)}`,
    name: grape.name,
    component: GrapesView,
    props: { grape },   
  }));

  const recipeRoutes = recipeData.map(recipe => ({
    path: `/Recipe/${sanitizeName(recipe.name)}`,
    name: recipe.name,
    component: RecipesView,
    props: { recipe },   
  }));

  return [...fruitRoutes, ...grapeRoutes, ...recipeRoutes];
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
    },
    {
      path: '/Recipe/:name',
      name: 'recipe',
      component: RecipesView,
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
