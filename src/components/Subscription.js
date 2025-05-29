import React, { useState } from 'react';
import { createSubscription, cancelSubscription } from '../services/api';

const Subscription = ({ userId }) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [remarks, setRemarks] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createSubscription({ user_id: userId, amount, currency, remarks });
      alert('Subscription created');
    } catch (error) {
      alert('Error creating subscription');
    }
  };

  const handleCancel = async () => {
    try {
      await cancelSubscription();
      alert('Subscription canceled');
    } catch (error) {
      alert('Error canceling subscription');
    }
  };

  return (
    <div>
      <h2>Manage Subscription</h2>
      <form onSubmit={handleCreate}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <input
          type="text"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          placeholder="Currency"
        />
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Remarks"
        />
        <button type="submit">Create Subscription</button>
      </form>
      <button onClick={handleCancel}>Cancel Subscription</button>
    </div>
  );
};

export default Subscription;