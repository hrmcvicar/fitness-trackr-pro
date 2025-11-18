//page for single activity
//each activity in <activityList> should link to own page

import { useParams, useNavigate } from "react-router";
//import ActivityList from "./ActivityList";
//import { activities } from "api";
//import { Link } from "react-router";
import { deleteActivity, getActivity } from "../api/activities";
import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";

export default function ActivityDetails() {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const syncActivity = async () => {
      const data = await getActivity(id);
      setActivity(data);
    };
    syncActivity();
  }, [id]);

  /*const SingleActivity = activities.find((activity) => {
    return activity.id === id * 1;*/

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteActivity(token, activity.id);
      navigate("/activities");
    } catch (e) {
      setError(e.message);
    }
  };

  if (!activity) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{activity.name}</h2>
      <h4>by {activity.creatorName}</h4>
      <p>{activity.description}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
