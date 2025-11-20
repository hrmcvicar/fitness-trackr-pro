import { useState, useEffect } from "react";
//import { createRoutine } from "../../api/routines";
import { useAuth } from "../../auth/AuthContext";
import { getActivities } from "../../api/activities";
import { createSets } from "../../api/sets";

export default function SetsForm({ routineId, syncRoutine }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState();

  useEffect(() => {
    async function loadActivities() {
      try {
        const data = await getActivities();
        setActivities(data);
      } catch (e) {
        setError("Failed to load activities.");
      }
    }
    loadActivities();
  }, []);

  const tryCreateSets = async (formData) => {
    setError(null);

    const activityId = formData.get("activityId");
    const count = formData.get("count");

    try {
      await createSets(token, {
        activityId,
        routineId,
        count,
      });
      syncRoutine();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h2>Add a new set</h2>
      <form action={tryCreateSets}>
        <label>
          Select an activity:
          <select
            name="activityId"
            value={selectedActivityId}
            onChange={(e) => setSelectedActivityId(e.target.value)}
          >
            <option value="">-- choose an activity --</option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Reps:
          <input type="number" name="count" min="1" />
        </label>
        <button>Add set</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </>
  );
}
