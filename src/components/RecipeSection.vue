<script setup lang="ts">
import RecipeCard from './RecipeCard.vue';
</script>

<template>
  <section id="recipes">
      <div class="sticky">
        <div class="text-block">
          <h1>Recipes</h1>
          <p>We’ve included some of our favorite recipes, using fresh fruit. Our list includes everything from the
            old-fashioned to fresh new twists. Learn how to include peaches in a power smoothie or a tasty desert to help
            cool off in the summer. We’ve also included grandma’s own peach pie recipe. Mmm Mmm! Our other recipes will
            show you new ways to enjoy nectarines in a fresh fruit salad or add apricots for a sweet, savory chicken
            dinner.</p>
        </div>
      </div>
      <div class="scrollable">
        <RecipeCard></RecipeCard>
      </div>
    </section>
</template>

<style scoped>
h1 {
  font-weight: 600;
  font-size: 48px;
  line-height: 72px;
}

section {
  display: flex;
  flex-direction: row;
}

.text-block {
  position:sticky;
  top:2.5rem;
  padding: 64px;
  display: flex;
  flex-direction: column;
  line-height: 38px;
}

.sticky {
  z-index: 1;
  font-family: 'Archivo', sans-serif;
  flex: 2;
  background-color: #7E315D;
}


.scrollable {
  display: flex;
  flex-direction: row;
  flex: 1;
  background-color: #A78895;
  overflow-y: hidden;
  justify-items: center;
  justify-content: center;
  padding: 8px 32px 8px 24px;
}

.scrollable.scroll {
  display: flex;
  flex-direction: row;
  flex: 1;
  background-color: #A78895;
}

@media screen and (max-width: 667px) {
  section {
    display: flex;
    flex-direction: column;
  }

  .text-block {
  padding: 16px;
  line-height: 38px;
}


  .sticky {
    display: flex;
    position: relative;
    top: 0px;
    height:100vh;
  }

  .scrollable {
    display: flex;
    flex-direction: column;
    background-color: #7E315D;
    min-height:100vh;
  }

  ::-webkit-scrollbar {
  display: none;
}

}
</style>
