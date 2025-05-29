import React, { useState } from 'react';

const SubscriptionForm = ({ userId, onSubscriptionCreated }) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await createSubscription({
        user_id: userId,
        amount: parseFloat(amount),
        currency,
        remarks,
      });
      setSuccess('Subscription created successfully!');
      onSubscriptionCreated(response.data);
      setAmount('');
      setCurrency('usd');
      setRemarks('');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create subscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Create Subscription</h2>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount (e.g., 10.00)"
            step="0.01"
            required
            disabled={loading}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="currency">Currency:</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            disabled={loading}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="inr">INR</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="remarks">Remarks:</label>
          <textarea
            id="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Optional remarks"
            disabled={loading}
            style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '80px' }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            background: loading ? '#ccc' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Creating...' : 'Create Subscription'}
        </button>
      </form>
    </div>
  );
};

export default SubscriptionForm;