import React, { useState } from 'react';
import axios from 'axios';

function PaymentPage() {
    const [transactionRef, setTransactionRef] = useState('');
    const [orderInfo, setOrderInfo] = useState('');
    const [amount, setAmount] = useState('');

    const handlePayment = async (e) => {
        e.preventDefault();

        const paymentRequest = {
            transactionRef,
            orderInfo,
            amount
        };

        try {
            const response = await axios.post('http://localhost:5000/api/payment/createpayment', paymentRequest);
            window.location.href = response.data.paymentUrl;
        } catch (error) {
            console.error("Error creating payment", error);
        }
    };

    return (
        <form onSubmit={handlePayment}>
            <input
                type="text"
                placeholder="Transaction Reference"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Order Info"
                value={orderInfo}
                onChange={(e) => setOrderInfo(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <button type="submit">Pay with VNPAY</button>
        </form>
    );
}

export default PaymentPage;
