# Parho Pakistan 🎓🇵🇰

Parho Pakistan is a web application aimed at providing educational support to students by connecting them with sponsors. It helps track academic performance, attendance, and extracurricular activities while facilitating seamless communication between students, parents, and sponsors.

---

## 🚀 Features

- **Student Profile Management:** Track academic progress, attendance, and extracurricular activities.
- **Sponsorship System:** Allow donors to sponsor students and track their contributions.
- **AI-Powered Chat Assistant:** Provides guidance and support to users using OpenAI integration.
- **Secure Authentication:** JWT-based authentication for secure access control.
- **Performance Dashboard:** Visual representation of student data using charts and analytics.
- **Responsive Design:** Ensuring a seamless experience across devices.

---

## 🛠️ Tech Stack

**Frontend:**  
- React.js  
- Tailwind CSS  
- Redux (State Management)  
- React Icons  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB (NoSQL Database)  
- JWT Authentication  

**Tools & Services:**  
- OpenAI API (AI Assistant)  
- Firebase (Authentication & Hosting)  
- GitHub Actions (CI/CD)  

---

## 📂 Project Structure
=Parho-Pakistan/
```
│-- backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   ├── .gitignore
│
│-- frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── assets/
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│   ├── .gitignore
│
│-- README.md
│-- LICENSE
```


---

## 🚀 Installation Guide

### **Prerequisites:**
Make sure you have the following installed:
```
- Node.js (v16+)
- npm or yarn
- MongoDB (local or cloud)
```

### **Steps to Run Locally**

1. **Clone the Repository:**
   ```
   ```bash
   git clone https://github.com/yourusername/parho-pakistan.git
   cd parho-pakistan
   ```
   

3. **Backend Setup:**
```
cd backend
npm install
cp .env.example .env  # Add your environment variables
npm run dev
```

3. **Frontend Setup:**
```
cd frontend
npm install
npm start
```
5. **Access The Application:**
```
Open http://localhost:3000 in your browser.
```

## 🔐 Environment Variables
Create a .env file in the backend directory with the following values:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
```

## 👥 Contributors
```
Muhammad Faisal
Muhammad Kashif Khan
```

5. **🎯 Future Enhancements:**

- AI-driven personalized learning suggestions.
- Mobile app development for Android and iOS.
- Enhanced sponsorship analytics and reports.
- Gamification elements for students to encourage engagement.



