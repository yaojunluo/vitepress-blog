<template>
  <div class="prose sm:bg-white shadow-lg shadow-gray-100 p-8 sm:rounded-xl">
    <Content />
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref, watchEffect, nextTick } from "vue";
import { useData, useRoute } from "vitepress";
const route = useRoute();
const currentPath = ref('')
const domReady = ref(false)

// 监听page
watchEffect(() => {
  currentPath.value = route.path
  console.log(currentPath.value, "currentPath", domReady.value);
  if (domReady.value) {
    updateCodeDom();
  }
  // updateCodeDom();
})

onMounted(() => {
  console.log("mounted");
  updateCodeDom();
  domReady.value = true;
});

const updateCodeDom = () => {
  nextTick(() => {
    const code_list = document.querySelectorAll(`.prose div[class*="language-"]`);
    for (const codeDom of code_list) {
      let _lanuage = codeDom.className;
      _lanuage = (_lanuage.match(/language-(\S*)/) || [])[1];
      codeDom.setAttribute("data-lanuage", _lanuage);
    }
  })
}

onUnmounted(() => {
  console.log("==========👾============");
});
</script>

<style>
.prose pre {
  padding: 10px;
  overflow: auto;
}
.prose div[class*="language-"] {
  border-radius: 6px;
  background-color: #292c33;
  position: relative;
  padding-left: 50px;
  overflow: hidden;
}

.prose div[class*="language-"]::after {
  content: attr(data-lanuage);
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  font-size: 12px;
  padding: 0.8571429em 1.1428571em;
  cursor: pointer;
}
.prose div[class*="language-"] .line-numbers-wrapper {
  position: absolute;
  top: 13px;
  left: 0;
  width: 50px;
  text-align: center;
  border-right: solid 1px #e1e4e8;
  user-select: none;
  font-size: 0.875em;
}
</style>