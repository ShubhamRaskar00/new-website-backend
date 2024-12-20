# Backend Project

A personal full stack website backend implementation.

## Description

This is the backend service for a personal full stack website, built with Node.js and Express. It provides various features including user authentication, email services, and database integration with MongoDB.

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (Latest LTS version recommended)
- MongoDB
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ShubhamRaskar00/new-website-backend.git
cd new-website-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following configuration:
```env
SMPT_SERVICE = gmail
SMPT_HOST = smtp.gmail.com
SMPT_PORT = 465 
SMPT_PASSWORD = ""
SMPT_MAIL = ""
PORT = 8000
DB_URL = ""
NODE_ENV = "DEVELOPER"
USER = "Your user name"
```

## Dependencies

- **bcrypt & bcryptjs**: Password hashing and verification
- **cookie-parser**: Parse Cookie header and populate req.cookies
- **cors**: Enable Cross-Origin Resource Sharing
- **dotenv**: Load environment variables from .env file
- **express**: Web application framework
- **js-cookie**: Handle browser cookies
- **jsonwebtoken**: JWT implementation for authentication
- **mongoose**: MongoDB object modeling tool
- **nodemailer**: Send emails
- **nodemon**: Development utility for auto-restarting server

## Scripts

- Start the server:
```bash
npm start
```

- Start development server with auto-reload:
```bash
npm run dev
```

## Project Structure

```
backend/
├── index.js
├── package.json
├── .env
├── README.md
└── node_modules/
```

## API Endpoints

Document your API endpoints here, for example:

```
POST /api/auth/register - Register a new user
POST /api/auth/login - User login
GET /api/auth/logout - User logout
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author

Shubham Raskar

## License

This project is licensed under the ISC License.