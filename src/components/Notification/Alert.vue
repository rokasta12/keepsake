<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  error: {
    title: string
    body: string
  }
}>()

const error = props.error
</script>

<template>
  <div v-if="error.title || error.body" class="rounded-md bg-red-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-lg font-medium text-red-800">
          {{ error.title }}
        </h3>
        <div class="mt-2 text-sm text-red-700">
          <p role="list" class="list-disc space-y-1 pl-5">
            {{ error.body }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
