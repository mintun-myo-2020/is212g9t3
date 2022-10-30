// Create a new Vue instance

const main = Vue.createApp({

    // Data Properties
    data() {

        return {
            roles: [],
            skills: [],
            courses: [],
            staff: [],
            form : {
                skill : {
                    name : '',
                    status : '',
                    level: ''
                },
                role : {
                    name : ''
                }
            }
        }
    },

    // 'hook'
    created: function() {

        let role_endpoint_ = "http://localhost:8080/api/role"
        let skill_endpoint_ = "http://localhost:8080/api/skill"
        let course_endpoint_ = "http://localhost:8080/api/course"
        let staff_endpoint_ = "http://localhost:8080/api/staff"
        

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

        axios.get(staff_endpoint_)
        .then(response => {
            console.log( response.data )

            // Assign response.data.records (Array) to
            // 'people' data property
            this.staff = response.data
        })
        .catch(error => {
            console.log( error.message )
        })
    },
    methods : {
    deleteCourse ( course_id ) {
        return new Promise((resolve, reject) => {
          axios.delete(`http://localhost:8080/api/course/${course_id}`).then(response => {
            resolve(response)
            document.location.reload()
          }).catch(error => {
            reject(error)
          })
        })
      },
    deleteRole ( role_id ) {
    return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:8080/api/role/${role_id}`).then(response => {
        resolve(response)
        document.location.reload()
        }).catch(error => {
        reject(error)
        })
    })
    },
    
    deleteStaff( staff_id ) {
        return new Promise((resolve, reject) => {
            axios.delete(`http://localhost:8080/api/staff/${staff_id}`).then(response => {
            resolve(response)
            document.location.reload()
            }).catch(error => {
            reject(error)
            })
        })
    },

    deleteSkill ( skill_id ) {
        return new Promise((resolve, reject) => {
            axios.delete(`http://localhost:8080/api/skill/${skill_id}`).then(response => {
            resolve(response)
            document.location.reload()
            }).catch(error => {
            reject(error)
            })
        })
    },

    createSkill(){
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:8080/api/skill/`, this.form.skill).then(response => {
            console.log(response)
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