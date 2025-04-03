<template>
  <div
    class="max-w-md mx-auto p-6 rounded-2xl shadow-lg text-white bg-gradient-to-r from-green-400 to-sky-500 mt-5"
  >
    <h2 class="text-2xl font-semibold mb-4">User Details</h2>

    <div v-if="useritself">
      <div class="flex flex-row justify-between items-center">
        <p class="text-white text-xl font-semibold">Name:</p>
        <p class="text-white text-lg">{{ useritself.name }}</p>
      </div>
      <div class="flex flex-row justify-between items-center">
        <p class="text-white text-xl font-semibold">Password:</p>
        <p class="text-white text-lg">{{ useritself.pass }}</p>
      </div>
      <div class="flex flex-row justify-between items-center">
        <p class="text-white text-xl font-semibold">Number:</p>
        <p class="text-white text-lg">{{ useritself.number }}</p>
      </div>
      <div class="flex flex-row justify-between items-center">
        <p class="text-white text-xl font-semibold">Address:</p>
        <p class="text-white text-lg">{{ useritself.addres }}</p>
      </div>
    </div>

    <p v-else class="text-center text-white text-xl">Loading user data...</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/adduser";
const route = useRoute();
const userstore = useUserStore();

const userindex = computed(() => Number(route.query.index));

const useritself = computed(() => {
  return userstore.users[userindex.value];
});
console.log(useritself);
</script>
