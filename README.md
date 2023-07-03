# UMassConnect

**Work In Progress** 🚧

## Goals behind this social media website:

1. **Campus Community Building:** A dedicated social media app can help foster a sense of community among students, faculty, and staff members within the university. It provides a platform for students to connect, collaborate, and engage with each other, promoting a stronger sense of belonging and shared experiences.

2. **Targeted and Relevant Content:** By focusing on a specific university community, the social media app can curate and deliver content that is highly relevant to the students' academic pursuits, campus events, clubs, and interests. This increases the value and usefulness of the app for its users.

3. **Seamless Communication:** The app can serve as a central hub for communication and information sharing within the university. Students can easily connect with classmates, professors, and university organizations, enabling efficient and direct communication channels for important announcements, class discussions, and extracurricular activities.

4. **Networking and Collaboration:** A social media app for a university allows students to expand their professional networks and collaborate on projects. It provides opportunities for students to connect with alumni, mentors, and industry professionals associated with the university, facilitating career growth and collaboration on research or entrepreneurial initiatives.

5. **Campus Events and Engagement:** The app can be a valuable tool for promoting and coordinating campus events, such as student clubs' activities, workshops, seminars, and sports events. It encourages student participation and engagement, facilitating better event organization and attendance.

6. **Student Support and Resources:** The app can serve as a platform to share resources, study materials, and academic support. Students can seek guidance, ask questions, and receive assistance from peers or faculty members, creating a supportive environment for learning and growth.

7. **Privacy and Security:** By designing a social media app exclusively for a specific university community, the app can implement appropriate privacy and security measures. It can ensure that user data and interactions remain within the university community, providing a safer and more trustworthy environment compared to public social media platforms.

8. **Alumni Engagement:** The app can help strengthen the connection between current students and alumni. It provides a platform for alumni to stay engaged with the university, share career insights, mentorship opportunities, and contribute back to the student community.

Please note that this markdown is a work in progress and may be subject to updates and improvements.

## Backend Packages
- `nodemon`: For automatic server restart during development.
- `express`: Node.js framework for building web applications and APIs.
- `body-parser`: Middleware for parsing request bodies.
- `bcrypt`: Library for hashing and salting passwords.
- `cors`: Middleware for enabling Cross-Origin Resource Sharing.
- `dotenv`: For loading environment variables from a `.env` file.
- `gridfs-stream`: Library for working with GridFS in MongoDB.
- `multer`: Middleware for handling file uploads.
- `multer-gridfs-storage`: Storage engine for multer that integrates with GridFS.
- `helmet`: Middleware for enhancing the security of Express applications.
- `morgan`: HTTP request logger middleware for Express.
- `jsonwebtoken`: Library for implementing JSON Web Tokens (JWT) in Node.js.
- `mongoose`: MongoDB object modeling tool for Node.js.

## Frontend Packages
- `create-react-app`: Command-line tool for creating React applications.
- `react-redux`: Official Redux bindings for React.
- `@reduxjs/toolkit`: Package providing utilities for working with Redux.
- `redux-persist`: Library for persisting and rehydrating a Redux store.
- `react-dropzone`: React component for handling file uploads and drag-and-drop interactions.
- `dotenv`: For loading environment variables from a `.env` file.
- `formik`: Library for building forms in React.
- `yup`: Schema validation library for JavaScript and TypeScript.
- `react-router-dom@6`: Library for handling routing in React applications.
- `@mui/material`: Material-UI library for React components.
- `@emotion/react`: Library for writing CSS styles in JavaScript.
- `@emotion/styled`: Styled components library that integrates with Emotion.
- `@mui/icons-material`: Material-UI library for SVG icons.

##Summary

In client side I made the decision to use redux for state management. The reason behind this being, in the time tracking web project that I was recently a part
of, we passed useState hooks and functions in different components as props for state management. However, we soon realized that it was not very efficient as our

code grew larger and larger. While designing this project, I tried to find an alternative option for this and discovered redux. Through redux, the data is available to the entire application, and we can grab it anywhere we want.

This is a CRUD webapp and in the backend I have used JS router to segregate the API endpoints to make it clean and understandable.
