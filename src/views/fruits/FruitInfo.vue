<script setup lang="ts">
import { defineProps, ref, computed, onBeforeMount } from 'vue';
import axios from 'axios';

const props = defineProps<{
  name: string,
  generalinfo: string,
  healthbenefits?: string,
  PLUinfo: string,
}>()

interface ImageData {
  file_path: string;
  fruit_options: string;
}
const modalVisible = ref<boolean>(false);
const filePathsByfruitOption = ref<any>({});
const selectedImage = ref<string>(''); 

const toggleModal = () => {
  modalVisible.value = !modalVisible.value;
};

const openModal = (filePath: string) => {
  selectedImage.value = getImageUrl(filePath);
  toggleModal(); // Open the modal
};

const getImageUrl = (filePath: string) => {
  return `https://www.pythonanywhere.com/user/bertakang/files/home/bertakang/mysite/${filePath}`;
};

onBeforeMount(async () => {
  try {
    const response = await axios.get(`https://bertakang.pythonanywhere.com/images`);
    const fruit_images = response.data.fruit_images;
    
    fruit_images.forEach((image: ImageData)  => {
      const file_path = image.file_path;
      const fruit_option = image.fruit_options;

      if (!filePathsByfruitOption.value[fruit_option]) {
        filePathsByfruitOption.value[fruit_option] = [];
      }
      filePathsByfruitOption.value[fruit_option].push(file_path);
    });

    console.log("filePathsByfruitOption:", filePathsByfruitOption);
  } catch (error) {
    console.error(error);
  }
});

const filteredFilePaths = computed(() => {
  return filePathsByfruitOption.value[props.name] || [];
});
</script>

<template>
  <div class="fruitInfo">
    <div class="modal" v-if="modalVisible">
      <div class="container-image">
        <slot />
        <div><button class="exit" @click="toggleModal()">X</button></div>
        <img v-if="selectedImage" :src="selectedImage" alt="Image" />
      </div>
    </div>
    <section class="fruitspage">
      <div class="fruits-description">
        <modal v-if="modalVisible"></modal>
        <div class="header">
          <h2>{{ props.name }}</h2>
        </div>
        <div class="general-information">
          <h4>General Information</h4>
          {{ props.generalinfo }}
        </div>
        <div class="general-information">
          <h4>Health Benefits</h4>
          {{ props.healthbenefits }}
        </div>
        <div class="general-information">
          <h4>PLU Information</h4>
          {{ props.PLUinfo }}
        </div>
      </div>
      <div class="image-gallery">
        <template v-if="filePathsByfruitOption[props.name]">
          <li v-for="filePath in filePathsByfruitOption[props.name]" :key="filePath">
            <img :src="getImageUrl(filePath)" alt="Image" @click="openModal(filePath)" />
          </li>
        </template>
      </div>
    </section>
  </div>
</template>



<style scoped>
/* modal */
button {
  background-color: gray;
  color: white;
}

.modal {
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.container-image {
  display: flex;
  flex-direction: column;
  align-items: end;
  height: 64vh;
  width: 64vw;
  object-fit: contain;
  padding: 16px;
  border-radius: 24px;
}

.image-container {
  display: flex;
  height: 100%;
  width: 100%;
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

.general-information {
  margin: 0px 0px 16px 0px;
}

.fruits-description {
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

.image-gallery li {
  list-style: none;
}

.image {
  display: flex;
  margin-bottom: 16px;
}

.image:hover {
  outline: 3px solid bisque;
}

@media screen and (max-width: 667px) {
  .fruitspage {
    display: flex;
    flex-direction: column;
  }

  .fruits-description {
    margin-top: 3rem;
    padding: 16px 16px 0px 16px;
    font-family: 'Lato', sans-serif;
    display: flex;
    flex-direction: column;
    background-color: #7E315D;
  }

  .image-gallery {
    z-index: 1;
    position: relative;
    background-color: #A78895;
    padding: 16px;
  }
}
</style>
