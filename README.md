# YouMoney

## Overview

YouMoney is a web-based financial tracking application. It allows users to add, edit, and delete their financial transactions and view expenses through an interactive chart. The application is designed to help users manage their finances effectively. Data is stored securely in a MySQL database.

## Developed By

This project was developed by Kazybek as a personal project to demonstrate full-stack web development skills.

## License

YouMoney is released under the MIT License. Feel free to use, modify, and distribute this project under the terms of the license.

## Repository Structure

```
YouMoney-DevOps/
├── app/                    # Source code of the web application
│   ├── server.js           # Main application file (Node.js backend)
│   ├── public/             # Static files (frontend assets)
│   │   ├── index.html      # Main HTML file
│   │   ├── style.css       # Stylesheet
│   │   └── script.js       # Client-side JavaScript logic
├── docker/                 # Docker configuration
│   ├── Dockerfile          # Docker image build file
│   ├── .dockerignore       # Files to exclude from Docker context
├── infra/                  # Infrastructure files (e.g., AWS configuration)
│   ├── aws/                # AWS resource definitions
├── .gitignore              # Git ignore rules
├── README.md               # Project documentation
```

## How to Use

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-repo>/youmoney-devops.git
   ```

2. Navigate to the application directory:
   ```bash
   cd youmoney-devops/app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Configure the database connection in a `.env` file:
   ```
   DB_HOST=<RDS ENDPOINT>
   DB_USER=<USERNAME>
   DB_PASSWORD=<PASSWORD>
   DB_NAME=<DATABASE NAME>
   ```

5. Start the application:
   ```bash
   node server.js
   ```

6. Open your browser and go to [http://localhost:3000](http://localhost:3000) to use the application.

## Features

- Add, edit, and delete transactions
- Visualize expenses with an interactive chart
- Responsive and user-friendly design

## Technology Stack

- Backend: Node.js with Express
- Frontend: HTML, CSS, and JavaScript
- Database: MySQL
- Deployment: Docker and AWS

---

Feel free to contribute to this project by submitting pull requests or reporting issues!

