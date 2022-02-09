
<template>
  <Nav />
  <div v-if="page.frontmatter.home" class="w-full">
    <Home />
  </div>
  <div v-else class="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-4 lg:gap-8">
    <Prose class="col-span-3" />
    <div class="w-full mt-8 lg:mt-0">
      <Catalogue />
      <special-column />
      <Newest />
    </div>
  </div>
  <Footer />
</template>
<script setup>
import Nav from '../components/Nav.vue'
import Home from '../components/Home.vue'
import Footer from '../components/Footer.vue'
import Prose from '../components/Prose.vue'
import SpecialColumn from '../components/SpecialColumn.vue'
import Catalogue from '../components/Catalogue.vue'
import Newest from '../components/Newest.vue'

import { useData } from 'vitepress'
const { site, page, theme } = useData()
console.log(site.value, page.value, theme.value, "site, page, theme");
console.log(page.value.frontmatter, "home")
</script>