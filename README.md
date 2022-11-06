# is212g9t3

## REMEMBER TO DO THIS FIRST: 
```
cd api
npm install
```
# IS212_G9T3 Solid Group

## Description
This is our web application Learning Journey Planning System that allows employees to track their learning progress from their in-house LMS system

## Built With
Languages used: HTML, CSS, Javascript,  

Libraries/Frameworks used: 
* [VueJs](https://vuejs.org/)
* [JQuery](https://jquery.com/)
* [Bootstrap](https://getbootstrap.com/)



## Introduction
### Directory Tree: 

```
├───api
│   ├───config
│   ├───controllers
│   ├───models
│   ├───routes
│   ├───test
        ├───index.tests.js
        
│   ├───node_modules
│   ├───ui
        ├───css
        ├───img
        ├───js
        ├───assignSkilltoCourse.html
        ├───assignSkilltoRole.html
        ├───createRole.html
        ├───createskill.html
        ├───hr.html
        ├───learning_journey.html
        ├───manager.html
        
        
        
```
### 1. Installation

Ensure that you have the following installed on your machine. You can follow [this installation guide](https://docs.google.com/document/d/1hSqhVbgbclf-eOvBx5BQhaTJHxbUSUN4wZTrLNUMyUk/edit?usp=sharing).

* Visual Studio Code 

* WAMP/MAMP Server 

* Google Chrome 

### 1.1 Install Dependencies 
Run these commands on your VSC terminal first 
```
cd api

npm run

```

### 1.2 Launch 

Please ensure that your WAMP/MAMP Server and the folder in under your WAMP/MAMP webroot www/htdocs. The default port of MYSQL is 3306. If your port is not 3306, change the port number by right clicking the WAMP Icon -> tools -> Under ports use by MySQL and change the port number. 

## 2. Database 

Our database is running on the AWS RDS service. 

## 3. Cloning the repository from GitHub

### 3.1 Clone the repo
   ```sh
   git clone https://github.com/mintun-myo-2020/is212g9t3.git
   ```

## 5. User Scenarios 
There are a total of 3 scenarios accross 3 user interfaces (UI's). You can watch the video walkthrough in this [link](https://youtu.be/RGE3e-d1_ns). Assume that the user is already logged in to HealPark. 

**Demo Credentials**
Username: JamesXMM123
Password: woshixmm123 
<br />

Using the demo credentials, log on to HealPark at http://localhost/G08T06/app/client/landing_page.html  

Once you are logged in, you will be directed to http://localhost/G08T06/app/client/booking_history.html 


#### **5.1 User makes a journal entry** 

**1. Click on `Journal` navigation button at the top.**
You will be redirected to http://localhost/esd_G08T06/app/client/journal.html <br />
Click on `ADD JOURNAL ENTRY` button. 

A pop up window will appear and prompt you to enter your entry. 
**Demo Entry**
`I am very sad that my esm prof gave me A+`
```
After entering the Demo entry, click the "SUBMIT" button.
Upon submiting the entry, it will be added to the journal's dashboard and you're able to see your mood emoji. 
```

### **5.2 User converse with chatbot** 
**1. Click on the MoMo Character (bottom right of the screen).**<br />
The chat window with the bot will pop up. 
Click on "Type here..."<br /><br />
**Demo Entry** <br />
user input: Hi <br />
Expected response from momo: How are you feeling? <br />
user input: depressed<br />
Expected response from momo: Stay Strong!<br /> <br />

### **5.3 User makes a booking with a Therapist** 
You can check your past booking at http://localhost/esd_G08T06/app/client/booking_history.html <br />
Click on `BOOK NOW`  button. <br />
You will be redirected to http://localhost/esd_G08T06/app/client/booking_page.html

Since you are already logged on, the username and name will be a fixed value. You are required to enter your mobile number, appointment date and time. 

**Demo Inputs** <br />
Phone Number: 92215510 <br />
Appointment Date: ***select any date from calendar dropdown*** <br />
Appointment Time: ***select any available timeslot*** <br />

After keying the `Demo Inputs`, enter your credit/debit card details. <br />

**Dummy Card** 
Card number: 4242 4242 4242 4242 <br />
MM/YY: 04/42<br />
CVC: 424<br />

After all the details are filled, proceed to click the "SUBMIT PAYMENT" button. <br />

You will be redirected to the confirmation page at http://localhost/esd_G08T06/app/client/payment.php <br />


To continue with entering your own personal journal or reflection - Click `Back to HealPark` at the bottom of the screen. 


### Report and documentation

For the project's report and documentation, please see [here](https://smu-my.sharepoint.com/:w:/g/personal/isham_2020_scis_smu_edu_sg/EaFbdmy8w_VDvEAacMiiMt4BhfCuK-3yeIa6D5XM4VC5kQ?e=v16ZT7)
