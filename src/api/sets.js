const API = import.meta.env.VITE_API;
//console.log("API base URL is:", API);

//link to the sets in the array
export async function getSets() {
  try {
    const response = await fetch(API + "/routines/sets");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

//create
export async function createSets(token, sets) {
  if (!token) {
    throw Error("You must be signed in to add a set.");
  }

  const response = await fetch(API + "/sets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(sets),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

//delete
export async function deleteSet(token, id) {
  if (!token) {
    throw Error("You must be signed in to delete a set.");
  }

  const response = await fetch(API + "/sets/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
