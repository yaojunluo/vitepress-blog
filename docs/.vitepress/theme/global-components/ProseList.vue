<template>
  <div class="w-full prose-list">
    <div class="text-base text-gray-700 font-thin">最新文章</div>
    <div class="mt-4">
      <ul>
        <template v-for="(item, key) in posts" :key="'column-' + key">
          <li class="mb-2 text-sm">
            <a :href="item.regularPath" class="flex items-center py-1" :title="item.frontMatter.title">
              <span class="text-gray-700 flex-1 truncate">{{ item.frontMatter.title || '匿名文章' }}</span>
              <span class="ml-2 text-xs text-gray-500">{{ formatDate(item.frontMatter.date) }}</span>
            </a>
            <span class="w-full text-xs text-gray-400 font-light">
              {{item.frontMatter.description}}
            </span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = ref({});
posts.value = theme.value.pages;

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
.prose-list ul>li {
  padding-left: 0;
}
.prose-list ul>li::before {
  content: '';
  position: absolute;
  left: -1.5rem;
  top: 0;
  bottom: 0;
  width: 0;
  height: 0;
  background: #e0e0e0;
}
.prose-list a {
  box-shadow: none;
}
</style>