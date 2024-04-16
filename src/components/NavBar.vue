<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DropdownMenuItem from './DropdownMenuItem.vue';
import RecipeDropdownMenuItem from './RecipeDropDownMenuItem.vue';
import axios from 'axios';

// Declare refs
const fruitType = ref<string[]>([]);
const grapeType = ref<string[]>([]);
const fruitNames = ref<string[]>([]);
const grapeNames = ref<string[]>([]);
const recipeNames = ref<string[]>([]);

onMounted(async () => {
  try {
    const response = await axios.get('https://bertakang.pythonanywhere.com/');
    // Assign values to the fruitNames and grapeNames refs
    fruitNames.value = response.data.fruit_cards.map((fruit: { name: string }) => fruit.name);
    grapeNames.value = response.data.grape_cards.map((grape: { name: string }) => grape.name);
    recipeNames.value = response.data.recipe_cards.map((recipe: { name: string }) => recipe.name);


    fruitType.value = ['Fruit']
    grapeType.value = ['Grape'];
    
  } catch (error) {
    console.error('Error fetching fruit data:', error);
  }
});

// Dropdown product menu
const dropdownProductOpen = ref<boolean>(false);

const toggleProductDropdown = () => {
  dropdownProductOpen.value = !dropdownProductOpen.value;
}

// Dropdown recipe menu
const dropdownRecipeOpen = ref<boolean>(false);

const toggleRecipeDropdown = (value: boolean) => {
  dropdownRecipeOpen.value = !dropdownRecipeOpen.value;
}


// Dropdown fruit sub-menu
const dropdownFruitSubOpen = ref<boolean>(false);

const toggleFruitSubDropdown = (value: boolean) => {
  dropdownFruitSubOpen.value = !dropdownFruitSubOpen.value;
}

// Dropdown grape sub-menu
const dropdownGrapeSubOpen = ref<boolean>(false);

const toggleGrapeSubDropdown = (value: boolean) => {
  dropdownGrapeSubOpen.value = !dropdownGrapeSubOpen.value;
}

//Declare Mobile Menu Items
const toggleMobileMenu = () => {
  const mobileMenu = document.querySelector('.nav-links-wrapper');
  if (mobileMenu) {
    mobileMenu.classList.toggle('show');
    // Add event listener to close menu when a menu item is clicked
    const menuItems = mobileMenu.querySelectorAll('.nav-link');
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
      });
    });
  }
};

</script>

<template>
  <header>
    <div class="navbar">
      <div class="bari-produce-logo">
        <img src="../assets/images/logo-white.png" alt="Description of the image">
      </div>
      <div class="mobile-menu" @click="toggleMobileMenu">MENU</div>
      <nav class="nav-links-wrapper">
        <a href="/" class="nav-link">Home</a>
        <a href="#about" class="nav-link">About</a>
        <div class="dropdown-wrapper">
          <div class="link" @click="toggleProductDropdown()">Products</div>
          <div class="dropdown-menu" v-show="dropdownProductOpen">
            <div class="fruit-dropdown">
              <div class="sub-link" @mouseover="toggleFruitSubDropdown(true)" @click="toggleFruitSubDropdown(true)">
                Fruits ></div>
              <div class="dropdown-sub-menu" v-show="dropdownFruitSubOpen" @mouseleave="toggleFruitSubDropdown(false)">
                <DropdownMenuItem v-for="fruitName in fruitNames" :key="fruitName" :link="fruitName"
                  :category="fruitType[0]"></DropdownMenuItem>
              </div>
            </div>
            <div class="grape-dropdown">
              <div class="sub-link" @mouseover="toggleGrapeSubDropdown(true)" @click="toggleGrapeSubDropdown()">Grapes >
              </div>
              <div class="dropdown-sub-menu" v-show="dropdownGrapeSubOpen" @mouseleave="toggleGrapeSubDropdown(false)">
                <DropdownMenuItem v-for="grapeName in grapeNames" :key="grapeName" :link="grapeName"
                  :category="grapeType[0]"></DropdownMenuItem>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown-wrapper">
          <div class="link" @click="toggleRecipeDropdown()">Recipes</div>
          <div class="recipe-dropdown">
            <RecipeDropdownMenuItem v-show="dropdownRecipeOpen" @mouseleave="toggleRecipeDropdown(false)"
              v-for="recipeName in recipeNames" :key="recipeName" :link="recipeName">
            </RecipeDropdownMenuItem>
          </div>
        </div>

  <a href="#contact" class="nav-link">Contact</a>


      </nav>
    </div>
  </header>
