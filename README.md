# PayPress X0-2📰 News Payout Dashboard 

The **News Payout Dashboard** is a responsive web application built with **React.js**, **Redux**, and **Firebase**, designed for content managers and administrators to manage, track, and calculate payouts for articles and blog submissions efficiently.

---
**contact** 9131198505
## 📌 Features

- 🔐 **Authentication** with Firebase (Email/Password)
- 🧑‍💼 **Admin Login** and Role-Based Access
- 🧾 **Payout Calculation** based on article/blog count
- 📊 **Data Visualizations** using Recharts
- 📥 **Export Options**: Download as CSV, PNG, or export to Google Sheets
- 🌙 **Light/Dark Mode Toggle**
- 🔍 **Search and Filters**: Filter by author, type, date, and keyword
- 📱 **Fully Responsive UI** optimized for all devices
- 🔔 **Real-Time Notifications** with React Hot Toast

---

## 🔐 Admin Credentials

Use the following default credentials to log in as the admin:

- **Email:** `private`  
- **Password:** `private`

Once logged in, the admin has full access to all features, including setting payout rates, exporting data, and managing visual analytics.


IMP_Note -If Enter your Gmail option not visible click the bar first 

---

## 👥 New User Behavior

If a new user logs in with custom credentials:

- ✅ Firebase Authentication verifies the user.
- 🆕 If the user doesn't exist in the database, their information is automatically **added to Firebase** for future tracking.
- 🔒 Role-based restrictions are applied (non-admin users may have limited or read-only access depending on your implementation).

---

## 🚀 Tech Stack

| Tech         | Description                        |
|--------------|------------------------------------|
| React.js     | Frontend library                   |
| Redux        | State management                   |
| Firebase     | Authentication & User Database     |
| Lucide React | Icon library                       |
| Recharts     | Data visualization charts          |
| Tailwind CSS | Utility-first CSS framework        |
| Material UI  | UI Components                      |
| React Hot Toast | Notification system            |

---




# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
