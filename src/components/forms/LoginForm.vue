<script setup lang="ts">
import { signup } from '~/common/services/services'

const emit = defineEmits<{
  (e: 'signup', data: {
    email: string
    password: string
    name: string
    surname: string
    passwordConfirm: string
  }): void
}>()

const email = ref('')
const password = ref<string>('')
const name = ref<string>('')
const surname = ref<string>('')
const passwordConfirm = ref<string>('')
const isFormDirty = ref(false)
const errors = reactive({
  email: '',
  password: '',
  name: '',
  surname: '',
  passwordConfirm: '',
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

  if (!name.value)
    errors.name = t('error.name')
  else
    errors.name = ''

  if (!surname.value)
    errors.surname = t('error.surname')
  else
    errors.surname = ''

  if (password.value !== passwordConfirm.value)
    errors.passwordConfirm = t('error.passwordConfirm')
  else
    errors.passwordConfirm = ''
}

watch([email, password, name, surname, passwordConfirm], () => {
  if (isFormDirty.value)
    validateFields()
})

const handleSubmit = async (e: MouseEvent) => {
  e.preventDefault()
  if (!isFormDirty.value) {
    validateFields()
    isFormDirty.value = true
  }

  if (errors.email || errors.password || errors.name || errors.surname || errors.passwordConfirm)
    return

  const body = {
    email: email.value,
    password: password.value,
    name: name.value,
    surname: surname.value,
    passwordConfirm: passwordConfirm.value,
  }

  const signupResponse = await signup(body)
  console.log('🚀 ~ file: SignupForm.vue:54 ~ handleSubmit ~ signupResponse', signupResponse)

  emit('signup', body)
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
      <label class=" text-gray-700 text-left" for="password">
        Password
      </label>
      <TheInput v-model="password" placeholder="What's your password?" autocomplete="false" type="password" />
      <p class="text-red-400 text-left text-sm">
        {{ errors.password }}
      </p>
      <label class=" text-gray-700 text-left" for="passwordConfirm">
        Confirm Password
      </label>
      <TheInput v-model="passwordConfirm" placeholder="Confirm your password" autocomplete="false" type="password" />
      <p class="text-red-400 text-left text-sm">
        {{ errors.passwordConfirm }}
      </p>
      <label class=" text-gray-700 text-left" for="name">
        Name
      </label>
      <TheInput v-model="name" placeholder="What's your name?" autocomplete="false" />
      <p class="text-red-400 text-left text-sm">
        {{ errors.name }}
      </p>
      <label class=" text-gray-700 text-left" for="surname">
        Surname
      </label>
      <TheInput v-model="surname" placeholder="What's your surname?" autocomplete="false" />
      <p class="text-red-400 text-left text-sm">
        {{ errors.surname }}
      </p>
      <button class="loading" btn mt-2 text-lg :onclick="handleSubmit">
        {{ t('button.signup') }}
      </button>
    </div>
  </div>
</template>
