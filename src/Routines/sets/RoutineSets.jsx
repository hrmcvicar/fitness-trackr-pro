import SetsForm from "./SetsForm";
import SetList from "./SetList";
import { useAuth } from "../../auth/AuthContext";
//import { useState } from "react";
//import { getSets } from "../../api/sets";

//If the user is logged in, on the page with details about a single routine, the user can submit a form to add a set to the routine.
//The form to add a set has two main inputs: a dropdown where the user can select an activity, and a field where the user can input the number of reps.
//The dropdown is populated by the activities from the API.
//If the user encounters an error with submitting their set, a corresponding error message is displayed.
//The list of sets associated with a routine automatically refreshes after the user successfully adds a new set to that routine.
//If the user is logged in, next to each set is a "delete" button that allows the user to remove that set from the routine.
//import RoutineList from "./RoutineList";

//this is like the main page for sets (like ActivitiesPage or RoutinesPage)
export default function RoutineSets({ routine, syncRoutine }) {
  const { token } = useAuth();
  //const [sets, setSets] = useState([]);

  //const [routine, setRoutine] = useState(null);
  //console.log("RoutineSets props:", routine);

  /*  const syncSets = async () => {
    const data = await getSets();
    setSets(data);
  }; */

  const routineSets = routine && routine.sets ? routine.sets : [];

  return (
    <div>
      <SetList sets={routineSets} syncRoutine={syncRoutine} />

      {token && <SetsForm routineId={routine.id} syncRoutine={syncRoutine} />}
    </div>
  );
}

/*<h3>Sets:</h3>
      {routineSets.length > 0 ? (
        <p>{routineSets.length}</p>
      ) : (
        <p role="alert"> This routine doesnt have any sets. Try adding one?</p>
      )}
      {token && <SetsForm syncSets={syncSets} />}*/
