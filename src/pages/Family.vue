<!-- eslint-disable vue/require-v-for-key -->
<script setup lang="ts">
import { services } from '~/common/services/services'
import type { Family } from '~/stores/types'

const families = ref<Family[] | null>(null)

const getFamilies = async () => {
  const familyResponse = await services.getFamilies()
  families.value = familyResponse
}

onMounted(() => {
  getFamilies()
})
</script>

<template>
  <div v-if="families" class="grid grid-cols-2 gap-4">
    <FamilyCard v-for="family in families" :key="family._id" :family="family" />
  </div>

  <AddFamilyButton />
  <JoinFamilyButton />
</template>
