# ⛽ SmartGas Fuel Tracker

SmartGas is a web-based application that allows users to record, monitor, and analyze fuel prices from different stations. This system is developed as part of CCS112 – Application Development and Emerging Technologies.

--------------------------------------------------

🚀 FEATURES
- Add fuel price entries
- View fuel price history
- Delete fuel entries
- Conditional price display:
  - RED if price > 90
  - GREEN if price < 90

--------------------------------------------------

🛠️ TECH STACK
- Laravel (Backend)
- React + Vite (Frontend)
- Inertia.js
- MySQL

--------------------------------------------------

⚙️ INSTALLATION GUIDE

1. Clone the repository
git clone https://github.com/fajardohaideeclaire/smartgas.git
cd smartgas

2. Install dependencies
composer install
npm install

3. Setup environment
cp .env.example .env
php artisan key:generate

4. Configure database (edit .env)
DB_DATABASE=smartgas
DB_USERNAME=root
DB_PASSWORD=

5. Run migrations
php artisan migrate

6. Run the application
php artisan serve
npm run dev

--------------------------------------------------

👥 TEAM MEMBERS
- De Leon, Jexkhen Zhanjie
- Fajardo, Haidee Claire
- Fernandez, Joyce Ann
- Frisco, Mary Mae
- Gacusana, John Lei
- Gonzales, Maria Manuela

--------------------------------------------------

📄 PROJECT DESCRIPTION
This project focuses on building a fuel tracking system where users can input fuel prices and view historical data through a responsive dashboard.