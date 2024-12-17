<template>
  <div class="card mb-4">
    <div class="card-body">
      <h5 class="card-title">Tìm kiếm nhân viên</h5>
      <form class="container-fluid">
        <div class="row">
          <div class="col-md-4">
            <label for="searchName" class="form-label">Tên</label>
            <input
              type="text"
              class="form-control"
              id="searchName"
              v-model="searchFilters.name"
              placeholder="Tên (Tìm kiếm gần đúng)"
            />
          </div>
          <div class="col-md-4">
            <label for="startDate" class="form-label">Ngày sinh từ</label>
            <input
              type="date"
              class="form-control"
              id="startDate"
              v-model="searchFilters.dobFrom"
            />
          </div>
          <div class="col-md-4">
            <label for="endDate" class="form-label">Ngày sinh đến</label>
            <input
              type="date"
              class="form-control"
              id="endDate"
              v-model="searchFilters.dobTo"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 d-flex flex-column align-items-start">
            <label for="gender" class="form-label">Giới tính</label>
            <select
              class=""
              id="gender"
              v-model="searchFilters.gender"
              style="max-width: 100%; width: 300px"
            >
              <option value="">Tất cả</option>
              <option value="MALE">Nam</option>
              <option value="FEMALE">Nữ</option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="salaryRange" class="form-label">Mức lương</label>
            <select
              class="form-control"
              id="salaryRange"
              v-model="searchFilters.salaryRange"
            >
              <option value="">Tất cả</option>
              <option value="1">bé hơn 5 trieu</option>
              <option value="2">từ 5 triệu đến 10 triệu</option>
              <option value="3">từ 10 triệu đến 20 triệu</option>
              <option value="4">trên 20 triệu</option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="phone" class="form-label">Số điện thoại</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              v-model="searchFilters.phone"
              placeholder="Số điện thoại (Tìm kiếm gần đúng)"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <label for="departmentId" class="form-label">Bộ phận</label>
            <select
              class="form-select"
              id="departmentId"
              v-model="searchFilters.departmentId"
            >
              <option value="">Tất cả</option>
              <option value="1">Quản lý</option>
              <option value="2">Kế toán</option>
              <option value="3">Sale-Marketing</option>
              <option value="4">Sản xuất</option>
            </select>
          </div>
        </div>

        <div class="row d-flex justify-content-center align-items-end pt-5">
          <button
            type="button"
            class="btn btn-primary me-2"
            @click="searchEmployees"
          >
            Tìm kiếm
          </button>

          <button type="button" class="btn btn-secondary" @click="resetFilters">
            Đặt lại
          </button>
        </div>
      </form>
    </div>
  </div>
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
            <td>{{ employee.gender === "MALE" ? "Nam" : "Nữ" }}</td>
            <td>{{ formatCurrency(employee.salary) }}</td>
            <td>{{ employee.phone }}</td>
            <td>
              <button
                class="btn btn-primary btn-sm mr-3"
                @click="showUpdateForm(employee)"
              >
                Cập nhật
              </button>
              <button
                class="btn btn-danger btn-sm mr-3"
                @click="deleteEmployee(employee.id)"
              >
                Xóa
              </button>
              <button
                class="btn btn-info btn-sm mr-3"
                @click="detailEmployee(employee.id)"
              >
                Xem
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Form Modal -->
    <div
      v-if="showForm"
      class="modal fade show"
      tabindex="-1"
      style="display: block"
      aria-labelledby="formModal"
      aria-hidden="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ formMode === "add" ? "Thêm Nhân Viên" : "Cập Nhật Nhân Viên" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeForm"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="modal-body">
              <div class="mb-3">
                <label for="name" class="form-label">Tên:</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="formData.name"
                  @blur="handleBlur('name')"
                  required
                />
                <small
                  v-if="isTouched.name && !formData.name"
                  class="text-danger"
                  >Tên là bắt buộc.</small
                >
              </div>
              <div class="mb-3">
                <label for="birthDate" class="form-label">Ngày sinh:</label>
                <input
                  type="date"
                  class="form-control"
                  id="birthDate"
                  v-model="formData.birthDate"
                  @blur="handleBlur('birthDate')"
                  required
                />
                <small
                  v-if="isTouched.birthDate && !formData.birthDate"
                  class="text-danger"
                  >Ngày sinh là bắt buộc.</small
                >
              </div>
              <div class="mb-3">
                <label for="gender" class="form-label">Giới tính:</label>
                <select
                  class="form-select"
                  id="gender"
                  v-model="formData.gender"
                  @blur="handleBlur('gender')"
                  required
                >
                  <option value="MALE">Nam</option>
                  <option value="FEMALE">Nữ</option>
                </select>
                <small
                  v-if="isTouched.gender && !formData.gender"
                  class="text-danger"
                  >Giới tính là bắt buộc.</small
                >
              </div>
              <div class="mb-3">
                <label for="salary" class="form-label">Lương:</label>
                <input
                  type="number"
                  class="form-control"
                  id="salary"
                  v-model="formData.salary"
                  @blur="handleBlur('salary')"
                  required
                />
                <small
                  v-if="isTouched.salary && formData.salary <= 0"
                  class="text-danger"
                  >Lương phải lớn hơn 0.</small
                >
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Số điện thoại:</label>
                <input
                  type="text"
                  class="form-control"
                  id="phone"
                  v-model="formData.phone"
                  @blur="handleBlur('phone')"
                  required
                />
                <small
                  v-if="
                    isTouched.phone &&
                    (formData.phone.length < 10 || formData.phone.length > 11)
                  "
                  class="text-danger"
                  >Số điện thoại phải từ 10 đến 11 số.</small
                >
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeForm"
              >
                Hủy
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="isSalaryInvalid || isPhoneInvalid || !isFormValid"
              >
                {{ formMode === "add" ? "Thêm" : "Cập nhật" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Detail Form Modal -->
    <div
      v-if="showDetail"
      class="modal fade show"
      tabindex="-1"
      style="display: block"
      aria-labelledby="detailModal"
      aria-hidden="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Chi Tiết Nhân Viên</h5>
            <button
              type="button"
              class="btn-close"
              @click="showDetail = false"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p><strong>Tên:</strong> {{ detailData.name }}</p>
            <p>
              <strong>Ngày sinh:</strong> {{ formatDate(detailData.birthDate) }}
            </p>
            <p>
              <strong>Giới tính:</strong>
              {{ detailData.gender === "MALE" ? "Nam" : "Nữ" }}
            </p>
            <p>
              <strong>Lương:</strong> {{ formatCurrency(detailData.salary) }}
            </p>
            <p><strong>Số điện thoại:</strong> {{ detailData.phone }}</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showDetail = false"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- pagination -->

    <div
      class="pagination d-flex justify-content-center align-items-center mt-3"
    >
      <button
        class="btn btn-secondary me-2"
        :disabled="pagination.number === 0"
        @click="changePage(pagination.number - 1)"
      >
        Trước
      </button>
      <span> Trang {{ pagination.number +1}} / {{ pagination.totalPages }} </span>
      <button
        class="btn btn-secondary ms-2"
        :disabled="pagination.number +1 >= pagination.totalPages"
        @click="changePage(pagination.number + 1)"
      >
        Sau
      </button>
    </div>
  </div>
</template>

<script>
import { employeeApi } from "@/services/api";
export default {
  data() {
    return {
      employees: [],
      pagination: {
        totalElements: 0,
        number: 0, 
        totalPages: 0,
        size: 2,
      },
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
      searchFilters: {
        name: "",
        dobFrom: "",
        dobTo: "",
        gender: "",
        salaryRange: 1,
        phone: "",
        departmentId: "",
      },
      detailData: {},
      isTouched: {
        name: false,
        birthDate: false,
        gender: false,
        salary: false,
        phone: false,
      },
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
    isFormValid() {
      return (
        this.formData.name &&
        this.formData.birthDate &&
        this.formData.gender &&
        !this.isSalaryInvalid &&
        !this.isPhoneInvalid
      );
    },
  },
  methods: {
    // Reset touched fields
    resetTouched() {
      this.isTouched = {
        name: false,
        birthDate: false,
        gender: false,
        salary: false,
        phone: false,
      };
    },
    handleBlur(field) {
      this.isTouched[field] = true;
    },
    async detailEmployee(id) {
      const response = await employeeApi.fetchById(id);
      this.detailData = response.data;
      this.showDetail = true;
    },
    async fetchEmployees() {
      
      const params = {
        ...this.searchFilters,
        page: this.pagination.number,
        size: this.pagination.size, 
      };
      

      try {
        const response = await employeeApi.fetchAll(params);

        
        this.employees = response.data.content; 
        this.pagination.totalPages = response.data.page.totalPages; 
        this.pagination.number = response.data.page.number ; 
        this.pagination.totalElements = response.data.page.totalElements;
 
      } catch (error) {
        console.error("Lỗi khi tải danh sách nhân viên:", error);
      }
    },

    async changePage(page) {
      if (page < 0 || page > this.pagination.totalPages) return; 
      this.pagination.number = page; 
      
      await this.fetchEmployees(); 
    },

    async searchEmployees() {
      try {
        const response = await employeeApi.search(this.searchFilters);
        this.employees = response.data.content; 
        this.pagination.totalPages = response.data.page.totalPages; 
        this.pagination.number = response.data.page.number ; 
        this.pagination.totalElements = response.data.page.totalElements; 
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
      }
    },
    resetFilters() {
      this.searchFilters = {
        name: "",
        dobFrom: "",
        dobTo: "",
        gender: "",
        salaryRange: "",
        phone: "",
        departmentId: "",
      };
      this.pagination.number = 1; 
      this.fetchEmployees(); 
    },
    formatDate(date) {
      const formattedDate = new Date(date);
      return formattedDate instanceof Date && !isNaN(formattedDate)
        ? formattedDate.toLocaleDateString("vi-VN")
        : "Invalid Date";
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
    showAddForm() {
      this.formMode = "add";
      this.formData = {
        id: "",
        name: "",
        birthDate: "",
        gender: "MALE",
        salary: 0,
        phone: "",
      };
      this.resetTouched();
      this.showForm = true;
    },
    showUpdateForm(employee) {
      this.formMode = "update";
      this.formData = { ...employee };
      this.resetTouched();
      this.showForm = true;
    },
    async handleSubmit() {
      if (this.formMode === "add") {
        await employeeApi.create(this.formData);
      } else if (this.formMode === "update") {
        await employeeApi.update(this.formData.id, this.formData);
      }
      this.closeForm();
      this.fetchEmployees();
    },
    async deleteEmployee(id) {
      if (confirm("Bạn có chắc chắn muốn xóa nhân viên này không?")) {
        await employeeApi.delete(id);
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

<style>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
}

.card-title {
  font-weight: 600;
  color: #343a40;
  text-align: center;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #495057;
}

.btn {
  border-radius: 5px;
  padding: 10px 15px;
}

.table {
  margin-bottom: 0;
  border-collapse: separate;
  border-spacing: 0;
}

.table th {
  text-align: center;
  background-color: #f8f9fa;
  font-size: 14px;
}

.table tbody td {
  vertical-align: middle;
  text-align: center;
}

.modal-content {
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
}

.modal-footer .btn {
  padding: 6px 12px;
}

/* Responsive chỉnh sửa */
@media (max-width: 768px) {
  .row > .col-md-3 {
    margin-bottom: 15px;
  }
  .table {
    font-size: 12px;
  }
  .btn {
    padding: 8px 12px;
  }
}
</style>
