# 🎬 Chill Streaming API - Core Backend Architecture

This project is a RESTful API implementation for a movie streaming platform (Chill). The main focus of the development is building a solid Backend architecture using Node.js and MySQL, with an emphasis on Separation of Concerns, data manipulation security, and efficient delivery of nested JSON.

## 🛠️ Tech Stack

This project is built using a modern Backend ecosystem with the following foundations:

- **Runtime Environment**: Node.js
- **Web Framework**: Express.js (Handles routing and HTTP behavior)
- **Database**: MySQL (Relational Database Management System)
- **Database Driver**: mysql2 (Implemented using Connection Pool and asynchronous Promise features for performance efficiency).
- **Security & Utilities**: bcrypt (For one-way password encryption), cors (Allows cross-domain access from the Frontend), and dotenv (Secures secret variables).

## 📂 Project Structure

This project adheres to the Separation of Concerns (SoC) principle to prevent logic from being concentrated in one place.

```bash
chill-backend/
├── database/ # Stores the blueprint file (.sql) for initial database creation.
├── postman/ # Stores the Postman Collection (.json) as an API manual.
├── src/
│ ├── config/ # Bridge connection to the MySQL database system.
│ ├── routes/ # Router: Manages URLs and receives/sends JSON.
│ └── services/ # Service: Contains pure business logic and SQL commands (CRUD).
├── .env.example # Environment variable framework (Setup guide for other developers).
├── .gitignore # List of confidential files (including .env) blocked from GitHub.
├── index.js # The main gateway (Entry point) that starts the server.
└── package.json # Project identity record and list of Node.js libraries.
```

## 📅 Development Timeline

Development is carried out in stages, prioritizing fundamental features before moving on to complex data relationships.

- **Day 1**: Infrastructure Foundation. Initialize the main libraries (Express, MySQL2, Dotenv) and ensure secure database connections through environment variable configuration.

- **Days 2-3**: Core CRUD Movie Entity. Build routes and logic for reading, adding, modifying, and deleting master movie data. Logical rigor is enforced by requiring a WHERE clause on modification operations to prevent a Mass Update disaster that could corrupt the entire database.

- **Days 4-5**: Account System (User Auth). Focus on completing registration, login processes, and user profile management.

- **Day 6**: User Interaction (Watchlist). Build the Many-to-Many relationship logic for the "My List" feature, allowing users to save their favorite movies.

- **Day 7**: Nested Data (Episode Cycle). Completed the system of cassette discs (episodes) connected to the main film, sealing the completion of the Backend logic for the streaming feature

## 🚀 How to Use (Cross-Machine Installation)

Follow the steps below to safely run the server on your local computer:

1. **Repository & Dependency Preparation**

- Download or clone this repository to your local computer.
- Open a terminal (CMD/Bash) in the project's root folder, then execute this command to download all the required tools:

```bash
npm install
```

2. **Database Construction (Warehouse Simulation)**

- Open MySQL Workbench or a similar database management tool.
- Import and run the .sql file located in the database/ folder.
- The system will intelligently create the chill_db database and all its table relationships without you having to manually create the schema.

3. **Environment Setup**

- Find a file named .env.example in the root folder.
- Copy and paste the file and rename it to .env.
- Open the .env file and fill the DB_PASSWORD variable with your computer's MySQL password. Make sure the DB_PORT value is also correct (usually 3306).

4. **Igniting the Server**

- Back in the terminal, start the server using Node.js with the command:

```bash
node index.js

Or

run `npm run dev` (if you have Nodemon in development mode).
```

- If successful, the terminal will print confirmation that the database is connected and the server is running on port 5001.

5. **Testing API Functionality**

- Open the Postman application.
- Import the `.json` file located in the `postman/` folder.
- The entire API route collection (from Registration to Watchlist Manipulation) will be immediately available for testing.

## Architecture and Development Logic Highlights

The development of this API wasn't just about creating functional routes; it also focused on the stability and security of the ecosystem.

- **Separation of Responsibilities (SoC)**: The project strictly separates routes (URL traffic handlers and HTTP responses) and services (database query execution chefs and logic validation).

- **Sensitive Data Security**: User passwords are protected using one-way hashing (bcrypt). When retrieving profile data (GET), password data is destroyed before being sent to the frontend to meet industry security standards.

- **"Patchwork" Algorithm for Partial Updates**: The profile edit feature uses the PATCH method, which evaluates old data (oldData) and cross-references it with new user updates to prevent accidentally overwriting columns with NULL values.

- **Complex Relationship Integrity**: In the "My List" feature, because it is a Junction Table, data modifications are bound using a double lock (WHERE id_user = ? AND id_seriesfilm = ?) to prevent duplication and erroneous deletion.

- **Nested JSON Efficiency**: To avoid over-fetching, the episode list is injected directly into the movie detail object using array manipulation. The frontend only needs to make a single API call to assemble the entire page.

## Future Work

To bring this API to a production-ready level, several areas that need to be implemented in the next development cycle are:

- **JWT (JSON Web Token) Authentication System**: Changing the session management system from sending raw IDs to encrypted tokens in headers to prevent identity manipulation (ID spoofing).

- **Subscription Package Management**: Adding a dedicated GET route to serve the package selection page with subscription prices to users.

- **Transaction Gateway (Order & Payment)**: Implementing a POST route to record subscription decisions (checkout) and a GET route for user billing history.

## 👨‍💻 Author

Muhammad Fachrezi Barus

- 🔗 LinkedIn: https://www.linkedin.com/in/muhammad-fachrezi-barus/
- 📧 Email: fachrezibarus@gmail.com

## 📝 License

This project is created for educational and portfolio purposes. Feel free to use and modify it with proper credit.
