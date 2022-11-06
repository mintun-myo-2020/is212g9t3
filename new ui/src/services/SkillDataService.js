import http from "../http-common";

class SkillDataService {
  getAll() {
    return http.get("/skill");
  }

  get(id) {
    return http.get(`/skill/${id}`);
  }

  create(data) {
    return http.post("/skill", data);
  }

  update(id, data) {
    return http.put(`/skill/${id}`, data);
  }

  delete(id) {
    return http.delete(`/skill/${id}`);
  }

  findByName(name) {
    return http.get(`/skill?name=${name}`);
  }
}

export default new SkillDataService();
