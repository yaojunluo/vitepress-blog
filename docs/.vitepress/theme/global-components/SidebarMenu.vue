<template>
  <div class="menu mb-8 border-b border-gray-200 border-solid">
    <div class="flex justify-between">
      <button class="text-gray-500 font-light ">专栏文章</button>
      <button @click="show = !show" class="text-blue-500">👉 推荐 👈 </button>
    </div>
    
    <div
      key="slidebar-menu"
      class="slidebar-menu"
    >
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
      <template 
        v-for="(item, index) in proses" 
        :key="item.text + 'column-child-' + index"
      >
        <li
          @click="linkTo(item.regularPath)"
          class="px-4 mb-2 text-sm flex items-start justify-center flex-col pr-2 w-full cursor-pointer text-gray-600 hover:text-blue-500"
        >
          <span class="truncate mb-1">{{ item.frontMatter.title }}</span>
          <span class="truncate text-xs text-gray-400">创建时间：{{item.frontMatter.date}}</span>
        </li>
      </template>
    </ul>
    </div>
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
      <li v-if="showChildren.length == 0">
        <span class="text-gray-500 text-xs">暂无数据</span>
      </li>
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

const proses = ref([])

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


const pageProses = () => {
  let _pages = Object.values(theme.value.pages)
  console.log(_pages)
  if(_pages) {
    const currentPage = _pages.filter((item) => {
      console.log(item.regularPath, "item", route.path, item.regularPath.includes(route.path))
      return item.regularPath.includes(route.path)
    })
    console.log(currentPage, "currentPage")
    proses.value = currentPage
    // if(currentPage) {
    //   showChildren.value = currentPage.children
    // }
  }
}
pageProses()

// 处理时间 分钟前
const formatDate = (_date) => {
  const date = new Date(_date);
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000;
  // 今天日期
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // 今日时间差
  const todayDiff = (now.getTime() - today.getTime()) / 1000;

  // 24小时秒数
  const daySeconds = 60 * 60 * 24;
  // 24小时内
  if (diff < todayDiff) {
    return '今天';
  } else if(diff < todayDiff + daySeconds) {
    return '昨天';
  } else if (diff < daySeconds * 7) {
    return Math.floor(diff / daySeconds) + '天前';
  } else {
    return date.toLocaleDateString();
  }
}
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