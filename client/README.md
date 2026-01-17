# 🍽️ MealMap

MealMap is a full-stack web application designed to help people **discover free food events nearby** and enable communities to **volunteer, donate, and organize food services** easily using location-based mapping.

---

## 🚀 Features

### 🌍 Public Access (No Login Required)

* View free food events
* See event locations on an interactive map
* Check event timing and nearby locations using geolocation

### 🔐 Authenticated Users

* Register & login
* Volunteer for food events
* Donate to regular food service events
* Access a personal dashboard
* View volunteer and donation history

---

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Context API (Auth)
* OpenStreetMap + Leaflet (Maps)
* CSS (custom styling)

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication (in progress)

---

## 📂 Project Structure

### Client

```
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── hooks/
│   ├── styles/
│   └── App.jsx
```

### Server

```
server/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
```

---

## 📍 Core Functionalities

* Location-based event discovery
* Map markers for food events
* Event creation by organizers
* Volunteer registration
* Donation tracking
* User dashboard
* Role-based access (planned)

---

## ⚠️ Current Status

* Frontend UI mostly completed
* Backend structure and database connected
* Events API under active development
* JWT-protected routes in progress
* Volunteer & donation backend logic pending

---

## 🧭 Future Enhancements

* Complete JWT authentication
* Advanced search & filters
* Automatic event expiration
* Admin & organizer roles
* QR-based donation support
* Mobile responsiveness improvements

---

## 🧑‍💻 How to Run Locally

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## ❤️ Purpose

MealMap aims to reduce food waste and hunger by connecting people with free food resources and empowering communities to help each other.

---

