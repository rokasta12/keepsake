<script>
import { httpClient } from '~/common/services/httpClient'
import { services } from '~/common/services/services'
export default {
  data() {
    return {
      secretId: '',
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      phoneNumber: '',
      profilePicture: '',
    }
  },
  created() {
    this.fetchAccountDetails()
  },
  methods: {
    async fetchAccountDetails() {
      try {
        const response = await services.getAccountDetails()
        this.secretId = response._id
        this.firstName = response.firstName
        this.lastName = response.lastName
        this.email = response.email
        this.birthDate = response.birthDate
        this.phoneNumber = response.phoneNumber
        this.profilePicture = response.profilePicture
      }
      catch (error) {
        console.error(error)
      }
    },
    async submitForm() {
      try {
        const response = await services.editAccountDetails ({
          _id: this.secretId,
          firstName: this.firstName,
          lastName: this.lastName,
          birthDate: this.birthDate,
          phoneNumber: this.phoneNumber,
          profilePicture: this.profilePicture,
        })

        console.log('finished update')
      }
      catch (error) {
        console.error(error)
        console.log('here')
      }
    },
  },
}
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">
      Account Information
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div class="mb-4 md:mb-0">
        <label class="text-lg font-medium mb-2">First Name</label>
        <input
          v-model="firstName"
          class="border border-gray-300 p-2 rounded-lg"
          type="text"
        >
      </div>
      <div class="mb-4 md:mb-0">
        <label class="text-lg font-medium mb-2">Last Name</label>
        <input
          v-model="lastName"
          class="border border-gray-300 p-2 rounded-lg"
          type="text"
        >
      </div>
      <div class="mb-4 md:mb-0">
        <label class="text-lg font-medium mb-2">Email</label>
        <input
          v-model="email"
          class="border border-gray-300 p-2 rounded-lg"
          type="email"
        >
      </div>
      <div class="mb-4 md:mb-0">
        <label class="text-lg font-medium mb-2">Birth Date</label>
        <input
          v-model="birthDate"
          class="border border-gray-300 p-2 rounded-lg"
          type="date"
        >
      </div>
      <div class="mb-4 md:mb-0">
        <label class="text-lg font-medium mb-2">Phone Number</label>
        <input
          v-model="phoneNumber"
          class="border border-gray-300 p-2 rounded-lg"
          type="tel"
        >
      </div>
      <div class="mb-4 md:mb-0">
        <label class="text-lg font-medium mb-2">Profile Picture</label>
        <input
          class="border border-gray-300 p-2 rounded-lg"
          type="file"
          v-on="profilePicture"
        >
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <button
        class="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg"
        @click="submitForm"
      >
        Save Changes
      </button>
    </div>
  </div>
</template>
