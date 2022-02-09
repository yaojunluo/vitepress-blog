<template>
  <div class="bg-white shadow-lg shadow-gray-100 p-5 mb-8 w-full rounded-xl hidden lg:block">
    <div class="text-base text-gray-700 font-thin">文章导航</div>
    <div class="mt-4">
      <div class="mb-3">
        <a :href="'#' + page.title">{{page.title}}</a>
      </div>

      <div class="" v-if="page.headers && page.headers.length > 0">
        <ul class=" text-sm">
          <template v-for="(header, index) in page.headers" :key="'header-' + header.title + index">
            <li v-if="page.title != header.title">
              <a :href="'#' + header.title" :class="`h-8 block ml-${header.level}`" >
                {{header.title}}
              </a>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useData } from "vitepress";
const { page } = useData()
console.log(page.value);

</script>