import http from "../http-common";

class StaffDataService {
  getAll() {
    return http.get("/staff");
  }

  get(id) {
    return http.get(`/api/staff/${id}`);
  }

  // create(data) {
  //   return http.post("/tutorials", data);
  // }

  update(id, data) {
    return http.put(`/api/staff/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/staff/${id}`);
  }

  // deleteAll() {
  //   return http.delete(`/tutorials`);
  // }

  findByName(name) {
    return http.get(`/api/staff?name=${name}`);
  }
}

export default new StaffDataService();
