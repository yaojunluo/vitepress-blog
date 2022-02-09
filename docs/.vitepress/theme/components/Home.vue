<template>
  <div v-if="frontmatter.home" class="home grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
    <div class="w-full">
      <div class="w-full shadow-xl shadow-gray-100 bg-white p-6 rounded-xl h-fit">
        <h1 class="text-3xl text-gray-900 font-bold">{{ frontmatter.heroText }}</h1>

        <div class="mt-4 mb-6">
          <div class="text-gray-500 font-light">{{ frontmatter.tagline }}</div>
        </div>
        <div>
          <button
          @click="router.go(frontmatter.actionLink)"
            class="bg-gradient-to-r from-green-300 to-blue-400 h-9 px-6 rounded-xl text-gray-50 hover:text-gray-200"
          >{{ frontmatter.actionText }}</button>
        </div>
      </div>

      <div class="mt-8 px-6 w-full">
        <template v-for="(feature, index) in frontmatter.features" :key="'feature-'+index">
          <div class="mb-4">
            <h3 class=" text-gray-800 text-base font-semibold">{{feature.title}}</h3>
            <p class=" text-gray-500 mt-2 ml-2">{{feature.details}}</p>
          </div>
        </template>
        <Content class="prose" />
      </div>
    </div>
    <div class="w-full h-full hidden lg:block relative">
      <ClientOnly>
        <Viewer />
      </ClientOnly>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useData, withBase, useRouter } from "vitepress";

import Viewer from "./Viewer.vue";

const { page } = useData();
const router = useRouter();
const frontmatter = ref({})
if (page.value.frontmatter.home) {
  console.log(page.value.frontmatter.home, "home");
  frontmatter.value = page.value.frontmatter
}

// 图片地址处理
const imageHandler = (image) => {
  if (image.includes('http')) {
    return image
  }
  return withBase(image)
}
</script>
<style scope>
.home {
  height: calc(100vh - 64px);
  width: 100%;
  box-sizing: border-box;
  padding: 40px 32px;
  
}
</style>