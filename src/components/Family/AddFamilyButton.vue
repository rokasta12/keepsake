<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { services } from '~/common/services/services'
const { t } = useI18n()

const isOpen = ref(false)

const familyName = ref('')

function closeModal() {
  isOpen.value = false
}
async function openModal() {
  isOpen.value = true
}

async function createFamily() {
  await services.createFamily(familyName.value)
  window.location.reload()
}
</script>

<template>
  <button
    class="fixed text-white px-4 w-auto h-12 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
    style="top: 95%; left: 95%; transform: translate(-50%, -50%);" @click="openModal"
  >
    <span>{{ t("asd") }}</span>
    <div>
      <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" class="relative z-10" @close="closeModal">
          <TransitionChild
            as="template" enter="duration-300 ease-out" enter-from="opacity-0"
            enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                    Create a new family
                  </DialogTitle>

                  <div class="flex flex-col gap-1 max-w-xl" w="300px">
                    <label class=" text-gray-700 text-left" for="name">
                      Choose what your family is going to be called
                    </label>
                    <TheInput v-model="familyName" placeholder="Other users will see this name" autocomplete="false" />
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="createFamily"
                    >
                      Create new family
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </button>
</template>
