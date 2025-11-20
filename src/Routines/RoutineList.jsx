import { Link } from "react-router";

export default function RoutineList({ routines, syncRoutines }) {
  return (
    <ul>
      {routines.map((routines) => (
        <RoutineListItem
          key={routines.id}
          routines={routines}
          syncRoutines={syncRoutines}
        />
      ))}
    </ul>
  );
}

function RoutineListItem({ routines }) {
  //if (!routines) return null; // this makes it not crash while debugging

  //const { name, goal, creatorName, activities = [] } = routines;

  //console.log("RoutineListItem routine:", routines);

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
      <Link to={"/routines/" + routines.id}>{routines.name}</Link>
    </li>
  );
}
