import instance from "@/common";

export const employeeApi = {
  fetchAll() {
    return instance.get("/employees");
  },
  fetchById(id) {
    return instance.get(`/employees/${id}`);
  },
  search(filters) {
    return instance.get("/employees", { params: filters });
  },
  create(data) {
    return instance.post("/employees", data);
  },
  update(id, data) {
    return instance.put(`/employees/${id}`, data);
  },
  delete(id) {
    return instance.delete(`/employees/${id}`);
  },
};