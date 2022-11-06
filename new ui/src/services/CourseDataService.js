import http from "../http-common";

class CourseDataService {
  getAll() {
    return http.get("/course");
  }

  get(id) {
    return http.get(`/course/${id}`);
  }

  update(id, data) {
    return http.put(`/course/${id}`, data);
  }

  delete(id) {
    return http.delete(`/course/${id}`);
  }

  findByName(name) {
    return http.get(`/course?name=${name}`);
  }
}

export default new CourseDataService();
