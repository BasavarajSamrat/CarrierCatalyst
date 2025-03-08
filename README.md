CarrierCatalyst

CarrierCatalyst is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed for preparation for job interview aptitude questions and provides time constraint quiz.

Features

User authentication and authorization

Interactive frontend built with React

RESTful API backend with Express.js

Database management using MongoDB

State management with React Context/Redux

Project Structure


![image](https://github.com/user-attachments/assets/4e1c2e2e-0075-40f8-bac6-faacc4c539c2)






Installation



Prerequisites

Make sure you have the following installed:

Node.js (v16+ recommended)

MongoDB (local or cloud-based like MongoDB Atlas)




Backend Setup

cd Backend
npm install  # Install dependencies
npm start    # Run the backend server



Frontend Setup

cd Frontend
npm install  # Install dependencies
npm start    # Start the React development server



Environment Variables

Create a .env file in the Backend/ folder with the following:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000



Running the Project

Start MongoDB if running locally

Start the backend server (cd Backend && npm start)

Start the frontend (cd Frontend && npm start)
