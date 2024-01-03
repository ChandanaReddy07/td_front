# Frontend Application README  [Deployed Link](https://td-front.vercel.app/)

This application is a task management and billing system, integrating Google OAuth for user authentication. It allows users to perform Create, Read, Update, Delete (CRUD) operations on tasks. The system tracks these activities and utilizes them for automated billing purposes. User actions are logged, and based on these logs, invoices are generated, including detailed usage metrics. The billing process is automated through a monthly cron job, leveraging Zapier to send out invoices via email. This setup provides an end-to-end solution from task management to billing and invoicing, streamlining user engagement and the billing process.

## Setting Up and Running the Application

1. **Clone the Repository**
   - Clone the frontend repository to your local machine.

2. **Install Dependencies**
   - Navigate to the project directory and run `npm install` to install dependencies.

3. **Environment Configuration**
   - Create a `.env` file in the project root.
   - Set up environment variables:
     - `REACT_APP_GOOGLE_CLIENT_ID` for your Google OAuth client ID.
     - `REACT_APP_BACKEND_URL` for the backend API endpoint.

4. **Starting the Application**
   - Execute `npm start` to run the application. By default, it will be hosted on `http://localhost:3000`.

## Application Features

1. **Google OAuth Login**
   - Access the login page and sign in using Google OAuth.
   - Ensure your Google client ID is set up correctly in the environment variables.

2. **Usage Details**
   - Once logged in, the Saas product can be accessed and the dashboard provides detailed usage statistics, current bill, and invoice generation button.

3. **Invoice Generation**
   - An invoice generation feature is available, which interacts with the backend to trigger automated billing processes through Zapier and send the invoice through email.

## Additional Information

- For detailed API documentation and more, refer to the backend project's README.
- Ensure all external services are correctly configured for a seamless experience.
- The application is built with [React.js](https://reactjs.org/) and utilizes various libraries and APIs for full functionality.

