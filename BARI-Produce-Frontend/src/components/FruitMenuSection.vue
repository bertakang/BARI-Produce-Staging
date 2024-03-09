<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import FruitCard from './FruitCard.vue';


const backButton = ref<HTMLElement | null>(null);
const viewport = ref<HTMLElement | null>(null);
const nextButton = ref<HTMLElement | null>(null);

const backButtonClickHandler = () => {
  viewport.value?.scrollTo({
    left: -viewport.value.scrollWidth,
    behavior: 'smooth'
  });
};

const nextButtonClickHandler = () => {
  viewport.value?.scrollTo({
    left: viewport.value.scrollWidth,
    behavior: 'smooth'
  });
};

const wheelEventHandler = (event: WheelEvent) => {
  event.preventDefault();
  if (viewport.value) {
    viewport.value.scrollLeft += event.deltaY;
  }
};

onMounted(() => {
  backButton.value?.addEventListener('click', backButtonClickHandler);
  nextButton.value?.addEventListener('click', nextButtonClickHandler);
  viewport.value?.addEventListener('wheel', wheelEventHandler);
});

onBeforeUnmount(() => {
  backButton.value?.removeEventListener('click', backButtonClickHandler);
  nextButton.value?.removeEventListener('click', nextButtonClickHandler);
  viewport.value?.removeEventListener('wheel', wheelEventHandler);
});
</script>


<template>
  <section id="Fruits">
    <div class="menu-wrapper">
      <div class="back" ref="backButton"><button>Back</button></div>
      <div class="menu" ref="viewport">
        <FruitCard></FruitCard>
      </div>
      <div class="next" ref="nextButton"><button>Next</button></div>
    </div>
  </section>
</template>

<style scoped>
button {
  font-family: 'Playfair Display', serif;
  font-size: 26px;
  font-style: italic;
  font-weight: 800;
  color: #F9E4F0;
  border-radius: 8px;
  background-color: #31477E;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

button:hover {
  font-family: 'Playfair Display', serif;
  font-size: 26px;
  font-style: italic;
  font-weight: 800;
  color: #F9E4F0;
  border-radius: 8px;
  background-color: #5274CB;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.menu-wrapper {
  margin-top: 3.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}

.menu {
  display: flex;
  flex-direction: row;
  width: 80vw;
  overflow-y: hidden;
  overflow-x: scroll;
}

.menu::-webkit-scrollbar {
  display: none;
}

.back,
.next {
  margin: 0px 32px 0px 32px;
}

@media screen and (max-width: 667px) {
  section {
    margin:8px;
  }
  .menu-wrapper {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .menu {
    width: 90vw;
    height: 100%;
  }

  .back,
.next {
  display:none;
}

}
</style>

