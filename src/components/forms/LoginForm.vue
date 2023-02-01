<script setup lang="ts">
import { login } from '~/common/services/services'

const emit = defineEmits<{
  (e: 'login', data: {
    email: string
    password: string
  }): void
}>()

const email = ref('')
const password = ref<string>('')
const isFormDirty = ref(false)
const errors = reactive({
  email: '',
  password: '',
})
const { t } = useI18n()

const validateFields = () => {
  if (!email.value)
    errors.email = t('error.email')
  else
    errors.email = ''

  if (!password.value && password.value.length < 8)

    errors.password = t('error.password')

  else
    errors.password = ''
}

watch([email, password], () => {
  if (isFormDirty.value)
    validateFields()
})
const handleSubmit = async (e: MouseEvent) => {
  e.preventDefault()
  if (!isFormDirty.value) {
    validateFields()
    isFormDirty.value = true
  }

  if (errors.email || errors.password)
    return

  const body = {
    email: email.value,
    password: password.value,
  }

  const loginResponse = await login(body.email, body.password)
  console.log('🚀 ~ file: LoginForm.vue:54 ~ handleSubmit ~ loginResponse', loginResponse)

  emit('login', body)
}
</script>

<template>
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-center">
    <div class="flex flex-col gap-1 max-w-xl" w="300px">
      <label class=" text-gray-700 text-left" for="email">
        Email
      </label>
      <TheInput v-model="email" placeholder="What's your email?" autocomplete="false" />
      <p class="text-red-400 text-left text-sm">
        {{ errors.email }}
      </p>
      <label class=" text-gray-700 text-left" for="pasword">
        Password
      </label>
      <TheInput v-model="password" placeholder="What's your password?" autocomplete="false" type="password" />
      <p class="text-red-400 text-left text-sm">
        {{ errors.password }}
      </p>
      <button class="loading" btn mt-2 text-lg :onclick="handleSubmit">
        {{ t('button.login') }}
      </button>
    </div>
  </div>
</template>