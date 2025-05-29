import React from 'react';
import { cancelSubscription } from '../services/api';

const SubscriptionList = ({ subscriptions, onSubscriptionCanceled }) => {
  const handleCancel = async (subscriptionId) => {
    try {
      await cancelSubscription();
      onSubscriptionCanceled(subscriptionId);
      alert('Subscription canceled successfully');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to cancel subscription');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Subscriptions</h2>
      {subscriptions.length === 0 ? (
        <p>No subscriptions found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {subscriptions.map((sub) => (
            <li key={sub.id} style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid #eee' }}>
              <p><strong>Amount:</strong> {sub.amount} {sub.currency}</p>
              <p><strong>Status:</strong> {sub.status}</p>
              <p><strong>Remarks:</strong> {sub.remarks || 'None'}</p>
              {sub.status === 'active' && (
                <button
                  onClick={() => handleCancel(sub.id)}
                  style={{
                    padding: '5px 10px',
                    background: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel Subscription
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubscriptionList;