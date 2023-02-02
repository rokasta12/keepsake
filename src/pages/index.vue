<script setup lang="ts">
const { t } = useI18n()

defineOptions({
  name: 'IndexPage',
})
const user = useUserStore()

const router = useRouter()
</script>

<template>
  <HeroSection />
</template>

<route lang="yaml">
meta:
  layout: home
</route>
