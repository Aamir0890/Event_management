# Event_management

This is a robust and scalable event management system built with Node.js and Express.js. It provides a seamless experience for event organizers and attendees, allowing them to manage and participate in events effortlessly.

## Features

- **Secure User Authentication**: It features a secure user authentication system, utilizing bcrypt for password hashing and JWT for session management. Users can register and log in with ease, ensuring their data is protected.
- **Event Management**: Event organizers can create, update, and delete event details, including date, time, description, and participant list. These functionalities are accessible only to authenticated and authorized users, ensuring data integrity.
- **Participant Registration**: Attendees can register for events, view their registrations, and manage their participation with ease. Upon successful registration, users receive a confirmation email, keeping them informed.
- **RESTful API Endpoints**: It offers a comprehensive set of RESTful API endpoints, catering to various functionalities such as user registration (POST /register), login (POST /login), event creation (POST /events), updating events (PUT /events/:id), and event registration (POST /events/:id/register).

## Technologies Used

- **Node.js**: A powerful and efficient JavaScript runtime for server-side applications.
- **Express.js**: A minimalist and flexible web application framework for Node.js.
- **bcrypt**: A robust library for password hashing and salting.
- **jsonwebtoken**: An industry-standard library for generating and verifying JSON Web Tokens (JWT) for secure authentication.
- **nodemailer**: A comprehensive email client for Node.js applications, used for sending confirmation emails upon event registration.

## Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1. **Clone the repository**:

`git clone https://github.com/your-username/event-management-system.git`

`cd event-management-system`

2. **Install Dependency**:

`npm install`

3. **Start Server**:
 `node app.js`

## API Endpoints

### User Registration and Login

- `POST /api/register`: Register a new user.
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "Password123!",
      "role": "user"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User registered successfully"
    }
    ```

- `POST /api/login`: Log in a user.
  - **Request Body**:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "Password123!"
    }
    ```
  - **Response**:
    ```json
    {
      "token": "jwt_token"
    }
    ```

### Event Management

- `POST /api/events`: Create a new event (Admin only).
  - **Request Headers**:
    ```json
    {
      "Authorization": "Bearer jwt_token"
    }
    ```
  - **Request Body**:
    ```json
    {
      "id": 1,
      "date": "2023-06-15",
      "time": "18:00",
      "description": "Company Annual Meetup",
      "participants": []
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Event created successfully"
    }
    ```

- `GET /api/events`: Get all events.
  - **Request Headers**:
    ```json
    {
      "Authorization": "Bearer jwt_token"
    }
    ```
  - **Response**:
    ```json
    [
      {
        "id": 1,
        "date": "2023-06-15",
        "time": "18:00",
        "description": "Company Annual Meetup",
        "participants": []
      }
    ]
    ```

- `GET /api/events/:id`: Get event by ID.
  - **Request Headers**:
    ```json
    {
      "Authorization": "Bearer jwt_token"
    }
    ```
  - **Response**:
    ```json
    {
      "id": 1,
      "date": "2023-06-15",
      "time": "18:00",
      "description": "Company Annual Meetup",
      "participants": []
    }
    ```

- `PUT /api/events/:id`: Update an existing event (Admin only).
  - **Request Headers**:
    ```json
    {
      "Authorization": "Bearer jwt_token"
    }
    ```
  - **Request Body**:
    ```json
    {
      "date": "2023-06-16",
      "time": "19:00",
      "description": "Updated Company Annual Meetup",
      "participants": []
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Event updated successfully"
    }
    ```

- `DELETE /api/events/:id`: Delete an existing event (Admin only).
  - **Request Headers**:
    ```json
    {
      "Authorization": "Bearer jwt_token"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Event deleted successfully"
    }
    ```

### Event Registration

- `POST /api/events/:id/register`: Register a user for an event.
  - **Request Headers**:
    ```json
    {
      "Authorization": "Bearer jwt_token"
    }
    ```
  - **Request Body**:
    ```json
    {
      "userId": 1
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User registered for event and confirmation email sent"
    }
    ```
    
