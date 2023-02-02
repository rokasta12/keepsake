<script>
export default {
  data() {
    return {
      name: '',
      lastName: '',
      email: '',
      birthDate: '',
      phoneNumber: '',
      profilePicture: '',
    }
  },
  methods: {
    submitForm() {
      // Add logic to submit form data
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
        <label class="text-lg font-medium mb-2">Name</label>
        <input
          v-model="name"
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
