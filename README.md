# **Youtube Video Sharing App**
### **1. Introduce**
This project is a web application built using ReactJS in front-end and NestJS in back-end.
##### Purpose
The main purpose of the project is to help users store video links taken from YouTube into their own system. Thereby, helping users easily manage and review the videos they have shared.
##### Key features
- ***User registraion and login***: Users can register/log in to become a member of the system. Once you have become an official member, users can use the Sharing YouTube videos.
- ***Sharing YouTube videos***: Users only need to provide us with the video link on YouTube. We will help them store that video on our system.
- ***Viewing a list of shared videos***: Users can view a list of videos that have been successfully shared by themselves or other members in the system.

### **2. Main Technology Used**
+ **ReactJS**: ReactJS is a JavaScript library for building user interfaces, known for its component-based structure, reusability, and efficient rendering, simplifying the development of interactive web applications. 
+ **TypeScript**: TypeScript is a statically typed superset of JavaScript that offers enhanced code quality, better tooling, and improved maintainability.
+ **Ant Design**: Ant Design is a popular UI library for React that offers a wide range of pre-designed, customizable components, streamlining the development of visually appealing and responsive web applications.
+ **Styled Component**: Styled Components is a CSS-in-JS library that enables component-based styling in React applications, enhancing code maintainability and allowing dynamic styling based on props.
+ **React Testing Library**: React Testing Library is a testing utility for React that focuses on writing tests that resemble how users interact with your application, promoting a user-centric testing approach for more robust and maintainable code.
### **3. Instructions For Installing And Running The Project Locally**
> **Prerequisites**: Before you begin, make sure you have the following technologies installed on your personal computer: git, node.js. npm
-  Download the project to your personal computer:
```bash
git clone https://github.com/DamAnhTuanTB/FE-YoutubeVideoSharingApp.git
```
- Open the downloaded project using ide software, type the following command to install the necessary packages:
```bash
npm install
```
- Run the project locally using the command below. After, you can access http://localhost:3000 to view the system.
```bash
npm start
```
- If you want to test the project locally, run the following command:
```bash
npm run test
```
### **4. Online Link To Use**
In addition to using the system locally as in part 3, you can access the following link to use the system: https://fe-youtube-video-sharing-app.vercel.app
### **5. Detailed Instructions On How To Use The Features**
##### Register
- To become an official member of the system, users must provide a valid email and password. Email must be unique and has not been used to register into the system before.
##### Log in
- Must log in with an account that has been successfully created before. Provide correct email and password to successfully log in to the system. 
##### Log out
- Users can log out of the system to log in to another account.
##### Share a video
- This feature is only used after successful login.
- After successfully logging in, click the Share A Video button on the header to open the video sharing dialog box.
- Fill in all the information in the dialog box that appears. Note, the url field must be a valid YouTube link. If you provide an invalid link, the video will not be shared successfully.
- You can let the system autofill video titles by pressing the Auto Fill Title button. To do that, you need to fill in the Url field with an exact YouTube video link.
- The url field and title field are two fields that must have a value before pressing the Share button. The Description field is optional. You can manually enter a value for this field or not.
- A valid youtube link might look like this: https://www.youtube.com/watch?v=j5i7vhAR31k, https://www.youtube.com/watch?v=j5i7vhAR31k&t=1600s, https://youtu.be/j5i7vhAR31k?si=PV68Kg43BqtcbCQW, https://www.youtube.com/embed/j5i7vhAR31k?si=jKO39_Q-E7
##### Viewing a list of shared videos
- Users can view a list of videos that have been successfully shared by themselves or other members.
- No need to log in to still access this feature.
### **6. Troubleshooting**
- If you are having trouble loading the page, please make sure you have the best network connection.
- If you run local the project with problems, please make sure your computer has the latest node.js installed. You also need to make sure you have the .env file set up with the correct values.
- We recommend that you set the **REACT_APP_BASE_URL** value in the **.env** file to a local path in the backend with the value ***http://localhost:9090/api*** when running tests, to ensure the test cases are tested most accurately after you run the command ***npm run test***. There are some unknown causes of errors in some test cases related to connection speed when using online backend links. These errors may occasionally occur when using the backend's online link.
