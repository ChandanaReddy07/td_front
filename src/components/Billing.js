import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { isAuthenticated } from '../helper/user';
import InvoiceButton from './InvoiceButton'; // Import your InvoiceButton component
import MainPage from './mainpage';

const COST_PER_ACTION = {
  GET: 0,
  POST: 0.1,
  PUT: 0.2,
  DELETE: 0
};

function CurrentBill() {
  const [bill, setBill] = useState({});
  const { user, token } = isAuthenticated();

  useEffect(() => {
    const fetchBillData = async () => {
      try {
        const response = await axios.get(`https://todo-backend-nkpr.onrender.com/billing/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBill(response.data);
      } catch (error) {
        console.error('Error fetching bill data:', error);
      }
    };

    fetchBillData();
  }, [user._id, token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };
  

  return (
    <MainPage>
    <div className="bill-container">
      <h2>Current Bill</h2>
      <p><strong>Start Date:</strong> {formatDate(bill.startDate)}</p>
      <h3>Action Logs</h3>
      <ul>
        {bill.actionLogs && bill.actionLogs.map((log, index) => (
          <li key={index}>{log.actionType} - {formatDate(log.date)} - ${COST_PER_ACTION[log.actionType]}</li>
        ))}
      </ul>
      <p><strong>Total Amount:</strong> ${bill.totalAmount}</p>
      <InvoiceButton userId={user._id} />
    </div>
    </MainPage>
  );
}

export default CurrentBill;
