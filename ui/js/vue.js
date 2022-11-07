// Create a new Vue instance

// const { each } = require("bluebird")

const main = Vue.createApp({
    watch() {

    },
    // Data Properties
    data() {

        return {
            lj_data: [],
            roles: [],
            passedData: [],
            skills: [],
            courses: [],
            staff: [],
            selectedRole: [],
            roleskills : [],
            sr_id : '',
            role_lj: 'Select a role',
            key :'',
            form : {
                skill_name : {
                    name : '',
                   
                },
                role_name : {
                    name : '',
                }, 
                staff_fname : {
                    name : '',
                    lname : '',
                    email : '',
                }
            },
            lj:{
                staff_id: 150608,
                lj_name: '',
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
            }, 

            userdata:0,
            updateSkillList:[],
            updateSkillobj:{},

            updateRoleList:[],
            updateRoleobj:{},
            
            updateStaffList:[],
            updateStaffobj:{},
            
           
            ljs:[],
            updatedLj:{
                lj_name: '',
                role_id: '',
                skills: [],
                courses: []
            },
            lj_id:'',
            currentLj: {},
            showSkills: false,
            showCourses: false

            

        }
    },

    // 'hook'
    created: function() {

        let role_endpoint_ = "http://localhost:8080/api/role"
        let skill_endpoint_ = "http://localhost:8080/api/skill"
        let course_endpoint_ = "http://localhost:8080/api/course"
        let staff_endpoint_ = "http://localhost:8080/api/staff"
        let lj_endpoint_ = "http://localhost:8080/api/learningjourney/staff/150608"

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

        axios.get(lj_endpoint_)
        .then(response => {
            console.log( response.data )

            // Assign response.data.records (Array) to
            // 'people' data property
            this.ljs = response.data
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
            location.href = "http://127.0.0.1:5500/ui/hr.html"
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
            location.href = "http://127.0.0.1:5500/ui/hr.html"
            console.log(response)
            resolve(response)
            }).catch(error => {
             console.log(error)
            })
        })
    },

    getLearningJourney(lj_id){
        this.lj_id = lj_id;

        axios.get(`http://localhost:8080/api/learningjourney/${lj_id}`)
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

    },
    createLearningJourney(){
        axios.post('http://localhost:8080/api/learningjourney', this.lj)
          .then(function (response) {
            alert("Learning Journey successfully added", location)
            location.href = "http://127.0.0.1:5500/ui/learning_journey.html"
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    },

    updateLearningJourney(lj_id){
        axios.put(`http://localhost:8080/api/learningjourney/${lj_id}`,this.lj)
          .then(function (response) {
            alert("Learning Journey Updated!", location)
            location.href = "http://127.0.0.1:5500/ui/learning_journey.html"
            console.log(response);
            alert("Hello! I am an alert box!!");
          })
          .catch(function (error) {
            console.log(error);
          });

    },
    deleteLearningJourney(lj_id){
        axios.delete(`http://localhost:8080/api/learningjourney/${lj_id}`)
          .then(function (response) {
            alert("Learning Journey Deleted!", location)
            location.href = "http://127.0.0.1:5500/ui/learning_journey.html"
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    },
    assignSkilltoRole(){
        axios.post('http://localhost:8080/api/role/assignskill', this.skilltoRole)
          .then(function (response) {
            alert("Skill has successfully been assigned!", location)
            location.href = "http://127.0.0.1:5500/ui/learning_journey.html"
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    },
    assignSkilltoCourse(){
        axios.post('http://localhost:8080/api/skill/assigncourse', this.skilltoCourse)
          .then(function (response) {
            alert("Course has successfully been assigned!", location)
            location.href = "http://127.0.0.1:5500/ui/learning_journey.html"
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

    //update skill send to modal
  
    updateSkill (skill_id) {
        this.userdata = skill_id;
        
        for (idx in this.skills) {
            this.updateSkillobj = this.skills[idx];
           
            if (this.updateSkillobj.skill_id === this.userdata){
                this.updateSkillList = this.updateSkillobj
                console.log(this.updateSkillList)
            }
            else {
                console.log("cannot push")
            }
        }
        
        return new Promise((resolve, reject) => {
            axios.put(`http://localhost:8080/api/skill/${this.userdata}`, )
            .then(response => { 
            
            console.log(response)
            resolve(response)
            }).catch(error => {
             console.log(error)
            })
        }
        )
    },
    // update skill
   newSkill(skill_id){
    
    return new Promise((resolve, reject) => {
        axios.put(`http://localhost:8080/api/skill/${skill_id}`, 
        {skill_name: this.form.skill_name.name,
        archived:0})
       
        .then(response => {
        alert("Skill updated", location)
        location.href = "http://127.0.0.1:5500//ui/hr.html"
        console.log(response)
        resolve(response)
        }).catch(error => {
         console.log(error)
        })
    })
   },

   getSkillsofRole(role_id){
    this.lj.skills = [];
    axios.get(`http://localhost:8080/api/skill/by-role/` + role_id)
    .then(response => {
        this.skills = response.data;
    })
    .catch(function (error) {
    console.log(error);
    });
    this.showSkills = true;
    },

   getCoursesofSkill(skills){
    this.courses = [];
    let keys = [];
    for(var i in skills){
        skill_id = skills[i];
        axios.get(`http://localhost:8080/api/course/by-skill/` + skill_id)
        .then(response => {
            for(j in response.data){
                if (this.courses.length > 0){

                        if (!keys.includes(response.data[j].course_id)){
                            this.courses.push(response.data[j]);
                            keys.push(response.data[j].course_id);

                }} else {
                    
                    this.courses.push(response.data[j]);
                }
                    // for(index in this.courses){
                    //     if(this.courses[index].course_id != response.data[j].course_id || this.courses.length == 0){
                    //         this.courses.push(response.data[j]);
                    //     }
                    // }
                

            }
            
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    console.log(this.courses);
    this.showCourses = true;

    },
    //send to modal first
    updateRole (role_id) {
        this.userdata = role_id;
        
        for (idx in this.roles) {
            this.updateRoleobj = this.roles[idx];
            
            if (this.updateRoleobj.role_id === this.userdata){
                this.updateRoleList = this.updateRoleobj
                console.log(this.updateRoleList)
            }
            else {
                console.log("cannot push")
            }
        }
        
        return new Promise((resolve, reject) => {
            axios.put(`http://localhost:8080/api/role/${this.userdata}`, )
            .then(response => { 
            
            console.log(response)
            resolve(response)
            }).catch(error => {
             console.log(error)
            })
        }
        )
    },

    newRole(role_id){
    
        return new Promise((resolve, reject) => {
            axios.put(`http://localhost:8080/api/role/${role_id}`, 
            {role_name: this.form.role_name.name,
            archived:0})
           
            .then(response => {
            alert("Role updated", location)
            location.href = "http://127.0.0.1:5500//ui/hr.html"
            console.log(response)
            resolve(response)
            }).catch(error => {
             console.log(error)
            })
        })
       },

       updateStaff (staff_id) {
        this.userdata = staff_id;
        
        for (idx in this.staff) {
            this.updateStaffobj = this.staff[idx];
            
            if (this.updateStaffobj.staff_id === this.userdata){
                this.updateStaffList = this.updateStaffobj
                console.log(this.updateStaffList)
            }
            else {
                console.log("cannot push")
            }
        }
        
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:8080/api/staff/${this.userdata}`, )
            .then(response => { 
            
            console.log(response)
            resolve(response)
            }).catch(error => {
             console.log(error)
            })
        }
        )
    },

    newStaff(staff_id){
    
        return new Promise((resolve, reject) => {
            axios.put(`http://localhost:8080/api/staff/${staff_id}`, 
            {staff_fname: this.form.staff_fname.name,
            staff_lname: this.form.staff_fname.lname, staff_dept:"",email: this.form.staff_fname.email,})
           
            .then(response => {
            alert("Role updated", location)
            location.href = "http://127.0.0.1:5500//ui/hr.html"
            console.log(response)
            resolve(response)
            }).catch(error => {
             console.log(error)
            })
        })
       },

}


})

// Link this Vue instance with <div id="app">
main.mount("#app")