<template>
  <div>
    <input v-model="inputValue" placeholder="Nhập dữ liệu của bạn" />
    <p class="dataresponse">{{ responseMessage }}</p>
    <button @click="handleSubmit">Submit</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      inputValue: "",
      responseMessage: "",
    };
  },
 methods: {
  async handleSubmit() {
    // Loại bỏ khoảng trắng và chuyển về chữ thường
    const trimmedInput = this.inputValue.trim().toLowerCase();

    // Kiểm tra xem input có rỗng không
    if (!trimmedInput) {
      this.responseMessage = "Vui lòng nhập dữ liệu.";
      return; // Ngừng thực hiện nếu không có dữ liệu
    }

    try {
      const response = await axios.get(`/dictionary/${trimmedInput}`); // Sử dụng đường dẫn proxy
      this.responseMessage = response.data.meaning;
    } catch (error) {
      console.error("Error calling API:", error);
      if (error.response) {
        this.responseMessage = `Server Error: ${error.response.status} - ${error.response.data}`;
      } else if (error.request) {
        this.responseMessage = "No response received from server";
      } else {
        this.responseMessage = `Error: ${error.message}`;
      }
    }
  }
}
};
</script>

<style scoped>
input {
  margin-right: 10px;
}
button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
