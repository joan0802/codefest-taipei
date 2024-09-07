import React, { useState, useEffect } from 'react';
import ActivityCard from './ActivityCard';
function ActivityCards() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('activity.json', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        const data = await response.json();
        setActivities(data); // Store the fetched data in 'activities'
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [setActivities]);
  
  return (
    <div>
      {activities.map((activity) => (
        <ActivityCard 
          activity={activity}/>
      ))}
    </div>
  );
}

export default ActivityCards;