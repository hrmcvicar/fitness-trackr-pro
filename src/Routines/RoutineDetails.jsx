//page for single routine
//each routine in <routineList> should link to own page

import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { getRoutine, deleteRoutine } from "../api/routines";
import RoutineSets from "./sets/RoutineSets";

export default function RoutineDetails() {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [routine, setRoutine] = useState(null);
  const [error, setError] = useState(null);

  const syncRoutine = async () => {
    const data = await getRoutine(id);
    setRoutine(data);
  };

  useEffect(() => {
    syncRoutine();
  }, [id]);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteRoutine(token, routine.id);
      navigate("/routines");
    } catch (e) {
      setError(e.message);
    }
  };

  if (!routine) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{routine.name}</h2>
      <h4>by {routine.creatorName}</h4>
      <p>{routine.goal}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}
      <hr />
      <RoutineSets routine={routine} syncRoutine={syncRoutine} />
    </div>
  );
}

//add sets
//if no sets, message to encourage users to add
