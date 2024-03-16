<script setup lang="ts">
import { ref } from 'vue';

const modalVisible = ref<boolean>(true)

const toggleModal = () => {
   modalVisible.value = !modalVisible.value
  };


</script>

<template>
      <div class="modal" v-if="modalVisible">
      <div class="container-image">
        <slot />
        <div><button class="exit" @click="toggleModal()">X</button></div>
        <div class="image-container"><img src="../../assets/images/recipes.jpg"></div>
      </div>
    </div>
  <section class="recipepage">
    <div class="recipe-directions">
      <modal v-if="modalVisible"></modal>
      <div class="header">
        <h2>Apricot Chicken</h2>
        <h3>10-15 Minutes</h3>
      </div>
      <div class="ingredients-list">
        <h4>Filling Ingredients</h4>
        <ul>
          <li>4 ripe Californian Peaches, cut into 1/8 slices</li>
          <li>1 egg</li>
          <li>2 tbsp flour</li>
          <li>¼ cup brown sugar</li>
          <li>¾ cup sugar</li>
          <li>½ cup melted butter</li>
          <li>½ teaspoon ground cinnamon</li>
        </ul>
      </div>
      <div class="ingredients-list">
        <h4>Crust Ingredients</h4>
        <ul>
          <li>2 cups all-purpose flour</li>
          <li>1 cup shortening</li>
          <li>½ water</li>
        </ul>
      </div>
      <div class="directions-list">
        <h4>Directions for Crust</h4>
        <ol>
          <li>In a large bowl, combine flour and salt.</li>
          <li>Cut in shortening until mixture resembles coarse crumbs.</li>
          <li>Stir in water until mixture forms a ball (may not need entire ½ cup of water).</li>
          <li>Divide dough in half, and shape into balls.</li>
          <li>Wrap in plastic and refrigerate preferably overnight (or at least 4 hours).</li>
          <li>Roll out dough on a floured counter 1 ½ inches larger than your pie pan.</li>
          <li>Press dough into bottom of pan.</li>
          <li>Roll out remaining dough and place over pie filled pie shell (see “for filling” below).</li>
          <li>Pinch the edges of the pie together and trim away any excess dough.</li>
          <li>Dust top of pie with cinnamon.</li>
        </ol>
      </div>
      <div class="directions-list">
        <h4>Directions for Filling</h4>
        <ol>
          <li>Preheat oven to 400 degrees F.</li>
          <li>Combine egg, flour, sugars and butter.</li>
          <li>Fill pie shell with fresh peaches.</li>
          <li>Pour mixture over peaches.</li>
          <li>Bake pie in 400 degree F oven for 15 minutes.</li>
          <li>Reduce heat to 300 degrees F and bake 50 minutes longer</li>
        </ol>
      </div>
      

    </div>
    <div class="image-gallery">
      <div class="image" @click="toggleModal()"><img src="../../assets/images/recipes.jpg"></div>
      <div class="image" @click="toggleModal()"><img src="../../assets/images/recipes.jpg"></div>
      <div class="image" @click="toggleModal()"><img src="../../assets/images/recipes.jpg"></div>
      <div class="image" @click="toggleModal()"><img src="../../assets/images/recipes.jpg"></div>
      <div class="image" @click="toggleModal()"><img src="../../assets/images/recipes.jpg"></div>
    </div>
  </section>
</template>


<style scoped>
/* modal */
button{
    background-color: gray;
    color:white;
}
.modal {
    z-index: 999;
    display:flex;
    justify-content: center;
    align-items: center;
    position:fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background-color: rgba(0,0,0,0.5);
}

.container-image{
    display:flex;
    flex-direction: column;
    align-items: end;
    height:64vh;
    width:64vw;
    object-fit:contain;
    padding:16px;
    border-radius: 24px;
}

.image-container{
    display:flex;
    height:100%;
    width:100%;
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
