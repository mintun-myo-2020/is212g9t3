import http from "../http-common";

class SkillDataService {
  getAll() {
    return http.get("/skill");
  }

  get(id) {
    return http.get(`/api/skill/${id}`);
  }

  update(id, data) {
    return http.put(`/api/skill/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/skill/${id}`);
  }

  findByName(name) {
    return http.get(`/api/skill?name=${name}`);
  }
}

export default new SkillDataService();
