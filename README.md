# 🎓 StudyMate — Find Your Perfect Study Partner (Client Side)

## 🌐 Live Site URL:
👉 [https://smart-deals-ef2e6.web.app/](https://smart-deals-ef2e6.web.app/)

## 📁 Server Repository:
👉 [https://github.com/jubayeralfaruk/study-mate-server](https://github.com/jubayeralfaruk/study-mate-server)

---

## 📚 Project Overview
**StudyMate** is a MERN Stack web application that helps students connect and collaborate with study partners.  
Users can find partners based on subject, experience level, or study mode (online/offline).  
It aims to make learning more interactive, engaging, and productive.

---

## ✨ Key Features
- 🔐 **Firebase Authentication** (Email & Google Login)
- 👥 **Find Partners** – Browse and search study partners dynamically
- 🧩 **Create Partner Profile** – Logged-in users can create their own profile
- 🔄 **My Connections** – View, update, and delete your partner requests
- ⭐ **Top Rated Partners** – Home page highlights 3 highest-rated profiles
- 🌓 **Dark/Light Theme Toggle** – For a personalized experience
- 📱 **Fully Responsive UI** – Works smoothly on mobile, tablet, and desktop
- 🚫 **Custom 404 Page** – Beautiful design with “Back to Home” navigation

---

## 🧠 Technologies Used
**Frontend:**
- React.js (Vite)
- React Router
- Firebase Authentication
- Axios (for API calls)
- React Toastify / SweetAlert2 (for notifications)
- Tailwind CSS / DaisyUI (for styling)

---

## ⚙️ Functionality Summary
- Users can **register** or **log in** using Email/Password or Google.
- Logged-in users can **create study profiles** (with name, subject, rating, etc.).
- **Find Partners** page displays all partner profiles fetched from MongoDB.
- **Details Page** (private route) shows full info and allows sending partner requests.
- **My Connections** allows users to **update** or **delete** their own connections.
- Data loading shows a **custom spinner**.
- Supports **search and sort** features for better partner discovery.

---

## 🔗 Routes Overview
| Route | Description |
|--------|-------------|
| `/` | Home Page (with Top Study Partners & Extra Sections) |
| `/find-partners` | Displays all study partners (search + sort available) |
| `/create-profile` | Create new study profile (Private Route) |
| `/my-connections` | Manage sent partner requests (Update/Delete) |
| `/partner/:id` | Details Page for each partner |
| `/login` | Login Page |
| `/register` | Registration Page |
| `*` | Custom 404 Not Found Page |
