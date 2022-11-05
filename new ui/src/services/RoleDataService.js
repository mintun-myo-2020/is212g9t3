import http from "../http-common";

class RoleDataService {
  getAll() {
    return http.get("/role");
  }

  get(id) {
    return http.get(`/api/role/${id}`);
  }

  update(id, data) {
    return http.put(`/api/role/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/role/${id}`);
  }

  findByName(name) {
    return http.get(`/api/role?name=${name}`);
  }
}

export default new RoleDataService();
