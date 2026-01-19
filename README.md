
<img width="1920" height="864" alt="Screenshot (4)" src="https://github.com/user-attachments/assets/1efd0399-e3bd-4396-a3c5-f488b25fe786" />
A full-featured MERN stack platform for booking travel tickets (Bus, Train, Launch, Plane) with three distinct user roles: User, Vendor, and Admin.

🌟 Live Demo
🔗 Live URL: https://ticketbari.vercel.app
(Note: Replace with your actual deployed URL)

📋 Table of Contents
Features

Tech Stack

Installation


User Roles

API Documentation

Deployment

Contributing

License

🚀 Features
🎯 Core Features
Multi-role Authentication (User, Vendor, Admin)

Social Login with Google

Secure Password Validation (uppercase, lowercase, min 6 chars)



🎫 Ticket Management
Browse Tickets with advanced search, filter, and sort

Ticket Details with countdown timer

Real-time Booking with quantity validation

Admin Approval System for tickets

Advertisement System (max 6 featured tickets)

👤 User Dashboard
View and manage booked tickets

Track booking status (pending/accepted/rejected/paid)


🏪 Vendor Dashboard
Add new tickets with image upload (imgBB)

Manage existing tickets (update/delete)

Handle booking requests (accept/reject)

Revenue overview with charts and analytics

👑 Admin Dashboard
Manage all users (promote/demote roles)

Approve/Reject vendor tickets

Mark fraudulent vendors

Control advertised tickets on homepage

🎨 UI/UX Features
Fully Responsive design (mobile, tablet, desktop)

Dark/Light Mode toggle

Loading States and error boundaries

404 & 403 Error Pages

Toast Notifications for user feedback

Accessible with proper ARIA labels

🛠️ Tech Stack
Frontend
React 18 with Vite

Tailwind CSS for styling

DaisyUI for pre-built components

React Router DOM for routing

React Hook Form for form handling

React Hot Toast for notifications

Lucide React for icons

Axios for API calls

Backend
Node.js with Express.js

MongoDB with Mongoose ODM

JWT for authentication

Bcrypt.js for password hashing

CORS for cross-origin requests

Dotenv for environment variables

Third-Party Services
Firebase Authentication (Google login)

Stripe for payment processing

imgBB for image hosting

MongoDB Atlas for cloud database

📦 Installation
Prerequisites
Node.js (v18 or higher)

MongoDB (Local or Atlas)

npm or yarn package manager

Backend Setup
bash
# Clone the repository
git clone https://github.com/yourusername/ticketbari.git
cd ticketbari/server

# Install dependencies
npm install

# Set up environment variables (see .env.example)
cp .env.example .env

# Start development server
npm run dev
Frontend Setup
bash
cd ../client

# Install dependencies
npm install



# Start development server
npm run dev
🔧 Environment Variables


👥 User Roles
👤 User
Browse and search tickets

Book tickets with quantity selection

View booking history and status



🏪 Vendor
All User capabilities

Add new tickets with details

Manage own tickets (update/delete)

Handle booking requests

View revenue analytics

Cannot approve own tickets

👑 Admin
All User capabilities

Approve/Reject vendor tickets

Manage user roles (make admin/vendor)

Mark vendors as fraudulent

Control advertised tickets

Access all platform data

📚 API Documentation
Authentication
POST /api/auth/register - User registration

POST /api/auth/login - User login

POST /api/auth/google - Google authentication

GET /api/auth/me - Get current user

Tickets
GET /api/tickets - Get all tickets (with search/filter/sort/pagination)

GET /api/tickets/:id - Get single ticket details

POST /api/tickets - Add new ticket (Vendor only)

PUT /api/tickets/:id - Update ticket (Vendor only)

DELETE /api/tickets/:id - Delete ticket (Vendor only)

Bookings
POST /api/bookings - Create new booking

GET /api/bookings/user - Get user bookings

PUT /api/bookings/:id/status - Update booking status (Vendor only)

POST /api/bookings/:id/payment - Process payment

Admin
GET /api/admin/tickets - Get all tickets for approval

PUT /api/admin/tickets/:id/status - Approve/Reject ticket

GET /api/admin/users - Get all users

PUT /api/admin/users/:id/role - Change user role

PUT /api/admin/tickets/:id/advertise - Toggle advertisement status

🚀 Deployment
Frontend Deployment (Vercel)
bash
# Build the project
npm run build

# Deploy to Vercel
vercel --prod
Backend Deployment (Render/Railway)
Push code to GitHub repository

Connect repository to Render/Railway

Set environment variables in dashboard

Deploy with automatic builds









👨‍💻 Developer
Al Amin Alif

GitHub: @alif0007



⭐ Star this repo if you find it useful!

⚠️ Important: This project was developed as part of a coding assessment. Please do not copy or submit this as your own work for academic purposes.
