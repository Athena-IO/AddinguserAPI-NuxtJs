<template>
  <div class="h-[500px] flex justify-center">
    <div
      class="h-full w-11/12 flex flex-col gap-7 p-4 border-2 border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200"
    >
      <div class="w-11/12 flex flex-col gap-2">
        <div class="flex justify-around items-center gap-2">
          <div class="w-2/6">
            <input
              id="name"
              type="text"
              v-model="formdata.name"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-700"
              placeholder="Enter your name"
            />
            <p v-if="formdata.errors.name" class="text-red-500 text-sm mt-1">
              {{ formdata.errors.name }}
            </p>
          </div>

          <div class="w-2/6 relative">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="formdata.pass"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-700"
              placeholder="Enter your password"
            />
            <button
              type="button"
              class="absolute right-3 top-3 text-gray-500"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? "👁️" : "👁️‍🗨️" }}
            </button>
            <p v-if="formdata.errors.pass" class="text-red-500 text-sm mt-1">
              {{ formdata.errors.pass }}
            </p>
          </div>
        </div>
      </div>

      <div class="w-11/12 flex flex-col gap-2">
        <div class="flex justify-around items-center gap-2">
          <div class="w-2/6">
            <input
              id="number"
              type="text"
              v-model="formdata.number"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-700"
              placeholder="Enter your number"
              @input="
                formdata.number = formdata.number
                  .replace(/\D/g, '')
                  .slice(0, 11)
              "
            />

            <p v-if="formdata.errors.number" class="text-red-500 text-sm mt-1">
              {{ formdata.errors.number }}
            </p>
          </div>

          <div class="w-2/6">
            <input
              id="address"
              type="text"
              v-model="formdata.addres"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-700"
              placeholder="Enter your address"
            />
            <p v-if="formdata.errors.addres" class="text-red-500 text-sm mt-1">
              {{ formdata.errors.addres }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-start">
        <button
          @click="submit"
          class="w-1/6 px-6 py-3 mr-20 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-700 transition-all duration-200"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/adduser";
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const showPassword = ref(false);
const router = useRouter();

const formdata = reactive({
  name: "",
  pass: "",
  number: null,
  addres: "",
  errors: {},
});

const validateForm = () => {
  formdata.errors = {};

  if (!formdata.name) formdata.errors.name = "Name is required!";
  if (!formdata.pass) formdata.errors.pass = "Password is required!";
  if (!formdata.number) formdata.errors.number = "Number is required!";
  if (!formdata.addres) formdata.errors.addres = "Address is required!";

  if (formdata.pass && formdata.pass.length < 6)
    formdata.errors.pass = "Password must be at least 6 characters!";

  const numberPattern = /^09\d{9}$/;
  if (formdata.number && !numberPattern.test(formdata.number)) {
    formdata.errors.number =
      "Number must start with '09' and be exactly 11 digits!";
  }

  return Object.keys(formdata.errors).length === 0;
};

const submit = async () => {
  if (!validateForm()) return;

  userStore.addUser({
    name: formdata.name.toLowerCase(),
    pass: formdata.pass,
    number: formdata.number,
    addres: formdata.addres,
  });
  try {
    const response = await axios.post(
      "https://fakestoreapi.com/users",
      formdata
    );
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error adding user:", error);
  }

  Object.assign(formdata, {
    name: "",
    pass: "",
    number: null,
    addres: "",
    errors: {},
  });
  setTimeout(() => {
    router.push("/");
  }, 3000);
};
</script>
