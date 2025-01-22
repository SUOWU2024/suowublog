<template>
  <div>
    <h1 class="text-4xl font-bold mb-8">Tag: {{ tag }}</h1>
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <article v-for="post in posts" :key="post._path" class="bg-white rounded-lg shadow-md overflow-hidden">
        <NuxtLink :to="post._path">
          <div class="p-6">
            <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
            <p class="text-gray-600 mb-4">{{ post.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-if="post.category" class="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                {{ post.category }}
              </span>
              <span v-for="postTag in post.tags" :key="postTag" class="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-sm">
                {{ postTag }}
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
const tag = route.params.tag

const { data: posts } = await useAsyncData(`tag-${tag}`, () => 
  queryContent('/posts')
    .where({ tags: { $contains: tag } })
    .sort({ date: -1 })
    .find()
)
</script>