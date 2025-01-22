<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
    <nav class="backdrop-blur-md bg-white/70 sticky top-0 z-50 border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <NuxtLink to="/" class="flex items-center space-x-2 group">
              <span class="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:animate-pulse">
                Suowu's Blog
              </span>
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-8">
            <NuxtLink 
              to="/categories" 
              class="relative text-gray-700 font-medium group"
            >
              <span class="relative z-10">分类</span>
              <span class="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </NuxtLink>
            <NuxtLink 
              to="/tags" 
              class="relative text-gray-700 font-medium group"
            >
              <span class="relative z-10">标签</span>
              <span class="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <NuxtPage />
    </main>

    <footer class="backdrop-blur-md bg-white/70 border-t border-gray-100 mt-auto py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
          © 2024 Suowu's Blog. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-in-out;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>