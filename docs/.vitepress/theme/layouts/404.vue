<template>
  <div class="w-full h-full flex justify-center">
    <img :src="withBase('/404.svg')" alt="404" class="w-1/2">
  </div>
</template>
<script setup>
import { withBase } from "vitepress";
</script>