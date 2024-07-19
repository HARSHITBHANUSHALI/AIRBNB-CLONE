
# Airbnb Clone

![Screenshot (2931)](https://github.com/user-attachments/assets/c9433553-86ac-4567-b341-c08c3cfc26ed)

---

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contact](#contact)
  
## About the Project

This project is a clone of Airbnb, built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Tailwind CSS for styling. The application provides functionalities for users to browse and book places to stay. Additionally, authenticated users can add their own listings by filling out a form and uploading images. Authentication is handled using JWT tokens, and image uploads are managed with Multer.

## Features

- User authentication with JWT tokens
- Browse available places to stay
- Add new listings with detailed information and images
- Secure image uploads using Multer
- Responsive design with Tailwind CSS

## Built With

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JWT (JSON Web Tokens)](https://jwt.io/)
- [Multer](https://github.com/expressjs/multer)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your local machine:
- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/HARSHITBHANUSHALI/AIRBNB-CLONE.git
   ```
2. Install NPM packages for both frontend and backend
   ```sh
   cd AIRBNB-CLONE
   cd api
   npm install
   cd client
   npm install
   ```
3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. Start the development server
   ```sh
   cd ..
   npm run dev
   ```

## Usage

Once the server is running, you can open your browser and navigate to `http://localhost:3000` to see the application in action.

- **Browse Listings**: View available places to stay.
- **Add Listings**: Authenticated users can add new places by filling out a form and uploading images.
- **User Authentication**: Secure login and registration with JWT tokens.
- **Book Place**: Book any place for required days.
## Screenshots

![Screenshot (2932)](https://github.com/user-attachments/assets/99d12b32-ebbe-41b2-891d-988a18425157)
![Screenshot (2933)](https://github.com/user-attachments/assets/8d7101ca-0708-40c4-8e6f-485e17af9a58)
![Screenshot (2934)](https://github.com/user-attachments/assets/232dbbc9-1a28-48ca-8169-428bc601189e)
![Screenshot (2935)](https://github.com/user-attachments/assets/f21fed28-f1b8-49f6-af56-50ec1afe9967)
![Screenshot (2936)](https://github.com/user-attachments/assets/5acc77e1-1665-49b0-b617-eab7a47ac016)
![Screenshot (2937)](https://github.com/user-attachments/assets/7dd0dc43-b377-4d24-8435-4f426e546023)
![Screenshot (2938)](https://github.com/user-attachments/assets/859558e0-1a1b-4003-9b09-c6fbc07099c0)


## Contact

Harshit Bhanushali 

Project Link: [https://github.com/HARSHITBHANUSHALI/AIRBNB-CLONE](https://github.com/HARSHITBHANUSHALI/AIRBNB-CLONE)

---
