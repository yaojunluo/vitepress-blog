<template>
  <div class="h-16 w-full"></div>
  <div
    class="w-full h-16 bg-white shadow-lg shadow-gray-100 px-8 lg:px-14 flex items-center justify-start fixed top-0 left-0 z-40"
  >
    <div class="flex-1 relative flex items-center lg:hidden">
      <button class="absolute left-0" @click="visible = !visible">
        <i :class="`iconfont large transition-all ${visible?'icon-close':'icon-menu'}`"></i>
      </button>
    </div>
    <img @click="home" v-if="theme.logo" :src="withBase(theme.logo)" alt="logo" class="h-10" />
    <h1 @click="home" v-if="site.title && !theme.logo" class="ml-3 text-2xl">{{ site.title }}</h1>
    <div class="flex-1"></div>
    <ul class="hidden lg:flex cursor-pointer">
      <template v-for="(item, index) in theme.nav" :key="item.text + index">
        <li
          @click="linkTo(item.link)"
          :class="`px-4 h-16 text-sm flex items-center ${routeActiveMatch(item.activeMatch) ? 'active' : ''}`"
        >
          <i v-if="item.icon" :class="`${item.icon} mr-1`"></i>
          <span v-if="item.text">{{ item.text }}</span>
        </li>
      </template>
    </ul>
  </div>
  <transition name="menu">
    <div
      v-if="visible"
      key="nav-menu"
      class="fixed top-16 left-0 w-screen z-30 bg-white shadow-lg shadow-gray-300 py-8 px-8"
    >
    <ul class="flex flex-col">
      <template v-for="(item, index) in theme.nav" :key="item.text + index">
        <li
          @click="linkTo(item.link)"
          :class="`px-4 h-12 mb-2 text-sm flex items-center ${routeActiveMatch(item.activeMatch) ? 'bg-blue-100 text-blue-500' : ''}`"
        >{{ item.text }}</li>
      </template>
    </ul>
    </div>
  </transition>
  <div v-if="visible" @click="visible = false" class=" w-screen h-screen fixed top-0 left-0 z-20"></div>
</template>
<script setup>
import { ref } from 'vue'
import { useData, useRoute, withBase, useRouter } from "vitepress";
const { site, page, theme } = useData()
const route = useRoute()
const router = useRouter()
console.log(route.path);

const routeActiveMatch = (_activeMatch) => {
  if (_activeMatch) {
    let _reg = new RegExp(_activeMatch)
    return _reg.test(route.path)
  }
  return false
}

const visible = ref(false)

const home = () => {
  router.go('/')
}

const linkTo = (path) => {
  if(path.includes('http')) {
    window.location.href = path
  } else {
    router.go(path)
  }
  visible.value = false
}
</script>

<style scope>
.active {
  color: rgb(59 130 246);
  border-bottom: solid 2px rgb(59 130 246);
}

.large {
  font-size: 1.8em!important;
}
.big {
  font-size: 1.5em!important;
}
.small {
  font-size: 0.5em!important;
}
.default {
  font-size: 1em!important;
}

</style>