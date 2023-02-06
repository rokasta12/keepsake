<script setup lang="ts">
import { RouterView } from 'vue-router'
import { services } from './common/services/services'
import type { LoginResponse } from './stores/response.type'
import './styles/main.css'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Vitesse',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
const router = useRouter()

const user = useUserStore()

onMounted(async () => {
  const tokenRes: LoginResponse = localStorageState.value
  const accesToken = tokenRes?.accessToken?.jwtToken
  try {
    user.currentUser = await services.getAccountDetails()
  }
  catch (error) {
    console.error(error)
  }

  if (accesToken) {
    user.setAccessToken(accesToken)
    /* router.push('/feed') */
  }
  else {
    /* router.push('/auth/login') */
  }
})
</script>

<template>
  <RouterView />
</template>
