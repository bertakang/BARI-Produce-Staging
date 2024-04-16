import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FruitsView from '../views/fruits/FruitsView.vue';
import GrapesView from '../views/grapes/GrapesView.vue';
import RecipesView from '../views/recipes/RecipesView.vue';
import axios from 'axios';

const fruitPath = 'https://bertakang.pythonanywhere.com/fruit';
const grapePath = 'https://bertakang.pythonanywhere.com/grape';
const recipePath = 'https://bertakang.pythonanywhere.com/recipe';

interface Fruit {
  name: string;
  path: string;
  component: string;
  props:string;
};

interface Grape {
  name: string;
  path: string;
  component: string;
  props:string;
};

interface Recipe {
  name: string;
  path: string;
  component: string;
  props:string;
};

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

const fetchRecipeData = async () => {
  try {
    const response = await axios.get(recipePath);
    return response.data.recipe_info;
  } catch (error) {
    console.error('Error fetching recipe data:', error);
    return [];
  }
};

const sanitizeName = (name: string) => {
  // Replace apostrophes with a safe character, such as underscore
  return name.replace(/ /g, '%20');
};

// Define the routes dynamically based on fetched fruit data
const createRoutes = async () => {
  const fruitData = await fetchFruitData();
  const grapeData = await fetchGrapeData();
  const recipeData = await fetchRecipeData();

  const fruitRoutes = fruitData.map((fruit: Fruit) => ({
    path: `/Fruit/${sanitizeName(fruit.name)}`,
    name: sanitizeName(fruit.name),
    component: FruitsView,
    props: { fruit },   
  }));

  const grapeRoutes = grapeData.map((grape: Grape) => ({
    path: `/Grape/${sanitizeName(grape.name)}`,
    name: sanitizeName(grape.name),
    component: GrapesView,
    props: { grape },   
  }));

  const recipeRoutes = recipeData.map((recipe: Recipe) => ({
    path: `/Recipe/${sanitizeName(recipe.name)}`,
    name: sanitizeName(recipe.name),
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
      props: (route) => ({ fruit: route.params.fruit }),
    },
    {
      path: '/Grape/:name',
      name: 'grape',
      component: GrapesView,
      props: (route) => ({ grape: route.params.grape }),
    },
    {
      path: '/Recipe/:name',
      name: 'recipe',
      component: RecipesView,
      props: (route) => ({ recipe: route.params.recipe }),
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
