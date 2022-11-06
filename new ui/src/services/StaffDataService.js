import http from "../http-common";

class StaffDataService {
  getAll() {
    return http.get("/staff");
  }

  get(id) {
    return http.get(`/staff/${id}`);
  }

  update(id, data) {
    return http.put(`/staff/${id}`, data);
  }

  delete(id) {
    return http.delete(`/staff/${id}`);
  }

  findByName(name) {
    return http.get(`/staff?name=${name}`);
  }
}

export default new StaffDataService();
