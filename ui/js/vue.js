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
                skill_name : {
                    name : '',
                   
                },
                role_name : {
                    name : ''
                }
            },
            lj:{
                staff_id: '',
                lj_name: '',
                role_id: '',
                skills: [],
                courses: []
            },
            skilltoRole: {
                skillSkillId: '',
                roleRoleId: ''
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

    createRole(){
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:8080/api/role/`, 
            {role_name: this.form.role_name.name})
            .then(response => {
                alert("Role successfully added", location)
            location.href = "http://127.0.0.1:5500//ui/hr.html"
            console.log(response)
            resolve(response)
            }).catch(error => {
             console.log(error)
            })
        })
    },
    
    deleteStaff( staff_id ) {
        return new Promise((resolve, reject) => {
            axios.delete(`http://localhost:8080/api/staff/${staff_id}`).then(response => {
            resolve(response)
            alert("Confirm Delete Staff?")
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
            axios.post(`http://localhost:8080/api/skill/`, 
            {skill_name: this.form.skill_name.name,
            archived:0})
           
            .then(response => {
            alert("Skill successfully added", location)
            location.href = "http://127.0.0.1:5500//ui/hr.html"
            console.log(response)
            resolve(response)
            }).catch(error => {
             console.log(error)
            })
        })
    },
    
    createLearningJourney(){
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:8080/api/learningjourney/`, this.lj).then(response => {
            console.log(response)
            resolve(response)
            }).catch(error => {
            reject(error)
            })
        })
    },

    assignSkilltoRole(){
        axios.post('http://localhost:8080/api/role/assignskill', this.skilltoRole)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    }
    

})

// Link this Vue instance with <div id="app">
main.mount("#app")