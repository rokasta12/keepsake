<script setup lang="ts">
import type { Family } from '~/stores/types'
const props = defineProps<{
  family: Family
}>()

async function closeFamily() {
  // await services.closeFamily(props.family._id)
}

const family = props.family
</script>

<template>
  <div class="flex flex-wrap bg-gray-800 md:w-1/2 lg:w-1/3 rounded-lg ">
    <div class="w-full  px-4 mb-8">
      <div class="rounded-lg shadow-lg p-6">
        <h1 class="text-2xl font-bold mb-4 text-white">
          {{ family.name }}
        </h1>
        <p class="text-gray-4000 mb-4">
          <!-- Created on: {{ format(new Date(family.createdDate), 'MM/dd/yyyy') }} -->
        </p>
        <p class="text-2xs font-bold mb-4 text-gray">
          {{ `Invite ID: ${family.code}` }}
        </p>
        <h2 class="text-xl font-bold mb-4 text-white">
          Admin User
        </h2>
        <div v-if="family?.adminUser" class="flex mb-4">
          <img :src="family.adminUser.profilePicUrl" alt="Admin User" class="w-12 h-12 rounded-full mr-4">
          <div>
            <p class="text-gray-400">
              Name: {{ family.adminUser.firstName }} {{ family.adminUser.lastName }}
            </p>
            <p class="text-gray-400">
              Email: {{ family.adminUser.email }}
            </p>
          </div>
        </div>
        <h2 class="text-xl font-bold mb-4 text-white">
          Members
        </h2>
        <div class="flex flex-wrap">
          <div
            v-for="member in family.members" :key="member._id"
            class="w-full md:w-1/2 lg:w-1/3 px-4 mb-4 hover:scale-150 transition-all ease-out duration-200 cursor-pointer "
          >
            <div class="p-4 bg-gray-700 rounded-lg">
              <div class="flex justify-center mt-2 mb-3">
                <img :src="member.profilePicUrl" alt="Admin User" class="w-12 h-12 rounded-full mr-4 justify-center">
              </div>
              <p class="text-white font-bold mb-2">
                {{ member.firstName }} {{ member.lastName }}
              </p>
              <p class="text-gray-400 mb-2 truncate ">
                Email: {{ member.email }}
              </p>
            </div>
          </div>
        </div>
        <div>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="closeFamily">
            Close to public
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>
