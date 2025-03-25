<template>
  <div class="flex flex-col justify-center items-center">
    <div class="w-full flex flex-row justify-between">
      <div class="text-3xl m-5"><span>Welcome</span></div>
      <NuxtLink class="flex justify-end pt-5 w-full" to="/adduserform">
        <button
          class="w-1/6 text-lg px-6 py-3 mr-20 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-700 transition-all duration-200"
        >
          Add User
        </button>
      </NuxtLink>
    </div>

    <div class="w-10/12 flex flex-col justify-center items-center p-6">
      <h2 class="text-2xl font-semibold ml-10 mb-6">User List</h2>
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-300 p-2">Name</th>
            <th class="border border-gray-300 p-2">Password</th>
            <th class="border border-gray-300 p-2">Number</th>
            <th class="border border-gray-300 p-2">Address</th>
            <th class="border border-gray-300 p-2">show full form</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in userStore.users"
            :key="index"
            class="text-center"
          >
            <td class="border border-gray-300 p-2">{{ user.name }}</td>
            <td class="border border-gray-300 p-2">{{ user.pass }}</td>
            <td class="border border-gray-300 p-2">{{ user.number }}</td>
            <td class="border border-gray-300 p-2">{{ user.addres }}</td>
            <td class="border border-gray-300 p-2">
              <NuxtLink :to="`/formshow?index=${index}`">
                <button
                  class="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Show More
                </button>
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@/stores/adduser";

const userStore = useUserStore();

onMounted(async () => {
  await userStore.fetchUsers();
});
</script>
