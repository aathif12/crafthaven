# 🧶 CraftHaven - Handcrafted E-commerce Platform

CraftHaven is a full-stack e-commerce web application that allows users to browse, search, and purchase handcrafted products such as jewelry, art prints, paper goods, and home decor. Built using **Spring Boot (Java)** for the backend and **Next.js (React)** for the frontend, the platform focuses on simplicity, usability, and a handcrafted visual experience.

---

## 🔗 Live Demo

> **Coming Soon** (or add your deployment link if hosted)

---

## 📦 Tech Stack

### 🌐 Frontend
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- FontAwesome & React Icons

### ⚙️ Backend
- [Spring Boot](https://spring.io/projects/spring-boot)
- [JPA/Hibernate](https://hibernate.org/)
- [MySQL](https://www.mysql.com/) or [MariaDB](https://mariadb.org/)

---

## 🔧 Features

- 🛍️ Product Listing by Category  
- 🧭 Search with Price Filter (Low to High, High to Low)  
- 🛒 Add to Cart & View Cart  
- ⚡ “Buy Now” for Quick Checkout  
- 📦 Checkout Form with Address Validation  
- 📁 Admin-ready backend with REST API  
- 🧼 Fully responsive design  
- 🪄 Floating “Scroll to Top” button  
- 🎨 Clean, elegant layout and animations  

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js & npm
- Java 17+ and Maven
- MySQL or MariaDB

---

### 🔧 Backend Setup

```bash
cd backend
./mvnw spring-boot:run
```

**Database config:**  
Update `application.properties` with your DB credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/crafthaven
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
```

---

### 🌐 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs at: `http://localhost:3000/`

---

## 🛠️ Folder Structure

```
CraftHaven/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── repositories/
│   └── services/
├── frontend/
│   ├── components/
│   ├── pages/
│   └── context/
```

---

## 🧠 Critical Problem & Solution

- ✅ **Problem:** Supporting both cart-based checkout and direct “Buy Now” checkout.
- 💡 **Solution:** Passed product data as URL parameters for direct checkout. Handled this separately in `CheckoutPage` logic using `useSearchParams()`.

---

## 🗃️ Database Schema

- **Product**: `id`, `title`, `price`, `description`, `imageUrl`, `category_id`
- **Category**: `id`, `name`, `slug`

---

## 📸 Screenshots

> Add screenshots of your homepage, product page, cart, and checkout for better presentation.

---

## 💾 Backup & Deployment

- ✔️ A full database `.sql` backup file is included in the `db_backup/` folder.
- 📦 Code and DB are included in the final ZIP for submission.

---

## 🧾 License

This project is for academic purposes under the University of Vavuniya.

---

## 🙌 Author

**Aathif Ahamed**  
📧 aathifahamad4@gmail.com  
🌐 [LinkedIn](https://linkedin.com) (optional)
