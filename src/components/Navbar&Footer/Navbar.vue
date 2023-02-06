<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const user = useUserStore()
const logout = () => {
  localStorageState.value = null
  user.isLoggedIn = false
  router.replace('/')
}

// get current page name
</script>

<template>
  <!--   <div class="w-full ">
    <div class=" mx-auto max-w-5xl flex justify-between items-center ">
      <KeepSake />
      <a href="">
        Posts
      </a>
    </div>
  </div> -->
  <Disclosure v-slot="{ open }" as="nav" class="bg-white shadow dark:bg-black dark:text-white">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <KeepSake />
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
            <a
              href="/" class="inline-flex items-center border-b-2  px-1 pt-1 text-sm font-medium text-gray-900"
              :class="{ 'border-indigo-500 ': route.name === 'index' }"
            >Home</a>
            <a
              v-if="user.currentUser"
              href="/family"
              class="inline-flex items-center border-b-2  px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >Family</a>

            <a
              v-if="user.currentUser"
              href="/feed"
              class="inline-flex items-center border-b-2  px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 "
              :class="{ 'border-indigo-500 ': route.name === 'feed' }"
            >Posts</a>
            <a
              v-if="!user.currentUser"
              href="/auth/signup"
              class="inline-flex items-center border-b-2  px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >Sign
              up</a>
            <a
              v-if="!user.currentUser"
              href="/auth/login"
              class="inline-flex items-center border-b-2  px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >Login</a>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button
            type="button"
            class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <Menu v-if="user.currentUser" as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  :src="user.currentUser.profilePicUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'"
                  alt=""
                >
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <a
                    href="/account/account" class="block px-4 py-2 text-sm text-gray-700"
                    :class="[active ? 'bg-gray-100' : '']"
                  >Profile Settings</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#" class="block px-4 py-2 text-sm text-gray-700" :class="[active ? 'bg-gray-100' : '']"
                    @click="logout"
                  >Sign
                    out</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 pt-2 pb-4">
        <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
        <DisclosureButton
          as="a" href="/"
          class="block border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
          :class="{ 'bg-indigo-50 border-indigo-500 text-indigo-700 ': route.name === 'index' }"
        >
          Dashboard
        </DisclosureButton>
        <DisclosureButton
          as="a" href="#"
          class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
        >
          Team
        </DisclosureButton>
        <DisclosureButton
          as="a" href="#"
          class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
          :class="{ 'bg-indigo-50 border-indigo-500 text-indigo-700 ': route.name === 'feed' }"
        >
          Feed
        </DisclosureButton>
        <DisclosureButton
          as="a" href="#"
          class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
        >
          Calendar
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
