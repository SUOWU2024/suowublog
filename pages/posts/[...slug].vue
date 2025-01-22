<template>
  <article>
    <div class="max-w-3xl mx-auto">
      <ContentDoc v-slot="{ doc }">
        <div class="mb-8">
          <div class="flex items-center space-x-2 mb-4">
            <span 
              v-if="doc.category" 
              class="px-3 py-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 rounded-full text-sm font-medium"
            >
              {{ doc.category }}
            </span>
            <span class="text-gray-500 text-sm">
              {{ new Date(doc.date).toLocaleDateString() }}
            </span>
          </div>
          <h1 class="text-4xl font-extrabold text-gray-900 mb-4">
            {{ doc.title }}
          </h1>
          <p class="text-xl text-gray-600 mb-6">
            {{ doc.description }}
          </p>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tag in doc.tags" 
              :key="tag" 
              class="px-3 py-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 rounded-full text-sm font-medium"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
        <div class="prose prose-lg max-w-none prose-indigo">
          <ContentRenderer :value="doc" />
        </div>
      </ContentDoc>
    </div>
  </article>
</template>

<style>
.prose {
  @apply prose-headings:font-bold prose-headings:text-gray-900;
  @apply prose-p:text-gray-600;
  @apply prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline;
  @apply prose-strong:text-gray-900;
  @apply prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1 prose-code:rounded;
  @apply prose-pre:bg-gray-900;
  @apply prose-blockquote:border-l-indigo-500 prose-blockquote:bg-indigo-50/50 prose-blockquote:py-1 prose-blockquote:not-italic;
}
</style>