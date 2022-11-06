import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/course",
    name: "course",
    component: () => import("./components/courseList")
  },
  {
    path: "/course/:id",
    name: "course-details",
    component: () => import("./components/course")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddCourse")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;