//import { useState } from "react";
//import { deleteActivity } from "../api/activities";
//import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router";

export default function ActivityList({ activities }) {
  return (
    <ul>
      {activities.map((activity) => (
        <ActivityListItem
          key={activity.id}
          activity={activity}
          //syncActivities={syncActivities}
        />
      ))}
    </ul>
  );
}

function ActivityListItem({ activity }) {
  //const { token } = useAuth();

  //const [error, setError] = useState(null);
  //const tryDelete = async () => {
  //setError(null);

  /*try {
      await deleteActivity(token, activity.id);
      syncActivities();
    } catch (e) {
      setError(e.message);
    }
  };*/

  return (
    <li>
      {/*<p>{activity.name}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}*/}
      <Link to={"/activities/" + activity.id}>{activity.name}</Link>
    </li>
  );
}
