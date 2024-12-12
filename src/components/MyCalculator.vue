<template>
    <div class="container d-flex justify-content-center gap-5">
        <form @submit.prevent="handleSubmit">
            <div class="d-flex flex-row number1 p-3">
                <label class="p-2" for="number1">Number 1</label>
                <input type="text" v-model="number1" placeholder="Number 1" />
            </div>
            <div class="d-flex flex-row number2 p-3">
                <label class="p-2" for="number2">Number 2</label>
                <input type="text" v-model="number2" placeholder="Number 2" />
            </div>
            <div class="d-flex flex-row operator p-3">
                <label class="p-2" for="operator">Operator</label>
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
      const operator = this.operator.trim();
      
      try {
        const response = await axios.get(`/calculator?num1=${num1}&num2=${num2}&operator=${operator}`);
        this.responseMessage = response.data; // Dữ liệu trả về từ API
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

<style>
.container {
  margin-top: 20px;
}
.response-message {
  margin-top: 10px;
  font-weight: bold;
}
</style>