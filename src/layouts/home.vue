<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <main class="px-0  text-center text-gray-700 dark:text-gray-200">
    <Navbar />
    <RouterView />
    <TheFooter />
    <div class="mt-5 mx-auto text-center opacity-75 dark:opacity-50 text-sm">
      {{ new Date().getFullYear() }} © {{ t('footer.title') }}
    </div>
  </main>
</template>
