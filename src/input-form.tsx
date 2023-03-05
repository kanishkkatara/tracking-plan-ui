import { useState } from "react";
import "./input-form.css";

interface Event {
  name: string;
  description: string;
  rules: string;
}

interface TrackingPlan {
  name: string;
  description: string;
  events: Event[];
}

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState<Event[]>([]);

  const handleAddEvent = () => {
    setEvents([...events, { name: "", description: "", rules: "" }]);
  };

  const handleEventChange = (
    index: number,
    property: keyof Event,
    value: string
  ) => {
    const newEvents = [...events];
    newEvents[index][property] = value;
    setEvents(newEvents);
  };

  const handleSave = () => {
    const trackingPlan: TrackingPlan = {
      name,
      description,
      events: events.map((event) => ({
        name: event.name,
        description: event.description,
        rules: event.rules,
      })),
    };

    fetch("http://localhost:3000/tracking-plan/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackingPlan),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // handle success response
      })
      .catch((error) => {
        console.error("Error:", error);
        // handle error response
      });
  };

  return (
    <div className="container">
      <h1>Add Tracking Plan</h1>
      <div className="form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Events</label>
          {events.map((event, index) => (
            <div key={index} className="event">
              <div className="form-group">
                <label htmlFor={`event-name-${index}`}>Name</label>
                <input
                  type="text"
                  id={`event-name-${index}`}
                  value={event.name}
                  onChange={(e) =>
                    handleEventChange(index, "name", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor={`event-description-${index}`}>
                  Description
                </label>
                <textarea
                  id={`event-description-${index}`}
                  value={event.description}
                  onChange={(e) =>
                    handleEventChange(index, "description", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor={`event-rules-${index}`}>Rules</label>
                <textarea
                  id={`event-rules-${index}`}
                  value={event.rules}
                  onChange={(e) =>
                    handleEventChange(index, "rules", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddEvent}>
            + Add Event
          </button>
        </div>
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default App;
