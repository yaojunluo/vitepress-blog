<template>
  <div class="menu">
    <button @click="show = !show" class="pb-8 text-blue-500">👉 专栏文章 👈</button>
  </div>
  <transition name="menu">
    <div
      v-if="show"
      key="slidebar-menu"
      class="slidebar-menu fixed top-16 left-0 w-screen z-30 bg-white shadow-lg shadow-gray-300 py-8 px-8 max-h-96 overflow-y-auto"
    >
    <ul class="grid grid-cols-1 sm:grid-cols-2 w-full">
      <template 
        v-for="(item, index) in showChildren" 
        :key="item.text + 'column-child-' + index"
      >
        <li
          @click="linkTo(item.link)"
          class="px-4 h-8 mb-2 text-sm flex items-center pr-2 w-full cursor-pointer text-gray-600 hover:text-blue-500"
        >
          <span class="truncate">{{ item.text }}</span>
        </li>
      </template>
    </ul>
    </div>
  </transition>
  <div v-if="show" @click="show = false" class=" w-screen h-screen fixed top-0 left-0 z-20"></div>

</template>
<script setup>
import { ref } from "vue";
import { useData, useRouter, useRoute } from "vitepress";
const { theme, page } = useData();
const router = useRouter();
const route = useRoute();


const show = ref(false);
const showChildren = ref([])
// 跳转
const linkTo = (path) => {
  if(path.includes('http')) {
    window.location.href = path
  } else {
    router.go(path)
  }
}

// 获取当前专栏的文章列表
const handleProses = () => {
  if(theme.value.sidebar) {
    const sidebar = theme.value.sidebar
    const currentColumn = sidebar.find(item => item.link === route.path)
    if(currentColumn) {
      showChildren.value = currentColumn.children
    }
  }
}
handleProses()


</script>
<style scoped>
.slidebar-menu ul>li::before {
  content: '';
  position: absolute;
  left: -1.5rem;
  top: 0;
  bottom: 0;
  width: 0;
  height: 0;
  background: #e0e0e0;
}
</style>