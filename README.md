Setting Up MySQL Database
Create MySQL Database:

Ensure you have MySQL installed on your system.
Open your MySQL client and create a new database. You can use the following SQL command:
sql
Copy code
CREATE DATABASE your_database_name;
Create Table 'crops':

Once the database is created, you need to create a table named 'crops' to store your data.
Use the following SQL command to create the 'crops' table:
sql
Copy code
CREATE TABLE crops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  report VARCHAR(255),
  crop VARCHAR(255)
);
This table will store the reports and associated crop data.
Running the Frontend
Navigate to the Frontend Directory:

Open your terminal or command prompt.
Navigate to the frontend directory of your project.
Install Dependencies:

Run the following command to install dependencies:
Copy code
npm install
Start the Frontend Development Server:

After installing dependencies, run the following command:
arduino
Copy code
npm run dev
This command will start the frontend development server.
Running the Backend
Navigate to the Backend Directory:

Open another terminal or command prompt instance.
Navigate to the backend directory of your project.
Install Dependencies:

Run the following command to install backend dependencies:
Copy code
npm install
Start the Backend Server:

After installing dependencies, run the following command:
sql
Copy code
npm start
This command will start the backend server using nodemon.
Configure MySQL Connection:

Ensure that you have configured the MySQL connection details properly in your backend code.
Accessing the Application
Once both frontend and backend servers are running, you can access your application by visiting the appropriate URL in your web browser.

Ensure that you've properly configured the backend to interact with your MySQL database and handle requests from the frontend.

For any issues or troubleshooting, refer to the respective documentation of the tools and technologies you're using or consult the project's developers.
