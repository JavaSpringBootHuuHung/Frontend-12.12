<template>
    <div>
      <h1>Welcome to the Greeting Page</h1>
      <h2>{{ message }}</h2>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "GreeTing",
    data() {
      return {
        message: "",
      };
    },
    methods: {
      async fetchMessage() {
        try {
          const response = await axios.get(`http://localhost:8080/greeting`, {
            params: { name: this.$route.query.name || "" },
          });
          this.message = response.data; 
        } catch (error) {
          console.error("Error calling API:", error);
        }
      },
    },
    watch: {
      // Lắng nghe thay đổi của URL và gọi lại API
      $route: "fetchMessage",
    },
    mounted() {
      // Gọi API lần đầu tiên khi trang được tải
      this.fetchMessage();
    },
  };
  </script>
  