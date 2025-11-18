
---
# 🎓 Revamping the UAJK Portal Empowered with AI Chatbot

### 📘 Project Overview

This project modernizes the **University of Azad Jammu & Kashmir (UAJK)** online portal into an **intelligent, interactive, and AI-driven platform**.
It provides a **3D virtual campus tour**, a **real-time AI chatbot**, and a **fully responsive web interface** for students, faculty, and visitors.

The system enhances communication, accessibility, and digital engagement using **React**, **Node.js**, **MongoDB**, and **Three.js**.

---

## 🚀 Key Features

### 🧠 AI Chatbot Integration

* Instant answers using **NLP & Machine Learning**
* Connected to the university database
* Supports admission guidance, faculty info, and event queries
* 24/7 availability with role-based responses

### 🏫 3D Virtual Campus Tour

* Developed with **Three.js**
* Explore departments, libraries, labs, and hostels in 3D
* Integrated navigation with chatbot commands (e.g., “Show me CS Department”)

### 👩‍💼 Admin Panel

* Manage virtual tour content, events, and news
* Update admission details and announcements
* Track statistics and students Registration Data
* Role-based login for admin security

### 💻 Modern Web Experience

* Built with **React** frontend and **Node.js/Express** backend
* Fully responsive for desktop, tablet, and mobile
* Fast load time and SEO-optimized design
* Integration of **GSAP animations** for smooth UI transitions

---

## 🧩 Technologies Used

| Category       | Technology                |
| -------------- | ------------------------- |
| Frontend       | React.js, Three.js, GSAP  |
| Backend        | Node.js, Express.js       |
| Database       | MongoDB                   |
| Authentication | JWT, bcrypt               |
| AI/NLP         | Dialogflow / OpenAI API   |
| Styling        | CSS3                      |
| Environment    | dotenv                    |
| Media Upload   | multer                    |
| Security       | CORS, bcrypt hashing      |

---

## 📂 System Modules

### 1️⃣ **User Module**

* Registration, login, and profile access
* Secure authentication using JWT
* Password hashing and reset functionality

### 2️⃣ **Admin Module**

* Manage content, users, and system settings
* Post news, events, and notifications
* Monitor analytics and chatbot logs

### 3️⃣ **Chatbot Module**

* Natural language query processing
* Real-time data retrieval from the university DB
* Dynamic response generation

### 4️⃣ **Virtual Tour Module**

* 3D visualization using Three.js
* Interactive map-based navigation
* Integration with chatbot navigation

---

## 🧱 System Architecture

### 🔹 Frontend

* React components handle routing, rendering, and API calls
* Chatbot and 3D tour integrated as modular components

### 🔹 Backend

* Node.js RESTful APIs handle user management, content updates, and chatbot data
* MongoDB stores user, event, and chatbot data

### 🔹 Chatbot Flow

```
User Query → NLP Engine → Intent Detection → Database Query → Response Generation → Chat Interface
```

---

## ⚙️ Setup & Installation

### 🔧 Prerequisites

* Node.js (v18+)
* MongoDB
* npm or yarn

### 📥 Clone the Repository

```bash
git clone https://github.com/Khwajazeeshan/Revamping-UAJK-Portal-Empowered-with-AI-Chatbot.git
cd Revamping-UAJK-Portal-Empowered-with-AI-Chatbot
```

### 📦 Backend Setup

```bash
cd backend
npm install
npm start
```

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 🌐 Access Portal

```
Frontend: http://localhost:5173  
Backend: http://localhost:5000
```

---

## 🔐 Authentication Flow

1. User registers → Data stored in MongoDB
2. Password hashed using **bcrypt**
3. JWT generated on login and stored in localStorage
4. Role-based routing for student, faculty, and admin

---

## 🧪 Testing

| Test Type           | Description                                               |
| ------------------- | --------------------------------------------------------- |
| Unit Testing        | Checked all individual functions and API endpoints        |
| Integration Testing | Verified frontend-backend connection                      |
| System Testing      | Tested full user flow and admin control                   |
| Chatbot Testing     | Evaluated query accuracy, speed, and NLP intent detection |
| UAT                 | Validated usability with real users (students, staff)     |

---

---

## 🎨 UI/UX Highlights

* Responsive layout across all devices
* Smooth GSAP animations
* Intuitive navigation
* Accessible color contrast and font hierarchy
* Voice and text chatbot options

---

## 🔒 Security Features

* Password hashing with bcrypt
* JWT-based authentication
* Role-based authorization
* Secure API routes
* Input validation and data sanitization

---

## 📱 Mobile Responsiveness

* Adaptive layout for all screen sizes
* Touch-friendly 3D navigation
* Mobile-optimized chatbot popup

---

## 🧠 Future Enhancements

* [ ] Multilingual AI Chatbot
* [ ] Voice-based interaction
* [ ] AR/VR campus tour
* [ ] Real-time admission tracking
* [ ] Online payment integration
* [ ] Predictive analytics dashboard

---

## 🧑‍💻 Developers

| Name                                       | Role                              | 
| ------------------------------------------ | --------------------------------- | 
| **Khawaja Zeeshan**                        | Full Stack Developer              | 
| **Zeeshan Younis**                         | Project Presentative              | 
| **Supervisor:** Dr. Syed Zaki Hassan Kazmi | Assistant Professor, CS & IT Dept |                 

---

## 📚 References

* [React.js Documentation](https://react.dev/)
* [Three.js Journey](https://threejs-journey.com/)
* [Node.js Docs](https://nodejs.org/)
* [Dialogflow by Google](https://developers.google.com/dialogflow/)
* [OpenAI Platform](https://platform.openai.com/docs/)
* [FreeCodeCamp Tutorials](https://www.freecodecamp.org/)
* [W3Schools](https://www.w3schools.com/)

---

## 🏁 Conclusion

The **Revamped UAJK Portal** successfully combines modern web design, AI chatbot intelligence, and immersive 3D visualization to redefine digital engagement for the university.
It not only improves accessibility and communication but also positions UAJK as a technology-forward institution embracing innovation and smart education systems.

---
