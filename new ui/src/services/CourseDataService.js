import http from "../http-common";

class CourseDataService {
  getAll() {
    return http.get("/course");
  }

  get(id) {
    return http.get(`/api/course/${id}`);
  }

  update(id, data) {
    return http.put(`/api/course/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/course/${id}`);
  }

  findByName(name) {
    return http.get(`/api/course?name=${name}`);
  }
}

export default new CourseDataService();
