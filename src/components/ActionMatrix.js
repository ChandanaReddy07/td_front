import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../helper/user';
import MainPage from './mainpage';
import "./bill.css"

function ActionMatrix() {
  const [actionData, setActionData] = useState([]);
  const { user, token } = isAuthenticated();
  const [noTaskMessage, setNoTaskMessage] = useState('');


  useEffect(() => {
    const fetchActionCounts = async () => {
      try {
        const response = await axios.get(`https://todo-backend-nkpr.onrender.com/user/taskcounts/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Object.keys(response.data).length > 0) {
          // Transform the object into an array of objects
          const transformedData = Object.entries(response.data).map(([date, actionCounts]) => {
            return Object.entries(actionCounts).map(([actionType, count]) => {
              return { date, actionType, count };
            });
          }).flat(); // Flatten the array of arrays into a single array

          setActionData(transformedData);
        }
      else if (user.startDate !== null) {
        setNoTaskMessage("You haven't had any task since the last date of Billing");
      }

      else {
        setNoTaskMessage("You haven't created any task yet.")
      }

      } catch (error) {
        console.error('Error fetching action counts:', error.message);
      }
    };

    fetchActionCounts();
  }, [user._id, token]); // Add dependencies here

  return (
    <MainPage>
     <div className="bill-container">
      {noTaskMessage ? (
        <p>{noTaskMessage}</p>
      ) : (
      
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Action Type</th>
          <th>Number of Actions</th>
        </tr>
      </thead>
      <tbody>
        {actionData.map((item, index) => (
          item.count > 0 ? <tr key={index}>
          <td>{item.date}</td>
          <td>{item.actionType}</td>
          <td>{item.count}</td>
        </tr>:""
          
        ))}
      </tbody>
   
    </table>)}
    </div>
    </MainPage>
  );
}

export default ActionMatrix;
