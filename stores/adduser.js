import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    fakestoreapi: [],
  }),
  actions: {
    async fetchUsers() {
      try {
        if (this.users.length == 0) {
          const response = await axios.get("https://fakestoreapi.com/users");
          this.fakestoreapi = response.data.map((user) => ({
            name: user.username,
            pass: user.password,
            number: user.phone || "N/A",
            addres: user.address?.street || "N/A",
          }));
          for (let i = 0; i < this.fakestoreapi.length; i++) {
            this.users.push(this.fakestoreapi[i]);
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    addUser(data) {
      this.users.push(data);
    },
  },
});
