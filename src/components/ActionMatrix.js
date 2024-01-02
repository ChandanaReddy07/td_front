import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../helper/user';
import MainPage from './mainpage';

function ActionMatrix() {
  const [actionData, setActionData] = useState([]);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    const fetchActionCounts = async () => {
      try {
        const response = await axios.get(`https://todo-backend-nkpr.onrender.com/user/taskcounts/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          // Transform the object into an array of objects
          const transformedData = Object.entries(response.data).map(([date, actionCounts]) => {
            return Object.entries(actionCounts).map(([actionType, count]) => {
              return { date, actionType, count };
            });
          }).flat(); // Flatten the array of arrays into a single array

          setActionData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching action counts:', error.message);
        // Handle errors if any during API call
      }
    };

    fetchActionCounts();
  }, [user._id, token]); // Add dependencies here

  return (
    <MainPage>
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
          <tr key={index}>
            <td>{item.date}</td>
            <td>{item.actionType}</td>
            <td>{item.count}</td>
          </tr>
        ))}
      </tbody>
   
    </table>
    </MainPage>
  );
}

export default ActionMatrix;
