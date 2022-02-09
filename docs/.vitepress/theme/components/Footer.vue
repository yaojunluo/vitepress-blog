<template>
  <div v-if="info.show" class="container mx-auto text-center py-14 text-xs text-gray-400">
    <a :href="info.beian || '#'" class="block my-2" v-if="info.copyright">{{info.copyright}}</a>
    <p v-if="info.author">Developed by {{info.author}}</p>
    <p class="block mt-2" v-if="info.version">版本 {{info.version}}</p>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useData } from "vitepress";
const { theme } = useData();

const info = ref({
  show: false,
})
if(theme.value.info) {
  info.value = theme.value.info
  info.value.show = true
}
</script>