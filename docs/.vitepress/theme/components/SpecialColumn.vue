<template>
  <div class="sm:rounded-xl bg-white shadow-lg shadow-gray-100 p-5 mb-8 w-full">
    <div class="text-base text-gray-700 font-thin">专栏</div>
    <div class="mt-4">
      <ul>
        <template v-for="(item, key) in theme.sidebar" :key="'column-' + key">

          <li class="mb-2 cursor-pointer" @click="linkTo(item.link)">
            <span class="text-gray-700 font-bold">{{ item.text }}</span>
          </li>
        </template>
      </ul>
    </div>
  </div>
  
</template>
<script setup>
import { ref } from 'vue'
import { useData, useRouter } from "vitepress";
const { theme } = useData();
const router = useRouter();

const linkTo = (path) => {
  if(path.includes('http')) {
    window.location.href = path
  } else {
    router.go(path)
  }
  visible.value = false
}
</script>