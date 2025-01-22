<template>
  <div>
    <div class="text-center mb-16">
      <h1 class="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
        标签云
      </h1>
      <p class="mt-6 text-xl text-gray-600">按标签浏览文章</p>
    </div>

    <div class="flex flex-wrap justify-center gap-4">
      <NuxtLink
        v-for="(tag, index) in tags"
        :key="tag.name"
        :to="`/tags/${tag.name}`"
        class="group transform hover:-translate-y-1 transition-all duration-300"
        :style="{ animationDelay: `${index * 50}ms` }"
      >
        <div class="relative px-6 py-3 bg-white rounded-full">
          <div class="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="absolute inset-0 rounded-full backdrop-blur-3xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
          <div class="relative">
            <span class="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
              #{{ tag.name }}
            </span>
            <span class="text-gray-500 ml-2">
              {{ tag.count }}
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { data: posts } = await useAsyncData('posts', () => queryContent('/posts').find())
const tags = computed(() => {
  const tagMap = new Map()
  posts.value.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => {
        const count = tagMap.get(tag) || 0
        tagMap.set(tag, count + 1)
      })
    }
  })
  return Array.from(tagMap.entries()).map(([name, count]) => ({ name, count }))
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