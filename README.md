# URL Shortener

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge\&logo=mongodb\&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

A secure URL Shortener web application built with **Node.js**, **Express.js**, **MongoDB (Mongoose)**, and **EJS**. Users can create an account, shorten URLs, manage their links, and view click analytics. The application also includes role-based access control, allowing administrators to view all generated URLs.

---

# UI Preview

<img width="1919" height="983" alt="URL Shortener" src="https://github.com/user-attachments/assets/be3f823d-74bc-4729-8387-ba6e6f13400c"/>

---

# Features

## Authentication

* User registration and login using JWT authentication.
* JWT stored in secure HTTP-only cookies.
* Passwords hashed with **bcrypt** before storage.
* Input validation for email, password, and URLs.
* Password visibility toggle on login and signup pages.

## Role-Based Access Control

### NORMAL User

* Create shortened URLs.
* View personal URL history.
* View analytics for owned URLs.

### ADMIN

* View all shortened URLs in the system.

## URL Management

* Generate secure 8-character short IDs using **NanoID**.
* Redirect users to the original URL.
* Record every visit with a timestamp.
* Validate destination URLs before storing.

## Analytics

* Total click count.
* Complete visit history with timestamps.
* JSON analytics endpoint.

---

# Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT
* bcrypt

### Template Engine

* EJS

### Other Libraries

* NanoID
* Cookie Parser
* Validator
* Dotenv

---

# Project Structure

```text
urlshortner/

├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── views/
├── public/
├── index.js
└── package.json
```

---

# Dependencies

| Package       | Purpose                |
| ------------- | ---------------------- |
| express       | Web framework          |
| mongoose      | MongoDB ODM            |
| bcrypt        | Password hashing       |
| cookie-parser | Parse cookies          |
| jsonwebtoken  | JWT authentication     |
| nanoid        | Short ID generation    |
| validator     | Email & URL validation |
| ejs           | Server-side rendering  |
| dotenv        | Environment variables  |

---

# Environment Variables

Create a `.env` file in the project root.

```env
mongo_URI=mongodb://localhost:27017/url-shortener

JWT_Secret=your_jwt_secret

PORT=8001
```

---

# Installation

### Clone the repository

```bash
git clone [<YOUR_REPOSITORY_URL>](https://github.com/muhammad-waqas99/Short-URL.git)
cd urlshortner
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file and add the required environment variables.

### Start the server

```bash
npm start
```

The application runs on:

```
http://localhost:8001
```

---

# API Endpoints

## Views

| Method | Endpoint      | Access        | Description     |
| ------ | ------------- | ------------- | --------------- |
| GET    | `/`           | NORMAL, ADMIN | User dashboard  |
| GET    | `/admin/urls` | ADMIN         | Admin dashboard |
| GET    | `/signup`     | Public        | Signup page     |
| GET    | `/login`      | Public        | Login page      |
| GET    | `/logout`     | Public        | Logout user     |

---

## Authentication

| Method | Endpoint      | Access | Description            |
| ------ | ------------- | ------ | ---------------------- |
| POST   | `/user`       | Public | Register a new user    |
| POST   | `/user/login` | Public | Login and generate JWT |

---

## URL

| Method | Endpoint                  | Access        | Description              |
| ------ | ------------------------- | ------------- | ------------------------ |
| POST   | `/url`                    | NORMAL, ADMIN | Create a shortened URL   |
| GET    | `/url/:shortId`           | Public        | Redirect to original URL |
| GET    | `/url/analytics/:shortId` | NORMAL, ADMIN | View URL analytics       |

---

# Database Schema

## User

| Field      | Type            |
| ---------- | --------------- |
| name       | String          |
| email      | String (Unique) |
| password   | String (Hashed) |
| role       | NORMAL / ADMIN  |
| timestamps | Enabled         |

---

## URL

| Field        | Type     |
| ------------ | -------- |
| shortId      | String   |
| redirectURL  | String   |
| visitHistory | Array    |
| createdBy    | ObjectId |
| timestamps   | Enabled  |

---

# Application Flow

```text
Client
   │
   ▼
Express Routes
   │
   ▼
Controllers
   │
   ▼
MongoDB (Mongoose)
```

---

# Future Improvements

* Custom short URLs
* QR Code generation
* URL expiration
* Rate limiting
* Docker support
* REST API documentation

---

# License

This project is licensed under the **MIT License**.
