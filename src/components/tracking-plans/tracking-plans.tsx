import React, { useEffect, useState } from 'react';
import './tracking-plans.css';

interface TrackingPlan {
  tracking_plan_name: string;
  description: string;
  event: Event[];
}

interface Event {
  name: string;
  description: string;
  rules: string;
}

const TrackingPlanList: React.FC = () => {
  const [trackingPlans, setTrackingPlans] = useState<TrackingPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<TrackingPlan | null>(null);

  useEffect(() => {
    const fetchTrackingPlans = async () => {
      const url = 'http://localhost:3000/tracking-plan/';
      const response = await fetch(url);
      const data = await response.json();
      setTrackingPlans(data);
    };
    fetchTrackingPlans();
  }, []);

  const handlePlanClick = (plan: TrackingPlan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="container">
      <h2>Tracking Plans</h2>
      <table>
        <thead>
          <tr>
            <th>Tracking Plan Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {trackingPlans.map((plan, index) => (
            <tr key={index} onClick={() => handlePlanClick(plan)}>
              <td>{plan.tracking_plan_name}</td>
              <td>{plan.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPlan && (
        <div>
          <h3>{selectedPlan.tracking_plan_name}</h3>
          <p>{selectedPlan.description}</p>
          <table>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Event Description</th>
                <th>Event Rules</th>
              </tr>
            </thead>
            <tbody>
              {selectedPlan.event.map((event, index) => (
                <tr key={index}>
                  <td>{event.name}</td>
                  <td>{event.description}</td>
                  <td>{event.rules}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TrackingPlanList;
