# HungryChoices

HungryChoices is a platform to match users with dishes based on food preferences so that they never have to worry about finding what to eat. This **full-stack food discovery web application** is designed to help users find dishes based on their **food preferences, dietary restrictions, and key ingredients**. In the style of a dating app, this website takes a user's profile and discovers dishes that are a close fit. If users find themselves unable to choose what to cook or eat, they can simply log into the website and start looking for matches or browse all options. When users find themselves hungry, yet unsure what to eat, HungryChoices is the number one stop for them.

The application utilizes **Node.js, Express.js, PostgreSQL, and EJS templating**, with **Docker-based deployment** for scalability and maintainability. Users can create an account to store their preferences and history, allowing them to seamlessly continue their food discovery journey across sessions.

## Features
- **Food Matching System** – Users can "like" or "dislike" dishes based on preferences.
- **Filter & Browse** – Discover food options using filters (e.g., cuisine, dietary needs).
- **Personalized Profiles** – Save liked dishes and revisit them anytime.
- **User Authentication** – Secure login/logout using **Passport.js** and **bcrypt password hashing**.
- **Database-Backed Storage** – Uses **PostgreSQL** to persist user profiles, preferences, and matches.
- **Responsive & Interactive UI** – Built with **EJS, Bootstrap, and JavaScript**.
- **Containerized Deployment** – Uses **Docker & Docker Compose** for easy setup and hosting.

## Project Structure
### **Backend**
- **`server.js`** – The main **Node.js server**, managing routes and authentication.
- **`db/`** – PostgreSQL database setup and queries.
- **`init_data/`** – SQL scripts for initial database setup.

### **Frontend**
- **`resources/`** – Contains **CSS, JavaScript, and images** for styling and interactivity.
- **`views/pages/`** – Houses **EJS files** for dynamic content rendering.
- **`views/partials/`** – Reusable UI components such as headers, footers, and navigation.

### **Deployment & Testing**
- **`Dockerfile` & `docker-compose.yml`** – Configuration files for **containerized deployment**.
- **`server.spec.js`** – Mocha & Chai test cases for API and database validation.
- **`.env`** – Manages environment variables for deployment.

## **System Architecture**
### **Backend**
- **PostgreSQL** stores user data, preferences, and food choices.
- **Node.js (Express.js)** handles API endpoints and database interactions.
- **EJS** dynamically renders web pages based on user data.
- **Passport.js** manages authentication, with **bcrypt** for password hashing.

### **Frontend**
- **EJS Templates** create dynamic web pages.
- **Bootstrap & JavaScript** provide a clean, responsive UI.
- **AJAX Calls** allow seamless data retrieval from the database.

## **How to Run the Project**
### **Prerequisites**
- Install **Docker & Docker Compose** ([Docker Installation](https://docs.docker.com/get-docker/)).
- Clone the repository:
  ```sh
  git clone <repo-url>
  cd hungrychoices
  ```

### **Run the Application Locally**
1. Start the application using Docker:
   ```sh
   docker-compose up --build
   ```
2. Open **http://localhost:3000** in your browser.
3. Register a new account and start discovering food options!

### **Run Tests**
To execute unit and integration tests, run:
```sh
npm test
```
