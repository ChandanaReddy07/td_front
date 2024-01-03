# Frontend Application README  
Try this mini Saas and generate your automated Bill 👉🏻 [https://td-front.vercel.app/](https://td-front.vercel.app/)

This application is a task management and billing system, that integrates Google OAuth for user authentication. It allows users to perform Create, Read, Update, Delete (CRUD) operations on tasks. The system tracks these activities and utilizes them for automated billing purposes. User actions are logged, and based on these logs, invoices are generated, including detailed usage metrics. The billing process is automated through a monthly cron job, leveraging Zapier to send out invoices via email. This setup provides an end-to-end solution from task management to billing and invoicing, streamlining user engagement and the billing process.

Main Page
![image](https://github.com/ChandanaReddy07/td_front/assets/57955783/19c4a06f-bee1-4375-80e7-4959851af122)

Login Page
![image](https://github.com/ChandanaReddy07/td_front/assets/57955783/649f2729-8f29-4077-9f87-7ab5a0e14b54)

Main Page After Login
![image](https://github.com/ChandanaReddy07/td_front/assets/57955783/f6d6916e-5be9-4b33-8e61-b50a19a0c84a)



When you click on any task you created previously
![image](https://github.com/ChandanaReddy07/td_front/assets/57955783/a1e4f9e4-899a-4752-aa51-d34b50d391f8)


When you click on the usage button from the dropdown you get redirected to a page that consists of a Usage Matrix
![image](https://github.com/ChandanaReddy07/td_front/assets/57955783/ee8538f4-6ec6-4a78-bdb2-1ad425d1502d)

When you click on the Bill button from the drop-down It redirects you to Bill page
![image](https://github.com/ChandanaReddy07/td_front/assets/57955783/a0b16ebe-95ad-484c-a302-522cd42089d6)

When you click on the Generate Invoice button present at the bottom of the Bill 
![image](https://github.com/ChandanaReddy07/td_front/assets/57955783/d9653b0f-6966-4f98-90f9-25e33ea7af1f)

After clicking on the Generate Invoice button you can find an invoice email sent to your email
![image](https://github.com/ChandanaReddy07/td_front/assets/57955783/66d6fdde-2d62-437b-a32a-cf67e8920266)




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

