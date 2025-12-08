# Revamping UAJK Portal Empowered with AI Chatbot

Welcome to the **Revamping UAJK Portal Empowered with AI Chatbot** project! This is a full-stack web application designed for university management, featuring a modern, responsive frontend built with React and Vite, and a robust backend powered by Node.js and Express.

## 🚀 Project Overview

This project aims to provide a comprehensive digital solution for university operations, including student admission, administration, departmental information, virtual tours, and an AI-powered chatbot for student assistance.

### Key Features
- **Modern UI/UX**: Built with React and GSAP for smooth animations and transitions.
- **3D Elements**: Integrated using `@react-three/fiber` and `@react-three/drei` for immersive experiences (e.g., Virtual Tour).
- **Student Portal**: Admission, registration, and dashboard functionalities.
- **Administration**: Admin dashboard for managing staff and university data.
- **AI Chatbot**: Intelligent assistant for answering user queries.
- **Departmental Info**: Detailed pages for various departments.
- **Events & News**: Dynamic sections for university updates.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (v18)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: CSS (Vanilla), [Ant Design](https://ant.design/)
- **Animations**: [GSAP](https://greensock.com/gsap/), [Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll)
- **3D Graphics**: [Three.js](https://threejs.org/), React Three Fiber
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **State Management & HTTP**: Context API, [Axios](https://axios-http.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (via [Mongoose](https://mongoosejs.com/))
- **Authentication**: JWT (JSON Web Tokens), Bcrypt
- **File Handling**: Multer
- **Utilities**: Dotenv, Cors, Cookie-parser

---

## 📂 Folder Structure

The project is divided into two main directories: `Frontend` and `Backend`.

### Root Directory
```
FYP/
├── Backend/                # Server-side application
│   ├── config/             # Database and app configuration
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware (Auth, etc.)
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── uploads/            # Uploaded files storage
│   ├── utils/              # Utility functions
│   ├── app.js              # App entry point
│   └── server.js           # Server startup script
│
└── Frontend/               # Client-side application
    ├── public/             # Static assets
    ├── src/
    │   ├── assets/         # Images, fonts, etc.
    │   ├── components/     # Reusable UI components
    │   │   ├── Nav/
    │   │   ├── event/
    │   │   ├── footer/
    │   │   └── heroBanner/
    │   ├── pages/          # Application pages
    │   │   ├── administration/
    │   │   ├── admission/
    │   │   ├── chatbot/
    │   │   ├── contact/
    │   │   ├── depts/
    │   │   ├── events/
    │   │   ├── home/
    │   │   ├── introduction/
    │   │   ├── messages/
    │   │   └── virtualTour/
    │   ├── App.jsx         # Main App component
    │   ├── main.jsx        # Entry point
    │   └── index.css       # Global styles
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## ⚙️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (Local or Atlas connection string)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd FYP
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies.
```bash
cd Backend
npm install
```

**Configuration:**
Create a `.env` file in the `Backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
# Add other necessary environment variables
```

**Start the Server:**
```bash
npm run dev
```
The backend server will start on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies.
```bash
cd Frontend
npm install
```

**Start the Development Server:**
```bash
npm run dev
```
The frontend application will be accessible at `http://localhost:5173` (or the port shown in your terminal).

---

## 📜 Scripts

### Frontend (`Frontend/package.json`)
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.

### Backend (`Backend/package.json`)
- `npm run dev`: Starts the server with `nodemon` for hot-reloading.
- `npm run start`: Starts the server using `nodemon`.
- `npm run prod`: Starts the server using standard `node`.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the ISC License.
