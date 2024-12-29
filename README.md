# SkillSwap: A Collaborative Learning Platform

Minimal setup to get React working in Vite with HMR and some ESLint
rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
    uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)
    uses [SWC](https://swc.rs/) for Fast Refresh

[![Watch the
video](https://img.youtube.com/vi/xxgCm02dzLc/0.jpg)](https://www.youtube.com/watch?v=xxgCm02dzLc)

## Description

SkillSwap is an innovative platform designed to connect individuals
interested in learning and teaching skills without the need for money.
Users can offer their expertise (e.g., guitar, graphic design,
languages) and receive lessons in another skill in return. This
collaborative exchange system fosters education, community, and personal
development, empowering users to share knowledge and grow together.

## Features

-   Users can register and log in securely using JWT-based
    authentication.
-   List skills to teach and browse skills offered by others.
-   Real-time messaging powered by Socket.IO allows seamless
    communication.
-   Encourages community building and skill-sharing without monetary
    transactions.

## Technologies Used

The project leverages modern web technologies to provide a seamless user
experience:

-   **Frontend:**
    -   React.js
    -   Next.js
    -   Bootstrap
-   **Backend:**
    -   Node.js
    -   Express.js
-   **Database:**
    -   MySQL
-   **Authentication:**
    -   JSON Web Tokens (JWT)
-   **Real-time Communication:**
    -   Socket.IO
-   **Other Tools:**
    -   Vite for optimized development and build process
    -   Axios for HTTP requests

## Watch the Demo

Click the thumbnail above or [watch the video
here](https://www.youtube.com/watch?v=xxgCm02dzLc) to see SkillSwap in
action!

## How to Set Up the Project Locally

Follow these steps to get the project running on your computer:

### 1. Clone the Repository

 git clone https://github.com/your-repo/skillswap.git cd skillswap
### 2. Install Dependencies Navigate to both the frontend and backend directories and install the dependencies:

## For the frontend 
```
cd skill-swap-frontend npm
install
```

## For the backend

```
cd ../skill-swap-backend npm install 
```

### 3. Set Up the Database Ensure you have MySQL installed and running on your machine. Create a new database in MySQL (e.g., skillswap_db). Import the .sql file provided in the root directory of the project into the database:   

```
mysql -u your_username -p skillswap_db \< skillswap.sql 
``` 

### 4. Update the database configuration in skill-swap-backend/models/db.js (or equivalentconfiguration file):   

```
const sequelize = new Sequelize(
  'skill_swap', // database
  'root', // User
  '', // Password
  {
    host: 'localhost', // host
    dialect: 'mysql', // database type
    logging: false   // no logs
  }
);
```

### 5. Start the Application, run the backend and frontend servers:

### Start the backend 
```
cd skill-swap-backend npm start
```

### Start the frontend

```
cd ../skill-swap-frontend npm run dev 
```

### 6. Access the Application Open your browser and navigate to http://localhost:5173 to start using SkillSwap.

### Notes 
Make sure both frontend and backend servers are running
simultaneously. Troubleshooting Database Connection Issues: Ensure MySQL is
running. 

Missing
Dependencies: Run npm install in the respective directory to reinstall
the required packages. 

### Enjoy using SkillSwap!