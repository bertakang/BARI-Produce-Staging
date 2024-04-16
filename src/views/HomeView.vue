<script setup lang="ts">
import GrapeMenuSection from '../components/GrapeMenuSection.vue';
import FruitMenuSection from '../components/FruitMenuSection.vue';
import RecipeSection from '../components/RecipeSection.vue';
import AboutSection from '../components/AboutSection.vue';
</script>


<template>
  <main class="homepage">
    <section id="home">
      <div class="splash-image">
        <img src="../assets/images/farm.jpg" alt="Description of the image">
      </div>
    </section>
    <section id="about">
      <AboutSection></AboutSection>
    </section>
    <section id="stonefruit" class="third-divided">
      <div class="one-third-image">
        <img src="../assets/images/stonefruit.png" alt="Description of the image">
      </div>
      <div class="two-thirds">
        <div class="text-block">
          <h1>Quality, consistency and great eating quality are the expectation when apricots, peaches, plums and
            nectarines are placed in our label.</h1>
          <p>Bari Produce stone fruit is packed in the premium BARI® label. Certain varieties have greater consumer
            appeal, but our efforts in the field ensure each varieties’ highest eating attributes and our efforts in
            packing boost quality on the shelf. Early May starts the season with apricots and several early peaches and
            nectarines. The Giant Lorna Apricot provides big size and big flavor in June. We provide most of our volume
            in
            yellow peaches and nectarines, with good amounts of white flesh, as well as plums and pluots.</p>
        </div>
      </div>
    </section>
    <section id="stonefruit-menu" class="menu">
      <FruitMenuSection></FruitMenuSection>
    </section>
    <section id="tablegrapes" class="third-divided">
      <div class="one-third-image">
        <img src="../assets/images/tablegrapes.png" alt="Description of the image">
      </div>
      <div class="two-thirds">
        <div class="text-block">
          <h1>We put a lot of energy into our grapes during the off and growing seasons to bring out their highest
            eating
            attributes.</h1>
          <p>Bari Produce is best known for our BARI® and LOGOLUSO® table grape brands that have been in existence for
            well
            over 50 years. Quality, consistency and great eating quality are the expectation when grapes are placed in
            these
            labels. Our blend of new varieties (Autumn King & Scarlet Royals) as well as tried-and-true varieties
            (Thompson
            Seedless and Crimson Seedless) allows us to provide a full spectrum of great eating grapes.</p>
          <p>Our table grape varieties include: Flames, Thomcords, Ivory, Champagne, Valley Pearls, Red Globes, Summer
            Royals, Autumn Royal, Autumn King, Scarlet Royal, and Vintage Red.</p>
        </div>
      </div>
    </section>
    <section id="tablegrapes-menu" class="menu">
      <GrapeMenuSection></GrapeMenuSection>
    </section>
    <section id="recipes">
      <RecipeSection></RecipeSection>
    </section>
  </main>
</template>


<style scoped>
.text-block {
  padding: 64px;
  display: flex;
  flex-direction: column;
  line-height: 38px;
}

.third-divided {
  display: flex;
  flex-direction: row;
  flex: 1;
  background-color: #A78895;
  object-fit: contain;
}

.menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: auto;
  background-color: #A78895;
}

.card-wrapper-horizontal {
  list-style: none;
  display: flex;
  flex-direction: row;
}

.card {
  display: flex;
  flex-direction: column;
  border: 1px solid lightgrey;
  border-radius: 16px;
  padding: 32px;
  margin: 16px 8px;
}

.one-third-list {
  flex: 1;
  overflow-y: hidden;
}

.one-third-list.scroll {
  flex: 1;
  overflow-y: scroll;
}

.one-third-image {
  position: sticky;
  flex: 1;
  height: 100vh;
  width: auto;
}

.one-third-image-cutout {
  height: 350px;
  width: auto;
}

.splash-image {
  height: 100vh;
  width: 100%;
  object-fit: cover;
}

.two-thirds {
  display: flex;
  align-items: center;
  flex: 2;
  background-color: #7E315D;
}

.sticky {
  position: sticky;
  z-index: 1;
}

@media screen and (max-width: 667px) {
  .text-block {
  padding: 16px;
  display: flex;
  flex-direction: column;
  line-height: 38px;
}

  .third-divided {
    display: flex;
    flex-direction: column;
    background-color: #A78895;
    object-fit: contain;
  }

  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: auto;
    background-color: #A78895;
  }



  .one-third-image {
    position: relative;
    height: 100vh;
    width: auto;
  }

  .one-third-image-cutout {
    height: 350px;
    width: auto;
  }

  .splash-image {
    height: 100vh;
    width: 100%;
    object-fit: cover;
  }

  .two-thirds {
    display: flex;
    align-items: center;
    background-color: #7E315D;
  }

}
</style>
