# 🎓 StudyMate — Find Your Perfect Study Partner (Client Side)

## 🌐 Live Site URL:
👉 [https://smart-deals-ef2e6.web.app/](https://smart-deals-ef2e6.web.app/)

## 📂 Repository Links
- **Client:** [https://github.com/jubayeralfaruk/study-mate-client](https://github.com/jubayeralfaruk/study-mate-client)
- **Server:** [https://github.com/jubayeralfaruk/study-mate-server](https://github.com/jubayeralfaruk/study-mate-server)

---

## 📚 Project Overview
**StudyMate** is a comprehensive MERN Stack web application that helps students connect and collaborate with study partners worldwide. Users can find partners based on subject, experience level, study mode, and location. The platform features a complete dashboard system with role-based access control, making learning more interactive, engaging, and productive.

**🎯 Assignment 10 Compliant** - Fully upgraded to meet production-ready standards with professional UI/UX, comprehensive dashboard system, and advanced features.

---

## ✨ Key Features

### � AutChentication & Security
- **Firebase Authentication** (Email & Google Login)
- **Demo Login** with auto-fill credentials
- **Role-based Access Control** (User & Admin roles)
- **Secure Route Protection**

### 👥 User Features
- **Advanced Partner Search** with filters, pagination, and sorting
- **Create Partner Profile** with comprehensive form validation
- **My Connections** management with update/delete functionality
- **Personal Dashboard** with statistics and analytics
- **Profile Management** with editable information

### 🛡️ Admin Features
- **Admin Dashboard** with platform analytics
- **User Management** (view, search, suspend/activate users)
- **Partner Management** (review, edit, delete profiles)
- **Real-time Statistics** and activity monitoring
- **Role-based Navigation** and access control

### 🎨 UI/UX Excellence
- **Modern Dark/Light Theme** (default: dark) with smooth transitions
- **Fully Responsive Design** (mobile-first approach)
- **10+ Home Page Sections** (Hero, Features, Stats, Testimonials, FAQ, etc.)
- **Consistent Design System** with 3-color palette
- **Loading States** with skeleton loaders
- **Professional Animations** and micro-interactions

### 📱 Additional Pages
- **Blog** with featured posts and categories
- **Enhanced About & Contact** pages
- **Custom 404 Page** with navigation
- **Help & Support** resources

---

## 🧠 Technologies Used

### Frontend Stack
- **React.js 19** (with Vite for fast development)
- **React Router 7** (for navigation)
- **Tailwind CSS 4** + **DaisyUI 5** (for styling)
- **Framer Motion** (for animations)
- **Lucide React** (for modern icons)

### Authentication & Backend
- **Firebase Authentication** (Email/Password & Google OAuth)
- **Axios** (for API communication)
- **MongoDB** (database via server)

### UI/UX Libraries
- **React Toastify** (notifications)
- **SweetAlert2** (confirmations)
- **React Hook Form** (form handling)

---

## 🏗️ Architecture & Structure

### Dashboard System
```
📁 Dashboard
├── 👤 User Dashboard
│   ├── Overview (stats, charts, recent activity)
│   ├── Profile Management
│   ├── Create Partner Profile
│   └── My Connections
└── 🛡️ Admin Dashboard
    ├── Admin Overview (platform analytics)
    ├── Manage Users (CRUD operations)
    └── Manage Partners (content moderation)
```

### Role-Based Access
- **User Role:** Standard dashboard with personal features
- **Admin Role:** Extended dashboard with management capabilities
- **Dynamic Navigation:** Different sidebar menus based on role
- **Protected Routes:** Role verification on sensitive pages

---

## 🔗 Complete Routes Overview

### Public Routes
| Route | Description | Features |
|--------|-------------|----------|
| `/` | Home Page | Hero carousel, 10+ sections, statistics |
| `/find-partners` | Partner Discovery | Advanced filters, search, pagination |
| `/partners/:id` | Partner Details | Full profile, connection requests |
| `/about` | About Us | Company information, mission |
| `/contact` | Contact Page | Contact form, information |
| `/blog` | Blog Posts | Featured articles, categories |
| `/login` | Authentication | Email/Google login, demo access |
| `/register` | Registration | Account creation with validation |

### Protected Routes (User)
| Route | Description | Access |
|--------|-------------|--------|
| `/dashboard` | User Overview | User only |
| `/dashboard/profile` | Profile Management | User only |
| `/dashboard/create-profile` | Create Partner Profile | User only |
| `/dashboard/connections` | Manage Connections | User only |

### Protected Routes (Admin)
| Route | Description | Access |
|--------|-------------|--------|
| `/dashboard/admin` | Admin Overview | Admin only |
| `/dashboard/admin/users` | User Management | Admin only |
| `/dashboard/admin/partners` | Partner Management | Admin only |

---


### ✅ Global UI & Design Rules
- **3-color design system** enforced in Tailwind config
- **Light & Dark mode** with proper contrast ratios
- **Consistent layouts** with standardized spacing and components
- **Professional UI** ready for portfolio presentation
- **Fully responsive** across all device sizes

### ✅ Home/Landing Page Requirements
- **Enhanced Navbar** with 5+ routes fogged-in users
- **Hero Section** (-70vh) with interactive carousel and CTAs
- **10+ Meaningful Sections:** Features, How It Works, Categories, Statistics, Testimonials, FAQ, Newsletter, CTA, etc.
- **Functional Footer** with working links and contact info

### ✅ Core Features Implementation
- **Card Consistency:** Equal height/width with 4-per-row desktop layout
- **Details Pages:** Multiple sections with comprehensive information
- **Advanced Listing:** Search, 2+ filters, sorting, pagination
- **Authentication:** Demo login, social login, proper validation

### ✅ Dashboard Excellence
- **Role-based Dashboard** with different layouts for User/Admin
- **Dashboard Overview** with dynamic charts and real data
- **Profile Management** with full CRUD capabilities
- **Admin Panel** with user/partner management tools

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase project setup
- MongoDB database (via server)

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/jubayeralfaruk/study-mate-client.git
   cd study-mate-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_APIKEY=your_firebase_api_key
   VITE_AUTHDOMAIN=your_firebase_auth_domain
   VITE_PROJECTID=your_firebase_project_id
   VITE_STORAGEBUCKET=your_firebase_storage_bucket
   VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
   VITE_APPID=your_firebase_app_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 👨‍💼 Admin Access

### Admin Credentials
- **Primary Admin:** `jubayeralfaruk@gmail.com`
- **Demo Admin:** `demo@studymate.com` (use demo login button)
- **Default Admin:** `admin@studymate.com`

### Admin Features
- **Platform Analytics:** User growth, activity monitoring
- **User Management:** View, search, suspend/activate accounts
- **Content Moderation:** Review and manage partner profiles
- **System Administration:** Platform settings and controls

---

## 🎨 Design System

### Color Palette
- **Primary:** `#632EE3` (Purple)
- **Secondary:** `#9F62F2` (Light Purple)
- **Accent:** `#FF6B6B` (Coral)
- **Neutral:** Grayscale variants

### Typography & Spacing
- **Consistent spacing:** 4px grid system
- **Typography scale:** Harmonious font sizes
- **Border radius:** Standardized corner rounding
- **Shadows:** Layered depth system

---

## 📊 Performance & Optimization

### Technical Optimizations
- **Code Splitting:** Route-based lazy loading
- **Image Optimization:** Responsive images with proper sizing
- **Bundle Optimization:** Tree shaking and minification
- **Caching Strategy:** Efficient data fetching and storage

### User Experience
- **Loading States:** Skeleton loaders for better perceived performance
- **Error Handling:** Graceful error boundaries and user feedback
- **Accessibility:** WCAG compliant with keyboard navigation
- **Mobile Performance:** Optimized for mobile devices

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

**Jubayer Al Faruk**
- GitHub: [@jubayeralfaruk](https://github.com/jubayeralfaruk)
- Email: jubayeralfaruk@gmail.com

---

## 🙏 Acknowledgments

- **Programming Hero** for the comprehensive web development course
- **Firebase** for authentication and hosting services
- **Tailwind CSS & DaisyUI** for the beautiful UI components
- **React Community** for the amazing ecosystem and tools

---

**⭐ If you found this project helpful, please give it a star!**