<template>
    <div class="container d-flex flex-column justify-content-center gap-5">
      <div class=""><h1>Máy tính đơn giản</h1></div>
        <form @submit.prevent="handleSubmit">

            <div class="d-flex flex-row number1 p-3">
                <label class="p-2" for="number1">Số thứ 1</label>
                <input type="text" v-model="number1" placeholder="Number 1" />
            </div>
            <div class="d-flex flex-row number2 p-3">
                <label class="p-2" for="number2">Số thứ 2</label>
                <input type="text" v-model="number2" placeholder="Number 2" />
            </div>
            <div class="d-flex flex-row operator p-3">
                <label class="p-2" for="operator">Phép toán</label>
                <select v-model="operator">
                    <option value="Cộng">Cộng</option>
                    <option value="Trừ">Trừ</option>
                    <option value="Nhân">Nhân</option>
                    <option value="Chia">Chia</option>
                </select>
            </div>
            <button type="submit">Submit</button>
            <p class="response-message">{{ responseMessage }}</p>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'MyCalculator',
  data() {
    return {
      number1: "",
      number2: "",
      operator: "",
      responseMessage: "",
    };
  },
 methods: {
  async handleSubmit() {
    const num1 = this.number1.trim();
    const num2 = this.number2.trim();
    const operator = this.operator;

    if (!num1 || !num2 || !operator) {
      this.responseMessage = "Vui lòng nhập đầy đủ số và phép toán.";
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/calculator`, {
        params: { num1, num2, operator },
      });
     
      this.responseMessage = response.data; 
    } catch (error) {
      console.error("Error calling API:", error);
      this.responseMessage = error.response?.data || "Đã xảy ra lỗi.";
    }
  }
}

};
</script>

<style>
/* CSS cho máy tính đơn giản */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}

.container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.container h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
}

.d-flex {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

label {
  flex: 1;
  font-weight: bold;
  color: #333;
}

input[type="text"],
select {
  flex: 2;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.response-message {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #28a745;
  text-align: center;
}
</style>