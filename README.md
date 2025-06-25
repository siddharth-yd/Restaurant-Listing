# 🍽️ Restaurant Listing - MERN Stack Web App

A full-featured Zomato restaurant listing and search platform using MongoDB, Express.js, React, and Node.js. Built with Material UI for a modern responsive interface. Supports location-based filtering, cuisine search, and cost filtering.

---

## ✨ Features

- ✅ Paginated restaurant listing
- ✅ Search by name and description
- ✅ Filter by:
  - Cuisine
  - Country name
  - Average cost for two
- ✅ Location-based search (within latitude, longitude, radius)
- ✅ View full details for any restaurant
- ✅ Image-based cuisine prediction
- ✅ Fully styled using Material UI

---

## 🧱 Tech Stack

| Layer     | Technology               |
|-----------|---------------------------|
| Frontend  | React, Material UI        |
| Backend   | Node.js, Express          |
| Database  | MongoDB                   |
| Others    | Axios, dotenv, Mongoose   |

---
## ⚙️ Setup Instructions

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourusername/zomato-restaurant-app.git
cd Restaurant-Listing
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

📦 Load data into MongoDB
```bash
node dataIngest.js
```

▶️ Start Backend Server
```bash
node server.js
```

Server will run on:
➡️ http://localhost:5000

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm start
```
App will run on:
➡️ http://localhost:3000
