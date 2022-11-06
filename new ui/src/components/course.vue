<template>
  <div v-if="currentCourse" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentCourse.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentCourse.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentCourse.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentTutorial.published"
      @click="updateCourse(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updateCourse(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteCourse"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateCourse"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import courseDataService from "../services/courseDataService";

export default {
  name: "course",
  data() {
    return {
      currentCourse: [],
      message: ''
    };
  },
  methods: {
    getCourse(course_id) {
      courseDataService.get(course_id)
        .then(response => {
          this.currentCourse = response.data;
          console.log(response.data);
          console.log('enter')
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentCourse.id,
        title: this.currentCourse.title,
        description: this.currentCourse.description,
        published: status
      };

      courseDataService.update(this.currentCourse.id, data)
        .then(response => {
          console.log(response.data);
          this.currentCourse.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCourse() {
      courseDataService.update(this.currentCourse.id, this.currentCourse)
        .then(response => {
          console.log(response.data);
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteCourse() {
      courseDataService.delete(this.currentCourse.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "course" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getCourse(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
