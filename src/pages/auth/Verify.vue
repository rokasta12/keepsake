<script setup lang="ts">
import { services } from '~/common/services/services'

const { t } = useI18n()
const user = useUserStore()
const otp = ref<string>('')
const email = ref<string>('')
const isDirty = ref<boolean>(false)
const router = useRouter()
const handleVerify = async () => {
  isDirty.value = true
  const response = await services.verifyEmail({
    otp: otp.value.toString(),
    email: email.value,
  })
  if (response.status.toString().startsWith('2'))
    router.push('/auth/login')
}
const resendCode = () => {
  console.log('resend')
}
onMounted(() => {
  email.value = user?.currentUser?.email || ''
})
</script>

<template>
  <div class="w-full h-xl flex flex-col items-center mt-4 bg-white  px-8 pt-6 pb-8 mb-4 flex justify-center">
    <div class="w-xl flex justify-center max-w-sm rounded overflow-hidden shadow-lg  py-6 px-4 min-h-[200px]">
      <div class="w-64">
        <h2 class="text-lg self-start">
          {{ t('verify.title') }}
        </h2>
        <TheInput v-model="email" class="mb-4" />
        <VerifyEmail v-model="otp" :fields="6" />
        <p class="text-red-400 text-center mt-2 text-sm">
          {{ !otp && isDirty ? t('error.otp') : '' }}
        </p>
        <div class="w-full justify-between">
          <button class="loading" btn mt-2 text-lg :onclick="handleVerify">
            {{ t('verify.verify') }}
          </button>
          <button class="loading" btn-ghost mt-2 ml-4 text-lg :onclick="resendCode">
            {{ t('verify.resend') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
