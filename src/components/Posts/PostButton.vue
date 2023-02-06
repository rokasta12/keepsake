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
import { audioRecorder } from '~/common/constants/audioRecorder'
import type { Family } from '~/stores/types'
const { t } = useI18n()

const isOpen = ref(false)
const families = ref<Family[] | null>(null)
const audioURL = ref(null)

function closeModal() {
  isOpen.value = false
}
async function openModal() {
  isOpen.value = true
  const resp = await services.getFamilies()
  families.value = resp
  console.log(resp)
}

async function closeRecording() {
  audioRecorder.stop()
  audioURL.value = URL.createObjectURL(audioRecorder.audioBlobs[0])
}

async function post() {
  const post = {
    audioUrl: 'https://audiostoragekeepsake.s3.amazonaws.com/Never+gonna+give+you+up.mp3',
    date: Date.now(),
  }
  try {
    await services.makePost(post)
  }
  catch (error) {
    console.error(error)
  }
  closeModal()
}
</script>

<template>
  <button
    class="fixed text-white px-4 w-auto h-12 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
    style="top: 90%; left: 50%; transform: translate(-50%, -50%);" @click="openModal"
  >
    <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6 inline-block mr-1">
      <path
        fill="#FFFFFF" d="M16.399,7.643V10.4c0,2.236-1.643,4.629-5.399,4.959V18h2.6c0.22,0,0.4,0.18,0.4,0.4v1.2
                c0,0.221-0.181,0.4-0.4,0.4H6.4C6.18,20,6,19.82,6,19.6v-1.2C6,18.18,6.18,18,6.399,18H9v-2.641c-3.758-0.33-5.4-2.723-5.4-4.959
                V7.643c0-0.221,0.18-0.4,0.4-0.4h0.6c0.22,0,0.4,0.18,0.4,0.4V10.4c0,1.336,1.053,3.6,5,3.6c3.946,0,5-2.264,5-3.6V7.643
                c0-0.221,0.18-0.4,0.399-0.4H16C16.22,7.242,16.399,7.422,16.399,7.643z M10,12c2.346,0,3-0.965,3-1.6V7.242H7V10.4
                C7,11.035,7.652,12,10,12z M13,1.6C13,0.963,12.346,0,10,0C7.652,0,7,0.963,7,1.6v4.242h6V1.6z"
      />
    </svg>
    <span>{{ t("span.post") }}</span>
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
                    Please select the family you want to post to
                  </DialogTitle>
                  <div class="flex items-center justify-center">
                    <div
                      v-for="family in families" :key="family"
                      class="inline-flex  shadow-md hover:shadow-lg focus:shadow-lg" role="group"
                    >
                      <a
                        href="#" aria-current="page"
                        class=" rounded-l px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                      >
                        {{ family.name }}
                      </a>
                    </div>
                  </div>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Make a recording to share with your family
                    </p>
                  </div>
                  <button
                    type="button" class="btn btn-primary"
                    @click="audioRecorder.start()"
                  >
                    Record
                  </button>
                  <button
                    type="button" class="btn btn-primary"
                    @click="audioRecorder.stop()"
                  >
                    Stop
                  </button>
                  <!-- <AudioPlayer :src="" /> -->

                  <div class="mt-4">
                    <button
                      type="button"
                      class="inline-flex mr-2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="closeModal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="post"
                    >
                      Post
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
