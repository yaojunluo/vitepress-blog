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
              <a :href="titleHref(header.title)" :class="levelStyle(header)" >
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
// 导航样式
const levelStyle = (header) => {
  let _default = 'h-8 block '
  if (header.level == 1) {
    return _default + 'ml-0 text-gray-800'
  } else if (header.level == 2) {
    return _default + 'ml-2 text-gray-700'
  } else if (header.level == 3) {
    return _default + 'ml-4 text-xs text-gray-600'
  } else if (header.level == 4) {
    return _default + 'ml-6 text-gray-500'
  }
  
  return _default + 'ml-8 text-gray-500'
}

// 锚点处理
const titleHref = (title) => {
  return '#' + title.replace(/\s/g, '-')
}

</script>