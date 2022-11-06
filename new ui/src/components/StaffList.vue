<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by Name"
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchName"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Staff List</h4>

      <table class="table">

      <thead>
        <tr>
          <th scope="col">Staff ID</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Department</th>
          <th scope="col">Skills Accquired</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>


    <tbody>
      <tr :class="{ active: index == currentIndex }"
          v-for="(staff, index) in staffs"  :key="index">
          <th scope="row">{{staff.staff_id}}</th>
          <td>{{staff.staff_fname}}</td>
          <td>{{staff.staff_lname}}</td>
          <td>{{staff.dept}}</td>
          <td>{{staff.email}}</td>
          <td>

              <button type="button" class="btn btn-warning" @click = "editStaff('hi')">Edit</button>
               <button type="button" class="btn btn-danger"  @click="deleteStaff(staff.staff_id)">Delete</button>

          </td>

      </tr>
    </tbody>


      </table>
      

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Tutorial</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentTutorial.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentTutorial.published ? "Published" : "Pending" }}
        </div>

        <router-link :to="'/tutorials/' + currentTutorial.id" class="badge badge-warning">Edit</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import StaffDataService from "../services/StaffDataService";

export default {
  name: "tutorials-list",
  data() {
    return {
      staffs: [],
      currentTutorial: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveStaff() {
      StaffDataService.getAll()
        .then(response => {
          this.staffs = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveStaff();
    },
    
    searchName() {
      StaffDataService.findByName(this.name)
        .then(response => {
          this.tutorials = response.data;
          this.setActiveTutorial(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteStaff(id) {
      StaffDataService.delete(id)
        .then(response => {
          console.log(response.data);
          
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    editStaff(data) {
      StaffDataService.update(data)
        .then(response => {
          console.log(response.data);
          
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    }




  },
  mounted() {
    this.retrieveStaff();
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
