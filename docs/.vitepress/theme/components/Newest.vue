<template>
  <div class="sm:rounded-xl bg-white shadow-lg shadow-gray-100 p-5 mb-8 w-full">
    <div class="text-base text-gray-700 font-thin">最新文章</div>
    <div class="mt-4">
      <ul>
        <template v-for="(item, key) in posts" :key="'column-' + key">
          <li class="mb-2 text-sm">
            <a :href="item.regularPath" class="flex items-center" :title="item.frontMatter.title">
              <span class="text-gray-700 flex-1 truncate">{{ item.frontMatter.title || '匿名文章' }}</span>
              <span class="ml-2 text-xs text-gray-500">{{ formatDate(item.frontMatter.date) }}</span>
            </a>
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
console.log(theme.value.pages);
posts.value = theme.value.pages.slice(0, 5);
console.log(posts.value);

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