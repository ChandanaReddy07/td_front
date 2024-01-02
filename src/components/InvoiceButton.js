import React from 'react';
import axios from 'axios';

function InvoiceButton({ userId }) {
    const handleInvoiceClick = async () => {
        try {
            const response = await axios.post(`https://todo-backend-nkpr.onrender.com/todo/generate-invoice/${userId}`);
            console.log(response.data);
            alert('Invoice is been sent to your email');
        } catch (error) {
            console.error('Error generating invoice:', error);
            alert('Failed to initiate invoice generation.');
        }
    };

    return (
        <button onClick={handleInvoiceClick}>Generate Invoice</button>
    );
}

export default InvoiceButton;
