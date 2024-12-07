# 🛒 E-commerce Application

This is a modern e-commerce application for purchasing electronics, featuring an intuitive UI, well-designed database structure, and extensive functionality.

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Features](#-features)
  - [Frontend](#-frontend)
  - [Backend](#-backend)
- [Project structure](#-project-structure)
- [Installation & Setup](#-installation----setup)
- [Authors](#-authors)

## 🚀 Features

- **Responsive Design**: Fully optimized for both desktop and mobile devices.
- **Shopping Cart**: Add, remove, and update item quantities with real-time price calculation.
- **Product Categories**: Filter and sort products with ease.
- **Authentication**: Secure login and user account management.

## 🖥️ Frontend

**Technologies:**

- **React** - For building a dynamic user interface.
- **TypeScript** - For static typing and enhanced code reliability.
- **TailwindCSS** - For fast and responsive styling.
- **Floating UI** - For positions and interactions.
- **Framer Motion** - For smooth, fast animations.
- **Redux Toolkit** - For global state management (e.g., cart, user data).
- **Vite** - For a fast development environment and optimized builds.

## 🌐 Backend

**Technologies:**

- **Node.js** - Backend runtime environment.
- **Express** - For creating RESTful APIs.
- **PostgreSQL** - Relational database for storing products, categories, and orders.
- **JWT** - For user authentication and authorization.

## 🗂️ Project structure

```
.
├── README.md
├── backend
│   ├── nodemon.json
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   ├── src
│   │   ├── configs
│   │   │   └── global.config.ts
│   │   ├── controllers
│   │   │   ├── carts.controller.ts
│   │   │   ├── products.controller.ts
│   │   │   └── users.controller.ts
│   │   ├── db
│   │   │   ├── connection.ts
│   │   │   └── queries
│   │   │       ├── carts.query.ts
│   │   │       ├── products.query.ts
│   │   │       └── users.query.ts
│   │   ├── index.ts
│   │   ├── middlewares
│   │   │   ├── auth.middleware.ts
│   │   │   └── errorHandler.middleware.ts
│   │   ├── models
│   │   ├── routes
│   │   │   ├── carts.route.ts
│   │   │   ├── products.route.ts
│   │   │   └── users.route.ts
│   │   ├── services
│   │   │   ├── carts.service.ts
│   │   │   ├── products.service.ts
│   │   │   └── users.service.ts
│   │   ├── types
│   │   │   ├── auth.type.ts
│   │   │   ├── product.type.ts
│   │   │   └── user.type.ts
│   │   └── utils
│   │       ├── dijkstra.ts
│   │       ├── errors.util.ts
│   │       └── images.utils.ts
│   └── tsconfig.json
├── frontend
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── logo.svg
│   │   ├── main.jpg
│   │   ├── main2.jpg
│   │   ├── main3-medium.webp
│   │   ├── main3-small.webp
│   │   ├── main3.webp
│   │   ├── main4.webp
│   │   ├── ps5-wide.webp
│   │   ├── ps5.webp
│   │   └── vite.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── Footer.tsx
│   │   │   ├── header
│   │   │   │   ├── AccountPopover.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   └── ShoppingCartPopover.tsx
│   │   │   └── icons
│   │   │       └── DropdownIcons.tsx
│   │   ├── config
│   │   │   └── global.config.ts
│   │   ├── features
│   │   │   ├── cartSlice.ts
│   │   │   └── userSlice.ts
│   │   ├── hooks
│   │   │   ├── useApi.tsx
│   │   │   └── useFetch.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── pages
│   │   │   ├── auth
│   │   │   │   ├── AuthMain.tsx
│   │   │   │   ├── InputField.tsx
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── MSection.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── cart
│   │   │   │   └── page.tsx
│   │   │   ├── home
│   │   │   │   ├── CatalogItem.tsx
│   │   │   │   ├── CatalogPagination.tsx
│   │   │   │   ├── Dropdown.tsx
│   │   │   │   └── page.tsx
│   │   │   └── product
│   │   │       └── page.tsx
│   │   ├── store.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   ├── utils
│   │   └── vite-env.d.ts
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── sqlSelect.tx
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/shevgn/electronics-shop-uni.git
```

### 2. Frontend set up

```bash
cd frontend

npm install

npm run dev
```

### 3. Backend set up

```bash
cd backend

npm install

npm start
```

## 👨‍💻 Authors

**Artem Levchenko**
