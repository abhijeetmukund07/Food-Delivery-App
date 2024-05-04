# Food Delivery Management System

Welcome to the Food Delivery Management System project! This project is a full-stack application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to order food from various restaurants registered on the platform, while restaurants can manage their menus and orders efficiently.

## Features

- User Authentication: Users can register and log in securely to the platform.
- Order Placement: Users can browse restaurants, view menus, and place orders.
- Restaurant Management: Restaurants can register, add menu items, manage orders, and update order statuses.

## Setup Instructions

To set up the app after cloning the repository, follow these steps:

1. **Install Dependencies:**
   - Navigate to the `frontend` directory: `cd frontend`
   - Run `npm install` to install frontend dependencies.
   
2. **Backend Setup:**
   - Navigate to the `backend` directory: `cd ../backend`
   - Run `npm install` to install backend dependencies.
   
3. **Environment Configuration:**
   - Create a `.env` file in the `backend` directory.
   - Add the following environment variables to the `.env` file:
     ```
     PORT= YOUR POST NUMBER
     DB_URL=YOUR_MONGODB_CONNECTION_STRING
     SECRET_KEY=YOUR_SECRET_KEY
     ```
   - Replace `YOUR_MONGODB_CONNECTION_STRING` with your MongoDB connection string.
   - Replace `YOUR_SECRET_KEY` with a secret key for JWT authentication.
   
4. **Running the App:**
   - Once dependencies are installed and the environment is configured, start the development servers:
     - In the `frontend` directory, run `npm start` to start the React development server.
     - In the `backend` directory, run `npm start` to start the Node.js server.
   - Your app should now be running locally. You can access it at `http://localhost:3000`.

## Technologies Used

- **Frontend:** React.js,bootstrap.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB(Local MongoDB)
- **Authentication:** JSON Web Tokens (JWT)

## Contributors

- [N.V Abhijeet Mukund](https://github.com/abhijeetmukund07)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
