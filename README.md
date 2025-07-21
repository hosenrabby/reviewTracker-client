# 🛠️ Service Review Web Application

A full-featured React-based web application where users can browse, review, and manage services. Authenticated users can add their own services and write/edit reviews. This is built using React, React Router v6.4+, Tailwind CSS, and Node.js + MongoDB on the backend.

---

## 🔗 Live Demo

[🌐 Live Website](https://service-review-tracker.netlify.app/)

---

## 🚀 Features

- 🏠 Home page with featured content
- 🔍 Browse all services
- 🧾 View service details (protected)
- ✍️ Add a new service (protected)
- 🗂️ Manage your added services (protected)
- 📝 Submit and manage your reviews (protected)
- 🔐 JWT Authentication (Sign up / Login)
- ⭐ Star rating and user photo support
- 🌐 Scrolls to top on route change
- ❌ Custom 404 Not Found page

---

## 🔐 Protected Routes

Protected using a `PrivateRoute` component that checks user authentication via context and JWT.

Pages:
- `/add-service`
- `/my-services`
- `/my-reviews`
- `/service-details/:id`

---

## 🧑‍💻 Tech Stack

**Frontend:**
- React.js
- React Router v6.4+
- Tailwind CSS
- DaisyUI
- Framer Motion
- React Icons
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

## 🛠️ Project Structure

