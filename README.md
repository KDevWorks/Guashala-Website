# Guashala-Website

# 🐄 Gaushala Donation Website

A modern, responsive web application designed to support Gaushala operations, cow welfare, and online donations. The platform helps visitors explore donation causes, learn about cow care activities, and contribute towards food, shelter, and medical treatment for cows.

The project takes inspiration from existing Gaushala websites while implementing its own design, user experience, and functionality.

## ✨ Features

- **Responsive Design:** Works across desktop, tablet, and mobile devices.
- **Home Page:** Introduction to the Gaushala, its mission, and activities.
- **Donation Causes:** Dedicated sections for fodder, medical care, cow adoption, and general donations.
- **Donation Flow:** Donation amount selection and donor information form.
- **Gallery:** Display Gaushala activities, cows, and events.
- **About Us:** Information about the organization's mission and vision.
- **Contact Page:** Contact information and enquiry form.
- **Admin Dashboard:** Planned functionality for managing donations, causes, events, and gallery content.
- **Payment Integration:** Architecture prepared for integrating an online payment gateway.
- **Authentication:** Planned user registration and login functionality.

*Note: Features marked as planned or not yet implemented should be updated as development progresses.*

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Framer Motion

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Tools
- Git and GitHub
- Visual Studio Code
- Google Antigravity (AI-assisted development)

## 📁 Project Structure

```text
gaushala-donation-website/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

*The structure above is a suggested structure. Update it to match the actual repository.*

## ⚙️ Setup and Installation

### Prerequisites

Install the following before running the application:

- Node.js (LTS version)
- npm
- MongoDB or a MongoDB Atlas connection
- Git

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/gaushala-donation-website.git
cd gaushala-donation-website
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret
CLIENT_URL=http://localhost:5173
```

Replace the example values with your own configuration. Never commit real secrets, passwords, or API keys to GitHub.

### 5. Run the application

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

Open the local URL displayed by Vite, usually:

http://localhost:5173

**Important:** These commands assume the corresponding scripts and folders exist in your project. Add the required scripts to each `package.json` and configure the frontend API URL before running the full application.

## 🤖 AI Tool Used

**Selected AI Development Tool: Google Antigravity**

This project uses Google Antigravity as an AI-assisted development tool.

### AI Development Experience

Google Antigravity is used as a development assistant to help plan the application, develop reusable components, improve code quality, and troubleshoot issues. The generated code is reviewed and tested during development.

### Specific AI-Assisted Tasks

1. **UI Component Development:** Assisted in planning reusable React components, navigation, donation cards, and responsive page layouts.
2. **Frontend Development:** Assisted in organizing pages, implementing responsive styling, and improving the overall user experience.
3. **Backend API Development:** Assisted in planning Express.js routes and REST API endpoints for donation and contact forms.
4. **Database Integration:** Assisted in designing MongoDB schemas and planning the connection between the frontend, backend, and database.
5. **Debugging and Refactoring:** Used AI assistance to investigate errors, improve component structure, and make code more maintainable.

*Document only the tasks actually completed with AI assistance. Update this section to reflect your real development experience.*

## 🔒 Security and Payments

- Store credentials in environment variables.
- Validate user input on both frontend and backend.
- Protect administrative routes with authentication and authorization.
- Verify payment status on the server when a payment gateway is integrated.
- Never store sensitive payment credentials in the repository.

## 🚀 Future Enhancements

- Complete admin dashboard
- Secure online payment integration
- Automated donation receipts
- Donation history for registered users
- Email notifications
- Volunteer registration
- Gaushala visit booking
- Donation reports and analytics

## 👨‍💻 Development

Developed as a Gaushala donation and cow welfare web application using modern web technologies and AI-assisted development.

## 📄 License

Choose and add an appropriate open-source license before distributing the project. Confirm that you have permission to publish all project assets and code.
