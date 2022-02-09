<template>
  <div class="prose sm:bg-white shadow-lg shadow-gray-100 p-8 sm:rounded-xl">
    <Content />
  </div>
</template>
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
.prose div[class*="language-"] .line-numbers-wrapper {
  position: absolute;
  top: 10px;
  left: 0;
  width: 50px;
  text-align: center;
  border-right: solid 1px #e1e4e8;
  user-select: none;
}
</style>