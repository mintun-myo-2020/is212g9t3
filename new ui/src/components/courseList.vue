<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Tutorials List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(course, index) in tutorials"
          :key="index"
          @click="setActiveCourse(course, index)"
        >
          {{ course.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllCourse">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentCourse">
        <h4>Course</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentCourse.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentCourse.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentCourse.published ? "Published" : "Pending" }}
        </div>

        <router-link :to="'/courses/' + currentTutorial.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>

<script>
import courseDataService from "../services/courseDataService";

export default {
  name: "course-list",
  data() {
    return {
      course: [],
      currentCourse: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveCourse() {
      courseDataService.getAll()
        .then(response => {
          this.course= response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveCourse();
      this.currentCourse = null;
      this.currentIndex = -1;
    },

    setActiveCourse(course, index) {
      this.currentCourse = course;
      this.currentIndex = course ? index : -1;
    },

    removeAllCourse() {
      courseDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      courseDataService.findByTitle(this.title)
        .then(response => {
          this.course = response.data;
          this.setActiveCourse(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveCourse();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
