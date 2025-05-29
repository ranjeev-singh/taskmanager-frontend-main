import React, { useState, useEffect } from 'react';
import SubscriptionForm from './SubscriptionForm';
import SubscriptionList from './SubscriptionList';
import { getSubscriptions } from '../services/api';

const Subscription = ({ userId }) => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await getSubscriptions();
        setSubscriptions(response.data);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };
    fetchSubscriptions();
  }, []);

  const handleSubscriptionCreated = (subscription) => {
    setSubscriptions([...subscriptions, subscription]);
  };

  const handleSubscriptionCanceled = (subscriptionId) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === subscriptionId ? { ...sub, status: 'canceled' } : sub
      )
    );
  };

  return (
    <div>
      <SubscriptionForm userId={userId} onSubscriptionCreated={handleSubscriptionCreated} />
      <SubscriptionList
        subscriptions={subscriptions}
        onSubscriptionCanceled={handleSubscriptionCanceled}
      />
    </div>
  );
};

export default Subscription;