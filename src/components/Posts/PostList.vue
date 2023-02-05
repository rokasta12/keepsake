<script setup lang="ts">
import { getPosts } from '~/common/services/services'
import type { Post } from '~/stores/types'

const posts = ref<Post[] | null>(null)

const getposts = async () => {
  const postsResponse = await getPosts()
  posts.value = postsResponse
}

onMounted(() => {
  getposts()
})

const { t } = useI18n()
</script>

<template>
  <div class="mt-4">
    <div v-if="posts" class="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1">
      <PostCard v-for="post in posts" :key="post._id" :post="post" />
    </div>
    <div v-else>
      <p>{{ t("p.posts") }}</p>
      <PostLoader v-for="_, index in Array.from({ length: 10 })" :key="index" />
    </div>
  </div>
</template>
