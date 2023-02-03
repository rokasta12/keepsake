<script setup lang="ts">
import { services } from '~/common/services/services'
const emit = defineEmits<{
  (e: 'login', data: {
    email: string
    password: string
    firstName: string
    lastName: string
  }): void
}>()
const user = useUserStore()
const router = useRouter()
const email = ref<string>('')
const password = ref<string>('')
const firstName = ref<string>('')
const lastName = ref<string>('')

/* const formData = reactive<SignupData>({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
})
 */
const isFormDirty = ref(false)
const errors = reactive({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
})
const responseError = reactive(
  {
    title: '',
    body: '',
  },
)
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

  try {
    const signupresponse = await services.signup({
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
    })
    if (signupresponse.status === 201) {
      user.setUser(signupresponse.data)
      router.push('/auth/verify')
    }
  }
  catch (error) {
    responseError.title = t('login.errors.title')
    responseError.body = t('login.errors.body')
  }

  emit('signup', body)
}
</script>

<template>
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-center">
    <div class="flex flex-col gap-1 max-w-xl" w="300px">
      <Alert :error="responseError" />
      <label class=" text-gray-700 text-left" for="name">
        First name
      </label>
      <TheInput v-model="firstName" placeholder="What's your email?" autocomplete="false" />
      <label class=" text-gray-700 text-left" for="name">
        Last name
      </label>
      <TheInput v-model="lastName" placeholder="What's your email?" autocomplete="false" />
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
        {{ t('button.signup') }}
      </button>
    </div>
  </div>
</template>
