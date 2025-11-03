# 🛍️ ProductSpot API

نظام إدارة متجر إلكتروني متكامل مبني باستخدام **Node.js**, **Express**, و **MongoDB (Mongoose)**  
يدعم نظام الطلبات، المنتجات، الفئات، العروض، الكوبونات، المراجعات، التوصيل، الضريبة، والمفضلة.

---

## 🚀 تشغيل المشروع

### 1️⃣ تثبيت الحزم
```bash
npm install
```

### 2️⃣ إنشاء ملف البيئة `.env`
ضع القيم التالية (حسب إعدادك):
```env
PORT=3000
NODE_ENV=Development

# Base
Base_URL=http://localhost:3000

# Database
Username=Besho
Password=g8PUOqO8gvCWXKFA
Url_DB=mongodb+srv://Besho:g8PUOqO8gvCWXKFA@cluster0.vv4ydn9.mongodb.net/Shop?retryWrites=true&w=majority&appName=Cluster0

# JWT
jwt_sectkey="ahmed is very good and i wil fuck you"
jwt_expected="90d"
```

### 3️⃣ التشغيل
```bash
npm start
```
ثم افتح المتصفح على:
```
http://localhost:3000
```

---

## 📁 بنية المشروع
```
📦 ProductSpot
 ┣ 📂 routes
 ┃ ┣ 📜 Category-router.js
 ┃ ┣ 📜 Barnds-router.js
 ┃ ┣ 📜 product-router.js
 ┃ ┣ 📜 Auth-router.js
 ┃ ┣ 📜 User-router.js
 ┃ ┣ 📜 Review-router.js
 ┃ ┣ 📜 Wishlist-router.js
 ┃ ┣ 📜 coupons-router.js
 ┃ ┣ 📜 Taxprice-router.js
 ┃ ┣ 📜 Order-router.js
 ┃ ┣ 📜 banner-router.js
 ┃ ┗ 📜 offer-router.js
 ┣ 📂 models
 ┣ 📂 controllers
 ┣ 📂 middleware
 ┣ 📂 utils
 ┣ 📂 uploads
 ┣ 📜 server.js
 ┣ 📜 app.js
 ┗ 📜 .env
```

---

## 🔗 نقاط النهاية (Endpoints)

### 🔹 Category
- `GET /api/v1/category` → عرض جميع الفئات  
- `POST /api/v1/category` → إضافة فئة جديدة  
- `DELETE /api/v1/category/:id` → حذف فئة  

### 🔹 Brand
- `GET /api/v1/brand`
- `POST /api/v1/brand`

### 🔹 Product
- `GET /api/v1/product` → كل المنتجات  
- `POST /api/v1/product` → إنشاء منتج (يدعم رفع صورة بـ multer)  
- `GET /api/v1/product/:id` → تفاصيل منتج  
- `DELETE /api/v1/product/:id`

### 🔹 Banner
- `GET /api/v1/banner`
- `POST /api/v1/banner` → إضافة بانر (صورة كبيرة لصفحة المتجر)

### 🔹 Offer
- `GET /api/v1/offer`
- `POST /api/v1/offer`

### 🔹 Wishlist (المفضلة)
- `GET /api/v1/wishlist`
- `POST /api/v1/wishlist`

### 🔹 Review
- `POST /api/v1/review` → إضافة تقييم للمنتج  

### 🔹 Coupon
- `GET /api/v1/coupon`
- `POST /api/v1/coupon`

### 🔹 TaxPrice
- `GET /api/v1/taxprice`
- `POST /api/v1/taxprice`

### 🔹 Order
- `GET /api/v1/order` → عرض الطلبات  
- `POST /api/v1/order` → إنشاء طلب جديد  
(يتضمن السعر الإجمالي + الضريبة + تكلفة التوصيل)

---

## 🔒 الحماية

- جميع الـ Routes المحمية تستخدم **JWT** للمصادقة.
- المستخدم العادي يمكنه التصفح بدون تسجيل دخول.
- صاحب المتجر (Admin) فقط يمكنه إضافة/تعديل المنتجات والفئات.

---

## 📦 المميزات

✅ رفع الصور عبر **Multer**  
✅ تسجيل الدخول عبر **JWT**  
✅ إدارة المنتجات والفئات والعروض  
✅ حساب الضريبة وتكلفة التوصيل تلقائيًا  
✅ مراجعات (Reviews) وتفضيلات (Favorites)  
✅ دعم نظام الـ Brand وBanner  
✅ لا يحتاج تسجيل دخول للشراء (عميل عام)

---

## 🧩 المالك
**Developer:** Ahmed Basher  
**Project:** ProductSpot  
**Tech:** Node.js, Express, MongoDB, JWT, Multer
