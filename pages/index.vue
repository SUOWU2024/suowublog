<template>
  <div>
    <div class="text-center mb-16 space-y-4">
      <h1 class="text-5xl sm:text-6xl md:text-7xl font-black">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient">
          欢迎来到索悟的博客
        </span>
      </h1>
      <p class="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
        分享技术与生活的点点滴滴
      </p>
    </div>

    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <article 
        v-for="(post, index) in posts" 
        :key="post._path" 
        class="group relative bg-white rounded-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="absolute inset-0 backdrop-blur-3xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
        <NuxtLink :to="post._path">
          <div class="relative p-6">
            <div class="flex items-center space-x-2 mb-4">
              <span 
                v-if="post.category" 
                class="px-3 py-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 rounded-full text-sm font-medium"
              >
                {{ post.category }}
              </span>
              <span class="text-gray-400 text-sm">
                {{ new Date(post.date).toLocaleDateString() }}
              </span>
            </div>
            <h2 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
              {{ post.title }}
            </h2>
            <p class="text-gray-600 mb-4 line-clamp-2">
              {{ post.description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in post.tags" 
                :key="tag" 
                class="px-2 py-1 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 rounded-md text-sm group-hover:from-indigo-50 group-hover:to-purple-50 transition-colors"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>
  </div>
</template>

<script setup>
const { data: posts } = await useAsyncData('posts', () => queryContent('/posts')
  .sort({ date: -1 })
  .find()
)
</script>

<style scoped>
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

article {
  animation: slideUp 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient 4s linear infinite;
}
</style>