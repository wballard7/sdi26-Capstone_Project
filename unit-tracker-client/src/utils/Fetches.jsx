const getFetch = async (arg1) => {
  try {
    const res = await fetch(`http://localhost:8080/${arg1}`);
    const data = await res.json();
    console.log(`Your GET request for ${arg1} returned`, data);
    return data;
  } catch (err) {
    console.log(`Error with your GET fetch to ${arg1}`, err);
  }
};

// const postFetch = async (arg1, arg2) => {
//   try {
//     const res = await fetch(`http://localhost:8080/${arg1}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(arg2), // Corrected: arg2 should be passed directly, not within an object
//     });
//     const data = await res.json();
//     console.log(`Your POST request for ${arg1} returned`, data);
//     return data;
//   } catch (err) {
//     console.log(`Error with your POST fetch to ${arg1}`, err);
//   }
// };
const postFetch = async (arg1, arg2) => {
  try {
    const res = await fetch(`http://localhost:8080/${arg1}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg2),
    });

    // Instead of returning the JSON data, return the full response object
    return res;
  } catch (err) {
    console.log(`Error with your POST fetch to ${arg1}`, err);
    throw err; // Rethrow the error to handle it in the calling function
  }
};

const deleteFetch = async (arg1) => {
  try {
    const res = await fetch(`http://localhost:8080/${arg1}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log(`Your DELETE request for ${arg1} returned`, data);
    return data;
  } catch (err) {
    console.log(`Error with your DELETE fetch to ${arg1}`, err);
  }
};

const putFetch = async (arg1, arg2) => {
  try {
    const res = await fetch(`http://localhost:8080/${arg1}`, {
      method: 'PUT', // Corrected: should be PUT, not POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg2), // Corrected: arg2 should be passed directly, not within an object
    });
    const data = await res.json();
    console.log(`Your PUT request for ${arg1} returned`, data);
    return data;
  } catch (err) {
    console.log(`Error with your PUT fetch to ${arg1}`, err);
  }
};

export { postFetch, getFetch, deleteFetch, putFetch };
