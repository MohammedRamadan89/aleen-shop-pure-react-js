# 🛍️ Aleen Shop - Complete E-commerce Platform

<div align="center">

![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![Material-UI](https://img.shields.io/badge/Material--UI-7.2.0-blue?style=for-the-badge&logo=mui)
![Redux](https://img.shields.io/badge/Redux-2.8.2-purple?style=for-the-badge&logo=redux)
![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=for-the-badge&logo=vite)

**Modern and advanced e-commerce platform with full Arabic language support**

[🚀 Quick Start](#-quick-start) • [📖 Features](#-key-features) • [🛠️ Development](#-development) • [📱 Preview](#-preview)

</div>

---

## 📋 Overview

**Aleen Shop** is a comprehensive e-commerce platform built with cutting-edge technologies, providing a seamless and advanced shopping experience with full Arabic language support and a modern user interface.

### 🎯 Mission
To provide a comprehensive e-commerce platform that combines ease of use with high performance, featuring full Arabic language support and an exceptional user experience.

---

## ✨ Key Features

### 🛒 **Complete Shopping System**
- **Product Display**: Browse products with advanced filtering
- **Product Details**: Detailed pages with multiple images
- **Shopping Cart**: Real-time cart management
- **Favorites System**: Save favorite products
- **Related Products**: Smart product recommendations

### 💳 **Advanced Payment System**
- **Multiple Payment Methods**: Credit card, PayPal, Cash on Delivery
- **Secure Payment**: Encrypted sensitive data
- **Order Tracking**: Real-time order status monitoring

### 👤 **User Management**
- **Authentication System**: Secure login and logout
- **User Profile**: Personal data management
- **Order History**: View all previous orders
- **Notifications**: Advanced notification system

### 🌐 **Multi-language Support**
- **Arabic & English**: Full support for both languages
- **RTL Interface**: Complete right-to-left writing support
- **Dynamic Translation**: Real-time language switching

### 📱 **Responsive Design**
- **Mobile-First**: Optimized for smartphones
- **Responsive Layout**: Works on all devices
- **Modern Interface**: Material Design implementation

---

## 🛠️ Technologies Used

### **Frontend**
- **React 19.1.0** - UI Library
- **Material-UI 7.2.0** - UI Components Library
- **Redux Toolkit 2.8.2** - State Management
- **React Router 7.7.0** - Navigation
- **React Hook Form 7.62.0** - Form Management
- **Yup 1.7.0** - Data Validation

### **Development & Tools**
- **Vite 7.0.4** - Fast Build Tool
- **ESLint** - Code Quality Checker
- **React i18next** - Translation & Internationalization

### **Helper Libraries**
- **React Toastify** - Notifications
- **Swiper** - Sliders
- **Date-fns** - Date Handling
- **Lucide React** - Icons

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (Version 18 or higher)
- **npm** or **yarn**

### Installation Steps

1. **Clone the Repository**
```bash
git clone https://github.com/MohammedRamadan89/aleen-shop-pure-react-js.git
cd aleen-shop-pure-react-js
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Start Development Server**
```bash
npm run dev
# or
yarn dev
```

4. **Open Browser**
```
http://localhost:5173
```

---

## 📁 Project Structure

```
src/
├── app/                    # Main application settings
│   ├── App.jsx            # Main component
│   ├── store.js           # Redux Store configuration
│   └── rootReducer.js     # Main Reducers root
├── components/            # Shared components
│   ├── navbar/           # Navigation bar
│   ├── footer/           # Footer
│   └── Sidebar.jsx       # Sidebar
├── features/             # Main features
│   ├── auth/            # Authentication system
│   ├── products/        # Product management
│   ├── cart/            # Shopping cart
│   ├── favorites/       # Favorites
│   ├── orders/          # Orders
│   └── notifications/   # Notifications
├── common/              # Shared components and services
│   ├── components/      # Shared components
│   ├── hooks/          # Custom Hooks
│   ├── services/       # Services
│   ├── utils/          # Helper utilities
│   └── i18n/           # Translation files
├── layouts/             # Page layouts
├── pages/              # Main pages
└── routes/             # Routing configuration
```

---

## 🎨 Technical Features

### **State Management**
- **Redux Toolkit**: Advanced state management with Redux
- **Organized Slices**: Each feature has its own slice
- **Middleware**: Asynchronous operations handling

### **Forms & Validation**
- **React Hook Form**: Efficient form management
- **Yup Schema**: Data validation
- **Validation Messages**: Error messages in Arabic

### **Design & Interface**
- **Material-UI Theme**: Custom color system
- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Dark and light theme support

### **Performance**
- **Code Splitting**: Code splitting for better performance
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Optimized images

---

## 📱 Preview

### Main Pages
- **🏠 Homepage**: Featured products display
- **🛍️ Store**: Browse all products
- **📱 Product Details**: Detailed information with images
- **🛒 Shopping Cart**: Manage selected products
- **❤️ Favorites**: Saved products
- **👤 Profile**: Personal data management
- **📦 Orders**: Track previous orders

### Advanced Features
- **🔍 Advanced Search**: Product filtering and sorting
- **💳 Secure Payment**: Multiple payment methods
- **📧 Notifications**: Instant alerts
- **🌐 Translation**: Arabic and English support

---

## 🛠️ Development

### Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Code quality check
npm run lint
```

### Adding New Features

1. **Create New Feature**
```bash
mkdir src/features/new-feature
cd src/features/new-feature
```

2. **Add Redux Slice**
```javascript
// newFeatureSlice.js
import { createSlice } from '@reduxjs/toolkit';

const newFeatureSlice = createSlice({
  name: 'newFeature',
  initialState: {},
  reducers: {
    // Add reducers here
  }
});
```

3. **Add Routes**
```javascript
// AppRoutes.jsx
import NewFeaturePage from '../features/new-feature/pages/NewFeaturePage';

// Add new route
<Route path="/new-feature" element={<NewFeaturePage />} />
```

---

## 🌐 Translation & Internationalization

### Adding New Language

1. **Create Language Folder**
```bash
mkdir src/common/i18n/locales/new-lang
```

2. **Add Translation Files**
```json
// new-lang/common.json
{
  "welcome": "Welcome",
  "products": "Products"
}
```

3. **Update i18n Configuration**
```javascript
// src/common/i18n/index.js
import newLangResources from './locales/new-lang';

const resources = {
  en: enResources,
  ar: arResources,
  newLang: newLangResources
};
```

---

## 🚀 Deployment

### Building for Production

```bash
# Build the project
npm run build

# Preview build
npm run preview
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify

```bash
# Build the project
npm run build

# Upload dist folder to Netlify
```

---

## 🤝 Contributing

We welcome your contributions! Please follow these steps:

1. **Fork the Project**
2. **Create Feature Branch** (`git checkout -b feature/amazing-feature`)
3. **Commit Changes** (`git commit -m 'Add amazing feature'`)
4. **Push to Branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### Code Standards
- Use ESLint for code quality checking
- Write clear comments
- Follow React and Material-UI standards
- Test new features

---

## 📄 License

This project is licensed under a privet License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

- **📧 Email**: work.ram88@gmail.com
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/MohammedRamadan89/aleen-shop-pure-react-js/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/MohammedRamadan89/aleen-shop/discussions)

---

<div align="center">

**Built with ❤️ using React and Material-UI**

[⬆ Back to Top](#-aleen-shop-pure-react-js---complete-e-commerce-platform)

</div>