</template>


<style scoped>
/*navigation*/

.mobile-menu {
  display:none;
}

.navbar {
  z-index: 998;
  display: flex;
  flex-direction: row;
  position: fixed;
  height: 3.5rem;
  width: 100%;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  padding: 32px;
  background-color: #7E315D;
  border-bottom: .5px solid #FED1EB;
}

img {
  height: auto;
  width: 100%;
}

.bari-produce-logo {
  width: 150px;
}

.nav-links-wrapper {
  position: fixed;
  display: flex;
  flex-direction: row;
  right: 0;
}

.nav-link {
  margin: 0px 12px 0px 12px;
  padding: 8px 16px 8px 16px;
  font-family: 'Lato', sans-serif;
  font-size: 20px;
  text-transform: uppercase;
  color:#FED1EB;
}

.link {
  margin: 0px 12px 0px 12px;
  padding: 8px 0px 8px 16px;
  font-family: 'Lato', sans-serif;
  font-size: 20px;
  text-transform: uppercase;
  color:#FED1EB;
  font-weight: 600;
}

.sub-link {
  margin: 0px 12px 0px 12px;
  padding: 8px 0px 8px 0px;
  font-family: 'Lato', sans-serif;
  font-size: 20px;
  text-indent: 32px;
  color:#FED1EB;
}

/* dropdown menu items*/

.dropdown-wrapper {
  flex-direction: column;
  position: relative;
  height: max-content;
}

.fruit-dropdown {
  position: relative;
  display: flex;
  flex-direction: row;
}

.grape-dropdown {
  display: flex;
}

.recipe-dropdown {
  position: absolute;
  display: flex;
  flex-direction: column;
  background: #7E315D;
  width:max-content;
}

.dropdown-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  background: #7E315D;
}

.dropdown-sub-menu {
  position: absolute;
  left: 100%;
  display: flex;
  flex-direction: column;
  background: #7E315D;
}

@media screen and (max-width: 991px) {
  /* Styles for screens up to 991px width */
}

@media screen and (max-width: 667px) {

  .mobile-menu {
  display:flex;
}

  /* navigation */
  .bari-produce-logo {
    width: 100px;
  }

  .mobile-menu {
    font-family: 'Lato', sans-serif;
  }

  .navbar {
    height:3rem;
    display: none;
    z-index: 998;
    display: flex;
    flex-direction: row;
    position: fixed;
    width: 100vw;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: .5px solid #FED1EB;
  }

  .nav-links-wrapper {
    position: fixed;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100vw;
    top: 3rem;
    left: 0;
    background-color: #7E315D;
    border-top: 1px solid #FED1EB;
    left: -100%;
    transition: left 0.3s ease; 
  }

  .nav-links-wrapper.show {
    left:0;
  }

  .nav-link {
    margin: 0px 12px 0px 12px;
    padding: 8px 16px 8px 16px;
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    text-transform: uppercase;
    color:#FED1EB;
  }

  /* dropdown menu items*/

  .dropdown-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    height: max-content;

  }

  .fruit-dropdown {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .grape-dropdown {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .recipe-dropdown {
    position: relative;
    display: flex;
    flex-direction: column;
    background: #7E315D;
    text-indent: 32px;
  }

  .dropdown-menu {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .dropdown-sub-menu {

    position: relative;
    left: 0;
    display: flex;
    flex-direction: column;
    background:#7E315D;
  }

}
</style>
