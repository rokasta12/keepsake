<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold mb-4">{{ familyName }}</h1>
    <table class="table-auto w-full">
      <thead>
        <tr class="bg-gray-900 text-white">
          <th class="px-4 py-2">First Name</th>
          <th class="px-4 py-2">Last Name</th>
          <th class="px-4 py-2">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in members" :key="member._id" class="border-b">
          <td class="px-4 py-2">{{ member.firstName }}</td>
          <td class="px-4 py-2">{{ member.lastName }}</td>
          <td class="px-4 py-2">{{ member.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    family: {
      type: Object,
      required: true
    }
  },
  computed: {
    familyName() {
      return this.family.familyName;
    },
    members() {
      return this.family.members;
    }
  }
};
</script>

<style>
</style>