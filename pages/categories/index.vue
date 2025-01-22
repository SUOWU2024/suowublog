<template>
  <div>
    <div class="text-center mb-16">
      <h1 class="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        文章分类
      </h1>
      <p class="mt-6 text-xl text-gray-600">按分类浏览文章</p>
    </div>

    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <NuxtLink 
        v-for="(category, index) in categories" 
        :key="category.name"
        :to="`/categories/${category.name}`"
        class="group transform hover:-translate-y-1 transition-all duration-300"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="relative bg-white p-8 rounded-xl overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="absolute inset-0 backdrop-blur-3xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
          <div class="relative">
            <h2 class="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
              {{ category.name }}
            </h2>
            <p class="text-gray-500">
              {{ category.count }} 篇文章
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { data: posts } = await useAsyncData('posts', () => queryContent('/posts').find())
const categories = computed(() => {
  const categoryMap = new Map()
  posts.value.forEach(post => {
    if (post.category) {
      const count = categoryMap.get(post.category) || 0
      categoryMap.set(post.category, count + 1)
    }
  })
  return Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count }))
})
</script>

<style scoped>
a {
  animation: slideUp 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>