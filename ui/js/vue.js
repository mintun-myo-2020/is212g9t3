// Create a new Vue instance

const main = Vue.createApp({
    watch() {

    },
    // Data Properties
    data() {

        return {
            lj_data: [],
            enrolled_courses: [],
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
                },
                lj_name : {
                    name : '',
                    skill_id: '',
                    role_id: '',
                    course_id: '',
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

            updateLJList:[],
            updateLJobj:{},
            llj_name:'',

            archive_check: true,
            archived_before: true,
            archived_after : false,
            
            ljskill: [],
           
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
        let enrolled_courses_endpoint = "http://localhost:8080/api/staff/enrolledcourses/150608"

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

        axios.get(enrolled_courses_endpoint)
        .then(response => {
            console.log( response.data )

            // Assign response.data.records (Array) to
            // 'people' data property
            this.enrolled_courses = response.data;
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
            this.ljs = response.data
            for(index in this.ljs){
                var lj = this.ljs[index];
                this.getLearningJourneySkills(lj,lj.lj_id);
                this.getLearningJourneyCourses(lj,lj.lj_id);
                this.getLearningJourneyRole(lj,lj.roleRoleId);
            }
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
    archiveRole(role_id) {
        console.log("hello")
        axios.put(`http://localhost:8080/api/role/archive/${role_id}`,{"archived":true})
        .then(function (response) {
          console.log(response.data);
          document.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });

      
    },

    createRole(){
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:8080/api/role/`, 
            {role_name: this.form.role_name.name})
            .then(response => {
                alert("Role successfully added", location)
            location.href = "http://localhost:8080/ui/hr.html"
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
            location.href = "http://localhost:8080/ui/hr.html"
            console.log(response)
            resolve(response)
            }).catch(error => {
             console.log(error)
            })
        })
    },

    archiveSkill (skill_id) {
        console.log("hello")
        axios.put(`http://localhost:8080/api/skill/archive/${skill_id}`,{"archived":true})
        .then(function (response) {
          console.log(response.data);
          document.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });

      
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
    getLearningJourneySkills(lj, lj_id){
        this.lj_id = lj_id;
        axios.get(`http://localhost:8080/api/learningjourney/skills/${lj_id}`)
          .then(response => {
            lj["skills"] = response.data;
            return lj;
           })
          .catch(function (error) {
            console.log(error);
          });

    },
    getLearningJourneyCourses(lj, lj_id){
        this.lj_id = lj_id;
        axios.get(`http://localhost:8080/api/learningjourney/courses/${lj_id}`)
          .then(response => {
            lj["courses"] = response.data;
            return lj;
           })
          .catch(function (error) {
            console.log(error);
          });

    },
    getLearningJourneyRole(lj, role_id){
        axios.get(`http://localhost:8080/api/role/${role_id}`)
        .then(function (response) {
            lj["role_name"] = response.data.role_name;
            return lj;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    removeCourse(ljId,courseId){
        axios.post(`http://localhost:8080/api/learningjourney/removecourse`,
        {"learningjourneyLjId":ljId,"courseCourseId":courseId})
        .then(function (response) {
            alert(`${courseId} removed from ${ljId}`);
            location.href = "http://localhost:8080/ui/learning_journey.html";
            console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    createLearningJourney(){
        axios.post('http://localhost:8080/api/learningjourney', this.lj)
          .then(function (response) {
            alert("Learning Journey successfully added", location)
            location.href = "http://localhost:8080/ui/learning_journey.html"
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    },

    newLJ(lj_id){
    
        return new Promise((resolve, reject) => {
            axios.put(`http://localhost:8080/api/learningjourney/${lj_id}`, 
            {

			lj_name: this.form.lj_name.name,
            	courses: [],
                	skills: []
})
           
            .then(response => {
            alert("Learning Journey updated", location)
            location.href = "http://localhost:8080//ui/learning_journey.html"
            console.log(response)
            resolve(response)
            }).catch(error => {
             console.log(error)
            })
        })
       },

 updateLearningJourney (lj_id) {
        this.userdata = lj_id;

        
        for (idx in this.ljs) {
            console.log(lj_id)
            
            this.updateLJobj = this.ljs[idx];
            
            if (this.updateLJobj.lj_id === this.userdata){
                this.updateLJList = this.updateLJobj
                this.llj_name = this.updateLJList.lj_name
                console.log(this.updateLJList)
                console.log(this.llj_name)
            }
            else {
                console.log("cannot push")
            }
        }
        
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:8080/api/learningjourney/${this.userdata}`,this.userdata )
            .then(response => { 
            
            console.log(response)
            resolve(response)
            }).catch(error => {
             console.log(error)
            })
        }
        )
    },
    deleteLearningJourney(lj_id){
        axios.delete(`http://localhost:8080/api/learningjourney/${lj_id}`)
          .then(function (response) {
            alert("Learning Journey Deleted!", location)
            location.href = "http://localhost:8080/ui/learning_journey.html"
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
            location.href = "http://localhost:8080/ui/learning_journey.html"
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
            location.href = "http://localhost:8080/ui/learning_journey.html"
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
        location.href = "http://localhost:8080//ui/hr.html"
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
            location.href = "http://localhost:8080//ui/hr.html"
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
            location.href = "http://localhost:8080//ui/hr.html"
            console.log(response)
            resolve(response)
            }).catch(error => {
             console.log(error)
            })
        })
       },

},

// mounted: {
//     getLearningJourneySkills(lj_id){
//         this.ljskill = {};
//         this.lj_id = lj_id;
//         axios.get(`http://localhost:8080/api/learningjourney/skills/${lj_id}`)
//           .then(function (response) {
//             console.log(response.data)
//             this.ljskill = response.data;
//           })
//           .catch(function (error) {
//             console.log(error);
//           });

//     }
// }



})

// Link this Vue instance with <div id="app">
main.mount("#app")