<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 text-dark">Quản Lý Nhân Viên</h1>
      <button class="btn btn-success" @click="showAddForm">+ Thêm Mới</button>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead class="table-primary">
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Ngày sinh</th>
            <th>Giới tính</th>
            <th>Lương</th>
            <th>Phone</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee, index) in employees" :key="employee.id">
            <td>{{ index + 1 }}</td>
            <td>{{ employee.name }}</td>
            <td>{{ formatDate(employee.birthDate) }}</td>
            <td>{{ employee.gender === 'MALE' ? 'Nam' : 'Nữ' }}</td>
            <td>{{ formatCurrency(employee.salary) }}</td>
            <td>{{ employee.phone }}</td>
            <td>
              <button class="btn btn-primary btn-sm mr-3" @click="showUpdateForm(employee)">Cập nhật</button>
              <button class="btn btn-danger btn-sm mr-3" @click="deleteEmployee(employee.id)">Xóa</button>
              <button class="btn btn-info btn-sm mr-3" @click="detailEmployee(employee.id)">Xem</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Form Modal -->
    <div v-if="showForm" class="modal fade show" tabindex="-1" style="display: block" aria-labelledby="formModal" aria-hidden="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ formMode === 'add' ? 'Thêm Nhân Viên' : 'Cập Nhật Nhân Viên' }}</h5>
            <button type="button" class="btn-close" @click="closeForm" aria-label="Close"></button>
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="modal-body">
              <div class="mb-3">
                <label for="name" class="form-label">Tên:</label>
                <input type="text" class="form-control" id="name" v-model="formData.name" required />
              </div>
              <div class="mb-3">
                <label for="birthDate" class="form-label">Ngày sinh:</label>
                <input type="date" class="form-control" id="birthDate" v-model="formData.birthDate" required />
              </div>
              <div class="mb-3">
                <label for="gender" class="form-label">Giới tính:</label>
                <select class="form-select" id="gender" v-model="formData.gender" required>
                  <option value="MALE">Nam</option>
                  <option value="FEMALE">Nữ</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="salary" class="form-label">Lương:</label>
                <input type="number" class="form-control" id="salary" v-model="formData.salary" required />
                <small v-if="isSalaryInvalid" class="text-danger">Lương phải lớn hơn 0.</small>
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Số điện thoại:</label>
                <input type="text" class="form-control" id="phone" v-model="formData.phone" required />
                <small v-if="isPhoneInvalid" class="text-danger">Số điện thoại phải từ 10 đến 11 số.</small>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeForm">Hủy</button>
              <button type="submit" class="btn btn-primary" :disabled="isSalaryInvalid || isPhoneInvalid">
                {{ formMode === 'add' ? 'Thêm' : 'Cập nhật' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Detail Form Modal -->
    <div v-if="showDetail" class="modal fade show" tabindex="-1" style="display: block" aria-labelledby="detailModal" aria-hidden="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Chi Tiết Nhân Viên</h5>
            <button type="button" class="btn-close" @click="showDetail = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p><strong>Tên:</strong> {{ detailData.name }}</p>
            <p><strong>Ngày sinh:</strong> {{ formatDate(detailData.birthDate) }}</p>
            <p><strong>Giới tính:</strong> {{ detailData.gender === 'MALE' ? 'Nam' : 'Nữ' }}</p>
            <p><strong>Lương:</strong> {{ formatCurrency(detailData.salary) }}</p>
            <p><strong>Số điện thoại:</strong> {{ detailData.phone }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showDetail = false">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      employees: [],
      showForm: false,
      showDetail: false,
      formMode: "add",
      formData: {
        id: "",
        name: "",
        birthDate: "",
        gender: "MALE",
        salary: 0,
        phone: "",
      },
      detailData: {},
    };
  },
  computed: {
    isSalaryInvalid() {
      return this.formData.salary <= 0;
    },
    isPhoneInvalid() {
      const phoneRegex = /^[0-9]{10,11}$/;
      return !phoneRegex.test(this.formData.phone);
    },
  },
  methods: {
    async detailEmployee(id) {
      const response = await axios.get(`http://localhost:8080/employees/${id}`);
      this.detailData = response.data;
      this.showDetail = true;
    },
    async fetchEmployees() {
      const response = await axios.get("http://localhost:8080/employees");
      this.employees = response.data;
    },
    formatDate(date) {
      const formattedDate = new Date(date);
      return formattedDate instanceof Date && !isNaN(formattedDate)
        ? formattedDate.toLocaleDateString("vi-VN")
        : "Invalid Date";
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
    },
    showAddForm() {
      this.formMode = "add";
      this.formData = { id: "", name: "", birthDate: "", gender: "MALE", salary: 0, phone: "" };
      this.showForm = true;
    },
    showUpdateForm(employee) {
      this.formMode = "update";
      this.formData = { ...employee };
      this.showForm = true;
    },
    async handleSubmit() {
      if (this.isSalaryInvalid || this.isPhoneInvalid) {
        alert("Vui lòng nhập dữ liệu hợp lệ.");
        return;
      }
      if (this.formMode === "add") {
        await axios.post("http://localhost:8080/employees", this.formData);
      } else if (this.formMode === "update") {
        await axios.put(`http://localhost:8080/employees/${this.formData.id}`, this.formData);
      }
      this.closeForm();
      this.fetchEmployees();
    },
    async deleteEmployee(id) {
      if (confirm("Bạn có chắc chắn muốn xóa nhân viên này không?")) {
        await axios.delete(`http://localhost:8080/employees/${id}`);
        this.fetchEmployees();
      }
    },
    closeForm() {
      this.showForm = false;
    },
  },
  mounted() {
    this.fetchEmployees();
  },
};
</script>
