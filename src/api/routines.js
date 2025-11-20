const API = import.meta.env.VITE_API;
//console.log("API base URL is:", API);

/** Fetches an array of routines from the API. */
export async function getRoutines() {
  try {
    const response = await fetch(API + "/routines");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

//individual routine
export async function getRoutine(id) {
  try {
    const response = await fetch(`${API}/routines/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch`);
    }

    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

//create routine
export async function createRoutine(token, routine) {
  if (!token) {
    throw Error("You must be signed in to create a routine.");
  }

  const response = await fetch(API + "/routines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(routine),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

//delete routine
export async function deleteRoutine(token, id) {
  if (!token) {
    throw Error("You must be signed in to delete a routine.");
  }

  const response = await fetch(API + "/routines/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
