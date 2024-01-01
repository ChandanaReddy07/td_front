import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { isAuthenticated } from '../helper/user'; // Assuming you have a user authentication helper

function BillingInfo() {
    const [bill, setBillingData] = useState({});
    const { user, token } = isAuthenticated();

    useEffect(() => {
        const fetchBillingData = async () => {
            try {
                const response = await axios.get(`https://todo-backend-nkpr.onrender.com/billing/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBillingData(response.data);
                console.log("billllllllllllll",bill)
            } catch (error) {
                console.error('Error fetching billing data:', error);
            }
        };

        fetchBillingData();
    }, [user._id, token]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
          year: 'numeric', 
          month: 'long', 
          day: 'numeric'
        });
      };
    
      return (
        <div className="bill-container">
          <h2>Bill Details</h2>
          {/* <p><strong>Billing Date:</strong> {formatDate(bill.billingDate)}</p> */}
          <p><strong>Total Amount:</strong> ${bill.totalBill}</p>
          <p><strong>Status:</strong> {bill.isPaid ? 'Paid' : 'Unpaid'}</p>
    
          <h3>Action Logs</h3>
          <ul>
            {bill.actionLogs && bill.actionLogs.map((log, index) => (
               
               <li key={index}>{log.actionType} - {formatDate(log.date)}</li>
            ))}
          </ul>
        </div>
      );
}

export default BillingInfo;
