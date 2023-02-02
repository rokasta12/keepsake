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
  <div>
    <!-- <div>
      <button class="btn m-3 " @click="router.push('/auth/login')">
        {{ t('button.login') }}
      </button>
      <button class="btn-ghost m-3 " @click="router.push('/auth/signup')">
        {{ t('button.signup') }}
      </button>
    </div> -->

    <!-- <div>
      <FamilyCard :family="dummyFamily" />
    </div> -->
    <!-- <PostList /> -->
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
