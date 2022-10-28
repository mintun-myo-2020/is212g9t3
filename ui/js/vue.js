// Create a new Vue instance

const main = Vue.createApp({

    // Data Properties
    data() {

        return {
            roles: [],
            skills: [],
            courses: [],
        }
    },

    // 'hook'
    created: function() {

        let role_endpoint_ = "http://localhost:8080/api/role"
        let skill_endpoint_ = "http://localhost:8080/api/skill"
        let course_endpoint_ = "http://localhost:8080/api/course"

        axios.get(role_endpoint_)
        .then(response => {
            console.log( response.data )

            // Assign response.data.records (Array) to
            // 'people' data property
            this.roles = response.data
        })
        .catch(error => {
            console.log( error.message )
        })

        
        axios.get(skill_endpoint_)
        .then(response => {
            console.log( response.data )

            // Assign response.data.records (Array) to
            // 'people' data property
            this.skills = response.data
        })
        .catch(error => {
            console.log( error.message )
        })

        axios.get(course_endpoint_)
        .then(response => {
            console.log( response.data )

            // Assign response.data.records (Array) to
            // 'people' data property
            this.courses = response.data
        })
        .catch(error => {
            console.log( error.message )
        })
    },
    methods : {
    deleteCourse ({ course_id }) {
        console.log(course_id);
        return new Promise((resolve, reject) => {
          axios.delete(`http://localhost:8080/api/course/${course_id}`).then(response => {
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      }

    }
    

})

// Link this Vue instance with <div id="app">
main.mount("#app")