import React, { useState, useEffect } from 'react';
import ActivityCard from './ActivityCard';
function ActivityCards({ refresh }) {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/activities`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        const data = await response.json();
        setActivities(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [setActivities, refresh]);
  
  return (
    <div className='h-[90vh] overflow-auto'>
      {activities.map((activity) => (
        <ActivityCard 
          key={activity.id}
          activity={activity}/>
      ))}
    </div>
  );
}

export default ActivityCards;