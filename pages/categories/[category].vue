<template>
  <div>
    <h1 class="text-4xl font-bold mb-8">Category: {{ category }}</h1>
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <article v-for="post in posts" :key="post._path" class="bg-white rounded-lg shadow-md overflow-hidden">
        <NuxtLink :to="post._path">
          <div class="p-6">
            <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
            <p class="text-gray-600 mb-4">{{ post.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in post.tags" :key="tag" class="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-sm">
                {{ tag }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const category = route.params.category

const { data: posts } = await useAsyncData(`category-${category}`, () => 
  queryContent('/posts')
    .where({ category: category })
    .sort({ date: -1 })
    .find()
)
</script>