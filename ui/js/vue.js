// Create a new Vue instance

const main = Vue.createApp({
    watch() {

    },
    // Data Properties
    data() {

        return {
            roles: [],
            skills: [],
            courses: [],
            staff: [],
            selectedRole: [],
            roleskills : [],
            role_lj: 'Select a role',
            key :'',
            form : {
                skill_name : {
                    name : '',
                   
                },
                role_name : {
                    name : ''
                }
            },
            lj:{
                staff_id: 150566,
                lj_name: 'Creating Learning Journey!',
                role_id: '',
                skills: [],
                courses: []
            },
            skilltoRole: {
                skillSkillId: '',
                roleRoleId: ''
            },
            skilltoCourse: {
                skillSkillId: '',
                courseCourseId: ''
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
        axios.post('http://localhost:8080/api/learningjourney', this.lj)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    },
    assignSkilltoRole(){
        axios.post('http://localhost:8080/api/role/assignskill', this.skilltoRole)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    },
    assignSkilltoCourse(){
        axios.post('http://localhost:8080/api/skill/assigncourse', this.skilltoCourse)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    },

    getRole(){
        console.log(this.role_lj)
        console.log('hi')
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:8080/api/role/`, id).then(response => {
            console.log(response)
            this.selectedRole = response.body
            resolve(response)
            }).catch(error => {
            reject(error)
            })
        })
    },




    getRoleSkill(){

    }


    }

})

// Link this Vue instance with <div id="app">
main.mount("#app")